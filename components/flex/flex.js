import PropTypes from 'prop-types';

export const FlexCenter = ({ children, css = '' }) => <div className={`ditoko__flexCenter ${css}`}>{children}</div>;
FlexCenter.propTypes = {
	css: PropTypes.string,
};

export const FlexItemsContentCenter = ({ children, css = '' }) => <div className={`ditoko__flexItemsContentCenter ${css}`}>{children}</div>;
FlexItemsContentCenter.propTypes = {
	css: PropTypes.string,
};

export const FlexItemsCenter = ({ children, css = '' }) => <div className={`ditoko__flexItemsCenter ${css}`}>{children}</div>;
FlexItemsCenter.propTypes = {
	css: PropTypes.string,
};

export const FlexBetween = ({ children, css = '' }) => <div className={`ditoko__flexBetween ${css}`}>{children}</div>;
FlexBetween.propTypes = {
	css: PropTypes.string,
};

export const FlexColumnItemsContentCenter = ({ children, css = '' }) => (
	<div className={`ditoko__flexColumnItemsContentCenter ${css}`}>{children}</div>
);
FlexColumnItemsContentCenter.propTypes = {
	css: PropTypes.string,
};

export default {
	FlexCenter,
	FlexBetween,
	FlexColumnItemsContentCenter,
	FlexItemsContentCenter,
	FlexItemsCenter,
};
