import { useState } from 'react';
import { Dropdown, Layout } from '../components';
import BarChart from '../components/charts/BarChart';
import CardChart from '../components/charts/CardChart';
import DatePicker from '../components/DatePicker';

const Dashboard = () => {
	const [dateRange, setDateRange] = useState(null);

	const totalRevenue = {
		labels: [1, 2, 3, 4, 5, 6, 7],
		datasets: [
			{
				data: [19000, 16500, 18000, 17000, 17500, 18500, 20000],
				fill: true,
				backgroundColor: 'rgba(67, 97, 238, 0.1)',
				borderColor: 'rgba(67, 97, 238, 0.8)',
				tension: 0.4,
			},
		],
	};

	const netProfit = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [5000, 5500, 6000, 5600, 5800, 6100, 7000],
				fill: true,
				backgroundColor: 'rgba(67, 97, 238, 0.1)',
				borderColor: 'rgba(67, 97, 238, 0.8)',
				tension: 0.4,
			},
		],
	};

	const profitMargin = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [33.3, 33.3, 33.3, 32.9, 33.1, 33, 35],
				fill: true,
				backgroundColor: 'rgba(67, 97, 238, 0.1)',
				borderColor: 'rgba(67, 97, 238, 0.8)',
				tension: 0.4,
			},
		],
	};

	const salesVolume = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				data: [300, 330, 360, 340, 350, 370, 400],
				fill: true,
				backgroundColor: 'rgba(67, 97, 238, 0.1)',
				borderColor: 'rgba(67, 97, 238, 0.8)',
				tension: 0.4,
			},
		],
	};

	const cardData = [
		{
			title: 'Total Revenue',
			value: '27,342.43',
			percentage: '+ 5.00%',
			data: totalRevenue,
		},
		{
			title: 'Net Profit',
			value: '19,749.32',
			percentage: '+ 5.00%',
			data: netProfit,
		},
		{
			title: 'Profit Margin',
			value: '87.25%',
			percentage: '+ 5.00%',
			data: profitMargin,
		},
		{
			title: 'Sales Volume',
			value: '2,483',
			percentage: '+ 5.00%',
			data: salesVolume,
		},
	];

	return (
		<Layout>
			<div className="px-8 py-4 flex flex-col h-full">
				<div className="w-full flex justify-between z-50 mb-4">
					<h1 className="text-2xl font-bold dark:text-white flex items-center">
						Dashboard
					</h1>
					<Dropdown setDateRange={setDateRange} />
				</div>

				<div className="flex flex-wrap -ml-2 -mr-2 mb-4">
					{cardData.map((card, index) => (
						<div
							key={index}
							className="w-full md:w-1/2 lg:w-1/4 px-2 relative flex items-center justify-center">
							<div className="absolute z-10 flex top-0 py-4 px-6 w-full justify-between">
								<div className="flex flex-col">
									<h4 className="text-sm text-gray-500 dark:text-gray-400">
										{card.title}
									</h4>
									<p className="text-2xl font-bold dark:text-white">
										{card.value}
									</p>
								</div>
								<div className="py-1 px-2 text-xs text-white bg-green-500 rounded h-max">
									+ 5.00%
								</div>
							</div>
							<div className="pt-4 text-center bg-white dark:bg-gray-800 rounded-lg w-full overflow-hidden h-28 border border-gray-600">
								<CardChart data={card.data} text={'Total Revenue'} />
							</div>
						</div>
					))}
				</div>

				<div className="grid grid-rows-2 h-screen gap-4 text-white">
					<div className="grid grid-cols-3 h-full gap-4">
						<div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg overflow-auto dark:border-gray-600 border relative h-full">
							<BarChart dateRange={dateRange} />
						</div>

						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg overflow-auto dark:border-gray-600 border">
							Date Picker
						</div>
					</div>

					<div className="grid grid-cols-3 h-full gap-4">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg overflow-auto dark:border-gray-600 border">
							Recent Orders
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg overflow-auto dark:border-gray-600 border">
							Recent Transactions
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg overflow-auto dark:border-gray-600 border">
							{/* add another box here if needed */}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
