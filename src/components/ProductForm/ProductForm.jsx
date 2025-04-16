import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as productService from '../../services/productService';

const ProductForm = (props) => {
    const { productId } = useParams();
    console.log(productId);
    const [formData, setFormData] = useState({
        productName: '',
        imageLink: '',
        description: '',
        price: '',
        category: 'Electronics',
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (productId) {
            props.handleUpdateProduct(productId, formData);
        } else {
            props.handleAddProduct(formData);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await productService.show(productId);
            setFormData(productData);
        };
        if (productId) fetchProduct();

        return () => setFormData({
            productName: '',
            imageLink: '',
            description: '',
            price: '',
            category: 'Electronics'
        });
    }, [productId]);

    return (
        <main>
            <h1>{productId ? 'Edit Product' : 'Add New Product'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='productName-input'>Product Name</label>
                <input
                    required
                    type='text'
                    name='productName'
                    id='productName-input'
                    value={formData.productName}
                    onChange={handleChange}
                />
                <label htmlFor='imageLink-input'>Image Link</label>
                <input
                    required
                    type='text'
                    name='imageLink'
                    id='imageLink-input'
                    value={formData.imageLink}
                    onChange={handleChange}
                />
                <label htmlFor='description-input'>Description</label>
                <textarea
                    required
                    type='text'
                    name='description'
                    id='description-input'
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor='price-input'>Price</label>
                <input
                    required
                    type='text'
                    name='price'
                    id='price-input'
                    value={formData.price}
                    onChange={handleChange}
                />
                <label htmlFor='category-input'>Category</label>
                <select
                    required
                    name='category'
                    id='category-input'
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value='Electronics'>Electronics</option>
                    <option value='Movies'>Movies</option>
                    <option value='Appliances'>Appliances</option>
                    <option value='Food'>Food</option>
                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default ProductForm;