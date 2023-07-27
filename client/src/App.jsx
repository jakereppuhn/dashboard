import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import { Dashboard, Inventory, SignIn, UserSettings } from './pages';
import { useAuthContext } from './hooks/user/useAuthContext';

const ProtectedRoutes = () => {
	const { user } = useAuthContext();
	const location = useLocation();

	useEffect(() => {
		if (!user && location.pathname !== '/login') {
			sessionStorage.setItem('redirectPath', location.pathname);
		}
	}, [user, location.pathname]);

	return (
		<Routes>
			<Route path="/" element={user ? '' : <Navigate to="" />} />

			<Route
				path="/signin"
				element={
					!user ? (
						<SignIn />
					) : (
						<Navigate to={sessionStorage.getItem('redirectPath') || '/'} />
					)
				}
			/>

			<Route
				path="/dashboard"
				element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />}
			/>
			{/* change to inventory */}
			<Route
				path="/inventory"
				element={user ? <Inventory /> : <Navigate to="/signin" />}
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
