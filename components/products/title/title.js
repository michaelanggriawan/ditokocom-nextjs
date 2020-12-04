import React from 'react';
import { H1 } from '../../typography/typography';
import { addCommas, calculateDiscountPercentage } from '../../../helpers/index';

export default function Title({ data, css }) {
	return (
		<div className={`ditoko__titleProduct ${css}`}>
			<div className='ditoko__block'>
				<H1
					css={`ditoko__bold ditoko__mb10 ditoko__selfCenter ditoko__fontBig 
          ${data.product.daily_deal !== null ? 'ditoko__titleProductSmall' : ''}`}
				>
					{data.product.name}
				</H1>
				<div className='ditoko__descAndPriceProductPage'>
					<p className='ditoko__mb8 ditoko__reguler ditoko__textColorGrey ditoko__fontSmall'>{data.product.short_description}</p>
					<div className='ditoko__flex'>
						<h3 className=' ditoko__textPrimary ditoko__priceProduct'>
							{addCommas(data.daily_deal !== null ? data.daily_deal.price : data.product.price)}
						</h3>
						{data.daily_deal !== null && (
							<div className='ditoko__dailyDeal'>
								<span className='ditoko__dailyDealPrice ditoko__reguler ditoko__textColorGrey ditoko__fontSmall'>
									{addCommas(data.product.price, 'Rp', false)}
								</span>
								<span className='ditoko__reguler ditoko__textColorGrey ditoko__fontSmall'>,- </span>
								<span className='ditoko__mx5 ditoko__fontSmall ditoko__textColorGrey ditoko__reguler ditoko__textColorGrey ditoko__fontSmall'>
									[-
									{calculateDiscountPercentage(data.product.price, data.daily_deal.price)}]
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
