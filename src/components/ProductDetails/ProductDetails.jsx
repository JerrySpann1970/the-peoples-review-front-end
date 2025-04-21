import { useState, useEffect, useContext } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import * as productService from '../../services/productService';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import styles from './ProductDetails.module.css';
import Loading from '../Loading/Loading';

const ProductDetails = (props) => {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const { user } = useContext(UserContext);

    const handleAddReview = async (reviewFormData) => {
        const newReview = await productService.createReview(productId, reviewFormData);
        setProduct({ ...product, reviews: [...product.reviews, newReview] });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await productService.show(productId);
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    // Verify the product state is set correctly:
    console.log('product state:', product);

    if (!product) return <Loading />

    return (
        <main className={styles.container}>
            <section>
                <header>
                    <p>{product.category.toUpperCase()}</p>
                    <h1>{product.productName}</h1>
                    <img src={product.imageLink} alt={product.productName} />
                    <p>{product.description}</p>
                    <h1>${product.price}</h1>
                    <div>
                        <p>
                            {`${product.author.username.toUpperCase()} added on
                            ${new Date(product.createdAt).toLocaleDateString()}`}
                        </p>
                        {product.author._id === user._id && (
                            <>
                                <Link to={`/products/${productId}/edit`}>Edit</Link>

                                <button onClick={() => props.handleDeleteProduct(productId)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </header>
            </section>
            <section>
                <h2>Reviews</h2>
                {/* Make use of the ReviewForm component */}
                <ReviewForm handleAddReview={handleAddReview} />

                {!product.reviews.length && <p>There are no reviews.</p>}

                {product.reviews.map((review) => (
                    <article key={review._id}>
                        <header>
                            <p>
                                {`${review.author.username} posted on
                                ${new Date(review.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{review.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default ProductDetails;