import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { requestHeaders } from '../helpers/index';

const Context = React.createContext();

export function Provider({ children }) {
	const [user, setUser] = useState(null);

	const getUser = useCallback((token = localStorage.getItem('token')) => {
		if (token) {
			Axios.get('https://dev.api.ditoko.com/api/v1/' + 'user', requestHeaders(token))
				.then((res) => {
					// console.log(res);
					setUser({ ...res.data.result, token });

					localStorage.setItem('token', token);
				})
				.catch((err) => {
					if (err) {
						if (err.response) {
							if (err.response.status === 429) {
								console.log(err.response.status);
								alert('Jangan terlalu cepat pindah halaman');
							}
							if (err.response.status === 403) {
								console.log(err.response.status);
								let resfresh = localStorage.getItem('refreshToken');

								// localStorage.removeItem('refreshToken');
								let axiosOrderConfig = {
									headers: {
										Accept: 'application/json',
									},
								};
								const form = new FormData();
								form.append('refresh_token', resfresh);
								let urlToken = `${process.env.REACT_APP_API_ENDPOINT}refresh-token`;
								Axios.post(urlToken, form, axiosOrderConfig)
									.then((res) => {
										if (res.status === 200) {
											console.log(res);
											localStorage.setItem('token', res.data.result.access_token);
											localStorage.setItem('refreshToken', res.data.result.refresh_token);
											window.location.reload();
										}
									})
									.catch((err) => {
										if (err) {
											console.log('refresh token error');
											localStorage.removeItem('token');
											window.location.reload();
										}
									});
							}
						}
					}
				});
		}
	}, []);

	const dispatch = useMemo(
		() => ({
			user: (token) => getUser(token),
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Context.Provider value={{ user, dispatch }}>{children}</Context.Provider>;
}

export default Context;
