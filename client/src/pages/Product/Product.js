import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Image, Form } from 'react-bootstrap'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import { Link } from 'react-router-dom'
import './product.css'
import axios from 'axios';
import CartModal from '../../components/CartModal/CartModal'


const Product = ({ match,history }) => {
    const [product, setProduct] = useState({});
    const [RelatedProductsData, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);
    useEffect(() => {
        console.log(match.params.slug);
        const fetchProduct = async () => {
            const { data } = await axios.get(`/products/${match.params.slug}`);
            console.log(data.RelatedProducts);
            setProduct(data.data);
            setRelatedProducts(data.RelatedProducts);
        }
        fetchProduct();

    }, [])
    const addToCart=()=>{
    //    history.push({
    //     pathname: '/cart/'+product.slug,
    //     search: '?qty='+quantity
    //    })
    //    console.log('cart');
    setShowCart(true);
    }
    const closeModal = () => { setShowCart(false) }
    return (
        <Container className="mt-4">
            <div className="back-link">
                <Link to="/shop">&lt;&lt; back to products</Link>
            </div>
            <Row>
                <Col md={6} lg={6}>
                    <Image src="images/bg-1.jpeg" alt="product " fluid className="product-image" />
                </Col>
                <Col md={6} lg={6}>
                    <div >
                        {/* name */}
                        <h5 className="product-title">{product.name}</h5>
                        <div >
                            {/* description */}
                            <p className="product-desc">{product.description}</p>
                            {/* left in stock */}
                            <p className="mt-2 in-stock-color">
                                {product.inStock ? `${product.quantity} left in Stock` : 'out of stock'}
                            </p>
                            <hr></hr>
                            {/* price */}
                            <p className="product-price">
                                <strong>${product.price}</strong>
                            </p>
                            {/* update quantity form*/}
                            <Row>
                                <p className="mr-2 col-xs-2 ml-2 font-weight-bold mt-2">Quantity</p>
                                <div className="col-xs-2">
                                    <Form.Control as="select" value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}>
                                        {[...Array(product.quantity).keys()].map((index) => {
                                            return <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        })}
                                    </Form.Control>
                                </div>
                                {/* add to cart */}
                                <div className="col-lg-4">
                                    <div className="btn add-to-cart-btn mt-0"
                                        disabled={product.inStock === 0}
                                        onClick={addToCart} >
                                        <i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
                                    Add to cart
                                    </div>
                                </div>

                            </Row>


                            <hr></hr>
                            {/* category */}
                            <p className="product-category mt-2">
                                <strong className="text-dark">Category: </strong>
                                {product.category ? product.category.name : ''}
                            </p>
                            {/* tags */}
                            <div>
                                <strong>Tags: </strong> {product.tags ? product.tags.map((tag) =>
                                    <span className="badge badge-dark mr-2" key={tag._id}>
                                        {tag.name}
                                    </span>) : ''}
                            </div>

                        </div>
                    </div>
                </Col>
            </Row>
            { showCart ?
                <CartModal quantity={quantity} productSlug={product.slug} showCart={showCart}
                closeModal={closeModal}/>
                :
                null
            }
            <RelatedProducts products={RelatedProductsData} />
        </Container>
    )
}

export default Product
