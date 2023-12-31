import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useDeleteProduct = (productId) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	const deleteProduct = useCallback(async () => {
		setIsLoading(true);
		try {
			await axios.delete(`http://localhost:3001/api/v1/products/${productId}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	}, [productId, user]);

	return { deleteProduct, error, isLoading };
};
