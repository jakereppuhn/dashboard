import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useCreateProduct = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuthContext();

	const createProduct = async (
		name = '',
		sku = '',
		description = '',
		type = '',
		attributes = {},
		isArchived = false,
		initialStock = 0,
		currentStock = 0,
		totalCost = 0,
		totalRevenue = 0,
		totalProfit = 0
	) => {
		const data = {
			name,
			sku,
			description,
			type,
			attributes,
			isArchived,
			initialStock,
			currentStock,
			totalCost,
			totalRevenue,
			totalProfit,
		};

		axios
			.post('http://localhost:3001/api/product', data, {
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
