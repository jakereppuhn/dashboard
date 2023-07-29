import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import {
	Dashboard,
	Products,
	SignIn,
	Transactions,
	UserSettings,
} from './pages';
import { useAuthContext } from './hooks/user/useAuthContext';

const ProtectedRoutes = () => {
	const { user } = useAuthContext();
	const location = useLocation();

	useEffect(() => {
		if (!user && location.pathname !== '/signin') {
			sessionStorage.setItem('redirectPath', location.pathname);
		}
	}, [user, location.pathname]);

	return (
		<Routes>
			<Route
				path="/signin"
				element={!user ? <SignIn /> : <Navigate to="/dashboard" />}
			/>

			<Route
				path="/dashboard"
				element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />}
			/>

			<Route
				path="/products"
				element={user ? <Products /> : <Navigate to="/signin" />}
			/>

			<Route
				path="/transactions"
				element={user ? <Transactions /> : <Navigate to="/signin" />}
			/>

			<Route
				path="/settings"
				element={user ? <UserSettings /> : <Navigate to="/signin" />}
			/>
		</Routes>
	);
};

const App = () => {
	return (
		<Router>
			<ProtectedRoutes />
		</Router>
	);
};

export default App;
