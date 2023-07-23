import { useEffect, useRef, useState } from 'react';

const DatePicker = () => {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [startDateMonth, setStartDateMonth] = useState(new Date());
	const [endDateMonth, setEndDateMonth] = useState(new Date());

	const datePickerRef = useRef(null);

	const getFirstDayOfMonth = (month) =>
		new Date(month.getFullYear(), month.getMonth(), 1);

	const getLastDayOfMonth = (month) =>
		new Date(month.getFullYear(), month.getMonth() + 1, 0);

	const getDaysArrayForMonth = (month) => {
		const firstDay = getFirstDayOfMonth(month);
		const lastDay = getLastDayOfMonth(month);
		const daysArray = [];
		const currentDate = new Date(firstDay);

		while (currentDate <= lastDay) {
			daysArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return daysArray;
	};

	const handleStartDateSelect = (date) => {
		setStartDate(date);
	};

	const handleEndDateSelect = (date) => {
		setEndDate(date);
	};

	const handlePrevStartMonth = () => {
		setStartDateMonth(
			new Date(startDateMonth.getFullYear(), startDateMonth.getMonth() - 1, 1)
		);
	};

	const handleNextStartMonth = () => {
		setStartDateMonth(
			new Date(startDateMonth.getFullYear(), startDateMonth.getMonth() + 1, 1)
		);
	};

	const handlePrevEndMonth = () => {
		setEndDateMonth(
			new Date(endDateMonth.getFullYear(), endDateMonth.getMonth() - 1, 1)
		);
	};

	const handleNextEndMonth = () => {
		setEndDateMonth(
			new Date(endDateMonth.getFullYear(), endDateMonth.getMonth() + 1, 1)
		);
	};

	const startMonthDays = getDaysArrayForMonth(startDateMonth);
	const endMonthDays = getDaysArrayForMonth(endDateMonth);

	const getDayOfWeek = (date) => date.getDay();

	// Get the day of the week for the first day of the month
	const firstDayOfWeek = getDayOfWeek(startMonthDays[0]);

	// Generate empty div elements for the previous month days before the first day of the current month
	const previousMonthDays = [];
	for (let i = 0; i < firstDayOfWeek; i++) {
		const date = new Date(
			startDateMonth.getFullYear(),
			startDateMonth.getMonth(),
			-firstDayOfWeek + i
		);
		previousMonthDays.push(date);
	}

	// Generate empty div elements for the next month days after the last day of the current month
	const nextMonthDays = [];
	const lastDayOfWeek = getDayOfWeek(startMonthDays[startMonthDays.length - 1]);
	for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
		const date = new Date(
			startDateMonth.getFullYear(),
			startDateMonth.getMonth() + 1,
			i
		);
		nextMonthDays.push(date);
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				datePickerRef.current &&
				!datePickerRef.current.contains(event.target)
			) {
				setIsDatePickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative lg:w-96">
			<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<svg
					className="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"></path>
				</svg>
			</div>
			<input
				type="text"
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				placeholder="mm/dd/yyyy - mm/dd/yyyy"
				onFocus={() => setIsDatePickerOpen(true)}
				onClick={() => setIsDatePickerOpen(!false)}
				autoComplete="off"
			/>
			{isDatePickerOpen && (
				<div className="absolute right-0 mt-4 w-max rounded-md shadow-lg overflow-hidden z-50 drop-shadow-md">
					<div className="flex items-center justify-center w-full bg-gray-50 dark:bg-gray-800 dark:text-white">
						<div
							className="flex bg-white dark:bg-gray-800 shadow-lg rounded-xl"
							ref={datePickerRef}>
							<div className="py-6 border-r-2 border-gray-100 dark:border-gray-900">
								<ul className="flex flex-col text-xs">
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 7 days
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 14 days
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 30 days
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 3 months
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 12 months
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Month to date
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Quarter to date
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											All time
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Custom
										</button>
									</li>
								</ul>
							</div>
							<div className="flex flex-col">
								<div className="flex divide-x">
									<div className="flex flex-col px-6 pt-5 pb-6 border-b-2 border-gray-100 dark:border-gray-900">
										<div className="flex items-center justify-between">
											<button
												onClick={handlePrevStartMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600">
												<svg
													className="w-6 h-6 text-gray-900 stroke-current dark:text-gray-400"
													fill="none">
													<path
														d="M13.25 8.75L9.75 12l3.5 3.25"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
											<div className="text-sm font-semibold">
												{startDateMonth.toLocaleString('default', {
													month: 'long',
													year: 'numeric',
												})}
											</div>
											<button
												onClick={handleNextStartMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600">
												<svg
													className="w-6 h-6 text-gray-900 dark:text-gray-400 stroke-current"
													fill="none">
													<path
														d="M10.75 8.75l3.5 3.25-3.5 3.25"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
										</div>
										<div className="grid grid-cols-7 text-xs text-center text-gray-900 dark:text-primary-500">
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Su
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Mo
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Tu
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												We
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Th
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Fri
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Sa
											</span>
											{previousMonthDays.map((date) => (
												<span
													key={date.toISOString()}
													className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"></span>
											))}
											{startMonthDays.map((day, index) => (
												<span
													key={index}
													className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
													{day.getDate()}
												</span>
											))}
											{nextMonthDays.map((date) => (
												<span
													key={date.toISOString()}
													className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"></span>
											))}
										</div>
									</div>
									<div className="flex flex-col px-6 pt-5 pb-6 border-b border-gray-100">
										<div className="flex items-center justify-between">
											<button
												onClick={handlePrevEndMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50">
												<svg
													className="w-6 h-6 text-gray-900 stroke-current"
													fill="none">
													<path
														d="M13.25 8.75L9.75 12l3.5 3.25"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
											<div className="text-sm font-semibold">
												{endDateMonth.toLocaleString('default', {
													month: 'long',
													year: 'numeric',
												})}
											</div>
											<button
												onClick={handleNextEndMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50">
												<svg
													className="w-6 h-6 text-gray-900 stroke-current"
													fill="none">
													<path
														d="M10.75 8.75l3.5 3.25-3.5 3.25"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
										</div>
										<div className="grid grid-cols-7 text-xs text-center text-gray-900">
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Su
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Mo
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Tu
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												We
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Th
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Fri
											</span>
											<span className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
												Sa
											</span>
											{endMonthDays.map((day) => (
												<span
													key={day.toISOString()}
													className="flex items-center justify-center w-10 h-10 font-semibold rounded-lg">
													{day.getDate()}
												</span>
											))}
										</div>
									</div>
								</div>
								<div className="flex items-center justify-between px-6 py-4">
									<div className="flex items-center">
										<input
											type="text"
											value={startDate}
											onChange={(e) => handleStartDateSelect(e.target.value)}
											className="flex w-32 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
											placeholder="18 / 02 / 2021"
										/>
										<div className="p-1">
											<svg
												className="w-6 h-6 text-gray-900 dark:text-gray-400 stroke-current"
												fill="none">
												<path
													d="M6.738 12.012h10.5m-4.476 4.25l4.5-4.25-4.5-4.25"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<input
											type="text"
											value={endDate}
											onChange={(e) => handleEndDateSelect(e.target.value)}
											className="flex w-32 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
											placeholder="11 / 03 / 2021"
										/>
									</div>
									<div className="flex items-center space-x-2">
										<button
											onClick={() => setIsDatePickerOpen(false)}
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
											type="button">
											Cancel
										</button>
										<button
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
											type="button">
											Confirm
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
