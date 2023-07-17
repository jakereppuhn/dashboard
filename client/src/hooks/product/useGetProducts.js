import { useState } from 'react';
import axios from 'axios';

export const useGetProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getProducts = async () => {
		setIsLoading(true);
		axios
			.get('http://localhost:3001/api/products')
			.then((response) => {
				if (response.data.error) {
					setError(response.data.error);
				} else {
					setProducts(response.data);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message || 'An error occurred');
				setIsLoading(false);
			});
	};

	return { getProducts, products, isLoading, error };
};
