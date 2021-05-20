import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default props => {
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${props.id}`)
            .then(res => setProduct(res.data.product))
    }, [product]);
    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/api/products/delete/${productId}`)
            .then(res => {
                console.log("Product deleted")
            })
            .catch(err => console.log(err));
        navigate("/");
    }
    return (
        <div>
            <p>Title: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Price: $ {product.price}</p>
            <Link to={`/${product._id}/edit`}>Update Product</Link>
            <button onClick={(e)=>{deleteProduct(product._id)}}>Delete Product</button>
        </div>
    )
}