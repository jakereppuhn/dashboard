import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';

ChartJS.register(BarElement);
const BarChart = ({ dateRange }) => {
	dateRange = dateRange || {
		startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
		endDate: new Date(),
	};

	const generateDates = (startDate, endDate) => {
		let start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
		let end = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
		let dates = [];

		while (start <= end) {
			dates.push(start.toLocaleDateString());
			start = new Date(start.getFullYear(), start.getMonth() + 1, 1);
		}

		return dates;
	};

	const { startDate, endDate } = dateRange;

	const dates = generateDates(startDate, endDate);

	const data = {
		labels: dates,
		datasets: [
			{
				label: 'My First Dataset',
				data: new Array(dates.length).fill(0),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 205, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(201, 203, 207, 0.2)',
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)',
				],
				borderWidth: 1,
			},
		],
	};

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

	return (
		<div>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
