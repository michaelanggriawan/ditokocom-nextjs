import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { addCommas } from '../../helpers/index';
import { H1, H3 } from '../typography/typography';
import Img from 'react-cool-img';

 function CardProduct({ css = '', children, ...props }) {
	const [shouldPlay, updatePlayState] = useState(false);
	const [isEndVideo, setEndVideo] = useState(false);

	const Card = (
		<div className={`${props.grid ? 'ditoko__cardProductGrid' : 'ditoko__cardProduct'}  ditoko__fadeIn ${css}`} onClick={props.handleClick}>
			{props.video ? (
				<>
					<ReactPlayer
						width='100%'
						height='100%'
						onPlay={() => setEndVideo(false)}
						onEnded={() => setEndVideo(true)}
						muted={true}
						className={`${props.heightAuto ? 'ditoko__reactPlayerCardAuto' : 'ditoko__reactPlayerCard'}  skeleton`}
						playing={shouldPlay}
						url={props.imageUrl}
					/>

					{props.visitProduct && (
						<div className='ditoko__relative'>
							<div className='ditoko__videoCardAction'>
								<div className={`ditoko__btnVideoAction ${isEndVideo ? 'ditoko__block' : 'ditoko__hidden'}`}>Lihat Produk</div>
							</div>
						</div>
					)}
				</>
			) : (
				<Img
					className={`${props.bigCard ? `ditoko__heightImgCardAuto skeleton ${props.productPage && 'ditoko__cardProductPages'}` : 'ditoko__imgProductHome ditoko__fadeIn'}`}
					src={props.imageUrl}
					alt={props.name}
					cache
					loading='lazy'
				/>
			)}

			<div className='ditoko__productPrice'>
				<H3 css='ditoko__productName'>{props.name}</H3>

				<p className='ditoko__font16'>{props.desc === null ? '' : props.desc}</p>

				{/* <H1 css='ditoko__textPrimary'>{props.price}</H1> */}
				<div className={`ditoko__flex ditoko__itemsCenter   ${props.discount ? 'ditoko__dailyDealsTextDiscount ditoko__linethrough' : 'ditoko__textPrimary'}`}>
					{props.dailyDealPrice !== 0 && <H1 css='ditoko__textPrimary ditoko__mr10 ditoko__lineHeight1 ditoko__fontFamilyMedium'>{addCommas(props.dailyDealPrice)}</H1>}{' '}
					{props.dailyDealPrice !== 0 ? (
						<span className='ditoko__paragraf ditoko__linethrough ditoko__fontSmall ditoko__dailyDealsTextDiscount'>{props.price}</span>
					) : (
						<H1 css='ditoko__textPrimary ditoko__productPriceBig'>{props.price}</H1>
					)}
				</div>
				<p className='ditoko__textPrimary ditoko__fontSmall ditoko__bold'>{props.discountPrice}</p>
				{children}
			</div>
		</div>
	);
	return (
		<>
			<div className={`ditoko__widthCardProduct ${props.bigCard ? 'ditoko__widthFullPercent' : 'ditoko__width50Percent'}`}>{props.link ? <Link href={props.link}><a>{Card}</a></Link> : Card}</div>
			{props.last && <div className='ditoko__pr16'></div>}
		</>
	);
}

CardProduct.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	css: PropTypes.string,
	bigCard: PropTypes.bool,
	last: PropTypes.bool,
	link: PropTypes.string,
	handleClick: PropTypes.func,
	productPage: PropTypes.bool,
};


export default CardProduct;