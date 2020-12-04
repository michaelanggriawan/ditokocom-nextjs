import React, { useState } from 'react';
import { H1 } from '../../typography/typography';
import Img from 'react-cool-img';

export default function BrandHome({ isBrandHome }) {
	const [isLoadImg, setImgLoad] = useState(false);

	const handleClick = (url) => {
		window.location.href = url;
	};
	return (
		<div className='ditoko__pt30'>
			<H1 css={`ditoko__ml15 ditoko__bold ditoko__mb10 ${isBrandHome.length > 0 ? 'ditoko__block' : 'ditoko__hidden'}`}>Brand</H1>
			<div className='ditoko__sliderBrandHome'>
				<div className='ditoko__brandHome'>
					{isBrandHome.map((items, i) => {
						return (
							<span className='ditoko__pointer' onClick={() => handleClick(items.slug)} key={i}>
								<div className='ditoko__cardBrandHome'>
									<div className={`ditoko__imgBrandHome ${isLoadImg ? '' : 'ditoko__imgBrandHomeLoad skeleton'}`}>
										<Img
											cache
											loading='lazy'
											onLoad={() => setImgLoad(true)}
											className='ditoko__widthFullPercent ditoko__fadeIn'
											src={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + items.icon_url}
											alt={items.brand_name}
										/>
									</div>
									<p>{items.brand_name}</p>
								</div>
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
