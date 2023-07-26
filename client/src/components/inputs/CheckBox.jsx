import { useState } from 'react';

function Checkbox() {
	const [checked, setChecked] = useState(false);

	return (
		<label className="relative inline-block cursor-pointer">
			<input
				id="default-checkbox"
				type="checkbox"
				className="sr-only"
				checked={checked}
				onChange={() => setChecked(!checked)}
			/>
			<div
				className={`w-[18px] h-[18px] rounded  flex items-center justify-center border border-gray-500 ${
					checked ? 'text-blue-400 border-blue-500' : 'bg-gray-800 text-gray-500'
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
