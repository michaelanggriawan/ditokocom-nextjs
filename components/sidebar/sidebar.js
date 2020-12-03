import { useState, useRef, useCallback } from 'react';
import { Overlay } from '../overlay/overlay';
import { Modal } from '../modal/modal';
import { FlexCenter } from '../flex/flex';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import Img from 'react-cool-img';

export function Sidebar() {
	const [showModal, setShowModal] = useState(false);
	const [isSidebar, setSidebar] = useState(false);

	const sidebarElm = useRef(null);

	const hideSidebar = useCallback(({ target }) => {
		if (target.id === 'sidebar') {
			target.classList.add('ditoko__hidden');
		}
	}, []);

	return (
		<>
			<Overlay active={showModal} />
			<Modal
				active={showModal}
				contentModal={`Hubungi Kami melalui WhatsApp di 0811122214`}
				titleButton='Tutup'
				onClick={() => setShowModal(false)}
			/>
			<div id='sidebar' className={`ditoko__sidebar ${isSidebar ? 'ditoko__block' : 'ditoko__hidden'}`} ref={sidebarElm} onClick={hideSidebar}>
				<div className='ditoko__cardSidebar'>
					<Link href='/'>
						<FlexCenter css='ditoko__py20'>
							<Img cache loading='lazy' src='/images/full_logo.png' alt='ditoko - Home' className='ditoko__logoSidebar' />
						</FlexCenter>
					</Link>

					<div className='ditoko__menuSidebar'>
						<Section noBorder link='/akun'>
							<ListIcon css='ditoko__usernameTitle' img='/images/profile_pic.png' text='Masuk' />
						</Section>

						<div className='ditoko__pointer'>
							<Section noBorder link='/a'>
								<ListIcon img='/images/mediaicon.png' text='Media' />
							</Section>
						</div>

						<div className='ditoko__pointer'>
							<Section noBorder link='/info-ditoko'>
								<ListIcon img='/images/infoicon.png' text='Info ditoko' />
							</Section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const Section = ({ children, link, handleClick, noBorder }) => (
	<div className={`ditoko__py10 ${noBorder ? '' : ' ditoko__borderBottomGrey1'}`} onClick={handleClick}>
		{link ? (
			<Link href={link} className='ditoko__block'>
				<div>{children}</div>
			</Link>
		) : (
			children
		)}
	</div>
);

Section.propTypes = {
	link: PropTypes.string,
	noBorder: PropTypes.bool,
	handleClick: PropTypes.func,
};

function ListIcon({ children, img, text, right, bordered, handleClick, space = '8' }) {
	return (
		<div className='ditoko__flex ditoko__pointer ditoko__my2' onClick={handleClick}>
			<Img cache loading='lazy' src={img} alt={text} className={`ditoko__height25 ditoko__width25 ${bordered ? ` ditoko__my${space}` : ''}`} />
			<div className='ditoko__flexGrow1 ditoko__selfCenter ditoko__pl15'>
				<div className={`ditoko__flex ditoko__between ${bordered ? `ditoko__borderBottomGrey1 ditoko__py${space}` : ''}`}>
					<span className='ditoko__titleMenuSideBar'>{text}</span>
					<div className='ditoko__selfCenter'>{right}</div>
				</div>
				{children}
			</div>
		</div>
	);
}

ListIcon.propTypes = {
	text: PropTypes.string.isRequired,
	img: PropTypes.string,
	handleClick: PropTypes.func,
	bordered: PropTypes.bool,
	space: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	right: PropTypes.element,
};
