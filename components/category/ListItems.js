import Img from 'react-cool-img';
import Link from 'next/link';
export function ListItems({ categories, isTabMenu, file_url }) {
	return (
		<div className='ditoko__p10'>
			<div className='ditoko__fadeIn'>
				{categories.map((items) => {
					return items.id === Number(isTabMenu) && <CardCategory items={items} file_url={file_url} />;
				})}
			</div>
		</div>
	);
}

export function CardCategory({ items, file_url }) {
	return items.brand.map((item, i) => {
		return (
			<div key={i} className='ditoko__cardIconAllCategory'>
				<Link href={item.slug}>
					<>
						<Img
							cache
							className='ditoko__ListItemCategoryImg skeleton'
							loading='lazy'
							src={file_url + item.icon_url}
							width='55'
							alt='ditoko.com'
						/>
						<p>{item.brand_name}</p>
					</>
				</Link>
			</div>
		);
	});
}
