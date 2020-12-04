import React from 'react';
import { H1, H3, H4, P } from '../../typography/typography';
import { addCommas } from '../../../helpers';
import Link from 'next/link';
import Img from 'react-cool-img';

export default function ActiveHome({ isActiveHome }) {
	return (
		<div className='ditoko__p0'>
			<div className='ditoko__mb0'>
				{isActiveHome.map((title, i) => {
					return (
						<span key={i}>
							<H1 css='ditoko__pl15 ditoko__mb15 ditoko__mt30 ditoko__bold'>{title.brand_name}</H1>

							<div key={i} className='ditoko__cardActiveHome'>
								{title.product_brand_type.map((items, i) => {
									return (
										<div key={i} className='ditoko__cardSliderActive ditoko__p0'>
											<Link href={`${title.slug}/${items.product.name.toLowerCase()}`}>
												<a>
													<div className='ditoko__imgActiveHome skeleton'>
														<Img cache loading='lazy' src={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + items.product.images[0].image_url} alt='ditoko.com' className='ditoko__fadeIn skeleton' />
													</div>
													<div className='ditoko__detailProductDaily'>
														<H3 css='ditoko__ActiveHomeProductName ditoko__bold ditoko__mt15'>{items.product.name}</H3>
														<P css='ditoko__fontSmall ditoko__dailyDealsTextDiscount ditoko__descActiveHomeEllipsis'>{items.product.short_description}</P>

														<div className='ditoko__priceProductDeals'>
															<H3 css='ditoko__textPrimary ditoko__ActiveHomeProductPrice'>
																{items.product.daily_deal !== null ? addCommas(items.product.daily_deal.price) : addCommas(items.product.price)}
															</H3>
														</div>
													</div>
												</a>
											</Link>
										</div>
									);
								})}
								<Link href={title.slug}>
									<a>
										<div className={`ditoko__activeHomesAll`}>
											<div className='ditoko__activeHomeTextAll'>
												{/* <div className='ditoko__positionTextIcon'> */}
												{/* <div className='ditoko__p0'>
													<P css='ditoko__textPrimary ditoko__fontSmall'>Lihat</P>
													<P css='ditoko__textPrimary ditoko__fontSmall'> Semuax</P>
												</div> */}
												<div className='ditoko__ActiveArrowAll'>
													<img src='/images/arrowShowAll.png' alt='ditoko.com' />
													<img src='/images/arrowShowAll.png' alt='ditoko.com' />
												</div>

												{/* </div> */}
											</div>
										</div>
										<div className='ditoko__sliderTextAllActive'>
											<p>Lihat Semua</p>
										</div>
									</a>
								</Link>
							</div>
						</span>
					);
				})}
			</div>
		</div>
	);
}
