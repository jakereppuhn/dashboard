import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Chart as ChartJS, BarElement } from 'chart.js';
import { useGetOrderData } from '../../hooks/order/useGetData';

ChartJS.register(BarElement);

const currentDate = new Date();
const defaultStartDate = new Date(
	currentDate.getFullYear(),
	currentDate.getMonth(),
	1
);
const defaultEndDate = new Date(
	currentDate.getFullYear(),
	currentDate.getMonth() + 1,
	0
);

const BarChart = ({ dateRange }) => {
	const { startDate = defaultStartDate, endDate = defaultEndDate } =
		dateRange || {};

	const {
		data: orderData,
		error,
		isLoading,
	} = useGetOrderData({ startDate, endDate });

	const [chartData, setChartData] = useState(null);

	const generateDates = (startDate, endDate) => {
		let dates = [];
		let currentDate = new Date(startDate);
		while (currentDate <= endDate) {
			dates.push(format(currentDate, 'MM/dd/yyyy'));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return dates;
	};

	const generateChartData = (orderData, labels) => {
		const data = labels.map((label) => {
			const item = orderData.find((order) => order.date === label);
			return item ? Number(item.totalQuantity) : 0;
		});

		return {
			labels,
			datasets: [
				{
					label: 'Sales',
					data,
					backgroundColor: '#4361ee',
					borderColor: '#4361ee',
					borderWidth: 1,
				},
			],
		};
	};

	useEffect(() => {
		if (orderData && !isLoading && !error) {
			const labels = generateDates(startDate, endDate);
			const formattedOrderData = orderData.map((item) => ({
				...item,
				date: format(new Date(item.date), 'MM/dd/yyyy'),
			}));
			console.log('formattedOrderData: ', formattedOrderData);
			setChartData(generateChartData(formattedOrderData, labels));
		}
	}, [orderData, isLoading, error, startDate, endDate]);

	const options = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: true,
		},
		scales: {
			x: {
				display: true,
				barPercentage: 0.5,
				categoryPercentage: 0.1,
			},
			y: {
				display: true,
				beginAtZero: true,
			},
		},
	};

	return !isLoading && chartData ? (
		<div className="absolute inset-0 p-4">
			<Bar data={chartData} options={options} />
		</div>
	) : null;
};

export default BarChart;
