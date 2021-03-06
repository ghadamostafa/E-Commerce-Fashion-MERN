import React, { useState } from "react";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const getProducts = (success, data) => {
    if (success) {
      setNumResults(data.productsCount);
      setProducts(data.data);
      setPagesCount(data.pagesCount);
      setErrorMessage('');
    } else {
      setNumResults(0);
      setProducts([]);
      setPagesCount(0);
      setErrorMessage(data);
    }
  };

  const handlePageChange = (num) => {
    setPageNumber(num);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={2}>
          <Filters getProducts={getProducts} pageNumber={pageNumber} />
        </Col>
        <Col md={10}>
          <p>{numResults} Results found</p>
          {errorMessage && (
            <div className="alert-danger text-center mx-auto">
              {errorMessage}
            </div>
          )}
          <Row>
            {products.map((product) => (
              <Col md={4} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <div>
            <Pagination>
              {[...Array(pagesCount).keys()].map((index) => {
                return (
                  <Pagination.Item
                    active={pageNumber === index + 1}
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
