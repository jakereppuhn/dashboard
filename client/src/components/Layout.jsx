import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Menu from './Menu';

const Layout = ({ children }) => {
	const [showSidebar, setShowSidebar] = useState(true);
	const [showMenu, setShowMenu] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar((prev) => !prev);
	};

	const toggleMenu = () => {
		setShowMenu((prev) => !prev);
	};

	return (
		<div className="h-screen w-screen flex overflow-hidden">
			{showSidebar && (
				<Sidebar
					show={showSidebar}
					onClose={toggleSidebar}
					className={`fixed inset-0 z-50 bg-white transform ease-in-out duration-500 sm:relative sm:translate-x-0 sm:inset-auto ${
						showSidebar ? 'translate-x-0' : '-translate-x-full'
					}`}
				/>
			)}
			<div
				className={`flex flex-col w-full transform transition-transform duration-500 ease-in-out ${
					showSidebar ? 'ml-60 sm:ml-0' : ''
				} ${showSidebar && 'md:ml-64'}`}>
				<Navbar toggleSidebar={toggleSidebar} />
				<main
					className={`overflow-y-auto flex-auto ${
						showSidebar ? 'ml-64 md:ml-0' : ''
					}  bg-gray-50 dark:bg-gray-900`}>
					{children}
				</main>
			</div>

			{/* <button
				onClick={toggleMenu}
				className="fixed right-4 bottom-4 z-50 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center">
				+
			</button>
			{showMenu && <Menu onClose={toggleMenu} className="fixed inset-0 z-50" />} */}
		</div>
	);
};

export default Layout;
