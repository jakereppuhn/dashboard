import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from 'chart.js';

ChartJS.register(BarElement);
const BarChart = ({ dateRange }) => {
	dateRange = dateRange || {
		startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
		endDate: new Date(),
	};

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
