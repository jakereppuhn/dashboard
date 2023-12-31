import React, { useEffect, useRef, useState } from 'react';
import { useGetOrders } from '../../hooks/order/useGetOrders';
import { Link } from 'react-router-dom';

const OrderTable = () => {
	const productsPerPage = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const { orders, totalPages, total, refetch } = useGetOrders(
		currentPage,
		productsPerPage
	);

	const handleClick = (newPage) => {
		if (newPage < 1) newPage = 1;
		if (newPage > totalPages) newPage = totalPages;
		setCurrentPage(newPage);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${month}/${day}/${year}`;
	};

	return (
		<section className="h-full bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
			<div className="mx-auto h-full max-w-screen-2xl px-4 lg:px-12">
				<div className="relative h-full overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg flex flex-col justify-between">
					<div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0 sticky top-0 z-50">
						<div className="w-full md:w-1/2">
							<form className="flex items-center">
								<label htmlFor="simple-search" className="sr-only">
									Search
								</label>
								<div className="relative w-full">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<svg
											aria-hidden="true"
											className="h-5 w-5 text-gray-500 dark:text-gray-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<input
										type="text"
										id="simple-search"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="Search"
										required=""
									/>
								</div>
							</form>
						</div>
						<div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
							<div className="flex w-full items-center space-x-3 md:w-auto">
								<button
									id="filterDropdownButton"
									className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
									type="button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										className="mr-2 h-4 w-4 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fillRule="evenodd"
											d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
											clipRule="evenodd"
										/>
									</svg>
									Filter
									<svg
										className="-mr-1 ml-1.5 h-5 w-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true">
										<path
											clipRule="evenodd"
											fillRule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										/>
									</svg>
								</button>
							</div>
							<button
								type="button"
								className="flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
								<svg
									className="mr-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
									/>
								</svg>
								Export
							</button>
						</div>
					</div>

					<table className="h-full w-full text-center text-sm text-gray-500 dark:text-gray-400">
						<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="p-4">
									<div className="flex items-center">
										<input
											id="checkbox-all"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
										/>
										<label htmlFor="checkbox-all" className="sr-only">
											checkbox
										</label>
									</div>
								</th>
								<th scope="col" className="px-4 py-3">
									Product name
								</th>
								<th scope="col" className="px-4 py-3">
									Type
								</th>
								<th scope="col" className="px-4 py-3">
									Quantity
								</th>
								<th scope="col" className="px-4 py-3">
									Price
								</th>
								<th scope="col" className="px-4 py-3">
									Date
								</th>
								<th scope="col" className="px-4 py-3">
									<span className="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<React.Fragment key={index}>
									<tr className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
										<td className="w-4 px-4 py-3">
											<div className="flex items-center">
												<input
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
												/>
												<label
													htmlFor="checkbox-table-search-1"
													className="sr-only">
													checkbox
												</label>
											</div>
										</td>
										<th
											scope="row"
											className="whitespace-nowrap px-4 py-3 font-medium ">
											<Link
												to={`/orders/${order.orderId}`}
												className="hover:underline">
												{order.product.productName}
											</Link>
										</th>
										<td className="capitalize">{order.orderType}</td>
										<td className="px-4 py-3">{order.orderQuantity}</td>
										<td className="px-4 py-3">{order.pricePerUnit}</td>
										<td className="px-4 py-3">{formatDate(order.orderDate)}</td>
										<td className="flex items-center justify-end px-4 py-3">
											<button className="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
												<svg
													className="h-5 w-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
													<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
												</svg>
											</button>
										</td>
									</tr>
								</React.Fragment>
							))}
						</tbody>
					</table>

					<nav className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0 bg-gray-800 sticky bottom-0">
						<span className="flex gap-2 text-sm font-normal text-gray-500 dark:text-gray-400">
							Showing
							<span className="font-semibold text-gray-900 dark:text-white">
								{(currentPage - 1) * productsPerPage + 1} -{' '}
								{currentPage * productsPerPage > total
									? total
									: currentPage * productsPerPage}
							</span>
							of
							<span className="font-semibold text-gray-900 dark:text-white">
								{total}
							</span>
						</span>

						<div className="flex gap-4">
							<button
								id="filterDropdownButton"
								className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
								type="button">
								25
								<svg
									className="-mr-1 ml-1.5 h-5 w-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true">
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									/>
								</svg>
							</button>

							<ul className="inline-flex items-stretch -space-x-px">
								<li>
									<button
										onClick={() => handleClick(currentPage - 1)}
										className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">
										<span className="sr-only">Previous</span>
										<svg
											className="h-5 w-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</li>
								{[...Array(totalPages).keys()].map((num) => (
									<li key={num}>
										<button
											onClick={() => handleClick(num + 1)}
											className={`flex items-center justify-center border border-gray-300  px-3 py-2 text-sm leading-tight ${
												currentPage === num + 1
													? 'bg-gray-700 text-white'
													: 'text-gray-400 bg-white dark:bg-gray-800'
											} hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white`}>
											{num + 1}
										</button>
									</li>
								))}
								<li>
									<button
										onClick={() => handleClick(currentPage + 1)}
										className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
										<span className="sr-only">Next</span>
										<svg
											className="h-5 w-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</section>
	);
};

export default OrderTable;
