import React from 'react';
import { Overlay } from '../../overlay/overlay';
import Img from 'react-cool-img';
export default function ModalSwitchLocation({ isSwitchLocation, setSwitchLocation }) {
	return (
		<>
			<Overlay active={isSwitchLocation} onClick={() => setSwitchLocation(false)} />
			<div className={`ditoko__modalSwitchLocation ${isSwitchLocation ? 'ditoko__block' : 'ditoko__hidden'}`}>
				<div className='ditoko__headerModalSwitchLocation'>
					<Img src='images/icon_alert.png' />
					<p>Produk ini berbeda lokasi pengiriman</p>
				</div>
				<div className='ditoko__contentModalSwitchLocation'>
					<p>Ubah Lokasi Pengiriman?</p>

					<div className='ditoko__btnGroupSwitchLocation'>
						<div onClick={() => setSwitchLocation(false)} className='ditoko__btnYesSwitchLocation'>
							Ya
						</div>
						<div onClick={() => setSwitchLocation(false)} className='ditoko__btnNoSwitchLocation'>
							Tidak
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
