import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, isGridView }) => {
	const [expandedRowIndex, setExpandedRowIndex] = useState(-1);

	const toggleExpandedRow = (index) => {
		if (expandedRowIndex === index) {
			setExpandedRowIndex(-1);
		} else {
			setExpandedRowIndex(index);
		}
	};

	const renderGridItem = (product) => (
		<div className="border p-4 m-2 w-60">
			<p className="font-bold">
				<Link to={`/products/${product.id}`} className="hover:underline">
					{product.name}
				</Link>
			</p>
			<p>Stock: {product.currentStock}</p>
			<p>Sold: {product.sold}</p>
			<p>Revenue: ${product.revenue}</p>
			<p>Profit: ${product.profit}</p>
		</div>
	);

	return (
		<>
			{isGridView ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
					{products.map((item) => (
						<div key={item.id}>{renderGridItem(item)}</div>
					))}
				</div>
			) : (
				<table className="min-w-full table-auto">
					<thead className="bg-gray-200">
						<tr>
							<th className="w-1/6 py-2 text-center">Name</th>
							<th className="w-1/6 py-2 text-center">Stock</th>
							<th className="w-1/6 py-2 text-center">Sold</th>
							<th className="w-1/6 py-2 text-center">Revenue</th>
							<th className="w-1/6 py-2 text-center">Profit</th>
						</tr>
					</thead>
					<tbody>
						{products.map((item, index) => (
							<React.Fragment key={index}>
								<tr
									className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
									onClick={() => toggleExpandedRow(index)}>
									<td className="w-1/6 py-2 text-center">
										<Link
											to={`/products/${item.id}`}
											className="hover:underline">
											{item.name}
										</Link>
									</td>
									<td className="w-1/6 py-2 text-center">
										{item.currentStock}
									</td>
									<td className="w-1/6 py-2 text-center">{item.stockSold}</td>
									<td className="w-1/6 py-2 text-center">
										${item.totalRevenue}
									</td>
									<td className="w-1/6 py-2 text-center">
										${item.totalProfit}
									</td>
								</tr>
								{expandedRowIndex === index && (
									<tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
										<td colSpan="6">
											<div className="p-4">
												<p>
													<strong>SKU:</strong> {item.sku}
												</p>
												<p>
													<strong>Description:</strong> {item.description}
												</p>
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default ProductTable;