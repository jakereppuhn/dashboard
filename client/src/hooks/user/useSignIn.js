import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignIn = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { saveUser } = useAuthContext();

	const signIn = async (email, password) => {
		const data = { email, password };
		setIsLoading(true);
		axios
			.post('http://localhost:3001/api/v1/users/signin', data)
			.then((response) => {
				if (response.data.error) {
					setError(response.data.error);
					setIsLoading(false);
				} else {
					sessionStorage.setItem('accessToken', response.data);
					saveUser(response.data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				// handle error
				setError(err.message || 'An error occurred');
				setIsLoading(false);
			});
	};

	return { signIn, isLoading, error };
};
