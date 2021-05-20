import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
export default props => {
    const { id } = props;
    const [title, setTitle] = useState(""); 
    const [price, setPrice] = useState("");
    const [description, setDescription] =useState("");
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                setTitle(res.data.product.title);
                setPrice(res.data.product.price);
                setDescription(res.data.product.description);
            })
    }, [])
    const updateProduct = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/update/${id}`, {
            title,
            price,
            description
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        navigate(`/${id}`);
    }
    return (
        <div>
            <h1>Edit a Product</h1>
            <form onSubmit={updateProduct}>
                <p>
                    <label>Product Title</label><br />
                    <input type="text" 
                    name="title" 
                    value={title} 
                    onChange={(e) => { setTitle(e.target.value) }} />
                </p>
                <p>
                    <label>Product Price</label><br />
                    <input type="text" 
                    name="price"
                    value={price} 
                    onChange={(e) => { setPrice(e.target.value) }} />
                </p>
                <p>
                    <label>Product Description</label><br />
                    <input type="text" 
                    name="description"
                    value={description} 
                    onChange={(e) => { setDescription(e.target.value) }} />
                </p>
                <input type="submit" value="Edit"/>
            </form>
        </div>
    )
}