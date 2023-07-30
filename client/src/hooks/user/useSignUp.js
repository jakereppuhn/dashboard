import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignUp = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signUp = async (firstName, lastName, email, password) => {
		const data = { firstName, lastName, email, password };
		setIsLoading(true);
		axios
			.post('http://localhost:3001/v1/users/signup', data)
			.then((response) => {
				if (response.data.error) {
					setError(response.data.error);
					setIsLoading(false);
				}
				if (response.ok) {
					sessionStorage.setItem('accessToken', response.data);
					dispatch({ type: 'SIGNUP', payload: response.data });
					setIsLoading(false);
				}
			});
	};

	return { signUp, isLoading, error };
};
