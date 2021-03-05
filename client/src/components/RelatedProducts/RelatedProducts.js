import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCarsouel from '../ProductCarsouel/ProductCarsouel';
import './RelatedProducts.css'
const RelatedProducts = ({ products }) => {
    return (
        <Row className="related-products">
            <h2 >Related Products</h2>
            <Col className="mt-4">
                <ProductCarsouel products={products} />
            </Col>
        </Row>
    )
}

export default RelatedProducts
