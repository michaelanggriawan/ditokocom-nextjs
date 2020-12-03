import PropTypes from 'prop-types';

export function Button({ heightAuto, children, id, disabled, shadow, block, css, size, key, uppercase, green, name, onClick, nonActive, nonCenter }) {
	switch (size) {
		default:
			size = 'defaultBtn';
			break;
		case 'big':
			size = 'bigBtn';
			break;
		case 'medium':
			size = 'mediumBtn';
			break;
		case 'small':
			size = 'smallBtn';
			break;
	}

	return (
		<button
			name={name}
			id={id}
			key={key}
			className={`${heightAuto ? 'ditoko__heightAuto' : ''} ditoko__pointer ditoko__buttonActive ${size} ${green ? 'ditoko__btnGreen' : ''} ${
				shadow ? ' ditoko__buttonShadow' : ''
			} ${block ? ' ditoko__buttonFull' : ''} ${css} ${uppercase ? 'ditoko__uppercase' : ''} ${nonActive ? 'ditoko__buttonNonActive' : ''} ${
				nonCenter ? 'ditoko__textLeft' : ''
			} `}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.any.isRequired,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	shadow: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	css: PropTypes.string,
};

Button.defaultProps = {
	disabled: false,
	block: false,
	shadow: false,
	handleClick: () => {},
	css: '',
};
