import { useEffect, useRef, useState } from 'react';

const DatePicker = ({ setDateRange }) => {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [rangeFilter, setRangeFilter] = useState(null);

	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const [monthDays, setMonthDays] = useState([]);

	const datePickerRef = useRef(null);

	const filterOptions = [
		{
			text: 'Last 7 days',
			value: '7D',
		},
		{
			text: 'Last 14 days',
			value: '14D',
		},
		{
			text: 'Last 30 days',
			value: '30D',
		},
		{
			text: 'Last 3 months',
			value: '3M',
		},
		{
			text: 'Last 12 months',
			value: '12M',
		},
		{
			text: 'Month to date',
			value: 'MTD',
		},
		{
			text: 'Year to date',
			value: 'YTD',
		},
		{
			text: 'All time',
			value: 'AT',
		},
	];

	const handleFilterOptions = (option) => {
		setRangeFilter(option.value);
	};

	const getFirstDayOfMonth = (year, month) => {
		const firstDay = new Date(year, month, 1);
		return firstDay;
	};

	const getLastDayOfMonth = (year, month) => {
		const lastDay = new Date(year, month + 1, 0);
		return lastDay;
	};

	const [startDate, setStartDate] = useState(
		getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth())
	);
	const [endDate, setEndDate] = useState(
		getLastDayOfMonth(new Date().getFullYear(), new Date().getMonth())
	);

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

	const handleSetDateRange = () => {
		if (startDate && endDate) {
			setDateRange({ startDate, endDate });
		} else if (startDate && !endDate) {
			setDateRange({ startDate, endDate: new Date() });
		} else {
			setDateRange(null);
		}
	};

	const handleDateClick = (date) => {
		const clickedDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);

		if (!startDate) {
			setStartDate(clickedDate);
		} else if (startDate && !endDate) {
			if (clickedDate >= startDate) {
				setEndDate(clickedDate);
			} else {
				console.log('End date must be after start date');
				setStartDate(null);
				return;
			}
		} else if (startDate && endDate) {
			setStartDate(null);
			setEndDate(null);
		}
	};

	const isDateSelected = (date) => {
		return (
			(startDate && date.getTime() === startDate.getTime()) ||
			(endDate && date.getTime() === endDate.getTime())
		);
	};

	const isDateInRange = (date) => {
		const selectedDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
		return (
			startDate && endDate && selectedDate > startDate && selectedDate < endDate
		);
	};

	const isStartDate = (date) => {
		return startDate && date.getTime() === startDate.getTime();
	};

	const isEndDate = (date) => {
		return endDate && date.getTime() === endDate.getTime();
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
		console.log(startDate, endDate);
	}, [startDate, endDate]);

	useEffect(() => {
		const daysArray = getDaysArrayForMonth(selectedYear, selectedMonth - 1);
		const firstDayOfWeek = daysArray[0].getDay();
		const lastDayOfWeek = daysArray[daysArray.length - 1].getDay();

		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
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

	useEffect(() => {
		if (rangeFilter !== null) {
			console.log(rangeFilter);
		}
	}, [rangeFilter]);

	return (
		<div className="relative w-max pl-3">
			<div className="flex items-center pb-4">
				<input
					type="text"
					value={
						startDate
							? startDate.toLocaleString().split(',')[0]
							: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
									.toLocaleString()
									.split(',')[0]
					}
					onFocus={() => setDatePickerOpen(true)}
					onClick={() => setDatePickerOpen(!false)}
					onChange={(e) => setStartDate(e.target.value)}
					className="flex w-32 items-center text-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
					value={
						endDate
							? endDate.toLocaleString().split(',')[0]
							: new Date().toLocaleString().split(',')[0]
					}
					onFocus={() => setDatePickerOpen(true)}
					onClick={() => setDatePickerOpen(!false)}
					onChange={(e) => setStartDate(e.target.value)}
					className="flex w-32 items-center justify-center text-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				/>
			</div>
			{datePickerOpen && (
				<div className="absolute right-0 w-max rounded-md shadow-lg overflow-hidden z-50 drop-shadow-md">
					<div className="flex items-center justify-center w-full bg-gray-50 dark:bg-gray-800 dark:text-white">
						<div
							className="flex bg-white dark:bg-gray-800 shadow-lg rounded-xl"
							ref={datePickerRef}>
							<div className="py-6">
								<ul className="flex flex-col text-sm">
									{filterOptions.map((option) => (
										<li key={option.value}>
											<button
												onClick={() => handleFilterOptions(option)}
												className="px-6 py-1.5 w-full leading-5 rounded-r hover:bg-gray-50 hover:text-primary text-left dark:hover:bg-gray-900 dark:hover:text-gray-400">
												{option.text}
											</button>
										</li>
									))}
								</ul>
							</div>
							<div className="flex flex-col">
								<div className="flex ">
									<div className="flex flex-col px-6 pt-5">
										<div className="flex items-center justify-between">
											<button
												onClick={handlePrevMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900">
												<svg
													className="w-6 h-6 text-gray-900 stroke-current dark:text-gray-600"
													fill="none">
													<path
														d="M13.25 8.75L9.75 12l3.5 3.25"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</button>
											<button
												onClick={() => {
													setSelectedYear(new Date().getFullYear());
													setSelectedMonth(new Date().getMonth() + 1);
												}}>
												<div className="text-sm font-semibold">
													{new Date(
														selectedYear,
														selectedMonth - 1
													).toLocaleString('default', {
														month: 'long',
														year: 'numeric',
													})}
												</div>
											</button>
											<button
												onClick={handleNextMonth}
												className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900">
												<svg
													className="w-6 h-6 text-gray-900 dark:text-gray-600 stroke-current"
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
												<button
													key={date.toISOString()}
													onClick={() => handleDateClick(date)}>
													<div
														className={`bg-opacity-50 ${
															(isDateInRange(date) && 'bg-primary') ||
															(isDateSelected(date) && 'bg-primary')
														} ${isStartDate(date) && 'rounded-l-lg'} ${
															isEndDate(date) && 'rounded-r-lg'
														}`}>
														<span
															className={`flex items-center justify-center w-10 h-10 font-semibold hover:rounded-lg ${
																date.getMonth() === selectedMonth - 1
																	? 'text-white hover:bg-gray-900'
																	: 'text-gray-600 hover:bg-gray-900'
															} ${
																isDateSelected(date) &&
																'bg-primary  text-white rounded-lg'
															} ${isDateInRange(date) && 'text-white'}
														
													}`}>
															{date.getDate()}
														</span>
													</div>
												</button>
											))}
										</div>
									</div>
								</div>
								<div className="flex items-center justify-end px-6 py-4">
									<div className="flex items-center space-x-4">
										<button
											onClick={() => {
												setDatePickerOpen(false);
											}}
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
											type="button">
											Cancel
										</button>
										<button
											onClick={() => {
												handleSetDateRange();
												setDatePickerOpen(false);
											}}
											className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
											type="button">
											Apply
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
