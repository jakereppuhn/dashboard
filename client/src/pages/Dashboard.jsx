import { useState } from 'react';
import { Layout } from '../components';
import BarChart from '../components/charts/barChart';
import CardChart from '../components/charts/CardChart';
import DatePicker from '../components/DatePicker';

const Dashboard = () => {
	const [dateRange, setDateRange] = useState(null);

	const totalRevenue = {
		labels: [1, 2, 3, 4, 5, 6, 7],
		datasets: [
			{
				data: [15000, 16500, 18000, 17000, 17500, 18500, 20000],
				backgroundColor: '#ffffff',
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

	const cardData = [
		{
			title: 'Total Revenue',
			value: '$ 27,342.43',
			percentage: '+ 5.00%',
			data: totalRevenue,
			color: 'bg-green-500',
		},
		{
			title: 'Net Profit',
			value: '$ 19,749.32',
			percentage: '+ 5.00%',
			data: netProfit,
			color: 'bg-green-500',
		},
		{
			title: 'Profit Margin',
			value: '87.25%',
			percentage: '+ 5.00%',
			data: profitMargin,
			color: 'bg-green-500',
		},
		{
			title: 'Sales Volume',
			value: '2,483',
			percentage: '+ 5.00%',
			data: salesVolume,
			color: 'bg-green-500',
		},
	];

	return (
		<Layout>
			<div className="px-8 py-4">
				<div className="w-full flex justify-between">
					<h1 className="text-2xl font-bold dark:text-white flex items-center">
						Dashboard
					</h1>
					<DatePicker dateRange={dateRange} setDateRange={setDateRange} />
				</div>

				<div className="flex flex-wrap -ml-2 -mr-2">
					{cardData.map((card, index) => (
						<div
							key={index}
							className="w-full md:w-1/2 lg:w-1/4 px-2 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-1 text-md text-gray-500 dark:text-gray-400">
									{card.title}
								</h4>
								<p className="mb-1 text-2xl font-bold dark:text-white">
									{card.value}
								</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-4 text-center bg-white dark:bg-gray-800 rounded-lg w-full overflow-hidden h-32">
								<CardChart data={card.data} text={'Total Revenue'} />
							</div>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-8 gap-4 text-white mt-4">
					<div className="bg-white dark:bg-gray-800 p-6 lg:col-span-5 rounded">
						<BarChart dateRange={dateRange} />
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 lg:col-span-3 rounded">
						Recent Sales
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
