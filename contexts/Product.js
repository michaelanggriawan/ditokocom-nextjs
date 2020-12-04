import React, { useState, useMemo } from 'react';

const Context = React.createContext();
export function Provider({ children }) {
	const [data, setData] = useState(null);

	const dispatch = useMemo(
		() => ({
			data: (payload) => setData(payload),
		}),
		[]
	);

	return <Context.Provider value={{ data, dispatch }}>{children}</Context.Provider>;
}

export default Context;
