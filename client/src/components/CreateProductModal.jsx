import React, { useState, useEffect } from 'react';
// import { useCreateProduct } from '../../hooks/product/useCreateProduct';
// import { useCreateCategory } from '../../hooks/category/useCreateCategory';
import { useGetCategories } from '../hooks/category/useGetCategories';

const CreateProductModal = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [sku, setSku] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [newCategoryName, setNewCategoryName] = useState('');
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [displayCategory, setDisplayCategory] = useState('');

	const {
		categories,
		error: categoriesError,
		isLoading: categoriesLoading,
	} = useGetCategories();
	// const { createProduct, error, isLoading } = useCreateProduct();
	// const { createCategory } = useCreateCategory();

	useEffect(() => {
		if (categoriesError) {
			alert('Error fetching categories');
		}
	}, [categoriesError]);

	const handleSelectCategory = (category) => {
		setCategory(category.id);
		setDisplayCategory(category.name);
		setIsDropdownVisible(false);
	};

	// const handleAddCategory = async () => {
	// 	if (newCategoryName) {
	// 		const category = await createCategory(newCategoryName);
	// 		if (category) {
	// 			setCategory(category.id);
	// 			setDisplayCategory(category.name);
	// 		}
	// 	}
	// 	setNewCategoryName('');
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	await createProduct(name, sku, description, category);
	// 	onClose();
	// };

	return (
		isOpen && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
				<div className="bg-white p-6 rounded-lg w-1/3">
					<button
						className="absolute right-4 top-4 text-gray-700 hover:text-gray-900 focus:outline-none"
						onClick={onClose}>
						&times;
					</button>
					<h2 className="text-xl font-semibold mb-4">New Product</h2>
					<form onSubmit={'handleSubmit'}>
						<label className="block mb-4">
							<span className="text-gray-700">Name</span>
							<input
								className="w-full mt-1 p-2 border border-gray-300 rounded"
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</label>
						<label className="block mb-4">
							<span className="text-gray-700">SKU</span>
							<input
								className="w-full mt-1 p-2 border border-gray-300 rounded"
								type="text"
								value={sku}
								onChange={(e) => {
									setSku(e.target.value);
								}}
							/>
						</label>
						<label className="block mb-4">
							<span className="text-gray-700">Description</span>
							<input
								className="w-full mt-1 p-2 border border-gray-300 rounded"
								type="text"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</label>
						<label className="block mb-4">
							<span className="text-gray-700">Category</span>
							<div className="relative inline-block w-full">
								<input
									className="w-full mt-1 p-2 border border-gray-300 rounded"
									type="text"
									value={displayCategory}
									onFocus={() => setIsDropdownVisible(true)}
									onBlur={() =>
										setTimeout(() => setIsDropdownVisible(false), 200)
									}
									onChange={(e) => {
										setDisplayCategory(e.target.value);
										const matchedCategory = categories.find(
											(category) =>
												category.name.toLowerCase() ===
												e.target.value.toLowerCase()
										);
										if (matchedCategory) {
											setCategory(matchedCategory.id);
										} else {
											setCategory('');
										}
									}}
									autoComplete="off"
								/>
								{isDropdownVisible && (
									<div className="absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded mt-2 py-2">
										{categories.map((category) => (
											<button
												className="block w-full text-left px-4 py-2 hover:bg-gray-100"
												key={category.id}
												onClick={() => handleSelectCategory(category)}>
												{category.name}
											</button>
										))}
										<hr className="my-2" />
										<button
											className="block w-full text-left px-4 py-2 hover:bg-gray-100"
											onClick={'handleAddCategory'}>
											Add {displayCategory}
										</button>
									</div>
								)}
							</div>
						</label>

						<div className="flex justify-between">
							<button onClick={'handleSubmit'}>Add</button>
							<button className="bg-red-500 hover:bg-red-600" onClick={onClose}>
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default CreateProductModal;
