export function TextArea({ css = '', cssHidden = '', disabled, error, ...props }) {
	return (
		<textarea
			className={`ditoko__textArea ${css} ${error ? ' ditoko__textAreaError' : ''} ${cssHidden} `}
			disabled={disabled}
			{...props}
		></textarea>
	);
}
