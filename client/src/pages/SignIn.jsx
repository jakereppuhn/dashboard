import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignIn } from '../hooks/user/useSignIn';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signIn } = useSignIn();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signIn(email, password);
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
				<h2 className="mb-6 text-xl font-semibold">Sign In</h2>
				<input
					className="w-full mb-4 p-2 border border-gray-300 rounded"
					type="text"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					placeholder="Email"
				/>
				<input
					className="w-full mb-4 p-2 border border-gray-300 rounded"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					placeholder="Password"
				/>
				<button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
					Sign In
				</button>
				<Link to="/signup">Sign Up</Link>
			</form>
		</div>
	);
};

export default SignIn;
