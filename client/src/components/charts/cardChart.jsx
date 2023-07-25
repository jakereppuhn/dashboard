import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const cardChart = ({ data }) => {
	const datasetValues = data.datasets.flatMap((dataset) => dataset.data);

	const maxValue = Math.max(...datasetValues);
	const minValue = Math.min(...datasetValues);

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
				min: minValue,
				max: maxValue,
			},
		},
	};

	return <Line data={data} options={options}></Line>;
};

export default cardChart;
