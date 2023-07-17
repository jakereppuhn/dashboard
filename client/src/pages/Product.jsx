import { useState } from 'react';
import { Layout, ProductTable } from '../components';
import { useGetAllProducts } from '../hooks/product/useGetProducts';

const Product = () => {
	const [isGridView, setIsGridView] = useState(false);
	const [sortBy, setSortBy] = useState('name a-z');
	// const [isModalOpen, setIsModalOpen] = useState(false);

	const { products } = useGetAllProducts(sortBy);

	// const openModal = () => setIsModalOpen(true);
	// const closeModal = () => setIsModalOpen(false);

	const toggleView = () => {
		setIsGridView(!isGridView);
	};

	const SortSelect = () => {
		const handleSortChange = (e) => {
			const newSortBy =
				e.target.value + (sortBy.endsWith(' a-z') ? ' a-z' : ' z-a');
			setSortBy(newSortBy);
		};

		const handleSortDirection = () => {
			const newDirection = sortBy.endsWith(' a-z') ? ' z-a' : ' a-z';
			setSortBy(sortBy.replace(/ (a-z|z-a)$/, '') + newDirection);
		};

		return (
			<div className="flex items-center">
				<button onClick={handleSortDirection} className="mr-2">
					<svg
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						className={`h-5 w-5 transform ${
							sortBy.endsWith(' z-a') ? 'rotate-180' : ''
						}`}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
						/>
					</svg>
				</button>
				<select
					value={sortBy.replace(/ (a-z|z-a)$/, '')}
					onChange={handleSortChange}
					className="border border-gray-300 rounded p-2 bg-white shadow-md w-28">
					<option value="name">Name</option>
					<option value="category">Category</option>
					<option value="stock">Stock</option>
				</select>
			</div>
		);
	};

	return (
		<Layout>
			<main className="w-full p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold text-gray-700">Inventory</h2>
					<div className="flex gap-4">
						<SortSelect />
						<div className=" inline-block w-14 align-middle select-none transition duration-200 ease-in z-10">
							<input
								type="checkbox"
								id="view-switch"
								className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
								checked={isGridView}
								onChange={toggleView}
							/>
							<label
								htmlFor="view-switch"
								className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
						</div>
						{/* <Button text="New Product" onClick={openModal} /> */}
					</div>
				</div>
				<ProductTable products={products} isGridView={isGridView} />
			</main>
		</Layout>
	);
};
export default Product;
