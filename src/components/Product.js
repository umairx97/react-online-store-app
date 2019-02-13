import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import { ProductWrapper } from "../widgets/Styles";
import PropTypes from "prop-types";

// Renders a product card based on id
export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;

    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <ProductConsumer>
            {value => (
              <div
                className="img-container p-5"
                onClick={() => value.handleDetail(id)}
              >
                <Link to="/details">
                  <img src={img} alt="Product" className="card-img-top" />
                </Link>

                <button
                  className="cart-btn"
                  disabled={inCart ? true : false}
                  onClick={() => {
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  {inCart ? (
                    <p className="text-capitalize mb-0" disabled>
                      {" "}
                      in Cart
                    </p>
                  ) : (
                    <i className="fas fa-cart-plus" />
                  )}
                </button>
              </div>
            )}
          </ProductConsumer>

          {/* Card footer */}

          <div className="card-footer d-flex justify-content-between bg-info">
            <p className="align-self-center mb-0 text-light">{title}</p>
            <h5 className="text-blue font-italic mb-0 text-light">
              {" "}
              <span className="mr-1">
                <strong>${price}</strong>
              </span>
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
};
