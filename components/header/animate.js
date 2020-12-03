import Link from 'next/link';

export function Animate({ isAnimateCart }) {
	return (
		<div className={`ditoko__relative ${!isAnimateCart ? 'ditoko__hidden' : 'ditoko__block'}`}>
			<div className='ditoko__cardAnimate'>
				<div className='ditoko__cartTitleAnimate'>
					<p>Produk berhasil dimasukkan ke keranjang</p>
					<h4>Klik disini untuk bayar</h4>
				</div>
				<div className='ditoko__cartArrow'></div>
			</div>
		</div>
	);
}

export function AnimateBottom({ isCount, isCart, isAnimateCart }) {
	return (
		<Link href='/keranjang'>
			<div className={`ditoko__animateBottomCard ${!isCart || !isAnimateCart ? 'ditoko__hidden' : 'ditoko__flex'}`}>
				<p>Ada {isCount !== null ? isCount : ''} Produk di Keranjang, Klik Disini Untuk Bayar</p>
			</div>
		</Link>
	);
}
