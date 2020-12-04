import { FlexBetween } from '../flex/flex';
import { useRef, useCallback, useState } from 'react';
import { AnimateBottom } from './animate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Img from 'react-cool-img';

export function Header() {
	const [isChangeLocation, setChangeLocation] = useState(false);
	const [isAnimateCart, setAnimateCart] = useState(false);
	const [isCount, setCount] = useState(null);
	const [isCart, setCart] = useState(true);

	const location = useRouter();
	const barsElm = useRef(null);

	const handleBackButton = location.pathname === '/daftar' || location.pathname === '/masuk' || location.pathname === '/lupa-password';

	const toggleSidebar = useCallback(() => {
		barsElm.current.parentElement.parentElement.previousElementSibling.classList.toggle('ditoko__hidden');
	}, []);

	const firstPath = location.pathname.split('/')[1];

	const urlData =
		location.pathname === '/akun' ||
		location.pathname === '/akun/bank' ||
		location.pathname === '/akun/alamat' ||
		location.pathname === '/akun/tambah-alamat' ||
		location.pathname === '/akun/terakhir-dilihat' ||
		location.pathname === '/pengaturan' ||
		location.pathname === '/komisi' ||
		location.pathname === '/a' ||
		location.pathname === '/komisi/edukasi' ||
		location.pathname === '/komisi/detail' ||
		location.pathname === '/daftar' ||
		location.pathname === '/masuk' ||
		location.pathname === '/pengaturan/ubah-password' ||
		firstPath === 'c' ||
		firstPath === 'a' ||
		location.pathname === '/lupa-password';

	return (
		<>
			<header className='ditoko__relative ditoko__headerZindex'>
				<FlexBetween css='ditoko__headerApp'>
					{handleBackButton ? (
						<span className='ditoko__pointer' onClick={() => window.history.back()}>
							<Img cache loading='lazy' src={imgArrowBack} alt='back button' />
						</span>
					) : (
						<span className='ditoko__pointer' ref={barsElm} onClick={toggleSidebar}>
							<Img cache loading='lazy' src='/images/drawer.png' alt='ditoko.com' />
						</span>
					)}
					<Link href='/'>
						<a>
							<Img cache loading='lazy' className={`${!urlData ? 'ditoko__logoBrandHeader' : 'ditoko__logoBrandHeaderActive'}`} src='/images/full_logo.png' alt='ditoko - Home' />
						</a>
					</Link>

					<div className={`ditoko__relative `}>
						{/* <div
                        onClick={() => setChangeLocation(true)}
                        className={`ditoko__headerLocationCard ${!urlData ? 'ditoko__block' : 'ditoko__hidden'}`}
                    >
                        <p>Dikirim Dari</p>
                        <h4>
                            {isLocationValue} {ArrowDown}
                        </h4>
                    </div>
                    <div className={`ditoko__dropdownLocationHeader ${isChangeLocation ? 'ditoko__block' : 'ditoko__hidden'} `}>
                        <div onClick={changeLocation} name='Jakarta' className='ditoko__listDropDownHeader'>
                            Jakarta
                        </div>
                        <div onClick={changeLocation} name='Makassar' className='ditoko__listDropDownHeader'>
                            Makassar
                        </div>
                        <div onClick={changeLocation} name='Medan' className='ditoko__listDropDownHeader'>
                            Medan
                        </div>
                    </div> */}
					</div>
				</FlexBetween>
			</header>
			<div onClick={() => setChangeLocation(false)} className={`ditoko__dropDownOverlayLocationHeader  ${isChangeLocation ? 'ditoko__block' : 'ditoko__hidden'}`} />

			<AnimateBottom isAnimateCart={isAnimateCart} isCount={isCount} isCart={isCart} />
		</>
	);
}
