import React,{useContext,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import './CartModal.css'
import {Link} from 'react-router-dom'
import CartCard from '../CartCard/CartCard'

const CartModal = ({quantity,productSlug,showCart,closeModal}) => {  
    return (
        <Modal show={showCart} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <CartCard quantity={quantity} productSlug={productSlug} />
            </Modal.Body>
            <Modal.Footer>
                <Link className="cart-btn btn" to="/cart">
                    View Cart
                </Link>
                <Link className="checkout-btn btn" to="/checkout">
                    Checkout
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default CartModal
