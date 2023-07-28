import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from '../modals/DeleteProduct';
import AddProduct from '../modals/AddProduct';
import { useGetAllProducts } from '../../hooks/product/useGetProducts';

const ProductTable = () => {
	const { products, refetch } = useGetAllProducts();

	const productsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(products.length / productsPerPage);

	const handleClick = (newPage) => {
		if (newPage < 1) newPage = 1;
		if (newPage > totalPages) newPage = totalPages;
		setCurrentPage(newPage);
	};

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [actionDropdown, setActionDropdown] = useState(null);

	const [productToDelete, setProductToDelete] = useState(null);

	const dropdownRef = useRef();

	const toggleActionDropdown = (productId) => {
		setActionDropdown(actionDropdown === productId ? null : productId);
	};

	const toggleAddModal = () => {
		setIsAddModalOpen(!isAddModalOpen);
	};

	const toggleDeleteModal = (product) => {
		setProductToDelete(product);
		setActionDropdown(null);
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setActionDropdown(null);
			}
		};

		if (actionDropdown !== null) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [actionDropdown]);

	return (
		<section className="h-full bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
			<div className="mx-auto h-full max-w-screen-2xl px-4 lg:px-12">
				<div className="relative h-full overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
					<div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
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
							<button
								type="button"
								onClick={toggleAddModal}
								className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								<svg
									className="mr-2 h-3.5 w-3.5"
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
								<div
									id="filterDropdown"
									className="z-10 hidden w-48 rounded-lg bg-white p-3 shadow dark:bg-gray-700">
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
												className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
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

					<div className="overflow-x-auto">
						<table className="h-full w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
												className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
												<Link
													to={`/products/${product.productId}`}
													className="hover:underline">
													{product.productName}
												</Link>
											</th>
											<td className="px-4 py-3 capitalize">
												{product.productType}
											</td>
											<td className="px-4 py-3">Apple</td>
											<td className="px-4 py-3">300</td>
											<td className="px-4 py-3">$2999</td>
											<td className="flex items-center justify-end px-4 py-3">
												<button
													onClick={() =>
														toggleActionDropdown(product.productId)
													}
													className="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
													<svg
														className="h-5 w-5"
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg">
														<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
													</svg>
												</button>
												{actionDropdown === product.productId && (
													<div
														ref={dropdownRef}
														className="absolute z-50 mt-36 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
														<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
															<li>
																<a
																	href="#"
																	className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
																	Edit
																</a>
															</li>
														</ul>
														<div className="py-1">
															<button
																onClick={() => toggleDeleteModal(product)}
																className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
																Delete
															</button>
														</div>
													</div>
												)}
											</td>
										</tr>
									</React.Fragment>
								))}
							</tbody>
						</table>
						{isAddModalOpen && (
							<AddProduct onCloseAdd={toggleAddModal} refetch={refetch} />
						)}
						{isDeleteModalOpen && (
							<DeleteProduct
								product={productToDelete}
								onCloseDelete={toggleDeleteModal}
								refetch={refetch}
							/>
						)}
					</div>
					<nav className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0">
						<span className="flex gap-2 text-sm font-normal text-gray-500 dark:text-gray-400">
							Showing
							<span className="font-semibold text-gray-900 dark:text-white">
								{(currentPage - 1) * productsPerPage + 1} -{' '}
								{currentPage * productsPerPage > products.length
									? products.length
									: currentPage * productsPerPage}
							</span>
							of
							<span className="font-semibold text-gray-900 dark:text-white">
								{products.length}
							</span>
						</span>
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
										className={`flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight ${
											currentPage === num + 1
												? 'text-primary-600 bg-primary-50'
												: 'text-gray-500'
										} hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
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
					</nav>
				</div>
			</div>
		</section>
	);
};

export default ProductTable;
