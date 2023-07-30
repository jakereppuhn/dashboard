import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetOrderData = (dateRange) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/api/order/data?type=sale&startDate=${
						dateRange.startDate.toISOString().split('T')[0]
					}&endDate=${dateRange.endDate.toISOString().split('T')[0]}`
				);
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};
		fetchOrderData();
	}, [dateRange]);

	return { data, loading, error };
};
