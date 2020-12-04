import React, { Suspense, useEffect } from 'react';
import Slider from 'react-slick';
import Img from 'react-cool-img';

import { CardDailyProduct } from '../home/dailyDeals/dailyDeals';
import Link from 'next/link';
import { P } from '../typography/typography';
import { LazyCategory, LazyBanner, LazyDailyDeals } from '../lazyLoad/index';

export default function SliderBannerHomepage({ dataBanner, setDailyDealsLoad }) {
	const handleClick = (url) => {
		window.location.href = url;
	};

	return (
		<Suspense fallback={<LazyBanner />}>
			<div className={`${dataBanner.length > 0 ? 'ditoko__cardBannerHome ditoko__fadeIn' : 'ditoko__cardBannerHomeLoad ditoko__fadeIn'} `}>
				<div className='ditoko__bannerHome'>
					{dataBanner.map((items, i) => {
						return (
							<Img
								key={i}
								onClick={() => handleClick(items.redirect_link)}
								cache
								loading='lazy'
								onLoad={() => setDailyDealsLoad(true)}
								src={`https://ditoko.oss-ap-southeast-5.aliyuncs.com/${items.image_url}`}
								alt={items.title}
								className='ditoko__widthFullPercent ditoko__fadeIn skeleton'
							/>
						);
					})}
				</div>
			</div>
		</Suspense>
	);
}

export function SliderDailyDeals({ dataDailyDeals, setContentLoad, subBrand, disableAll }) {
	useEffect(() => {
		if (dataDailyDeals.length === 0) {
			setContentLoad(true);
		}
	}, [dataDailyDeals]);
	// console.log(dataDailyDeals);
	return (
		<Suspense fallback={<LazyDailyDeals />}>
			<div className={`${dataDailyDeals.length > 0 ? 'ditoko__sliderProductDaily ditoko__fadeIn' : 'ditoko__sliderProductDailyActive'} `}>
				<div className={`${subBrand === true ? 'ditoko__subBrandSlider' : 'ditoko__dailyDealsSlider'} `}>
					{dataDailyDeals.map((items, i) => {
						let link;
						if (subBrand === true) {
							link = `/${items.product.sub_brand.brand.slug}`;
						} else {
							link = items.product.brand_types[0].brand.slug;
						}
						return (
							<picture key={i}>
								<CardDailyProduct
									setContentLoad={setContentLoad}
									dataKey={i}
									imgProduct={items.product.images[0].image_url}
									titleProduct={items.product.name}
									normalPrice={items.product.price}
									discountPrice={items.price}
									link={link}
								/>
							</picture>
						);
					})}
					{disableAll !== true && (
						<div className={`ditoko__dailyDealsAll ${dataDailyDeals.length > 0 ? 'ditoko__block' : 'ditoko__hidden'}`}>
							<Link href='/promo'>
								<a>
									<div className='ditoko__dailyDealsTextAll'>
										{/* <div className='ditoko__flex'> */}
										{/* <div className='ditoko__p0'>
											<P css='ditoko__textPrimary ditoko__fontSmall'>Lihat</P>
											<P css='ditoko__textPrimary ditoko__fontSmall'> Semua</P>
										</div> */}
										<div className='ditoko__dailyArrowAll'>
											<img src='/images/arrowShowAll.png' alt='ditoko.com' />
											<img src='/images/arrowShowAll.png' alt='ditoko.com' />
										</div>
										{/* </div> */}
									</div>
									<div className='ditoko__textDailyDealStyle'>
										<p>Lihat Semua</p>
									</div>
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</Suspense>
	);
}

export function SliderBrandCategory({ dataDailyDeals }) {
	const settingSliderBrandCategory = {
		dots: false,
		infinite: false,
		speed: 500,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	return (
		<Suspense fallback={<LazyDailyDeals />}>
			<div className={`${dataDailyDeals.length > 0 ? 'ditoko__sliderProductDaily ditoko__fadeIn' : <LazyDailyDeals />} `}>
				<Slider {...settingSliderBrandCategory}>
					{dataDailyDeals.map((items, i) => {
						return (
							<Link key={i} href={`/s/${items.slug.toLowerCase()}`}>
								<div className='ditoko__cardSliderBrandCategory'>
									<div className='ditoko__imgSliderBrandCategory'>
										<img src={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + items.icon_url} alt='ditoko.com' />
									</div>
									<div className='ditoko__deskSliderBrandPage'>
										<p> {items.name}</p>
									</div>
								</div>
							</Link>
						);
					})}
				</Slider>
			</div>
		</Suspense>
	);
}

export function SliderCategory({ dataCategory, setBannerLoad }) {
	useEffect(() => {
		setBannerLoad(true);
	});

	return (
		<Suspense fallback={<LazyCategory />}>
			<div className={`${dataCategory.length > 0 ? 'ditoko__cardCategorySlider ditoko__fadeIn' : 'ditoko__cardCategorySliderLoad skeleton'}  `}>
				<div className='ditoko__categorySliderHome'>
					{dataCategory.map((items, i) => {
						return (
							<Link key={i} href={items.slug}>
								<P css='ditoko__textPrimary ditoko__pb10 ditoko__mr10'>{items.brand_name}</P>
							</Link>
						);
					})}
				</div>
			</div>
		</Suspense>
	);
}

export function NormalSlider({ children, css }) {
	return <div className={`ditoko__normalSlide ${css}`}>{children}</div>;
}

// export default { SliderProductImages, SliderBannerHomepage };
