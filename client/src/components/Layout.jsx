import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar((prev) => !prev);
	};

	return (
		<div className="h-screen w-screen flex overflow-hidden">
			{showSidebar && (
				<Sidebar
					show={showSidebar}
					onClose={toggleSidebar}
					className={`fixed inset-0 z-50 bg-white transform ease-in-out duration-500 sm:relative sm:translate-x-0 sm:static sm:inset-auto ${
						showSidebar ? 'translate-x-0' : '-translate-x-full'
					}`}
				/>
			)}
			<div
				className={`flex flex-col w-full transform transition-transform duration-500 ease-in-out ${
					showSidebar ? 'ml-60 sm:ml-0' : ''
				} ${showSidebar && 'md:ml-60'}`}>
				<Navbar toggleSidebar={toggleSidebar} />
				<main className="overflow-y-auto flex-auto bg-bg-light">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
