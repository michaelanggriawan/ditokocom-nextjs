import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Context = React.createContext();

export function Provider({ children }) {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		Axios.get(`https://dev.api.ditoko.com/api/v1/categories`).then((res) => setCategories(res.data.result));
	}, []);
	return <Context.Provider value={{ categories }}>{children}</Context.Provider>;
}

export default Context;
