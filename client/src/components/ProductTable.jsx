import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from './modals/DeleteProduct';
import AddProduct from './modals/AddProduct';

const ProductTable = ({ products }) => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const toggleAddModal = () => {
		setIsAddModalOpen(!isAddModalOpen);
	};

	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-full">
			<div className="px-4 mx-auto max-w-screen-2xl lg:px-12 h-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<form className="flex items-center">
								<label htmlFor="simple-search" className="sr-only">
									Search
								</label>
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Search"
										required=""
									/>
								</div>
							</form>
						</div>
						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<button
								type="button"
								onClick={toggleAddModal}
								className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
								<svg
									className="h-3.5 w-3.5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true">
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
									/>
								</svg>
								Add product
							</button>
							<div className="flex items-center space-x-3 w-full md:w-auto">
								<button
									className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
									type="button">
									<svg
										className="-ml-1 mr-1.5 w-5 h-5"
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
									Actions
								</button>
								<div
									id="actionsDropdown"
									className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
									<ul
										className="py-1 text-sm text-gray-700 dark:text-gray-200"
										aria-labelledby="actionsDropdownButton">
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Mass Edit
											</a>
										</li>
									</ul>
									<div className="py-1">
										<a
											href="#"
											className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
											Delete all
										</a>
									</div>
								</div>
								<button
									id="filterDropdownButton"
									data-dropdown-toggle="filterDropdown"
									className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
									type="button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										className="h-4 w-4 mr-2 text-gray-400"
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
										className="-mr-1 ml-1.5 w-5 h-5"
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
								<div
									id="filterDropdown"
									className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
									<h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
										Choose brand
									</h6>
									<ul
										className="space-y-2 text-sm"
										aria-labelledby="filterDropdownButton">
										<li className="flex items-center">
											<input
												id="apple"
												type="checkbox"
												value=""
												className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
											/>
											<label
												htmlFor="apple"
												className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
												Apple (56)
											</label>
										</li>
									</ul>
								</div>
							</div>
							<button
								type="button"
								className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
								<svg
									className="w-4 h-4 mr-2"
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

					<div className="overflow-x-auto">
						<table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="p-4">
										<div className="flex items-center">
											<input
												id="checkbox-all"
												type="checkbox"
												className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
										Brand
									</th>
									<th scope="col" className="px-4 py-3">
										Description
									</th>
									<th scope="col" className="px-4 py-3">
										Price
									</th>
									<th scope="col" className="px-4 py-3">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<React.Fragment key={index}>
										<tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
											<td className="w-4 px-4 py-3">
												<div className="flex items-center">
													<input
														id="checkbox-table-search-1"
														type="checkbox"
														className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
												className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												<Link
													to={`/products/${product.id}`}
													className="hover:underline">
													{product.name}
												</Link>
											</th>
											<td className="px-4 py-3 capitalize">{product.type}</td>
											<td className="px-4 py-3">Apple</td>
											<td className="px-4 py-3">300</td>
											<td className="px-4 py-3">$2999</td>
											<td className="px-4 py-3 flex items-center justify-end">
												<button
													className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
													type="button">
													<svg
														className="w-5 h-5"
														onClick={toggleDeleteModal}
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg">
														<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
													</svg>
												</button>
												<div className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
														<li>
															<a
																href="#"
																className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
																Show
															</a>
														</li>
														<li>
															<a
																href="#"
																className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
																Edit
															</a>
														</li>
													</ul>
													<div className="py-1">
														<a
															href="#"
															className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
															Delete
														</a>
													</div>
												</div>
											</td>
										</tr>
									</React.Fragment>
								))}
							</tbody>
						</table>
						{isAddModalOpen && <AddProduct onCloseAdd={toggleAddModal} />}
						{isDeleteModalOpen && (
							<DeleteProduct onCloseDelete={toggleDeleteModal} />
						)}
					</div>
					<nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0">
						<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
							Showing
							<span className="font-semibold text-gray-900 dark:text-white">
								1-10
							</span>
							of
							<span className="font-semibold text-gray-900 dark:text-white">
								1000
							</span>
						</span>
						<ul className="inline-flex items-stretch -space-x-px">
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									<span className="sr-only">Previous</span>
									<svg
										className="w-5 h-5"
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
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									1
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									2
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-current="page"
									className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
									3
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									...
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									100
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
									<span className="sr-only">Next</span>
									<svg
										className="w-5 h-5"
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
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</section>
	);
};

export default ProductTable;
