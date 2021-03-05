import React,{useState,useContext} from 'react'
import { Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import CartModal from '../CartModal/CartModal'
import CartContext from '../../context/CartContext'
const ProductCard = ({ product }) => {
    const { setUpdateQuantity } = useContext(CartContext)
    const [showCart, setShowCart] = useState(false);
    const addToCart=()=>{
        //    history.push({
        //     pathname: '/cart/'+product.slug,
        //     search: '?qty='+quantity
        //    })
        //    console.log('cart');
        setUpdateQuantity(true)
        setShowCart(true);
        }
        const closeModal = () => { setShowCart(false) }
    return (
        <Card style={{ width: '18rem', marginRight: "10px", marginBottom: "20px" }} >
            <Link to={"/products/" + product.slug} >
                <Card.Img variant="top" src="images/bg-1.jpeg" />
            </Link>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Link to={"/products/" + product.slug}>
                        <Card.Title className="font-weight-bold  p-title">
                            {product.name}
                        </Card.Title>
                    </Link>
                    <span className="p-price font-weight-bold" >${product.price}</span>
                </div>
                <Card.Text> {product.description} </Card.Text>
                <div className="btn add-to-cart-btn mt-0" style={{width:"100%"}}
                onClick={addToCart}>
                    <i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
                    Add to cart</div>
            </Card.Body>
            { showCart ?
                <CartModal quantity={1} productSlug={product.slug} showCart={showCart}
                closeModal={closeModal}/>
                :
                null
            }
        </Card>

    )
}

export default ProductCard
