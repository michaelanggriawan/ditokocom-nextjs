import React, { useState, useMemo } from 'react';

const Context = React.createContext();

export function Provider({ children }) {
	const [products, setProducts] = useState(null);
	const [buyer, setBuyer] = useState({ name: '', phone: '08' });
	const [activeStep, setActiveStep] = useState(0);
	const dispatch = useMemo(
		() => ({
			products: (payload) => setProducts(payload),
			buyer: (payload) => setBuyer(payload),
			activeStep: (payload) => setActiveStep(payload),
			nextStep() {
				setActiveStep((prev) => prev + 1);
			},
		}),
		[]
	);

	return <Context.Provider value={{ buyer, products, activeStep, dispatch }}>{children}</Context.Provider>;
}

export default Context;
