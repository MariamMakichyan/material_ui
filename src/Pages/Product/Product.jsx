import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { instance } from '../../App/App'
import './Product.css'

export const Product = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
     instance.get(`/products/${id}`) 
     .then((res)=>setProduct(res.data))  
    }, [id])


    if (!product) return <h2 style={{ color: 'white' }}>Loading...</h2>
    
    
    return (
    
      <div className="product-container">
    <h1>{product.title}</h1>
    <img src={product.thumbnail} alt={product.title} />
    <p>{product.description}</p>
    <p className="price">${product.price}</p>
    <button  onClick={() => navigate('/products')} >
      Go to Products
    </button>
  </div>
    )
}

