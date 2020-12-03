import PropTypes from 'prop-types';
import Link from 'next/link';
import { FlexCenter } from '../flex/flex';
import { useRouter } from 'next/router';
import style from './navbar.module.css';
import Img from 'react-cool-img';

export function Navbar({ isCount }) {
	return (
		<footer className={style.ditoko__navbar}>
			<TabsNavbar src='/images/navbar/logoicon.png' title='Ditoko' link='/' />
			<TabsNavbar src='/images/navbar/mediaicon.png' title='Media' link='/a' />
			<TabsNavbar src='/images/navbar/commisionicon.png' title='Komisi' link='/komisi' />
			<TabsNavbar isCount={isCount} src='/images/navbar/carticon.png' title={`Keranjang`} link='/keranjang' />
			<TabsNavbar src='/images/navbar/categoryicon.png' title='Kategori' link='/kategori' />
		</footer>
	);
}

export function TabsNavbar({ src, title = '', link, onClick, isCount }) {
	const location = useRouter();

	const DisableAnimate = location.pathname === '/daftar' || location.pathname === '/masuk' || location.pathname === '/keranjang';

	return (
		<Link onClick={onClick} href={link || title}>
			<div className={style.ditoko__selfCenter}>
				<FlexCenter>
					<Img cache src={src} alt='Home' loading='lazy' />

					{isCount !== null && !DisableAnimate && <span className={style.ditoko__isCountNav}>{isCount}</span>}
				</FlexCenter>
				<p>{title}</p>
			</div>
		</Link>
	);
}

TabsNavbar.propTypes = {
	src: PropTypes.any.isRequired,
	title: PropTypes.string,
	link: PropTypes.string,
};
