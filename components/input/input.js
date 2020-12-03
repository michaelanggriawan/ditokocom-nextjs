import PropTypes from 'prop-types';

export function Input({
	id = '',
	label = '',
	type = '',
	value = '',
	placeholder = '',
	name,
	onChange,
	error,
	css,
	block = true,
	autoComplete,
	disabled,
	labelHidden,
}) {
	return (
		<>
			<label htmlFor={id} className={` ditoko__inputLabel ditoko__mt10 ${labelHidden ? 'ditoko__hidden' : 'ditoko__block'}`}>
				{label}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				autoComplete={autoComplete}
				disabled={disabled}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`ditoko__input ${error ? ' ditoko__inputError' : ''}${block ? ' ditoko__inputBlock' : ''} ${css}`}
			/>
		</>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.elementType]),
	type: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.bool,
	block: PropTypes.bool,
};

Input.defaultProps = {
	css: '',
};

export function BnbInput({ label, type, name, onChange, disabled, onError, css, value, id }) {
	return (
		<section className={`${onError ? 'ditoko__inputError' : ''} ${disabled ? 'ditoko__bnbInputDisable' : ''} ditoko__bnbInput`}>
			<input
				onChange={onChange}
				type={type}
				id={id}
				disabled={disabled}
				name={name}
				autoComplete='off'
				required
				value={value}
				className={`${css}`}
			/>
			<label className={`${disabled ? 'ditoko__hidden' : ''}`} htmlFor={label}>
				<span>{label}</span>
			</label>
		</section>
	);
}
