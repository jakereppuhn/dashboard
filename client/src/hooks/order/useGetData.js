import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useGetOrderData = ({ startDate, endDate }) => {
	const [data, setData] = useState(null);

	const { user } = useAuthContext();

	useEffect(() => {
		const fetchOrderData = async () => {
			const response = await axios.get(
				`http://localhost:3001/api/v1/orders/data?type=sale&startDate=${
					startDate.toISOString().split('T')[0]
				}&endDate=${endDate.toISOString().split('T')[0]}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setData(response.data);
		};
		fetchOrderData();
	}, [startDate, endDate]);

	return { data };
};
