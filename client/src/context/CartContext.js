import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

const CartContext = createContext();
const CartContextProvider = (props) => {
    const initalCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    const [cart, setCart] = useState(initalCart);
    const [updateQuantity,setUpdateQuantity]=useState(false);
    const addToCart = (productSlug, quantity) => {
        try {
            const fetchProduct = async () => {
                const { data } = await axios.get('/products/' + productSlug);
                let product = data.data
                const productExists = cart.find(item => item.slug === product.slug)
                product = {
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    countInStock: product.quantity,
                    quantity
                }
                if (productExists && !updateQuantity) {
                    await setCart(cart.map(cartItem => {
                        return (cartItem.slug === product.slug) ? product : cartItem
                    }))
                }
                else if(productExists && updateQuantity){
                    await setCart(cart.map(cartItem => {
                        if(cartItem.slug === product.slug)
                        {
                            product.quantity +=cartItem.quantity
                            return product
                        }
                        return cartItem
                    }))
                }
                else {
                    //  cart.push(product)
                    setCart(currentItems => [...currentItems, product])
                    console.log(cart);
                }
                console.log(cart);
            }
            if (productSlug) {
                fetchProduct()
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart))

    }, [cart])
    const removeFromCart = (productSlug) => {
        setCart(cart.filter(item => item.slug != productSlug))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,setUpdateQuantity }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext

export { CartContextProvider }