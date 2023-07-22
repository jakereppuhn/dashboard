import { Layout } from '../components';
import CardChart from '../components/charts/cardChart';

const Dashboard = () => {
	return (
		<Layout>
			<div className="p-4">
				<div className="mx-auto">
					<div className="flex flex-wrap -m-4">
						<div className="w-full md:w-1/2 lg:w-1/4 p-4">
							<div className="pt-6 text-center bg-white dark:bg-gray-800 dark:text-white rounded">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Total Revenue
								</h4>
								<p className="mb-1 text-4xl font-bold">$1,234.00</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded-lg">
									+ 5.00%
								</span>
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4">
							<div className="pt-6 text-center bg-white rounded">
								<h4 className="mb-2 text-xs text-gray-500">Total Revenue</h4>
								<p className="mb-1 text-4xl font-bold">$1,234.00</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded-full">
									+ 5.00%
								</span>
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4">
							<div className="pt-6 text-center bg-white rounded">
								<h4 className="mb-2 text-xs text-gray-500">Total Revenue</h4>
								<p className="mb-1 text-4xl font-bold">$1,234.00</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded-full">
									+ 5.00%
								</span>
							</div>
						</div>
						<div className="w-full md:w-1/2 lg:w-1/4 p-4 relative flex items-center justify-center">
							<div className="text-center absolute z-10">
								<h4 className="mb-2 text-md text-gray-500 dark:text-primary-500">
									Total Revenue
								</h4>
								<p className="mb-1 text-4xl font-bold dark:text-white">
									$ 1,234.00
								</p>
								<span className="inline-block py-1 px-2 mb-2 text-xs text-white bg-green-500 rounded">
									+ 5.00%
								</span>
							</div>
							<div className="pt-6 text-center bg-white dark:bg-gray-800 rounded w-full">
								<CardChart />
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-white">
					{/* Large Box */}
					<div className="bg-white dark:bg-gray-800 p-6">Large Box</div>

					{/* Small Boxes */}
					<div className="bg-white dark:bg-gray-800 p-6">Small Box 1</div>
					<div className="bg-white dark:bg-gray-800 p-6">Small Box 2</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
