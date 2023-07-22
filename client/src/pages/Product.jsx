import { Layout, ProductTable } from '../components';
import { useGetAllProducts } from '../hooks/product/useGetProducts';

const Product = () => {
	const { products } = useGetAllProducts();

	return (
		<Layout>
			<ProductTable products={products} />
		</Layout>
	);
};
export default Product;
