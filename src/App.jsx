import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductForm from './components/ProductForm/ProductForm';

import { UserContext } from './contexts/UserContext';

import * as productService from './services/productService';

const App = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleAddProduct = async (productFormData) => {
    const newProduct = await productService.create(productFormData);
    setProducts([newProduct, ...products]);
    navigate('/products');
  };

  const handleDeleteProduct = async (productId) => {
    const deletedProduct = await productService.deleteProduct(productId);
    setProducts(products.filter((product) => product._id !== deletedProduct._id));
    navigate('/products');
  };

  const handleUpdateProduct = async (productId, productFormData) => {
    const updatedProduct = await productService.update(productId, productFormData);
    setProducts(products.map((product) => (productId === product._id ? updatedProduct : product)));
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productsData = await productService.index();

      setProducts(productsData);
    };
    if (user) fetchAllProducts();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route
              path='/products'
              element={<ProductList products={products} />}
            />
            <Route
              path='/products/:productId'
              element={<ProductDetails />}
            />
            <Route
              path='products/new'
              element={<ProductForm handleAddProduct={handleAddProduct} />}
            />
            <Route
              path='/products/:productId/edit'
              element={<ProductForm handleUpdateProduct={handleUpdateProduct} />}
            />
            <Route
              path='/products/:productId'
              element={<ProductDetails handleDeleteProduct={handleDeleteProduct} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
