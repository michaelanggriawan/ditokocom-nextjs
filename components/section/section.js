import PropTypes from 'prop-types';

export function Section({ children, px0, inner, css }) {
	let padding = 'ditoko__paddingSectionX';
	if (px0) {
		padding = '';
	} else if (inner) {
		padding = 'ditoko__pr15 ditoko__pl20';
	}

	return (
		<div className={` ${css}`}>
			<div className={`ditoko__bgWhite ditoko__paddingSectionY ${padding} `}>{children}</div>
			<div className='ditoko__borderBottomBlack1 ditoko__ml15 ditoko__mr15' />
		</div>
	);
}

Section.propTypes = {
	px0: PropTypes.bool,
	inner: PropTypes.bool,
};
