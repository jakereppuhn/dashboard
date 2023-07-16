import { useAuthContext } from './useAuthContext';

export const useSignOut = () => {
	const { dispatch } = useAuthContext();

	const signOut = () => {
		sessionStorage.removeItem('accessToken');
		dispatch({ type: 'SIGNOUT' });
	};

	return { signOut };
};