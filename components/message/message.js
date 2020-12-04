import PropTypes from 'prop-types';

export function Message({ children, type = 'error', size, css }) {
	switch (size) {
		default:
			size = 'defaultMsg';
			break;
		case 'big':
			size = 'bigMsg';
			break;
		case 'medium':
			size = 'mediumMsg';
			break;
		case 'small':
			size = 'smallMsg';
			break;
	}
	return <p className={`ditoko__textAlert ${size} ${css} ${type === 'error' ? 'ditoko__alertError' : 'ditoko__alertSucces'}`}>{children}</p>;
}

Message.propTypes = {
	type: PropTypes.oneOf(['error', 'success']),
};
