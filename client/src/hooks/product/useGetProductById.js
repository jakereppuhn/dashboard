import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetProductById = (productId) => {
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		const fetchProduct = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(
					`http://localhost:3001/api/product/${productId}`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				setProduct(data);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	return { product, error, isLoading };
};
