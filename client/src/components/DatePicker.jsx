import { useEffect, useRef, useState } from 'react';

const DatePicker = () => {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const [monthDays, setMonthDays] = useState([]);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const datePickerRef = useRef(null);

	const getFirstDayOfMonth = (year, month) => {
		const firstDay = new Date(year, month, 1);
		return firstDay;
	};

	const getLastDayOfMonth = (year, month) => {
		const lastDay = new Date(year, month + 1, 0);
		return lastDay;
	};

	const getDaysArrayForMonth = (year, month) => {
		const firstDay = getFirstDayOfMonth(year, month);
		const lastDay = getLastDayOfMonth(year, month);
		const daysArray = [];
		let currentDate = new Date(firstDay);

		while (currentDate <= lastDay) {
			daysArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return daysArray;
	};

	const handleDateClick = (date) => {
		const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
		if (!startDate) {
			setStartDate(selectedDate);
		} else if (!endDate && selectedDate >= startDate) {
			setEndDate(selectedDate);
		} else {
			setStartDate(selectedDate);
			setEndDate(null);
		}
	};

	const isDateSelected = (date) => {
		const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
		return (
			startDate &&
			endDate &&
			selectedDate >= startDate &&
			selectedDate <= endDate
		);
	};

	const isDateInRange = (date) => {
		const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
		return (
			startDate && endDate && selectedDate > startDate && selectedDate < endDate
		);
	};

	const handlePrevMonth = () => {
		if (selectedMonth === 1) {
			setSelectedYear((prevYear) => prevYear - 1);
			setSelectedMonth(12);
		} else {
			setSelectedMonth((prevMonth) => prevMonth - 1);
		}
	};

	const handleNextMonth = () => {
		if (selectedMonth === 12) {
			setSelectedYear((prevYear) => prevYear + 1);
			setSelectedMonth(1);
		} else {
			setSelectedMonth((prevMonth) => prevMonth + 1);
		}
	};

	useEffect(() => {
		const daysArray = getDaysArrayForMonth(selectedYear, selectedMonth - 1);
		const firstDayOfWeek = daysArray[0].getDay();
		const lastDayOfWeek = daysArray[daysArray.length - 1].getDay();

		if (firstDayOfWeek > 0) {
			for (let i = 1; i <= firstDayOfWeek; i++) {
				daysArray.unshift(new Date(selectedYear, selectedMonth - 1, -i));
			}
		}

		if (lastDayOfWeek < 6) {
			for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
				daysArray.push(new Date(selectedYear, selectedMonth, i));
			}
		}

		setMonthDays(daysArray);
	}, [selectedMonth, selectedYear]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				datePickerRef.current &&
				!datePickerRef.current.contains(event.target)
			) {
				setDatePickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative w-1/4 pl-3">
			<div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none">
				<svg
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-gray-400"
					aria-hidden="true">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
					/>
				</svg>
			</div>
			<input
				type="text"
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				placeholder="mm/dd/yyyy - mm/dd/yyyy"
				onFocus={() => setDatePickerOpen(true)}
				onClick={() => setDatePickerOpen(!false)}
				autoComplete="off"
			/>
			{datePickerOpen && (
				<div className="absolute right-0 mt-4 w-max rounded-md shadow-lg overflow-hidden z-50 drop-shadow-md">
					<div className="flex items-center justify-center w-full bg-gray-50 dark:bg-gray-800 dark:text-white">
						<div
							className="flex bg-white dark:bg-gray-800 shadow-lg rounded-xl"
							ref={datePickerRef}>
							<div className="py-6">
								<ul className="flex flex-col text-xs">
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left">
											Last 7 days
										</button>
									</li>
									<li>
										<button className="px-6 py-1.5 w-full leading-5 hover:bg-gray-600 hover:text-blue-600 text-left">
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
								<div className="flex ">
									<div className="flex flex-col px-6 pt-5">
										<div className="flex items-center pb-4">
											<input
												type="text"
												value={startDate}
												onChange={(e) => handleDateClick(e.target.value)}
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
												onChange={(e) => handleDateClick(e.target.value)}
												className="flex w-32 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
												placeholder="11 / 03 / 2021"
											/>
										</div>
										<div className="flex items-center justify-between">
											<button
												onClick={handlePrevMonth}
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
												{new Date(
													selectedYear,
													selectedMonth - 1
												).toLocaleString('default', {
													month: 'long',
													year: 'numeric',
												})}
											</div>
											<button
												onClick={handleNextMonth}
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
										<div className="grid grid-cols-7 text-xs text-center text-gray-900 dark:text-white">
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
											{monthDays.map((date) => (
												<button key={date.toISOString()}>
													<span
														className={`flex items-center justify-center w-10 h-10 font-semibold rounded-xl ${
															date.getMonth() === selectedMonth - 1
																? 'text-white hover:bg-blue-500'
																: 'text-gray-600 hover:bg-gray-400'
														}`}>
														{date.getDate()}
													</span>
												</button>
											))}
										</div>
									</div>
								</div>
								<div className="flex items-center justify-end px-6 py-4">
									<div className="flex items-center space-x-4">
										<button
											onClick={() => setDatePickerOpen(false)}
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
											type="button">
											Cancel
										</button>
										<button
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
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
