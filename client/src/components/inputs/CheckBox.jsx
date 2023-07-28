import { useState } from 'react';

function Checkbox({ onChange }) {
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		const newChecked = !checked;
		setChecked(newChecked);
		onChange(newChecked);
	};

	return (
		<label className="relative inline-block cursor-pointer">
			<input
				id="default-checkbox"
				type="checkbox"
				className="sr-only"
				checked={checked}
				onChange={handleClick}
			/>
			<div
				className={`w-[18px] h-[18px] rounded  flex items-center justify-center border border-gray-500 p-0.5 ${
					checked
						? 'text-blue-400 border-primary-500'
						: 'bg-gray-800 text-gray-500'
				}`}>
				<svg
					fill="none"
					stroke="currentColor"
					strokeWidth={3}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4.5 12.75l6 6 9-13.5"
					/>
				</svg>
			</div>
		</label>
	);
}

export default Checkbox;
