import { useState } from 'react';

const Dropdown = ({ setDateRange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	const options = [
		'Today',
		'This Week',
		'This Month',
		'This Quarter',
		'This Year',
		'Last Week',
		'Last Month',
		'Last Quarter',
		'Last Year',
		'All Time',
		'Custom',
	];

	const setRange = (option) => {
		let startDate, endDate;
		endDate = new Date();

		switch (option) {
			case 'Today': {
				startDate = new Date();
				break;
			}
			case 'This Week': {
				const day = endDate.getDay();
				startDate = new Date();
				startDate.setDate(endDate.getDate() - day);
				break;
			}
			case 'This Month': {
				startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
				break;
			}
			case 'This Quarter': {
				let quarter = Math.floor(endDate.getMonth() / 3);
				startDate = new Date(endDate.getFullYear(), quarter * 3, 1);
				break;
			}
			case 'This Year': {
				startDate = new Date(endDate.getFullYear(), 0, 1);
				break;
			}
			case 'Last Week': {
				const day = endDate.getDay();
				startDate = new Date();
				startDate.setDate(endDate.getDate() - day - 7);
				endDate.setDate(endDate.getDate() - day - 1);
				break;
			}
			case 'Last Month': {
				startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
				endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
				break;
			}
			case 'Last Quarter': {
				let quarter = Math.floor(endDate.getMonth() / 3);
				startDate = new Date(endDate.getFullYear(), quarter * 3 - 3, 1);
				endDate = new Date(endDate.getFullYear(), quarter * 3, 0);
				break;
			}
			case 'Last Year': {
				startDate = new Date(endDate.getFullYear() - 1, 0, 1);
				endDate = new Date(endDate.getFullYear() - 1, 11, 31);
				break;
			}
			case 'All Time': {
				startDate = new Date(0);
				break;
			}
			case 'Custom': {
				startDate = new Date();
				endDate = new Date();
				break;
			}
			default: {
				console.error('Unexpected option:', option);
				return;
			}
		}

		setDateRange({
			startDate,
			endDate,
		});
	};

	const toggling = () => setIsOpen(!isOpen);

	const onOptionClicked = (value) => () => {
		setSelectedOption(value);
		setRange(value);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					className="inline-flex justify-between w-36 rounded-md ring-1 ring-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
					id="options-menu"
					aria-haspopup="true"
					aria-expanded="true"
					onClick={toggling}>
					{selectedOption || options[0]}
					<svg
						className="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right absolute right-0 mt-4 w-36 rounded-md shadow-lg bg-gray-800  ring-1 ring-gray-600  overflow-hidden">
					<div
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu">
						{options.map((option) => (
							<a
								href="#"
								className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
								role="menuitem"
								onClick={onOptionClicked(option)}
								key={Math.random()}>
								{option}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
