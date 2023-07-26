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
				className={`w-4 h-4 rounded bg-gray-500 flex items-center justify-center ${
					checked ? 'bg-blue-600' : 'bg-gray-500'
				}`}>
				{checked && (
					<svg
						fill="none"
						className="text-white"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				)}
			</div>
		</label>
	);
}

export default Checkbox;
