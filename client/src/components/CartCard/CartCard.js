import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import { Row, Col, ListGroup, Image, Container, Form, Button, Card } from 'react-bootstrap'

const CartCard = ({ productSlug, quantity }) => {
    const { cart, removeFromCart, addToCart,setUpdateQuantity } = useContext(CartContext)
    useEffect(() => {
        if (productSlug) {
            setUpdateQuantity(false);
            addToCart(productSlug, quantity)
        }
    }, [])
    const removeFromCartHandler = (slug) => {
        removeFromCart(slug)
    }
    return (
        <>
            {cart.length === 0 ? <div className="alert-danger">Your cart is empty </div>
                : <ListGroup >
                    {cart.map((item) => {
                        return <ListGroup.Item key={item.slug} className="justify-content-center">
                            <Row  >
                                <Col md={4}>
                                    <Image src="/images/bg-2.jpeg" fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    {item.quantity}x ${item.price}
                                </Col>
                                <Col md={2}>
                                    <Button variant="light" className="checkout-btn"
                                        onClick={() => removeFromCartHandler(item.slug)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    })}
                    <ListGroup.Item>
                        <p >
                            <strong>Subtotal</strong>
                            <span className="float-right">${cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}</span>
                        </p>
                    </ListGroup.Item>
                </ListGroup>}
        </>
    )
}

export default CartCard
