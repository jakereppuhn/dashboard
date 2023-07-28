import { useState, useEffect } from 'react';
import { useCreateProduct } from '../../hooks/product/useCreateProduct';
import Checkbox from '../inputs/CheckBox';

const AddProduct = ({ onCloseAdd, refetch }) => {
	const [productName, setProductName] = useState('');
	const [productType, setProductType] = useState('general');
	const [attributes, setAttributes] = useState({});

	const [generalAdmission, setGeneralAdmission] = useState(false);

	const { createProduct, error, isLoading } = useCreateProduct();

	const options = [
		{
			value: 'general',
			path: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
				/>
			),
		},
		{
			value: 'ticket',
			path: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
				/>
			),
		},
		{
			value: 'clothing',
			path: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			),
		},
		{
			value: 'sneakers',
			path: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
				/>
			),
		},
		{
			value: 'collectible',
			path: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
				/>
			),
		},
	];

	const inputClass =
		'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';

	const labelClass =
		'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-disabled:opacity-50';

	const getCurrentDate = () => {
		const date = new Date();
		return `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
	};

	const getNearestHalfHour = () => {
		const date = new Date();
		const minutes = date.getMinutes();
		const hours = date.getHours();
		const nearestHalfHour = Math.round(minutes / 30) * 30;
		const finalHour = nearestHalfHour === 60 ? hours + 1 : hours;
		const finalMinutes = nearestHalfHour === 60 ? 0 : nearestHalfHour;

		return `${finalHour.toString().padStart(2, '0')}:${finalMinutes
			.toString()
			.padStart(2, '0')}`;
	};

	const [date, setDate] = useState(getCurrentDate());
	const [time, setTime] = useState(getNearestHalfHour());

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (productType === 'general') {
			setAttributes({});
		} else if (productType === 'ticket') {
			setProductName(`${date} ${time}`);
		} else if (productType === 'clothing') {
			setAttributes({});
		} else if (productType === 'sneakers') {
			setAttributes({});
		} else {
			setAttributes({});
		}

		let isArchived = false;
		await createProduct(productName, productType, attributes, isArchived);

		onCloseAdd();
		setTimeout(() => {
			refetch();
		}, 500);
	};

	const handleInputChange = (setterFunc) => (e) => setterFunc(e.target.value);

	const resetForm = () => {
		if (generalAdmission) {
			setGeneralAdmission(!generalAdmission);
		}
	};

	const renderFormBasedOnType = (productType) => {
		switch (productType) {
			case 'general':
				resetForm();
				return (
					<div>
						<div className="grid md:grid-cols-5 md:gap-6 mt-6">
							<div className="relative z-0 w-full mb-6 group col-span-3">
								<input
									type="text"
									name="productName"
									value={productName}
									onChange={handleInputChange(setProductName)}
									className={inputClass}
									placeholder=" "
									autoComplete="off"
								/>
								<label className={labelClass}>Name</label>
							</div>
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="productSku"
									className={inputClass}
									placeholder=" "
								/>
								<label className={labelClass}>Sku</label>
							</div>
						</div>

						<div className="grid md:grid-cols-5 md:gap-6">
							<div className="relative z-0 w-full mb-6 group col-span-3">
								<input
									type="text"
									name="productTags"
									className={inputClass}
									placeholder=" "
								/>
								<label className={labelClass}>Tags</label>
							</div>
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Category
								</label>
							</div>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="productDescription"
								className={inputClass}
								placeholder=" "
							/>
							<label className={labelClass}>Description</label>
						</div>
					</div>
				);
			case 'ticket':
				return (
					<div>
						<div className="grid md:grid-cols-2 md:gap-6 mt-6">
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="ticketArtist"
									className={inputClass}
									placeholder=" "
									autoComplete="off"
								/>
								<label className={labelClass}>Artist Name</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="ticketVenue"
									className={inputClass}
									placeholder=" "
									required
								/>
								<label className={labelClass}>Venue</label>
							</div>
						</div>
						<div className="grid md:grid-cols-5 md:gap-6">
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="ticketDate"
									className={inputClass}
									placeholder=" "
									autoComplete="off"
									required
								/>
								<label className={labelClass}>Date</label>
							</div>
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="ticketTime"
									className={inputClass}
									placeholder=" "
									required
								/>
								<label className={labelClass}>Time</label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="ticketQuantity"
									className={inputClass}
									placeholder=" "
									required
								/>
								<label className={labelClass}>Quantity</label>
							</div>
						</div>
						<div className="grid md:grid-cols-7 md:gap-6">
							<div className="relative z-0 w-full mb-6 group">
								<div className="flex gap-3 items-center h-full justify-center mb-4">
									<label className=" text-sm text-gray-500 dark:text-gray-400">
										GA
									</label>
									<Checkbox
										onChange={() => {
											setGeneralAdmission(!generalAdmission);
										}}
									/>
								</div>
							</div>

							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="ticketSection"
									className={inputClass}
									disabled={generalAdmission}
									placeholder=" "
								/>
								<label className={labelClass}>Section</label>
							</div>
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="ticketRow"
									className={inputClass}
									disabled={generalAdmission}
									placeholder=" "
								/>
								<label className={labelClass}>Row</label>
							</div>
							<div className="relative z-0 w-full mb-6 group col-span-2">
								<input
									type="text"
									name="ticketSeat"
									className={inputClass}
									disabled={generalAdmission}
									placeholder=" "
								/>
								<label className={labelClass}>Seat(s)</label>
							</div>
						</div>
					</div>
				);
			case 'clothing':
				return <div>Clothing</div>;
			case 'sneakers':
				return <div>Sneakers</div>;
			case 'collectible':
				return <div>Collectible</div>;
			default:
				return null;
		}
	};

	return (
		<div className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 bg-black bg-opacity-25">
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Add Product
						</h3>
						<button
							type="button"
							onClick={onCloseAdd}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-target="createProductModal"
							data-modal-toggle="createProductModal">
							<svg
								fill="none"
								className="w-6 h-6"
								stroke="currentColor"
								strokeWidth={1.5}
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="flex w-full gap-4">
							{options.map((option) => (
								<label key={option.value} className="w-full">
									<input
										type="radio"
										name="productType"
										value={option.value}
										checked={productType === option.value}
										onChange={(e) => setProductType(e.target.value)}
										className="hidden"
									/>
									<div
										className={`pt-1 flex items-center flex-col cursor-pointer ${
											productType === option.value
												? 'ring-2 ring-blue-500 rounded text-blue-400'
												: 'text-gray-500 '
										}`}>
										<svg
											fill="none"
											stroke="currentColor"
											strokeWidth={1.5}
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6 ">
											{option.path}
										</svg>
										<h1 className="capitalize">{option.value}</h1>
									</div>
								</label>
							))}
						</div>

						{renderFormBasedOnType(productType)}

						<button
							type="submit"
							className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
							<svg
								className="mr-1 -ml-1 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clipRule="evenodd"
								/>
							</svg>
							Add new product
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
