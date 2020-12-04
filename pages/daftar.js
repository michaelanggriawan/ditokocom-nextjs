import { Navigation } from '../components/navigation/navigation';
import Slider from 'react-slick';
import { dateEndOfMonth } from '../utils/utils';
import { BnbInput } from '../components/input/input';
import { H1, P } from '../components/typography/typography';
import { useEffect, useState } from 'react';
import { NormalSelect } from '../components/select/select';
import { TextArea } from '../components/textarea/textarea';
import { Button } from '../components/button/button';
import Axios from 'axios';
import { Message } from '../components/message/message';

export async function getStaticProps() {
	// Connect to Database using DB properties
	return {
		props: {
			api_url: process.env.REACT_APP_API_ENDPOINT,
			file_url: process.env.REACT_APP_STATIC_FILES_URL,
		},
	};
}

export default function Register(props) {
	const [dataInput, setDataInput] = useState({
		phone: '',
		password: '',
		name: '',
		province: '',
		city: '',
		subdistrict: '',
		address: '',
	});

	const [isProvinces, setProvinces] = useState([]);
	const [isCities, setCities] = useState([]);
	const [isSubdistricts, setSubdistricts] = useState([]);

	const [isAfflink, setAfflink] = useState(null);

	const [isLoad, setLoad] = useState(false);
	const [isPhoneError, setPhoneError] = useState({
		status: false,
		message: '',
	});

	const handleChange = (e) => {
		const { value, id } = e.target;
		// console.log(value);
		if (id === 'province') {
			setDataInput({
				...dataInput,
				province: value,
				city: '',
				subdistrict: '',
				address: '',
			});
		} else if (id === 'city') {
			setDataInput({
				...dataInput,
				city: value,
				subdistrict: '',
				address: '',
			});
		} else if (id === 'subdistrict') {
			setDataInput({
				...dataInput,
				subdistrict: value,
				address: '',
			});
		}
	};

	// cek afflink
	const getAfflink = () => {
		let afflink = localStorage.getItem('r');
		if (afflink) {
			Axios.get(`${process.env.REACT_APP_API_ENDPOINT}user/${afflink}`)
				.then((res) => {
					if (res.status === 200) {
						setAfflink(res.data.result.name);
					}
				})
				.catch((err) => {
					if (err) {
						console.log(err);
					}
				});
		}
	};

	useEffect(() => {
		let afflink = localStorage.getItem('r');
		if (afflink) {
			getAfflink();
		}
	}, []);

	const handleSubmit = () => {
		setLoad(true);
		const payload = {
			phone: dataInput.phone,
			password: dataInput.password,
			name: dataInput.name,
			province: dataInput.province,
			city: dataInput.city,
			sub_district_id: dataInput.subdistrict,
			address: dataInput.address,
		};

		const urlPost = `${props.api_url}register3`;
		Axios.post(urlPost, payload)
			.then((res) => {
				if (res.status === 200) {
					let setToken = res.data.result.access_token;
					localStorage.setItem('refreshToken', res.data.result.refresh_token);
					dispatch.user(setToken);
				}
			})
			.catch((err) => {
				if (err) {
					// console.log(err.response);
					setLoad(false);
					if (err.response) {
						console.log('err0r');
						console.log(err.response.status);
						if (err.response.status === 422) {
							setPhoneError({
								status: true,
								message: err.response.data.errors.phone[0],
							});
						}
					}

					setTimeout(() => {
						setPhoneError({ status: false });
					}, 5000);
				}
			});
	};

	useEffect(() => {
		Axios.get(`${props.api_url}provinces`).then((res) => {
			setProvinces(res.data.result);
		});
	}, []);

	useEffect(() => {
		if (dataInput.province !== '') {
			Axios.get(`${props.api_url}cities/${dataInput.province}`).then((res) => {
				setCities(res.data.result);
			});
		}
	}, [dataInput.province]);

	useEffect(() => {
		if (dataInput.city !== '') {
			Axios.get(`${props.api_url}sub-districts/${dataInput.city}`).then((res) => {
				setSubdistricts(res.data.result);
			});
		}
	}, [dataInput.city]);

	// Button logic disabled
	let myButton;
	if (dataInput.phone.length > 1 && dataInput.password.length > 1 && dataInput.name.length > 1 && dataInput.address.length > 1) {
		myButton = (
			<Button block disabled={isLoad} css='ditoko__mt30 ditoko__bold' size='medium' onClick={handleSubmit}>
				{isLoad ? 'Loading' : 'Daftar'}
			</Button>
		);
	} else {
		myButton = (
			<Button block disabled css='ditoko__mt30 ditoko__bold' size='medium' onClick={handleSubmit}>
				{isLoad ? 'Loading' : 'Daftar'}
			</Button>
		);
	}

	const sliderRegister = {
		dots: true,
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 5000,
	};

	return (
		<Navigation>
			<div className='ditoko__p10'>
				<div className='ditoko__mb30'>
					<H1 css='ditoko__font20 ditoko__bold'>Mau dapat penghasilan tambahan?</H1>
					<P css='ditoko__textPrimary ditoko__mb30'>Gratis biaya pendaftaran hingga {dateEndOfMonth}</P>

					<div className='ditoko__comissionSliderIndex'>
						<Slider {...sliderRegister}>
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
				</div>

				<div className='ditoko__pt0'>
					<H1 css='ditoko__bold'>Data Saya</H1>
					<form onClick={(e) => e.preventDefault()}>
						<div className='ditoko__mt10'>
							<BnbInput
								name='phone'
								label='Nomor HP'
								onError={isPhoneError.status}
								type='number'
								value={dataInput.phone}
								onChange={(e) => setDataInput({ ...dataInput, phone: e.target.value })}
							/>
							{isPhoneError.status ? (
								<Message css='ditoko__mt10' size='small'>
									{isPhoneError.message}
								</Message>
							) : (
								''
							)}
						</div>
						<div className='ditoko__mt10'>
							<BnbInput
								name='password'
								type='password'
								label='Password Anda'
								value={dataInput.password}
								onChange={(e) =>
									setDataInput({
										...dataInput,
										password: e.target.value,
									})
								}
							/>
						</div>

						<div className='ditoko__mt10'>
							<BnbInput
								name='name'
								label='Nama Anda'
								type='text'
								value={dataInput.name}
								onChange={(e) =>
									setDataInput({
										...dataInput,
										name: e.target.value,
									})
								}
							/>
						</div>

						<div className='ditoko__mt10'>
							<NormalSelect title='Provinsi Anda' id='province' value={dataInput.province} onChange={handleChange}>
								{isProvinces.map(({ id, name }) => (
									<option key={id.toString()} value={id}>
										{name}
									</option>
								))}
							</NormalSelect>
						</div>

						<div className='ditoko__mt0'>
							<NormalSelect
								title='Kota Anda'
								id='city'
								value={dataInput.city}
								cssHidden={dataInput.province === 'Provinsi Anda' || dataInput.province === '' ? 'ditoko__hidden' : 'ditoko__block'}
								onChange={handleChange}
								disabled={dataInput.province === '' ? true : false}
							>
								{isCities.map(({ id, name }) => (
									<option key={id.toString()} value={id}>
										{name}
									</option>
								))}
							</NormalSelect>
						</div>

						<div className='ditoko__mt0'>
							<NormalSelect
								title='Kecamatan Anda'
								id='subdistrict'
								value={dataInput.subdistrict}
								cssHidden={dataInput.city === '' || dataInput.city === 'Kota Anda' ? 'ditoko__hidden' : 'ditoko__block'}
								onChange={handleChange}
								disabled={dataInput.city === '' ? true : false}
							>
								{isSubdistricts.map(({ id, name }) => (
									<option key={id.toString()} value={id}>
										{name}
									</option>
								))}
							</NormalSelect>
						</div>

						<div className='ditoko__mt10'>
							<TextArea
								id='address'
								rows='3'
								cssHidden={
									dataInput.subdistrict === '' || dataInput.subdistrict === 'Kecamatan Anda' ? 'ditoko__hidden' : 'ditoko__block'
								}
								placeholder='Alamat Lengkap Anda'
								value={dataInput.address}
								disabled={dataInput.province === '' || dataInput.city === '' || dataInput.subdistrict === '' ? true : false}
								onChange={(e) => setDataInput({ ...dataInput, address: e.target.value })}
							/>
						</div>

						{myButton}
					</form>

					<div className='ditoko__mt30'>
						<H1 css='ditoko__bold'>Direkomendasi</H1>
						<P css='ditoko__textColorBlackMedium'>{isAfflink !== null ? isAfflink : '-'}</P>
					</div>
				</div>
			</div>
		</Navigation>
	);
}
