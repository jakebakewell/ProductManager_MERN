import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

export default props => {
    const {products} = props;
    const {removeFromDom} = props;
    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/api/products/delete/${productId}`)
            .then(res => {
                removeFromDom(productId)
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h2>All Products:</h2>
            {
            products.map( (product, idx) => {
                return (
                <div key={idx} className="d-flex justify-content-evenly mb-3">
                    <Link to={`/${product._id}`}>{product.title}</Link>
                    <button onClick={(e)=>{deleteProduct(product._id)}}>Delete Product</button>
                </div>
                )
            }
            )
            }
        </div>
    )
}