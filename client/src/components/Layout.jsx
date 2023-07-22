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
				<main className="overflow-y-auto flex-auto bg-bg-light">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
