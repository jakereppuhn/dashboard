import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetAllOrders = () => {
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuthContext();

	const fetchOrders = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get('http://localhost:3001/api/order', {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			setOrders(data);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return { orders, error, isLoading, refetch: fetchOrders };
};
