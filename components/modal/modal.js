import { H3, P } from '../typography/typography';
import { Button } from '../button/button';
import './modal.module.css';

export function Modal({ active, onClick, titleModal, contentModal, titleButton, size, children, withChildren }) {
	switch (size) {
		default:
			size = 'ditoko__modalMedium';
			break;
		case 'big':
			size = 'ditoko__modalBig';
			break;
		case 'medium':
			size = 'ditoko__modalMedium';
			break;
		case 'small':
			size = 'ditoko__modalSmall';
			break;
	}

	return (
		<div className={`ditoko__modal ${size} ${active ? 'ditoko__block' : 'ditoko__hidden'}`}>
			<div className={withChildren ? 'ditoko__hidden' : 'ditoko__modalHeader'}>
				<H3>{titleModal}</H3>
			</div>
			<div className={withChildren ? 'ditoko__hidden' : 'ditoko__modalContent'}>
				<P>{contentModal}</P>
			</div>
			<div className={withChildren ? 'ditoko__hidden' : 'ditoko__footer'}>
				<Button css={withChildren ? 'ditoko__hidden' : ''} block onClick={onClick}>
					{titleButton}
				</Button>
			</div>

			{children}
		</div>
	);
}
