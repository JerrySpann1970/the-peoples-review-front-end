import { Link } from 'react-router';

const ProductList = (props) => {
    return (
        <main>
            {props.products.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                    <article>
                        <header>
                            <h2>{product.productName}</h2>
                            <p>
                                {`${product.author.username} added on
                                ${new Date(product.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <img src={product.imageLink} alt={product.productName} />
                        <p>{product.price}</p>
                    </article>
                </Link>
            ))}
        </main>
    );  
};

export default ProductList;