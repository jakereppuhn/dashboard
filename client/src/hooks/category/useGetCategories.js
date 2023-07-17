import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetCategories = () => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get('http://localhost:3001/api/category', {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				setCategories(data);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, [user]);

	return { categories, error, isLoading };
};
