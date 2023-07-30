import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';

export const useGetOrderData = (dateRange) => {
	dateRange = dateRange || {
		startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
		endDate: new Date(),
	};
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/api/order/data?type=sale&startDate=${
						dateRange.startDate.toISOString().split('T')[0]
					}&endDate=${dateRange.endDate.toISOString().split('T')[0]}`
				);
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};
		fetchOrderData();
	}, [dateRange]);

	return { data, loading, error };
};

ChartJS.register(BarElement);
const BarChart = ({ dateRange }) => {
	dateRange = dateRange || {
		startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
		endDate: new Date(),
	};

	const { startDate, endDate } = dateRange;

	const generateDates = (startDate, endDate) => {
		let dates = [];
		let start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays <= 7) {
			while (start <= end) {
				let month = start.getMonth() + 1;
				let date = start.getDate();

				// Pad month and date with leading zeros if necessary
				month = month < 10 ? '0' + month : month;
				date = date < 10 ? '0' + date : date;

				dates.push(`${start.getFullYear()}-${month}-${date}`);
				start.setDate(start.getDate() + 1);
			}
		} else if (diffDays <= 60) {
			// Similar changes for other conditions
			// ...
		} else if (diffDays <= 365) {
			// ...
		} else {
			// ...
		}

		return dates;
	};

	const dates = generateDates(startDate, endDate);

	const { data: orderData, loading, error } = useGetOrderData(dateRange);

	const [data, setData] = useState({
		labels: dates,
		datasets: [
			{
				label: 'My First Dataset',
				data: new Array(dates.length).fill(0),
				backgroundColor: '#4361ee',
				borderColor: '#4361ee',
				borderWidth: 1,
			},
		],
	});

	useEffect(() => {
		if (orderData) {
			const newData = { ...data };
			orderData.forEach((item) => {
				const index = newData.labels.indexOf(item.date);
				if (index !== -1) {
					newData.datasets[0].data[index] = Number(item.totalQuantity);
				}
			});
			setData(newData);
		}
	}, [orderData]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
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

	return <Bar data={data} options={options} />;
};

export default BarChart;
