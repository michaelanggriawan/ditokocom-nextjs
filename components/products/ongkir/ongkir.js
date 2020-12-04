import React from 'react';
import { addCommas } from '../../../helpers/index';

export function Ongkir({ viewOngkir, isPrice, isSelectNameArea }) {
	return (
		<div className='ditoko__cardOngkir'>
			<div onClick={viewOngkir} className='ditoko__selectOngkir'>
				<div className='ditoko__previewOngkirInProductPage ditoko__flex ditoko__between ditoko__itemsCenter ditoko__widthFullPercent'>
					{isSelectNameArea !== null ? (
						<div>
							<small>Pengiriman Ke</small> <h6>{isSelectNameArea}</h6>
						</div>
					) : (
						<p className='ditoko__fontMedium ditoko__textColorGrey'>Pengiriman Ke</p>
					)}

					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#C5C5C5'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M6 9l6 6 6-6' />
						</svg>
					</span>
				</div>
			</div>

			<div className='ditoko__flex ditoko__mt10 ditoko__between ditoko__itemsCenter'>
				<p className='ditoko__font17  ditoko__textColorBlackMedium ditoko__priceOngkirInProductPage'>Biaya Kirim :</p>
				<div className='ditoko__resultOngkirPrice'>{isPrice !== null ? addCommas(Number(isPrice)) : 'Rp. 0,-'} </div>
			</div>
		</div>
	);
}
