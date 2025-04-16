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

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productData = await productService.index();

      setProducts(productData);
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
