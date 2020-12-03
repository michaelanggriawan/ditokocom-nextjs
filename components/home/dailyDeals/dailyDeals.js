import React, { useState, useEffect } from 'react';
import { H1, H4, P, H3 } from '../../typography/typography';
import { SliderDailyDeals } from '../../slider/slider';
import { addCommas } from '../../../helpers';
import Link from 'next/link';
import moment from 'moment';
import Img from 'react-cool-img';

export default function DailyDeals({ data, setContentLoad, title, subCategory }) {
	const [isHour, setHour] = useState(0);
	const [isMinute, setMinute] = useState(0);
	const [isSecond, setSecond] = useState(0);

	const tommorow = moment().add(1, 'days').format('MMM DD YYYY');

	const isCounter = () => {
		const finishDate = new Date(`${tommorow} 04:00:00`).getTime();
		const startDate = new Date().getTime();
		const difference = finishDate - startDate;
		// const isDay = Math.floor(difference / (1000 * 60 * 60 * 24));

		const myHour = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		setHour(myHour);

		const myMinute = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		setMinute(myMinute);

		const mySecond = Math.floor((difference % (1000 * 60)) / 1000);
		setSecond(mySecond);
	};

	function minTwoDigits(n) {
		return (n < 10 ? '0' : '') + n;
	}

	useEffect(() => {
		let timer = setInterval(() => {
			isCounter();
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [isHour]);

	return (
		<div className={`ditoko__cardDailyDeals ${data.length > 0 ? `block` : 'hidden'}`}>
			{subCategory ? title !== undefined ? <H1 css='ditoko__ml15 ditoko__bold'>Promo {title}</H1> : '' : ''}

			<div className='ditoko__flex ditoko__between'>
				<H1 css={` ditoko__mb15 ditoko__pl15 ${subCategory ? 'ditoko__promoCount' : 'ditoko__promoTextCounter'}`}>
					Promo Berakhir{' '}
					<span className='ditoko__textPrimary'>
						{minTwoDigits(isHour)}:{minTwoDigits(isMinute)}:{minTwoDigits(isSecond)}{' '}
					</span>{' '}
				</H1>
			</div>
			{subCategory ? <SliderDailyDeals disableAll={true} dataDailyDeals={data} setContentLoad={setContentLoad} /> : <SliderDailyDeals dataDailyDeals={data} setContentLoad={setContentLoad} />}
		</div>
	);
}

export function CardDailyProduct({ imgProduct, titleProduct, normalPrice, discountPrice, link, dataKey, setContentLoad }) {
	return (
		<div key={dataKey} className='ditoko__cardProductDaily ditoko__pointer'>
			<Link href={link + '/' + titleProduct.toLowerCase()}>
				<a>
					<div className='ditoko__imgProductDaily skeleton'>
						<Img cache loading='lazy' onLoad={() => setContentLoad(true)} src={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + imgProduct} alt='ditoko.com' className='ditoko__fadeIn' />
					</div>
					<div className='ditoko__detailProductDaily'>
						<H3 css='ditoko__nameProductDailyDeals ditoko__bold'>{titleProduct}</H3>
						{/* <P css='ditoko__fontSmall ditoko__dailyDealsTextDiscount'>Celana Panjang Pria</P> */}
						<div className='ditoko__priceProductDeals'>
							<P css='ditoko__linethrough ditoko__dailyDealsTextDiscount'>{addCommas(normalPrice)}</P>
							<H3 css='ditoko__textPrimary ditoko__mr10 ditoko__proceProductDailyDeals'>{addCommas(discountPrice)}</H3>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}
