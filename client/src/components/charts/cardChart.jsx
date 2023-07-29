import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler,
} from 'chart.js';
import { useRef } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const CardChart = ({ data }) => {
	const chartRef = useRef(null);
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
		onHover: (event, chartElement) => {
			event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
		},
	};

	const gradientPlugin = {
		id: 'gradientPlugin',
		beforeUpdate: (chart) => {
			const ctx = chart.canvas.getContext('2d');
			const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
			gradient.addColorStop(0, 'rgba(67, 97, 238, 0.5)');
			gradient.addColorStop(1, 'rgba(67, 97, 238, 0.0)');

			const newDatasets = chart.data.datasets.map((dataset) => {
				return { ...dataset, backgroundColor: gradient };
			});

			chart.data.datasets = newDatasets;
		},
	};

	return (
		<Line
			ref={chartRef}
			data={data}
			options={options}
			plugins={[gradientPlugin]}
		/>
	);
};

export default CardChart;
