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
  const [cart, setCart] = useState([])

console.log(cart);

  const addToCart = (item) => {
    let bool = false
    cart.forEach((el) => {

      if (el.id === item.id) {
       bool = true
       setCart(cart.map((c)=>{
        if(c.id === item.id){
          return{
          ...c ,
          count  : ++c.count,
          initPrice: c.count * c.price
          }
        }else{
          return c
        }
       }))
      }
    })
    if (!bool) {
      setCart((prev) => {
        return [...prev, item]
      })
    }

  }

  const removeFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id))
}


  const cartLenght = cart.length

const updateCart = (count, id) => {
setCart(cart.map((c)=>{ 
  if(c.id=== id){
    return{
      ...c,
      count: count,
      initPrice: count * c.price,
    }
  }else {
    return c
  }
}))

}
  


  useEffect(() => {
    instance.get('/products')
      .then((res) => setProducts(res.data.products.map((el) => ({ ...el, count: 1, initPrice: el.price }))))
  }, [])

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout cartLenght={cartLenght} />}>
          < Route index element={<Home />} />
          <Route path="/products" element={<Products products={products} addToCart={addToCart}  />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart}/>} />
        </Route>

      </Routes>
    </Router>
  );

}
export default App;
