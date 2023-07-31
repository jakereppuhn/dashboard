import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetOrders = (
	page = 1,
	limit = 10,
	type = null,
	sort = 'createdAt'
) => {
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [total, setTotal] = useState(0);

	const { user } = useAuthContext();

	const fetchOrders = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get('http://localhost:3001/api/v1/orders', {
				params: {
					page,
					limit,
					type,
					sort,
				},
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			setOrders(data.data);
			setTotalPages(data.totalPages);
			setTotal(data.total);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	}, [user, page, limit, type, sort]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return { orders, error, isLoading, totalPages, total, refetch: fetchOrders };
};
