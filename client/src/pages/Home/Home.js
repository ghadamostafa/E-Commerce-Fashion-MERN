import React, { useState, useEffect } from 'react'
import { } from 'react-bootstrap'
import ProductCarsouel from '../../components/ProductCarsouel/ProductCarsouel';
import HomeCarsouel from '../../components/HomeCarsouel/HomeCarsouel';
import axios from 'axios';
import './Home.css'
const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/products/latest')
            console.log(data.data);
            setProducts(data.data);
        }
        fetchProducts();

    }, [])
    return (
        <div>
            <HomeCarsouel />
            <div className="container mt-4">
                <h1 className="title">Latest Products</h1>
                <ProductCarsouel products={products} />
            </div>
        </div>
    )
}

export default Home
