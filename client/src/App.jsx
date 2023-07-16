import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import { Dashboard } from './pages';

const ProtectedRoutes = () => {
	const { user } = { user: 'user' };
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
				path="/dashboard"
				element={user ? <Dashboard /> : <Navigate to="/signin" />}
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
