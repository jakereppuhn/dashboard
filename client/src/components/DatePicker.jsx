import { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';

const DatePicker = ({ setDateRange }) => {
	const [rangeFilter, setRangeFilter] = useState(null);

	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const [monthDays, setMonthDays] = useState([]);

	const filterOptions = [
		'Today',
		'This Week',
		'This Month',
		'This Quarter',
		'This Year',
		'Last Week',
		'Last Month',
		'Last Quarter',
		'Last Year',
		// 'All Time',
		// 'Custom',
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

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

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

	useEffect(() => {}, [startDate, endDate]);

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
		if (rangeFilter !== null) {
			console.log(rangeFilter);
		}
	}, [rangeFilter]);

	return (
		<div className="flex justify-between h-full">
			<div className="flex flex-col justify-between px-10 py-4">
				<div className="flex flex-col">
					<div className="flex items-center justify-between">
						<div className="flex gap-1">
							<button
								onClick={handlePrevMonth}
								className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
								<svg
									fill="none"
									stroke="currentColor"
									strokeWidth={1.5}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="h-4 w-4 text-gray-900 dark:text-gray-600">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
									/>
								</svg>
							</button>
							<button
								onClick={handlePrevMonth}
								className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
								<svg
									fill="none"
									stroke="currentColor"
									strokeWidth={1.5}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="h-4 w-4 text-gray-900 dark:text-gray-600">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
							</button>
						</div>
						<button
							onClick={() => {
								setSelectedYear(new Date().getFullYear());
								setSelectedMonth(new Date().getMonth() + 1);
							}}>
							<div className="text-sm font-semibold">
								{new Date(selectedYear, selectedMonth - 1).toLocaleString(
									'default',
									{
										month: 'long',
										year: 'numeric',
									}
								)}
							</div>
						</button>
						<div className="flex gap-1">
							<button
								onClick={handleNextMonth}
								className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
								<svg
									fill="none"
									stroke="currentColor"
									strokeWidth={1.5}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="h-4 w-4 text-gray-900 dark:text-gray-600">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</button>
							<button
								onClick={handleNextMonth}
								className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
								<svg
									fill="none"
									stroke="currentColor"
									strokeWidth={1.5}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="h-4 w-4 text-gray-900 dark:text-gray-600">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</button>
						</div>
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
				{/* <div className="flex items-center justify-end">
					<div className="flex items-center">
						<button
							className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700  dark:bg-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white  md:w-auto"
							type="button">
							Apply
						</button>
					</div>
				</div> */}
			</div>
			<div className="border-l border-gray-600"></div>
			<ul className="hidden lg:flex flex-col text-sm flex-auto px-2 py-4">
				{filterOptions.map((option) => (
					<li key={option}>
						<button
							onClick={() => handleFilterOptions(option)}
							className="px-6 py-2 w-full rounded-lg hover:bg-gray-50 hover:text-primary text-left dark:hover:bg-gray-900 dark:hover:text-gray-400">
							{option}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DatePicker;
