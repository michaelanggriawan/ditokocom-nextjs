import React, { useState } from 'react';
import { H1 } from '../../typography/typography';

import { getValueParams } from '../../../helpers/index';

export default function TabelStock({ isStock, handleStock, labelTitle }) {
	const getParams = getValueParams('g');
	if (getParams) {
		let value;
		if (getParams === 'pekanbaru') {
			value = 'Kota Pekanbaru';
		} else if (getParams === 'surabaya') {
			value = 'Kota Surabaya';
		} else if (getParams === 'tangerang') {
			value = 'Tangerang';
		} else if (getParams === 'pontianak') {
			value = 'Kota Pontianak';
		} else if (getParams === 'medan') {
			value = 'Kota Medan';
		} else {
			value = 'Tangerang';
		}

		const data = isStock.dataStock;
		data.forEach(function (item, i) {
			if (item.city === value) {
				data.splice(i, 1);
				data.unshift(item);
			}
		});
	}

	return (
		<div className='ditoko__cardStockProduct'>
			<H1 css='ditoko__mb15 ditoko__bold'>{labelTitle}</H1>

			<div className='ditoko__sliderCityStockProduct'>
				{isStock.dataStock.map((item, i) => {
					return (
						<button
							key={i}
							name={i}
							onClick={handleStock}
							className={`ditoko__btnStockProduct ${i === isStock.isActive ? 'ditoko__btnStockProductActive' : ''}`}
						>
							{item.city}
						</button>
					);
				})}
			</div>

			<div className='ditoko__contentStockProduct'>
				<div className='ditoko__dataStockProduct'>
					{isStock.dataStock.map((item, i) => {
						return i === isStock.isActive ? (
							<div key={i} className='ditoko__flex ditoko__sliderStockProduct'>
								<div className='ditoko__detailDataStockProduct ditoko__slidesStockProduct'>
									{Object.entries(item.stock).map(([key, value], i) => {
										return (
											<div key={i} className={`ditoko__lineOfStock ${i % 2 === 0 && 'ditoko__lineOfStockGrey'}`}>
												<div className={`ditoko__tabelContentStock `}>
													<p className='ditoko__sizeStockProduct'>{key}</p>
													{Object.entries(value.color).map(([key, value], i, data) => {
														return (
															<div key={i} className='ditoko__colorAndQty ditoko__flex'>
																<p className='ditoko__colorStockProduct'>{key}</p>
																<p className='ditoko__qtyStockProduct'>
																	{value.stock} {data.length - 1 === i ? '' : ','}
																</p>
															</div>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						) : (
							''
						);
					})}
				</div>
			</div>
		</div>
	);
}
