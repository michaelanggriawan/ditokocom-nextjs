import PropTypes from 'prop-types';

export const P = ({ children, bordered, css = '' }) => (
	<p className={`ditoko__paragraf ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</p>
);

P.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

P.defaultProps = {
	bordered: false,
	css: '',
};

export const Bold = ({ children, bordered, css = '' }) => (
	<bold className={`ditoko__bold ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</bold>
);

Bold.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

Bold.defaultProps = {
	bordered: false,
	css: '',
};

export const H1 = ({ onClick, children, bordered, css = '' }) => (
	<h1 onClick={onClick} className={`ditoko__h1 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>
		{children}
	</h1>
);

H1.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H1.defaultProps = {
	bordered: false,
	css: '',
};

export const H2 = ({ children, bordered, css = '' }) => (
	<h2 className={`ditoko__h2 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</h2>
);

H2.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H2.defaultProps = {
	bordered: false,
	css: '',
};

export const H3 = ({ children, bordered, css = '' }) => (
	<h3 className={`ditoko__h3 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</h3>
);

H3.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H3.defaultProps = {
	bordered: false,
	css: '',
};

export const H4 = ({ children, bordered, css = '' }) => (
	<h4 className={`ditoko__h4 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</h4>
);

H4.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H4.defaultProps = {
	bordered: false,
	css: '',
};

export const H5 = ({ children, bordered, css = '' }) => (
	<h5 className={`ditoko__h5 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</h5>
);

H5.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H5.defaultProps = {
	bordered: false,
	css: '',
};

export const H6 = ({ children, bordered, css = '' }) => (
	<h6 className={`ditoko__h6 ${bordered ? 'ditoko__borderBottom' : ''} ${css} `}>{children}</h6>
);

H6.propTypes = {
	css: PropTypes.string,
	bordered: PropTypes.bool,
};

H6.defaultProps = {
	bordered: false,
	css: '',
};

export const ClickTitle = ({ children, css = '', onClick }) => (
	<div className={`ditoko__titleClick ${css}`} onClick={onClick}>
		{children}
	</div>
);

ClickTitle.propTypes = {
	css: PropTypes.string,
	handleClick: PropTypes.func,
};

ClickTitle.defaultProps = {
	css: '',
	onClick: () => {},
};
