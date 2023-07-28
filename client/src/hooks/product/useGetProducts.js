import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetAllProducts = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	let sortBy = 'a-z';

	const fetchProducts = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get('http://localhost:3001/api/product', {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			const sortedData = [...data].sort((a, b) => {
				let compareA, compareB;

				compareA = a.productName.toUpperCase();
				compareB = b.productName.toUpperCase();

				if (sortBy.endsWith('a-z')) {
					return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
				} else if (sortBy.endsWith('z-a')) {
					return compareA > compareB ? -1 : compareA < compareB ? 1 : 0;
				}

				return 0;
			});

			setProducts(sortedData);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	}, [user, sortBy]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return { products, error, isLoading, refetch: fetchProducts };
};
