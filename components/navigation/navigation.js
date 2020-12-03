import { useState } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

export function Navigation({ padding, children, footer, onScroll, onTouchMove, marginHidden, setSwitchLocation }) {
	const [isCountNav, setCountNav] = useState(null);

	return (
		<div onScroll={onScroll} onTouchMove={onTouchMove} className='ditoko__cardNavigation'>
			<div className='ditoko__contentNavigation'>
				<Sidebar />
				<Header setSwitchLocation={setSwitchLocation} setCountNav={setCountNav} />
				<main className={`ditoko__cardMain ${padding ? 'ditoko__px15 ditoko__pt10' : ''} ${marginHidden && 'ditoko__mb0'}`}>{children}</main>
				{(footer = <Footer isCountNav={isCountNav} />)}
			</div>
		</div>
	);
}

Navigation.propTypes = {
	footer: PropTypes.element,
	padding: PropTypes.bool,
};

export function Footer({ isCountNav }) {
	return <Navbar isCount={isCountNav} />;
}
