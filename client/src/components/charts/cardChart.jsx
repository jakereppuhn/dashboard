import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const cardChart = () => {
	const data = {
		labels: [1, 2, 1, 3, 5, 4, 7],
		datasets: [
			{
				label: 'Sales',
				data: [1, 2, 1, 3, 5, 4, 7],
				backgroundColor: '#3b82f6',
				borderColor: '#3b82f6',
				borderWidth: 3,
				tension: 0.4,
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		tooltips: {
			enabled: false,
		},
		elements: {
			point: {
				radius: 0,
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
				min: 0,
				max: 10,
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options}></Line>
		</div>
	);
};

export default cardChart;
