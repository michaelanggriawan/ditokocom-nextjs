import PropTypes from 'prop-types';
export function NormalSelect({ id, title, value, onChange, css = '', cssHidden = '', children, disabled, error }) {
	return (
		<select
			name={id}
			id={id}
			value={value}
			onChange={onChange}
			className={`ditoko__font20 ditoko__p10 ditoko__pl15 ditoko__pr15 ditoko__rounded3 ditoko__widthFullPercent ditoko__mt10 ditoko__select ${css} ${cssHidden} 
         ${error ? ' ditoko__selectError' : ''}`}
			disabled={disabled}
		>
			{title && <option>{title}</option>}
			{children}
		</select>
	);
}

NormalSelect.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	css: PropTypes.string,
};
