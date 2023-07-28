import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetAllProducts = (sortBy) => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get('http://localhost:3001/api/product', {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				const sortedData = data.sort((a, b) =>
					a.productName.localeCompare(b.productName)
				);
				setProducts(sortedData);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const sortedProducts = [...products].sort((a, b) => {
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

		setProducts(sortedProducts);
	}, [sortBy]);

	return { products, error, isLoading };
};
