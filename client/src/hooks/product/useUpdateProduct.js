import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAuthContext } from '../user/useAuthContext';

export const useUpdateProduct = (productId) => {
	const queryClient = useQueryClient();

	const { user } = useAuthContext();

	return useMutation(
		async ({ updatedData }) => {
			const { data } = await axios.put(
				`http://localhost:3001/api/product/${productId}`,
				updatedData,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			return data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('products');
			},
		}
	);
};
