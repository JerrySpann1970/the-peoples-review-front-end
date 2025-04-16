import { useState, useEffect } from 'react';
import * as productService from '../../services/productService';
import { useParams } from 'react-router';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    console.log('productId', productId);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await productService.show(productId);
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    // Verify the hoot state is set correctly:
    console.log('product state:', product);

    if (!product) return <main>Loading...</main>;

    return (
        <main>
            <section>
                <header>
                    <p>{product.category.toUpperCase()}</p>
                    <h1>{product.productName}</h1>
                    <img>{product.imageLink}</img>
                    <p>
                        {`${product.author.username} added on
                        ${new Date(product.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
            </section>
            <section>
                <h2>Reviews</h2>
            </section>
        </main>
    );
};

export default ProductDetails;