import React, { useState } from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import Img from 'react-cool-img';

export default function SliderProductImages({ dataImg }) {
	const [isPlay, setPlay] = useState(false);

	const settingSliderProduct = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className={'ditoko__cardImagesSlider ditoko__fadeIn'}>
			<Slider {...settingSliderProduct}>
				{dataImg.product.videos.length > 0 && (
					<>
						{isPlay ? (
							<div className='ditoko__productVideoPause' onClick={() => setPlay(!isPlay)}>
								<ReactPlayer
									width='100%'
									height='100%'
									onEnded={() => setPlay(!isPlay)}
									muted={true}
									className={`ditoko__widthFullPercent ditoko__fadeIn  skeleton`}
									playing={isPlay}
									url={process.env.REACT_APP_STATIC_FILES_URL + dataImg.product.videos[0].video_url}
								/>
							</div>
						) : (
							<>
								<img
									loading='lazy'
									src={process.env.REACT_APP_STATIC_FILES_URL + dataImg.product.images[0].image_url}
									alt='ditoko images'
									className='ditoko__widthFullPercent ditoko__fadeIn'
								/>
								<div className='ditoko__relative'>
									<div
										onClick={() => setPlay(!isPlay)}
										className={`ditoko__playVideoBtn ${!isPlay ? 'ditoko__block' : 'ditoko__hidden'}`}
									>
										<Img src='images/playVideo.png' cache loading='lazy' />
									</div>
								</div>
							</>
						)}
					</>
				)}

				{dataImg.product.images.map((imgSlider, index) => {
					return (
						<span key={index}>
							<img
								loading='lazy'
								src={process.env.REACT_APP_STATIC_FILES_URL + imgSlider.image_url}
								alt={imgSlider.tag}
								className='ditoko__widthFullPercent ditoko__fadeIn'
							/>
						</span>
					);
				})}
			</Slider>
		</div>
	);
}
