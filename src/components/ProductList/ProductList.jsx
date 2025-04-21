import { Link } from 'react-router';
import styles from './ProductList.module.css';

const ProductList = (props) => {
    return (
        <main className={styles.container}>
            {props.products.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                    <article>
                        <header>
                            <h1>{product.productName}</h1>
                            <p>
                                {`${product.author.username} added on
                                ${new Date(product.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <img src={product.imageLink} alt={product.productName} />
                    </article>
                </Link>
            ))}
        </main>
    )
};

export default ProductList;