import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error('useAuth must be used inside an Auth Context Provider');
	}

	return context;
};
