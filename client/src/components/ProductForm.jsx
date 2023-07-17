import { useState, useEffect } from 'react';
import { useCreateProduct } from '../hooks/product/useCreateProduct';

const ProductForm = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [sku, setSku] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('general');
	const [attributes, setAttributes] = useState({});
	const [initialStock, setInitialStock] = useState(0);
	const [artist, setArtist] = useState('');
	const [venue, setVenue] = useState('');
	const [section, setSection] = useState('');
	const [row, setRow] = useState('');
	const [seat, setSeat] = useState('');

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

	const { createProduct, error, isLoading } = useCreateProduct();

	const handleSubmit = async (event) => {
		event.preventDefault();

		let productName = name;
		let productAttributes = attributes;

		if (type === 'general') {
			productAttributes = {};
		} else if (type === 'ticket') {
			productName = `${artist} ${venue}`;
			productAttributes = {
				artist,
				venue,
				date,
				time,
				section,
				row,
				seat,
			};
		} else if (type === 'clothing') {
			productAttributes = {};
		} else if (type === 'shoes') {
			productAttributes = {};
		} else {
			productAttributes = {};
		}

		// We don't need to set the state here. Directly call createProduct function
		createProduct(
			productName,
			sku,
			description,
			type,
			productAttributes,
			initialStock
		);
		onClose();
	};

	const handleInputChange = (setterFunc) => (e) => setterFunc(e.target.value);

	const renderFormBasedOnType = (type) => {
		switch (type) {
			case 'general':
				return (
					<div className="flex flex-col gap-4 my-4">
						<div className="flex gap-4">
							<div className="flex gap-2 w-full">
								<label htmlFor="name" className="w-1/5">
									Name:
								</label>
								<input
									id="name"
									className="w-full border-2 border-gray-100 rounded"
									type="text"
									onChange={handleInputChange(setName)}
								/>
							</div>
							<div className="flex gap-2 w-1/2">
								<label htmlFor="sku" className="w-1/5">
									Sku:
								</label>
								<input
									id="sku"
									className="w-full border-2 border-gray-100 rounded"
									type="text"
									onChange={handleInputChange(setSku)}
								/>
							</div>
						</div>

						<div className="flex gap-2 w-full">
							<label htmlFor="name" className="w-1/5">
								Description:
							</label>
							<textarea
								id="name"
								className="w-full border-2 border-gray-100 rounded"
								type="text"
								onChange={handleInputChange(setDescription)}
							/>
						</div>
					</div>
				);
			case 'ticket':
				return (
					<div className="flex flex-col gap-4 my-4 items-center">
						<div className="flex gap-2 w-full">
							<label htmlFor="artist" className="w-1/5">
								Artist:
							</label>
							<input
								id="artist"
								className="w-full border-2 border-gray-100 rounded"
								type="text"
								onChange={handleInputChange(setArtist)}
							/>
						</div>
						<div className="flex gap-2 w-full">
							<label htmlFor="venue" className="w-1/5">
								Venue:
							</label>
							<input
								id="venue"
								className="w-full border-2 border-gray-100 rounded"
								type="text"
								onChange={handleInputChange(setVenue)}
							/>
						</div>
						<div className="flex w-full justify-around">
							<div className="flex gap-2">
								<label htmlFor="date">Date:</label>
								<input
									id="date"
									className=""
									type="date"
									value={date}
									onChange={handleInputChange(setDate)}
								/>
							</div>
							<div className="flex gap-2">
								<label htmlFor="time">Time:</label>
								<input
									id="time"
									className=""
									type="time"
									value={time}
									onChange={handleInputChange(setTime)}
								/>
							</div>
						</div>
						<div className="w-full flex gap-4">
							<div className="flex gap-2 w-full">
								<label htmlFor="section">Section:</label>
								<input
									id="section"
									className="w-full text-center border-2 border-gray-100 rounded"
									type="text"
									placeholder="#"
									onChange={handleInputChange(setSection)}
								/>
							</div>
							<div className="flex gap-2 w-full">
								<label htmlFor="row">Row:</label>
								<input
									id="row"
									className="w-full text-center border-2 border-gray-100 rounded"
									type="text"
									placeholder="#"
									onChange={handleInputChange(setRow)}
								/>
							</div>
							<div className="flex gap-2 w-full">
								<label htmlFor="seat">Seat:</label>
								<input
									id="seat"
									className="w-full text-center border-2 border-gray-100 rounded"
									type="text"
									placeholder="#"
									onChange={handleInputChange(setSeat)}
								/>
							</div>
						</div>
					</div>
				);
			case 'clothing':
				return <div>{/* Your clothing form fields here */}</div>;
			case 'shoes':
				return <div>{/* Your shoes form fields here */}</div>;
			default:
				return null;
		}
	};

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
					<form onSubmit={handleSubmit}>
						<select
							className="w-full mt-1 p-2 border border-gray-300 rounded"
							value={type}
							onChange={(e) => setType(e.target.value)}>
							<option value="general">General</option>
							<option value="ticket">Ticket</option>
							<option value="clothing">Clothing</option>
							<option value="shoes">Shoes</option>
						</select>

						{renderFormBasedOnType(type)}

						<div className="flex justify-end gap-4">
							<button
								className="bg-gray-200 hover:bg-red-500 px-4 py-1 rounded text-gray-800"
								onClick={onClose}>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-primary-light px-4 py-1 rounded text-white">
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default ProductForm;
