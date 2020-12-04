import React, { useEffect, useRef, useContext, useState, Suspense } from 'react';

import Axios from 'axios';
// import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Product as ProductContext, Purchase as PurchaseContext, User as UserContext } from '../../../contexts';

import { Button } from '.../../../components/button/button';
import { H4, P, H1 } from '../../../components/typography/typography';
import { FlexColumnItemsContentCenter } from '../../../components/flex/flex';
import TabelStock from '../../../components/products/tabelStock/tabelStock';
import SliderProductImages from '../../../components/products/slider/slider';
import { LazyProduct, LazyContent } from '../../../components/lazyload/index';
import TitleProduct from '../../../components/products/title/title';
import { Overlay } from '../../../components/overlay/overlay';
import { Navigation } from '../../../components/navigation/navigation';
import { BottomSheet } from '../../../components/products/bottomSheet/bottomSheet';
import { Seo } from '../../../components/products/seo/seo';
import { Ongkir } from '../../../components/products/ongkir/ongkir';
import { BottomSheetOngkir } from '../../../components/products/ongkir/bottomSheetOngkir';
import ModalSwitchLocation from '../../../components/products/modalLocation/modalSwitchLocation';
import { Section } from '../../../components/section/section';

// import ReactPixel from 'react-facebook-pixel';
// import fbpixel from '../../../utils/fbpixel';
import gtm from '../../../utils/gtm';
import { addCommas } from '../../../helpers/index';
import CardProduct from '../../../components/Card/Card';

