import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar((prev) => !prev);
	};

	return (
		<div className="h-screen w-screen flex overflow-hidden">
			{showSidebar && <Sidebar show={showSidebar} />}
			<div className={`flex flex-col w-full ${showSidebar ? 'ml-60' : ''}`}>
				<Navbar toggleSidebar={toggleSidebar} />
				<main className="py-6 px-8 overflow-y-auto h-full bg-bg-light">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
