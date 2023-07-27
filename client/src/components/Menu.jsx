import React from 'react';
import { BsGear, BsInfoCircle, BsBell } from 'react-icons/bs';

function Menu({ onClose, className }) {
	return (
		<div className={`${className} flex flex-col items-end`}>
			<div className="menu-item relative mb-4">
				<div className="menu-icon text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
					<BsGear />
				</div>
				<div className="menu-label absolute right-full top-0 mt-3 mr-2 text-white px-2 py-1 rounded bg-blue-500 hidden">
					Settings
				</div>
			</div>
			<div className="menu-item relative mb-4">
				<div className="menu-icon text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
					<BsInfoCircle />
				</div>
				<div className="menu-label absolute right-full top-0 mt-3 mr-2 text-white px-2 py-1 rounded bg-blue-500 hidden">
					Info
				</div>
			</div>
			<div className="menu-item relative mb-4">
				<div className="menu-icon text-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
					<BsBell />
				</div>
				<div className="menu-label absolute right-full top-0 mt-3 mr-2 text-white px-2 py-1 rounded bg-blue-500 hidden">
					Notifications
				</div>
			</div>
		</div>
	);
}

export default Menu;
