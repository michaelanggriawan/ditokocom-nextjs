import { useCallback, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

import { Navigation } from '../components/navigation/navigation';
import { H1, P } from '../components/typography/typography';
import { MetaLogin } from '../meta/metaLogin';
import { BnbInput } from '../components/input/input';
import { Button } from '../components/button/button';
import { FlexCenter } from '../components/flex/flex';
import Axios from 'axios';

export default function Login() {
	// const { user, dispatch } = useContext(UserContext);
	// const { progress, handleProgress } = useProgress();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [isLoadBtn, setLoadBtn] = useState(false);
	const [isError, setError] = useState(false);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const data = {
				username: phoneNumber,
				password,
			};

			setLoadBtn(true);

			Axios.post(process.env.REACT_APP_API_ENDPOINT + 'login', data)
				.then((res) => {
					// console.log(res, 'login');
					localStorage.setItem('refreshToken', res.data.result.refresh_token);
					setLoadBtn(false);
					dispatch.user(res.data.result.access_token);
				})
				.catch(() => {
					setError(true);
					setLoadBtn(false);
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[phoneNumber, password]
	);

	const sliderLogin = {
		dots: true,
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 5000,
	};

	let button;
	if (phoneNumber.length > 0 && password.length > 0) {
		button = (
			<Button block disabled={isLoadBtn} css='ditoko__mt30 ditoko__fontBig ditoko__bold' size='medium'>
				{isLoadBtn ? 'Loading' : 'Masuk'}
			</Button>
		);
	} else {
		button = (
			<Button disabled block css='ditoko__mt30 ditoko__fontBig ditoko__bold' size='medium'>
				{isLoadBtn ? 'Loading' : 'Masuk'}
			</Button>
		);
	}

	return (
		<Navigation>
			<MetaLogin />

			<div className='ditoko__comissionSliderIndex ditoko__pl15 ditoko__pr15 ditoko__pt0 ditoko__mt20'>
				<Slider {...sliderLogin}>
					<div className='ditoko__cardSliderCom'>
						<div className='ditoko__imgSliderCom'>
							<img src='/images/comission/slide2.png' alt='ditoko.com' />
						</div>
					</div>

					<div className='ditoko__cardSliderCom'>
						<div className='ditoko__imgSliderCom'>
							<img src='/images/comission/slide1.png' alt='ditoko.com' />
						</div>
					</div>
				</Slider>
			</div>

			<div className='ditoko__container'>
				<H1 css='ditoko__bold'>Masuk ke ditoko.com</H1>
				<form onSubmit={handleSubmit}>
					<div className='ditoko__mt10'>
						<BnbInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label='Nomor Hp' name='nomor' type='number' />
					</div>

					<div className='ditoko__mt10'>
						<BnbInput value={password} onChange={(e) => setPassword(e.target.value)} label='Password' name='password' type='password' />
					</div>

					{isError && <Message size='small'>Nomor handphone atau kata sandi salah.</Message>}
					{button}
				</form>

				<Link href='/daftar'>
					<Button block nonActive css='ditoko__mt10 ditoko__fontBig ditoko__bold' size='medium'>
						Daftar
					</Button>
				</Link>
				<FlexCenter>
					<div className='ditoko__mt20 ditoko__mb20'>
						<Link href='/lupa-password'>
							<P css='ditoko__textPrimary'>Lupa Password?</P>
						</Link>
					</div>
				</FlexCenter>
			</div>
		</Navigation>
	);
}
