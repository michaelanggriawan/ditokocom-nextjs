import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Button } from '../../button/button';
import { NormalSlider } from '../../Slider/Slider';
import { addCommas } from '../../../helpers';

export function BottomSheet({
	productPage,
	onBuyNowClick,
	onTypeClick,
	data,
	brand,
	loading,
	handleColor,
	dataShare,
	isBottomSheetBuy,
	setBottomSheetBuy,
}) {
	const token = localStorage.getItem('token');

	function handleShare() {
		const urlShare = `${process.env.REACT_APP_API_ENDPOINT}products/share`;
		const form = {
			product_id: dataShare.product_id,
			r: dataShare.phone,
		};

		const payload = {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		Axios.post(urlShare, form, payload).then((res) => {
			if (res.data.code === 200) {
				// console.log(res);
				const messageWhatsapp = `Cek ditoko.com, Lagi Promo Beli 2 Dapet 3 Nih. Klik linknya. \n \n ${res.data.result}`;
				const whatsappApi = `https://api.whatsapp.com/send?text=${messageWhatsapp}`;
				window.open(whatsappApi, `_blank`);
			}
		});
	}

	// console.log(data);
	let getPriceCommission;
	if (data.daily_deal === null) {
		getPriceCommission = data.product.price;
	} else {
		getPriceCommission = data.daily_deal.price;
	}
	const newPrice = (Number(getPriceCommission) * 5) / 100;

	// console.log(newPrice);
	return (
		<div
			className={`${isBottomSheetBuy ? 'ditoko__modalActiveBottomSheet' : ''} ditoko__static640 ditoko__x640 ditoko__bottom640  ditoko__cardBS`}
		>
			<div className={`ditoko__contentBS ${isBottomSheetBuy ? 'ditoko__block' : 'ditoko__hidden'}`}>
				<div className={`ditoko__mxAuto ditoko__bgWhite `}>
					{productPage === true && data !== null ? (
						<>
							<div className='ditoko__p10 ditoko__pb0 ditoko__fontSmall ditoko__reguler'>Pilih Ukuran</div>

							<NormalSlider css='ditoko__p10 ditoko__pt5'>
								{data.product.brand_types.map(({ product_brand_type_color, brand_type, ...rest }, i) => {
									return (
										<span key={i}>
											<Button
												size='medium'
												heightAuto
												styled={false}
												css='ditoko__mr5 ditoko__mb5 '
												nonActive={!(brand.chosenSize.brand_type.id === brand_type.id)}
												onClick={() =>
													onTypeClick({
														product_brand_type_color,
														brand_type,
														...rest,
													})
												}
											>
												{brand_type.type_name}
											</Button>
										</span>
									);
								})}
							</NormalSlider>
						</>
					) : null}
				</div>
				<div
					className={`ditoko__cardColorBS ditoko__pt0 ${
						brand.chosenSize.brand_type.type_name !== undefined ? 'ditoko__block' : 'ditoko__hidden'
					}`}
				>
					<div className='ditoko__px10 ditoko__fontSmall ditoko__reguler'>Pilih Warna</div>
					<div className='ditoko__p10 ditoko__pt5'>
						<div className='ditoko__flex'>
							{brand.productColor.map((items, i) => {
								return items.stock !== 0 ? (
									<span key={i}>
										<Button
											heightAuto
											name={items.color.name}
											onClick={() =>
												handleColor({
													...brand,
													selectColor: items.id,
													isColor: items.color.name,
													selectImages: items.color.image_url,
												})
											}
											nonActive={!(brand.selectColor === items.id)}
											css={`ditoko__mr5`}
											size='medium'
										>
											{items.color.name}
										</Button>
									</span>
								) : (
									''
								);
							})}
						</div>
					</div>
				</div>
				<div className='ditoko__footerBS'>
					<Button
						size='medium'
						block
						css='ditoko__btnBuyProductPage'
						disabled={brand.chosenSize.brand_type.type_name === undefined || brand.selectColor === undefined || loading}
						onClick={onBuyNowClick}
					>
						{loading ? 'Loading' : 'Beli Sekarang'}
					</Button>
				</div>
			</div>

			<div className={`ditoko__cardBottomFix ${isBottomSheetBuy ? 'ditoko__hidden' : 'ditoko__block'}`}>
				<div className='ditoko__flex'>
					{token ? (
						<Button
							size='medium'
							onClick={() => handleShare()}
							css='ditoko__mr5 ditoko__btnGreen  ditoko__itemsCenter ditoko__justifyCenter ditoko__width60Percent ditoko__commisionInProductPage'
						>
							<div className='ditoko__flex ditoko__itemsCenter ditoko__justifyCenter'>
								{/* <img className='ditoko__mr5 ditoko__iconWhatsappProduct' src={WhatsappIcon} alt='ditoko.com' /> */}
								<p className='ditoko__fontSmall ditoko__commisionInProductPage'>Komisi</p>
							</div>

							<p className='ditoko__font12 ditoko__reguler ditoko__unuppercase ditoko__commisionInProductPage'>
								{addCommas(newPrice)} / Jual
							</p>
						</Button>
					) : (
						''
					)}
					<Button block size='medium' css='ditoko__btnBuyProductPage' onClick={setBottomSheetBuy} disabled={loading}>
						{loading ? 'Loading' : 'Beli Sekarang'}
					</Button>
				</div>
			</div>
		</div>
	);
}

BottomSheet.propTypes = {
	onBuyNowClick: PropTypes.func.isRequired,
};
