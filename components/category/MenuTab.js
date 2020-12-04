import Link from 'next/link';
import Img from 'react-cool-img';
import { P } from '../typography/typography';

export function MenuTab({ categories, setLoadMenu, file_url, handleTab, isTabMenu, isTabLoad, media }) {
	return (
		<>
			<div className={media ? `ditoko__cardTabMedia` : `ditoko__cardTabCategories`}>
				{isTabLoad ? (
					<>
						<Link className={media && 'ditoko__hidden'} href='/promo'>
							<div className='ditoko__tabCategories'>
								<Img cache loading='lazy' src='/images/promo.png' alt='ditoko.com' />
								<p className='ditoko__textCenter'>Promo</p>
							</div>
						</Link>
						{categories.map((items, i) => {
							let titleName = items.name;

							let iconsTab;
							if (items.id === Number(isTabMenu)) {
								iconsTab = media ? items.icon_url : items.image_url;
							} else {
								iconsTab = media ? items.icon_url : items.black_and_white_image_url;
							}

							let slug;
							if (media) {
								slug = items.slug;
							} else {
								slug = String(items.id);
							}

							// console.log(slug);

							let tab;
							if (media) {
								tab = isTabMenu.name;
							} else {
								tab = isTabMenu;
							}

							// console.log(tab);

							return (
								<div
									key={i}
									alt={media ? items.icon_title_url : 'ditoko.com'}
									name={media ? items.slug : items.id}
									onClick={handleTab}
									className={`${media ? 'ditoko__tabMedia' : 'ditoko__tabCategories'}  ${
										slug === tab && 'ditoko__tabCategoriesActive'
									}`}
								>
									<Img
										cache
										loading='lazy'
										name={media ? items.slug : items.id}
										onLoad={() => setLoadMenu(true)}
										src={file_url + iconsTab}
										alt={media ? items.icon_title_url : 'ditoko.com'}
										className={media && slug === tab ? 'ditoko__mediaImgActive' : 'ditoko__mediaImg'}
									/>
									<button
										name={media ? items.slug : items.id}
										alt={media ? items.icon_title_url : 'ditoko.com'}
										className='ditoko__menuTabName'
									>
										{media ? titleName : titleName.substr(2)}
									</button>
								</div>
							);
						})}
					</>
				) : (
					<div className='ditoko__loadingCenter' />
				)}
			</div>
			{isTabLoad && (
				<div className='ditoko__blockingCategoryTab'>
					<Link href='/promo'>
						<div className='ditoko__tabCategories'>
							<Img cache loading='lazy' src='/public/images/promo.png' alt='ditoko.com' />
							<P css='ditoko__textCenter'>Promo</P>
						</div>
					</Link>
				</div>
			)}
		</>
	);
}
