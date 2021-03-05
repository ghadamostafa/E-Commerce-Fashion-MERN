import React, { useState, useEffect } from 'react'
import { ListGroup, Row, Col, Container } from 'react-bootstrap'
import './Categories.css'
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/categories')
            console.log(data.data);
            setCategories(data.data);
        }
        fetchProducts();

    }, [])
    return (
        <Container>
            <h2 className="title mb-4">Shop All Categories</h2>
            <Row className="mt-2">
                {
                    categories.map((category) => {
                        return <Col sm={12} md={6} lg={4} key={category._id} >
                            <div className="shadow-sm p-3 mb-5 bg-white rounded mt-2">
                                <h3 className="category-font">{category.name}</h3>
                                <ListGroup variant="flush">
                                    {category.subCategories.map((subCategory) =>
                                        <ListGroup.Item as="a" 
                                        href={`/shop?category=${subCategory.slug}`} 
                                        key={subCategory._id}>
                                            {subCategory.name}
                                        </ListGroup.Item>)}
                                </ListGroup>
                            </div>
                        </Col>
                    })
                }


            </Row>
        </Container>
    )
}

export default Categories