export default function Product() {
	const { data, dispatch } = useContext(ProductContext);
	const context = useContext(PurchaseContext);
	// const { user } = useContext(UserContext);
	const user = 'andy'
	const router = useRouter();
	const params = router.query;
	const containerElm = useRef(null);
	// const history = useHistory();
	// const location = useLocation();

	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isPagesLoad, setPagesLoad] = useState(true);
	const [isStock, setStock] = useState({
		isActive: 0,
		dataStock: [],
	});
	const [param, setParameters] = useState(null);
	const [dataError, setDataError] = useState(false);
	const [isSwitchLocation, setSwitchLocation] = useState(false);

	const [isBottomSheetBuy, setBottomSheetBuy] = useState(false);
	const [isBottomSheetOngkir, setBottomSheetOngkir] = useState(false);
	const [isValueProvince, setValueProvince] = useState(null);
	const [isValueCity, setValueCity] = useState(null);
	const [isValueSubdistrict, setValueSubdistrict] = useState(null);
	const [isSelectNameArea, setSelectNameArea] = useState(null);
	const [isDataArea, setDataArea] = useState([]);
	const [isCrossSellSlider, setCrossSellSlider] = useState({ data: [], next_url: null, pageNumber: 1 });
	const [isInfiniteLoad, setInfiniteLoad] = useState(false);
	const [isLoadingScroll, setLoadingScroll] = useState('');

	const [isPrice, setPrice] = useState(null);
	const [isValueSearch, setValueSearch] = useState('');
	const [isLoadArea, setLoadArea] = useState(false);
	const [isHandleFocus, setHandleFocus] = useState(false);

	const [dataShare, setDataShare] = useState({
		phone: null,
		product_id: null,
	});

	const [brand, setBrand] = useState({
		chosenSize: { brand_type: {}, brand: {} },
		chosenType: {},
		categoryId: null,
		brandId: null,
		stockProduct: null,
		product_id: null,
		SelectImg: null,
		selectColor: null,
		isColor: null,
		productColor: [],
	});

	useEffect(() => {
		let token = localStorage.getItem('token');

		if (token && user && data) {
			setDataShare({
				phone: user.phone,
				product_id: data.product.id,
			});
		}
	}, [user && data]);

	useEffect(() => {
		if (data && data.product.brand_types && data.product.brand_types.length < 1) {
			selectBrand(data.product.brand_types[0]);
		}
	}, [data]);

	useEffect(() => {
		const { current } = containerElm;
		let varsHit = false;
		if (current) {
			current.parentElement.scrollTo(0, 0);
		}
		// Load new product
		if (data) {
			dispatch.data(null);
		}

		// fbpixel();
		gtm();

		let vars = [],
			hash;
		
		let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			hash[1] = unescape(hash[1]);
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		if (vars['r'] !== undefined) {
			setParameters(vars['r']);
			varsHit = true;
			localStorage.setItem('r', vars['r']);
		} else {
			varsHit = true;
		}

		if (varsHit === true) {
			// ambil data product
			let token = localStorage.getItem('token');
			let getAfflink = localStorage.getItem('r');

			let axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			Axios.get(`https://api.ditoko.com/api/v1/${params.kode}${getAfflink ? `?r=${getAfflink}` : ''}`, axiosConfig)
				.then((res) => {
					// console.log(`product `, res);
					if (res.status === 200) {
						setPagesLoad(false);
						const data = res.data.result;
						// ReactPixel.track('ViewContent', {
						// 	currency: 'IDR',
						// 	value: 0.1,
						// 	content_category: data.category.slug,
						// 	content_ids: data.product.name || '',
						// 	content_name: data.product.name || '',
						// 	content_type: 'product',
						// });
						dispatch.data(res.data.result);

						const getData = res.data.result.product.rack_stock;
						// const newData = Object.entries(data);
						// console.log(data);
						setStock((prevState) => ({
							...prevState,
							dataStock: getData,
						}));

						let brand, type;
						const { brand_types, images } = data.product;
						// const { products } = context;
						if (products) {
							const [product] = products.products;
							type = images.find((img) => img.id === product.chosenType.id);
							setQuantity(product.qty);
						} else {
							type = images[0];
						}
						setBrand((prev) => ({
							...prev,
							chosenType: type,
						}));
					}
				})
				.catch((err) => {
					if (err) {
						setPagesLoad(false);
						setDataError(true);
						console.log(err);
						if (err.response) {
							if (err.response.status === 429) {
								console.log(err.response.status);
								alert('Jangan terlalu cepat ya, tunggu 1 menit untuk kembali normal.');
							}
						}
					}
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	useEffect(() => {
		localStorage.setItem('joinCrossSells', 'false');
	}, [data]);

	const handleClickBuyButton = () => {
		if (data !== null) {
			setLoading(true);

			if (data) {
				const { chosenSize, chosenType, categoryId, brandId, product_id, selectColor, isColor, selectImages } = brand;
				const { name, id, flow } = data.product;

				// daily deals
				let getPrice;
				if (data.daily_deal === null) {
					getPrice = data.product.price;
				} else {
					getPrice = data.daily_deal.price;
				}
				const products = {
					id,
					categoryId,
					categorySlug: data.category.slug, // for analytics
					brandId,
					products: [
						{
							name,
							price: getPrice,
							qty: quantity,
							chosenType,
							categorySlug: data.category.slug,
							slug: data.product.brand_types[0].brand.slug,
							brand_id: brandId,
							brand_type_id: chosenSize.brand_type.id,
							brand_name: data.product.short_description,
							type_name: chosenSize.brand_type.type_name,
							flow,
							product_id,
							selectColor: selectColor,
							isColor: isColor,
							selectImages: selectImages,
							categoryId: data.category.id,
							product_brand_type_color_id: selectColor,
						},
					],
				};
				if (products) {
					// console.log(products, `produk`);
					setLoading(true);
					let token = localStorage.getItem('token');
					let axiosConfig = {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					};
					if (token) {
						// jika sudah login
						const form = new FormData();

						products.products.forEach((product, i) => {
							// produk utama
							form.append(`products[0][qty]`, product.qty);
							form.append(`products[0][product_brand_type_color_id]`, brand.selectColor);
						});

						if (form) {
							// console.log(`token`, axiosConfig);
							Axios.post(`https://api.ditoko.com/api/v1/carts/create`, form, axiosConfig)
								.then((res) => {
									// console.log(`cart`, res);
									if (res.data.code === 200) {
										gtm();
										// fbpixel();
										// ReactPixel.track('InitiateCheckout', {
										// 	currency: 'IDR',
										// 	value: 0.0,
										// 	content_category: products.categorySlug,
										// 	content_ids: products.products[0].name,
										// 	content_name: products.products[0].name,
										// 	content_type: 'product',
										// });
										window.dataLayer = window.dataLayer || [];
										window.dataLayer.push({ event: 'click-alamat' });

										router.push('/keranjang');
									}
								})
								.catch((err) => {
									if (err) {
										console.log(err);
										if (err.response) {
											if (err.response.status === 429) {
												console.log(err.response.status);
												alert('Jangan terlalu cepat ya, tunggu 1 menit untuk kembali normal.');
											}
											if (err.response.status === 403) {
												console.log(err.response.status);
												let resfresh = localStorage.getItem('refreshToken');

												// localStorage.removeItem('refreshToken');
												let axiosOrderConfig = {
													headers: {
														Accept: 'application/json',
													},
												};
												const form = new FormData();
												form.append('refresh_token', resfresh);
												let urlToken = `https://api.ditoko.com/api/v1/refresh-token`;
												Axios.post(urlToken, form, axiosOrderConfig)
													.then((res) => {
														if (res.status === 200) {
															console.log(res);
															localStorage.setItem('token', res.data.result.access_token);
															localStorage.setItem('refreshToken', res.data.result.refresh_token);
															handleClickBuyButton();
														}
													})
													.catch((err) => {
														if (err) {
															console.log('refresh token error');
															localStorage.removeItem('token');
															handleClickBuyButton();
														}
													});
											}
										}
									}
								});
						}
					} else {
						// jika belum login

						const data = {
							products: products.products,
						};
						localStorage.setItem('orderData', JSON.stringify(data));

						gtm();
						// fbpixel();
						// ReactPixel.track('InitiateCheckout', {
						// 	currency: 'IDR',
						// 	value: 0.0,
						// 	content_category: products.categorySlug,
						// 	content_ids: products.products[0].name,
						// 	content_name: products.products[0].name,
						// 	content_type: 'product',
						// });
						window.dataLayer = window.dataLayer || [];
						window.dataLayer.push({
							event: 'click-alamat',
						});
						setLoading(false);

						if (loading === false) {
							// router.push('/keranjang');
						}
					}
				} else {
					console.log('hit');
				}
			} else {
				setLoading(false);
			}
		}
	};

	const handleCloseBsOngkir = () => {
		setBottomSheetOngkir(false);
		setSelectNameArea(null);
		setHandleFocus(false);
		setValueProvince(null);
		setValueCity(null);
		setValueSubdistrict(null);
		setPrice(null);
	};

	const handleMinimize = () => {
		setHandleFocus(false);
	};

	const viewOngkir = () => {
		setBottomSheetOngkir(true);
		setSelectNameArea(null);
		setLoadArea(true);
		getDataArea(`https://api.ditoko.com/api/v1/provinces`);
	};

	const getDataArea = (url) => {
		Axios.get(url)
			.then((res) => {
				// console.log(res);
				if (res.status === 200) {
					setDataArea(res.data.result);
					setLoadArea(false);
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat');
						}
					}
				}
			});
	};

	const getPriceByLocation = (id) => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const form = new FormData();
		form.append(`product_id`, data.product.id);
		form.append(`products[0][qty]`, 1);
		form.append(`products[0][product_brand_type_color_id]`, data.product.brand_types[0].product_brand_type_color[0].id);

		Axios.post(`https://api.ditoko.com/api/v1/sub-districts/${id}/delivery-fee`, form, axiosConfig)
			.then((res) => {
				if (res.status === 200) {
					setPrice(res.data.result.price);
					setBottomSheetOngkir(false);
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat');
						}
					}
				}
			});
	};

	const getCrossSellSlider = (url, infinite) => {
		Axios.get(url)
			.then((res) => {
				if (res.status === 200 && isLoadingScroll !== null) {
					let Newdata;
					if (!infinite) {
						Newdata = isCrossSellSlider.data.concat(res.data.result.data);
					} else {
						Newdata = res.data.result.data;
					}

					setCrossSellSlider({
						data: Newdata,
						next_url: `${res.data.result.path}?brand_id=${data.product.brand_types[0].brand_id}&product_id=${data.product.id}&limit=6&page=${isCrossSellSlider.pageNumber}`,
						pageNumber: isCrossSellSlider.pageNumber + 1,
					});

					setLoadingScroll(res.data.result.next_page_url);

					setInfiniteLoad(true);
				}
			})
			.catch((err) => {
				if (err) {
					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat ya, tunggu 1 menit untuk kembali normal.');
						}
					}
				}
			});
	};

	useEffect(() => {
		if (data) {
			let url = `${process.env.REACT_APP_API_ENDPOINT}products?brand_id=${data.product.brand_types[0].brand_id}&product_id=${data.product.id}&limit=6`;

			getCrossSellSlider(url);
		}
	}, [data]);

	const infiniteScroll = (event) => {
		if (isCrossSellSlider.next_url !== null && isInfiniteLoad) {
			const target = event.target;
			const next_page_url = isCrossSellSlider.next_url;

			if (target.scrollHeight - target.scrollTop === target.clientHeight) {
				getCrossSellSlider(next_page_url, false);
				setInfiniteLoad(false);
			}
		}
	};

	// console.log(isCrossSellSlider);

	const selectDataArea = (e) => {
		setLoadArea(true);

		const id = e.target.getAttribute('id');
		const name = e.target.getAttribute('name');
		const value = e.target.getAttribute('value');
		setValueSearch('');

		if (name === 'province') {
			setValueProvince(name);
			setSelectNameArea(value);
			getDataArea(`https://api.ditoko.com/api/v1/cities/${id}`);
		} else if (name === 'city') {
			setValueCity(name);
			setSelectNameArea(value);
			getDataArea(`https://api.ditoko.com/api/v1/sub-districts/${id}`);
		} else if (name === 'subdistrict') {
			setValueSubdistrict(name);
			setSelectNameArea(value);
			getPriceByLocation(id);

			setValueCity(null);
			setValueProvince(null);
			setValueSubdistrict(null);
		}
	};

	const handleStock = (e) => {
		const getName = e.target.name;
		// console.log(getName);
		setStock((prevState) => ({
			...prevState,
			isActive: Number(getName),
		}));
	};

	const selectBrand = ({ product_brand_type_color, brand_type, brand: brand_, stock, product_id, SelectImg, selectColor, isColor, selectImages }) => {
		setBrand((prev) => ({
			...prev,
			chosenSize: { brand_type, brand: brand_ },
			categoryId: brand_.category_id,
			brandId: brand_type.brand_id,
			stockProduct: stock,
			product_id: product_id,
			SelectImg: SelectImg,
			productColor: product_brand_type_color,
			selectColor: selectColor,
			isColor: isColor,
			selectImages: selectImages,
		}));
	};

	const handleDirectHome = () => {
		// router.push('/');
	};

	useEffect(() => {
		localStorage.setItem('switchLocation', true);
		return () => localStorage.removeItem('switchLocation');
	}, []);

	// console.log(`dari console`, isCrossSellSlider);
	// console.log(`dari console`, isValueProvince);
	// console.log(`dari console`, isValueSubdistrict);
	// console.log(params.product);
	return (
		<>
			<Navigation onScroll={infiniteScroll} onTouchMove={infiniteScroll} setSwitchLocation={setSwitchLocation}>
				<>
					{isPagesLoad ? (
						<LazyProduct />
					) : (
						<>
							{data && (
								<>
									<ModalSwitchLocation isSwitchLocation={isSwitchLocation} setSwitchLocation={setSwitchLocation} />
									<Overlay onClick={() => setBottomSheetBuy(false)} active={isBottomSheetBuy} />

									<Overlay onClick={handleCloseBsOngkir} active={isBottomSheetOngkir} />
									<BottomSheetOngkir
										isDataArea={isDataArea}
										isBottomSheetOngkir={isBottomSheetOngkir}
										setBottomSheetOngkir={setBottomSheetOngkir}
										selectDataArea={selectDataArea}
										isValueCity={isValueCity}
										isValueProvince={isValueProvince}
										isValueSubdistrict={isValueSubdistrict}
										isSelectNameArea={isSelectNameArea}
										isValueSearch={isValueSearch}
										setValueSearch={setValueSearch}
										isLoadArea={isLoadArea}
										setHandleFocus={setHandleFocus}
										isHandleFocus={isHandleFocus}
										handleCloseBsOngkir={handleCloseBsOngkir}
										handleMinimize={handleMinimize}
									/>
									<Seo params={params} />
									<div ref={containerElm} className='ditoko__p0'>
										<Suspense fallback={<LazyProduct />}>
											<div className='ditoko__p0'>
												<SliderProductImages dataImg={data} />

												<TitleProduct data={data} />
												<div className='ditoko__borderBottomBlack1 ditoko__ml15 ditoko__mr15' />
											</div>
										</Suspense>

										<Suspense fallback={<LazyContent />}>
											<Section>
												<H1 css='ditoko__bold'>Promo</H1>
												<div
													className='ditoko__p0'
													dangerouslySetInnerHTML={{
														__html: data.product.description,
													}}
												/>
												<div className='ditoko__borderBottomBlack1 ditoko__mt10 ditoko__mb5' />
												<BottomSheet
													productPage={true}
													onBuyNowClick={handleClickBuyButton}
													data={data}
													onTypeClick={selectBrand}
													brand={brand}
													isBottomSheetBuy={isBottomSheetBuy}
													setBottomSheetBuy={setBottomSheetBuy}
													loading={loading}
													handleColor={setBrand}
													dataShare={dataShare}
												/>
											</Section>
										</Suspense>

										<Suspense fallback={<LazyContent />}>
											<Section>
												<div className='ditoko__pt0 ditoko__borderBottomBlack1 '>
													{isStock.dataStock.length > 0 ? (
														<>
															<TabelStock isStock={isStock} handleStock={handleStock} labelTitle='Lokasi Produk' />
															<div className='ditoko__borderBottomBlack1  ' />

															<H1 css='ditoko__mt15 ditoko__bold'>Cek Ongkir</H1>
															<Ongkir isSelectNameArea={isSelectNameArea} isPrice={isPrice} viewOngkir={viewOngkir} />
														</>
													) : (
														<LazyContent />
													)}
												</div>

												<div className='ditoko__pt15'>
													<H1 css='ditoko__mb10 ditoko__bold'>Deskripsi</H1>
													<div
														dangerouslySetInnerHTML={{
															__html: data.product.long_description,
														}}
													/>

													<div className='ditoko__borderBottomBlack1 ditoko__mt10 ditoko__mb5' />

													<BottomSheet
														productPage={true}
														onBuyNowClick={handleClickBuyButton}
														data={data}
														onTypeClick={selectBrand}
														brand={brand}
														isBottomSheetBuy={isBottomSheetBuy}
														setBottomSheetBuy={setBottomSheetBuy}
														loading={loading}
														handleColor={setBrand}
														dataShare={dataShare}
													/>
												</div>
											</Section>
										</Suspense>
										<Suspense fallback={<LazyContent />}>
											<Section>
												<H1 css='ditoko__bold'>Direkomendasi</H1>
												<div className='ditoko__flex ditoko__column'>
													<div className='ditoko__flex ditoko__flexRow'>
														{data.influencer !== '' ? <P css='ditoko__textColorBlackMedium ditoko__mt15'>{data.influencer}</P> : <P css='ditoko__textColorBlackMedium'>-</P>}
													</div>
												</div>
											</Section>
											<div className='ditoko__p10 ditoko__pt0'>
												<H1 css='ditoko__ml5 ditoko__mt15 ditoko__mb15 ditoko__bold'>{data.product.brand_types[0].brand.brand_name}</H1>
												{isCrossSellSlider.data.length > 0 ? (
													<div className=' ditoko__mt15'>
														<div className='ditoko__gridTwo'>
															{isCrossSellSlider.data.map((items, i) => {
																let dailyDealPrice;
																if (items.daily_deal !== null) {
																	dailyDealPrice = items.daily_deal.price;
																} else {
																	dailyDealPrice = items.price;
																}

																return (
																	<Link key={i} to={`/${items.brand_types[0].brand.slug}/${items.slug}`}>
																		<div className='ditoko__m5'>
																			<CardProduct
																				grid
																				bigCard
																				desc={items.short_description}
																				name={items.name}
																				price={addCommas(dailyDealPrice)}
																				dailyDealPrice={0}
																				imageUrl={process.env.REACT_APP_STATIC_FILES_URL + items.images[0].image_url}
																			/>
																		</div>
																	</Link>
																);
															})}
														</div>
														<div className={`ditoko__loadingContent ${isLoadingScroll !== null ? 'ditoko__block' : 'ditoko__hidden'}`} />
													</div>
												) : (
													<LazyContent />
												)}
											</div>
										</Suspense>
									</div>
								</>
							)}
						</>
					)}
				</>

				{dataError && (
					<FlexColumnItemsContentCenter css='ditoko__fullHeightPercent'>
						<H4 css='ditoko__my10'>Produk yang dicari tidak ditemukan</H4>

						<Button heightAuto size='medium' onClick={() => handleDirectHome()}>
							Mulai Belanja
						</Button>
					</FlexColumnItemsContentCenter>
				)}
			</Navigation>
		</>
	);
}
