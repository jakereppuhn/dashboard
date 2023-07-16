const Navbar = ({toggleSidebar}) => (
	<nav className="bg-bg-light py-4 px-8 w-full z-10 flex justify-between items-center border-b-2 border-gray-100">
		<button
			onClick={toggleSidebar}
			className="text-gray-800 rounded-lg bg-white w-10 h-10 items-center justify-center flex shadow">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
		<div className="flex items-center space-x-4">
			<div className="relative">
				<input
					className="rounded-lg pl-10 pr-4 py-2 bg-white focus:outline-none shadow"
					type="text"
					placeholder="Search"
				/>
				<svg
					className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M21 21l-6-6m2-6a6 6 0 11-12 0 6 6 0 0112 0z"></path>
				</svg>
			</div>
			<button className="text-gray-800 rounded-lg bg-white w-10 h-10 items-center justify-center flex shadow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
					/>
				</svg>
			</button>
			<div className="w-10 h-10 rounded-lg bg-white shadow"></div>
			{/* Replace above div with user avatar img */}
		</div>
	</nav>
);

export default Navbar;
