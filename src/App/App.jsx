import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Layout from "../Components/Layout/Layout";
import Products from "../Pages/Products/Products";
import { Product } from "../Pages/Product/Product";
import "./Style/App.css";
import { Home } from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import axios from "axios";

 export let instance = axios.create({
 baseURL: 'https://dummyjson.com'
})

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    instance.get('/products')
      .then((res) =>  setProducts(res.data.products))
  }, [])

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          < Route index element={<Home />} />
          <Route path="/products" element={<Products products={products} />} />
                    <Route path="/products/:id" element={<Product/>} />
               <Route path="/cart" element={<Cart />} /> 
               </Route>

      </Routes>
    </Router>
  );
}

export default App;
