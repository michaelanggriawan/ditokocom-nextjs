import React from 'react';
import { H1, H4 } from '../../typography/typography';
// import Img from 'react-cool-img';
import Link from 'next/link';

export default function BrandCategory({ title, data }) {
	return (
		<>
			{data !== null && (
				<div className={`ditoko__mt20 ditoko__cardBrandCategory ${data.length > 0 ? 'ditoko__block' : 'ditoko__hidden'}`}>
					<div className='ditoko__ml15'>
						<H1 css='ditoko__bold'>{title}</H1>
						<H4 css='ditoko__lineHeight1'>Kategori</H4>
					</div>

					{/* <SliderBrandCategory dataDailyDeals={data} /> */}

					<div className='ditoko__sliderBrandCategory ditoko__pb0'>
						{/* <div className='ditoko__brandHome'> */}
						{data.map((items, i) => {
							return (
								<Link href={`/s/${items.slug}`} className='ditoko__pointer' key={i}>
									<a>
										<div className='ditoko__cardBrandCategorySlider'>
											{/* <div className={`ditoko__imgBrandHome skeleton`}> */}
											{/* <Img
                          cache
                          loading="lazy"
                          className="ditoko__widthFullPercent ditoko__fadeIn"
                          src={
                            process.env.REACT_APP_STATIC_FILES_URL +
                            items.icon_url
                          }
                          alt={items.name}
                        /> */}
											{/* </div> */}
											<p>{items.name}</p>
										</div>
									</a>
								</Link>
							);
						})}
						{/* </div> */}
					</div>
				</div>
			)}
		</>
	);
}
