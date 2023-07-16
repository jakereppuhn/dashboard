import { Layout } from '../components';

const Dashboard = () => {
	return (
		<Layout>
			<div className="w-full flex gap-6">
				<div className="w-full h-36 bg-white rounded-lg p-5 shadow flex flex-col justify-between">
					<div className="flex items-center">
						<div className="text-lg text-primary-light bg-primary-light bg-opacity-10 rounded-full p-3">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.3"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<span className="text-lg ml-2 font-semibold text-gray-600">
							Total Revenue
						</span>
					</div>
					<div className="flex justify-between items-end">
						<span className="text-3xl font-bold text-gray-700">$67,920.93</span>
						<div>
							<div className="flex items-center gap-2 text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
									/>
								</svg>
								<span className="text-md font-semibold">5 %</span>
							</div>
							<span className="text-sm text-gray-500">Last 30 days</span>
						</div>
					</div>
				</div>

				<div className="w-full h-36 bg-white rounded-lg p-5 shadow flex flex-col justify-between">
					<div className="flex items-center">
						<div className="text-lg text-blue-500 bg-blue-100 rounded-full p-3">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.3"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<span className="text-lg ml-2 font-semibold text-gray-600">
							Total Revenue
						</span>
					</div>
					<div className="flex justify-between items-end">
						<span className="text-3xl font-bold text-gray-700">$67,920.93</span>
						<div>
							<div className="flex items-center gap-2 text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
									/>
								</svg>
								<span className="text-md font-semibold">5 %</span>
							</div>
							<span className="text-sm text-gray-500">Last 30 days</span>
						</div>
					</div>
				</div>

				<div className="w-full h-36 bg-white rounded-lg p-5 shadow flex flex-col justify-between">
					<div className="flex items-center">
						<div className="text-lg text-blue-500 bg-blue-100 rounded-full p-3">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.3"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<span className="text-lg ml-2 font-semibold text-gray-600">
							Total Revenue
						</span>
					</div>
					<div className="flex justify-between items-end">
						<span className="text-3xl font-bold text-gray-700">$67,920.93</span>
						<div>
							<div className="flex items-center gap-2 text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
									/>
								</svg>
								<span className="text-md font-semibold">5 %</span>
							</div>
							<span className="text-sm text-gray-500">Last 30 days</span>
						</div>
					</div>
				</div>

				<div className="w-full h-36 bg-white rounded-lg p-5 shadow flex flex-col justify-between">
					<div className="flex items-center">
						<div className="text-lg text-blue-500 bg-blue-100 rounded-full p-3">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.3"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<span className="text-lg ml-2 font-semibold text-gray-600">
							Total Revenue
						</span>
					</div>
					<div className="flex justify-between items-end">
						<span className="text-3xl font-bold text-gray-700">$67,920.93</span>
						<div>
							<div className="flex items-center gap-2 text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
									/>
								</svg>
								<span className="text-md font-semibold">5 %</span>
							</div>
							<span className="text-sm text-gray-500">Last 30 days</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex gap-6 mt-6">
				<div className="w-full h-96 bg-white rounded-lg shadow"></div>
				<div className="w-full h-96 bg-white rounded-lg shadow"></div>
			</div>
		</Layout>
	);
};

export default Dashboard;
