import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignIn = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signIn = async (email, password) => {
		const data = { email, password };
		setIsLoading(true);
		axios.post('http://localhost:3001/auth/signin', data).then((response) => {
			if (response.data.error) {
				setError(response.data.error);
				setIsLoading(false);
			} else {
				sessionStorage.setItem('accessToken', response.data);
				dispatch({ type: 'SIGNIN', payload: response.data });
				setIsLoading(false);
			}
		});
	};

	return { signIn, isLoading, error };
};