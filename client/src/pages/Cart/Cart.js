import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Container,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const Cart = ({ match, location }) => {
  const { cart, removeFromCart, addToCart, setUpdateQuantity } = useContext(
    CartContext
  );
  const params = new URLSearchParams(useLocation().search);
  const productSlug = match.params.id;
  const quantity = location.search ? Number(params.get("qty")) : 0;
  useEffect(() => {
    if (productSlug) {
      setUpdateQuantity(false);
      addToCart(productSlug, quantity);
    }
  }, []);
  const removeFromCartHandler = (slug) => {
    removeFromCart(slug);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={8}>
          <h3 className="ml-2 mb-2" style={{ color: "#f51167" }}>
            Shopping Cart
          </h3>
          <ListGroup.Item>
            <Row>
              <Col md={3}>
                <strong>Product Image</strong>{" "}
              </Col>
              <Col md={3}>
                <strong>Product Name</strong>
              </Col>
              <Col md={2}>
                <strong>Price</strong>
              </Col>
              <Col md={2}>
                <strong>Quantity</strong>
              </Col>
              <Col md={2}>
                <strong>Remove</strong>
              </Col>
            </Row>
          </ListGroup.Item>

          {cart.length === 0 ? (
            <div className="alert-danger">
              Your cart is empty
              <Link to="/shop"> Go to shop</Link>{" "}
            </div>
          ) : (
            <ListGroup>
              {cart.map((item) => {
                return (
                  <ListGroup.Item
                    key={item.slug}
                    className="justify-content-center"
                  >
                    <Row>
                      <Col md={3}>
                        <Image src="/images/bg-2.jpeg" fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) =>
                            addToCart(item.slug, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((index) => {
                            return (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          className="checkout-btn"
                          onClick={() => removeFromCartHandler(item.slug)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4} style={{ marginTop: "40px" }}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal </h2>
                <hr></hr>
                <p>
                  $
                  {cart.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-blcok cart-btn" type="buttn">
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
