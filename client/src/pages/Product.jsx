import { useState } from 'react';
import { ProductForm, Layout, ProductTable } from '../components';
import { useGetAllProducts } from '../hooks/product/useGetProducts';

const Product = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { products } = useGetAllProducts();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<Layout>
			<ProductTable products={products} onOpen={openModal} />
			<ProductForm isOpen={isModalOpen} onClose={closeModal} />
		</Layout>
	);
};
export default Product;
