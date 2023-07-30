import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useCreateProduct = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuthContext();

	const createProduct = async (
		productName = null,
		productType = null,
		attributes = {},
		isArchived = false
	) => {
		const data = {
			productName,
			productType,
			attributes,
			isArchived,
		};

		axios
			.post('http://localhost:3001/api/v1/products', data, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((response) => {
				if (response.data.error) {
					setError(response.data.error);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			});
	};

	return { createProduct, isLoading, error };
};
