import { useState } from 'react';
import { Layout } from '../components';
import BarChart from '../components/charts/barChart';
import CardChart from '../components/charts/cardChart';

const Dashboard = () => {
	const totalRevenue = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [15000, 16500, 18000, 17000, 17500, 18500, 20000],
				backgroundColor: 'rgba(102, 126, 234, 0.25)',
				borderColor: 'rgba(102, 126, 234, 1)',
				pointBackgroundColor: 'rgba(102, 126, 234, 1)',
				borderWidth: 3,
				tension: 0.4,
			},
		],
	};

	const netProfit = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [5000, 5500, 6000, 5600, 5800, 6100, 7000],
				backgroundColor: 'rgba(102, 126, 234, 0.25)',
				borderColor: 'rgba(102, 126, 234, 1)',
				pointBackgroundColor: 'rgba(102, 126, 234, 1)',
				borderWidth: 3,
				tension: 0.4,
			},
		],
	};

	const profitMargin = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [33.3, 33.3, 33.3, 32.9, 33.1, 33, 35],
				backgroundColor: 'rgba(102, 126, 234, 0.25)',
				borderColor: 'rgba(102, 126, 234, 1)',
				pointBackgroundColor: 'rgba(102, 126, 234, 1)',
				borderWidth: 3,
				tension: 0.4,
			},
		],
	};

	const salesVolume = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [300, 330, 360, 340, 350, 370, 400],
				backgroundColor: 'rgba(102, 126, 234, 0.25)',
				borderColor: 'rgba(102, 126, 234, 1)',
				pointBackgroundColor: 'rgba(102, 126, 234, 1)',
				borderWidth: 3,
				tension: 0.4,
			},
		],
	};

	const [dateRange, setDateRange] = useState('24h');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	return (
		<Layout>
			<div className="p-8">
				<div className="mx-auto">
					<div className="w-full flex justify-end mb-4">
						<div class="relative max-w-sm">
							<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
								</svg>
							</div>
							<input
								datepicker
								datepicker-orientation="bottom right"
								type="text"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Select date"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -m-4">
						<div className="w-full md:w-1/2 lg:w-1/4 p-4 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Total Revenue
								</h4>
								<p className="mb-1 text-4xl font-bold dark:text-white">
									$ 27,342.43
								</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-6 text-center bg-white dark:bg-gray-800 rounded w-full">
								<CardChart data={totalRevenue} />
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Net Profit
								</h4>
								<p className="mb-1 text-4xl font-bold dark:text-white">
									$ 19,749.32
								</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-6 text-center bg-white dark:bg-gray-800 rounded w-full">
								<CardChart data={netProfit} />
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Profit Margin
								</h4>
								<p className="mb-1 text-4xl font-bold dark:text-white">
									87.25%
								</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-6 text-center bg-white dark:bg-gray-800 rounded w-full">
								<CardChart data={profitMargin} />
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Sales Volume
								</h4>
								<p className="mb-1 text-4xl font-bold dark:text-white">2,483</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-6 text-center bg-white dark:bg-gray-800 rounded w-full">
								<CardChart data={salesVolume} />
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-8 gap-8 text-white mt-8">
					<div className="bg-white dark:bg-gray-800 p-6 lg:col-span-5 rounded">
						<BarChart />
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 lg:col-span-3 rounded">
						Small Box
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
