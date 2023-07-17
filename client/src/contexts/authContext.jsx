// authContexts.js
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Load the user from localStorage when the app initializes
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const saveUser = (newUser) => {
		setUser(newUser);

		// Save the user to localStorage when it changes
		if (newUser) {
			localStorage.setItem('user', JSON.stringify(newUser));
		} else {
			localStorage.removeItem('user');
		}
	};

	return (
		<AuthContext.Provider value={{ user, saveUser }}>
			{children}
		</AuthContext.Provider>
	);
};
