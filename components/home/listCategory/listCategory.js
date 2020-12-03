import React, { useEffect, useState } from 'react';
import Img from 'react-cool-img';
import { useLocation } from 'react-router-dom';
import { LazyCategory } from '../../lazyload';
import Link from 'next/link';
import { SliderCategory } from '../../slider/slider';
import MenuBurger from '../../../assets/images/v1/menu_burger.png';

export function ListCategory({ data = [], setBannerLoad }) {
	const [isCategory, setCategory] = useState(true);
	const location = useLocation();

	useEffect(() => {
		let url = location.pathname !== '/kategori';
		if (isCategory) {
			if (url) {
				setCategory(true);
			}
		}
	}, [isCategory]);

	return (
		<>
			{isCategory ? '' : <LazyCategory />}

			<SliderCategory dataCategory={data} setBannerLoad={setBannerLoad} />
			<div className='ditoko__relative'>
				<Link href='kategori'>
					<div className='ditoko__categoryMenu'>
						<Img loading='lazy' cache src={MenuBurger} alt='' />
					</div>
				</Link>
			</div>
		</>
	);
}

export function IconCategory({ data = [] }) {
	return (
		<div className='ditoko__flex ditoko__flexWrap ditoko__marginX8Minus ditoko__fadeIn'>
			{data.map((items, i) => {
				return (
					<div key={i} className={`ditoko__cardIconCategory`}>
						<Link to={items.slug}>
							<a>
								<Img cache src={'https://ditoko.oss-ap-southeast-5.aliyuncs.com/' + items.icon_url} loading='lazy' alt={items.total_view} />
								<div className='ditoko__cardTitleCategory'>{items.brand_name}</div>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
