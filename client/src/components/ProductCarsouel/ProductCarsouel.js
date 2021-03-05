import React from 'react'
import Carousel from 'react-multi-carousel';
import ProductCard from '../ProductCard/ProductCard';
import 'react-multi-carousel/lib/styles.css';


const ProductCarsouel = ({ products }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel responsive={responsive}>
            { products.map((product) => <ProductCard key={product._id} product={product} />)}
        </Carousel>
    )
}

export default ProductCarsouel
