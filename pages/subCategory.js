import { useEffect, useState, useCallback, useRef, Suspense, lazy } from 'react';
import { useProgress } from '../custom-hooks/index';

import Axios from 'axios';
import { handleInfiniteScroll, addCommas } from '../helpers/index';

// new
import { LazyHome, LazyContentHome, LazyBanner, LazyDailyDeals } from '../components/lazyLoad/index';
import { H1 } from '../components/typography/typography';
import BrandHome from '../components/home/brandHome/brandHome';
import ActiveHome from '../components/home/activeHome/activeHome';
import { useRouter } from 'next/router';

import { Navigation } from '../components/navigation/navigation';
import { MetaHome } from '../meta/metaHome';

const CardProduct = lazy(() => import('../components/card/card'));
const DailyDeals = lazy(() => import('../components/home/dailyDeals/dailyDeals'));
const BrandCategory = lazy(() => import('../components/home/brandCategory/brandCategory'));
const SliderBannerHomepage = lazy(() => import('../components/slider/slider'));

export default function Home() {
	const router = useRouter();
	const { subCategory } = router.query;
	const { progress, handleProgress } = useProgress();
	const containerElm = useRef(null);
	const [products, setProducts] = useState({ data: [], brandName: '' });

	const [isBanner, setBanner] = useState([]);
	const [isDailyDeals, setDailyDeals] = useState([]);
	const [isBrandPage, setBrandPage] = useState([]);
	const [isBrandHome, setBrandHome] = useState([]);
	const [isActiveHome, setActiveHome] = useState([]);
	const [search, setSearch] = useState('');
	const [isPagesLoad, setPagesLoad] = useState(false);
	const [isContentLoad, setContentLoad] = useState(false);
	const [isDailyDealsLoad, setDailyDealsLoad] = useState(false);
	const [isEnable, setEnable] = useState(false);

	// const search = window.location.search;
	const params = new URLSearchParams(search);
	const getR = params.get('r');
	if (getR !== null) {
		localStorage.setItem('r', getR);
	}

	useEffect(() => {
		setSearch(window.location.search);
	}, []);

	const getProducts = useCallback((endpoint, isInfinite) => {
		handleProgress.start();
		Axios.get(endpoint)
			.then((res) => {
				console.log(res)
				const { result } = res.data;
				setProducts((prev) => ({
					brandName: result.data[0].product && result.data[0].brand.brand_name,
					...(isInfinite
						? {
								...result,
								data: [...prev.data, ...result.data],
						  }
						: result),
				}));
				setPagesLoad(true);
				handleProgress.end();
			})
			.catch((err) => {
				if (err) {
					handleProgress.error();

					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat pindah halaman');
						}
					}
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => () => {
			const { current } = containerElm;
			if (current) {
				current.parentElement.onscroll = null;
			}
		},
		[]
	);

	useEffect(() => {
		const { brandName } = products;
		let title;
		if (brandName) {
			title = 'Kategori - ' + brandName;
		} else {
			title = 'Jual Beli Online | ditoko.com';
		}
		document.title = title;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products.brandName]);

	useEffect(() => {
		if (isContentLoad) {
			const endpoint = subCategory ? `products/${subCategory}` : 'favorite/products';
			getProducts('https://api.ditoko.com/api/v1/' + endpoint);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isContentLoad && subCategory]);

	if (containerElm.current) {
		const { next_page_url } = products;
		handleInfiniteScroll(containerElm.current.parentElement, () => {
			if (!progress.isLoading && next_page_url) {
				getProducts(next_page_url, true);
			}
		});
	}

	const getDataHome = () => {
		let urlHome = `https://api.ditoko.com/api/v1/page/home`;
		Axios.get(urlHome)
			.then((res) => {
				console.log('res', res);
				if (res.status === 200) {
					// console.log(res.data.result);
					if (res.data.result.banner_promotion !== undefined || res.data.result.banner_promotion !== null) {
						setBanner(res.data.result.banner_promotion);
					}
					if (res.data.result.daily_deal !== undefined || res.data.result.daily_deal !== null) {
						setDailyDeals(res.data.result.daily_deal);
						setEnable(true);
					}
					if (res.data.result.brand !== undefined || res.data.result.brand !== null) {
						setBrandHome(res.data.result.brand);
					}
					if (res.data.result.active_brand !== undefined || res.data.result.active_brand !== null) {
						setActiveHome(res.data.result.active_brand);
					}
				}
			})
			.catch((err) => {
				if (err) {
					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat pindah halaman');
						}
					}
				}
			});
	};

	const getSubBrandList = () => {
		let url = `https://api.ditoko.com/api/v1/page/brand/${products.data[0].brand_id}`;
		Axios.get(url)
			.then((res) => {
				if (res.status === 200) {
					let data = res.data.result.daily_deal;

					if (data.length > 0) {
						setDailyDeals(data);
						setEnable(true);
						setContentLoad(true);
						setDailyDealsLoad(true);
					} else {
						setEnable(false);
						setDailyDealsLoad(true);
						setContentLoad(true);
					}

					let dataSubBrand = res.data.result.sub_brand;
					if (dataSubBrand !== null) {
						setBrandPage(dataSubBrand);
					}
				} else {
					setEnable(false);
					setDailyDealsLoad(true);
					setContentLoad(true);
				}
			})
			.catch((err) => {
				if (err) {
					setEnable(false);
					setDailyDealsLoad(true);
					setContentLoad(true);

					if (err.response) {
						if (err.response.status === 429) {
							console.log(err.response.status);
							alert('Jangan terlalu cepat pindah halaman');
						}
					}
				}
			});
	};

	useEffect(() => {
		if (!subCategory) {
			getDataHome();
		}
	}, [!subCategory]);

	useEffect(() => {
		if (subCategory && products.data.length > 0) {
			getSubBrandList();
		}
	}, [subCategory && products.data.length > 0]);

	useEffect(() => {
		setContentLoad(true);
	}, []);

	return (
		<Navigation>
			<MetaHome />
			{!isPagesLoad ? (
				<div className='ditoko__loadingCenter' />
			) : (
				<>
					{!subCategory && (
						<div className='ditoko__p15 ditoko__pl0 ditoko__pr0 ditoko__pb0'>
							<Suspense fallback={<LazyBanner />}>
								<SliderBannerHomepage dataBanner={isBanner} setDailyDealsLoad={setDailyDealsLoad} />
							</Suspense>
						</div>
					)}

					{isEnable ? (
						isDailyDeals.length > 0 ? (
							isDailyDealsLoad ? (
								<Suspense fallback={<LazyDailyDeals />}>
									<div className={`${!subCategory ? 'ditoko__mt10 ditoko__hidden' : ''} `}>
										<BrandCategory title={products.brandName} data={isBrandPage} />
									</div>
									<div className='ditoko__p15 ditoko__pt0 ditoko__pl0 ditoko__pr0 ditoko__pb0'>
										<DailyDeals subCategory={subCategory} title={products.brandName} data={isDailyDeals} setContentLoad={setContentLoad} />
									</div>
								</Suspense>
							) : (
								<LazyDailyDeals />
							)
						) : (
							<LazyDailyDeals />
						)
					) : (
						''
					)}

					{isContentLoad ? (
						<Suspense fallback={<LazyContentHome />}>
							<section ref={containerElm}>
								<div className={`ditoko__mb0  ditoko__mt0 ${subCategory ? 'ditoko__hidden' : 'ditoko__block'}`}>
									<BrandHome isBrandHome={isBrandHome} />
								</div>

								<div className={`ditoko__mb0  ditoko__mt0 ${subCategory ? 'ditoko__hidden' : 'ditoko__block'}`}>
									<ActiveHome isActiveHome={isActiveHome} />
								</div>

								<div className='ditoko__p15 ditoko__pt0'>
									{products.data.length > 0 && (
										<H1
											css={`
												${isDailyDeals.length > 0 ? 'ditoko__mt30 ' : 'ditoko__mt30'} ditoko__mb15 ditoko__bold
											`}
										>
											{subCategory ? `${products.brandName === undefined ? '' : `${products.brandName}`}` : 'Produk favorit'}
										</H1>
									)}

									<DataCard data={products.data} subCategory={subCategory} />
								</div>
								{products.data.length > 0 && <div className={`ditoko__loadingContent ${products.next_page_url !== null ? 'ditoko__block' : 'ditoko__hidden'}`} />}
							</section>
						</Suspense>
					) : (
						<LazyContentHome />
					)}
				</>
			)}
		</Navigation>
	);
}

function DataCard({ data, subCategory }) {
	return data.map((elm) => {
		const product = elm.product || elm;
		let dailyDealPrice;
		if (product.daily_deal === null) {
			dailyDealPrice = 0;
		} else {
			dailyDealPrice = product.daily_deal.price;
		}

		return (
			<Suspense key={product.id.toString()} fallback={<LazyContentHome />}>
				<CardProduct
					bigCard
					dailyDealPrice={dailyDealPrice}
					desc={product.short_description}
					key={product.id.toString()}
					name={product.name}
					price={addCommas(product.price)}
					link={`${subCategory || product.slug.replace(/[0-9]/g, '')}/${product.slug}`}
					imageUrl={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + product.images[0].image_url}
				/>
			</Suspense>
		);
	});
}
