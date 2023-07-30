import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';
import { useGetOrderData } from '../../hooks/order/useGetData';

ChartJS.register(BarElement);
const BarChart = ({ dateRange }) => {
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

	const { startDate = defaultStartDate, endDate = defaultEndDate } =
		dateRange || {};

	const { data: orderData } = useGetOrderData({ startDate, endDate });

	const [chartData, setChartData] = useState(null);

	const generateDates = (startDate, endDate) => {
		let dates = [];
		let start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays <= 7) {
			while (start <= end) {
				dates.push(`${start.getMonth() + 1}/${start.getDate()}`);
				start.setDate(start.getDate() + 1);
			}
		} else if (diffDays <= 60) {
			while (start <= end) {
				let endOfWeek = new Date(start);
				endOfWeek.setDate(endOfWeek.getDate() + 6);

				if (endOfWeek > end) {
					endOfWeek = end;
				}

				dates.push(
					`${start.getMonth() + 1}/${start.getDate()} - ${
						endOfWeek.getMonth() + 1
					}/${endOfWeek.getDate()}`
				);
				start.setDate(start.getDate() + 7);
			}
		} else if (diffDays <= 365) {
			while (start <= end) {
				dates.push(start.toLocaleString('default', { month: 'long' }));
				start.setMonth(start.getMonth() + 1);
			}
		} else {
			while (start <= end) {
				dates.push(start.getFullYear().toString());
				start.setFullYear(start.getFullYear() + 1);
			}
		}

		return dates;
	};

	useEffect(() => {
		if (orderData) {
			const labels = orderData.map((item) => item.date);
			const data = orderData.map((item) => item.totalQuantity);

			setChartData({
				labels: generateDates(startDate, endDate),
				datasets: [
					{
						label: 'Sales',
						data,
						backgroundColor: '#4361ee',
						borderColor: '#4361ee',
						borderWidth: 1,
					},
				],
			});
		}
	}, [orderData]);

	const options = {
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

	return chartData ? <Bar data={chartData} options={options} /> : null;
};

export default BarChart;
