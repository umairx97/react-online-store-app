import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer, ModalContainer } from "../widgets/Styles";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;

          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 p-5 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
                    >
                      <h5>Item added to the cart</h5>
                      <img src={img} className="img-fluid" alt={title} />
                      <h5>{title}</h5>
                      <h5 className="text-muted">Price: $ {price}</h5>

                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          Continue Shopping
                        </ButtonContainer>
                      </Link>

                      <Link to="/cart">
                        <ButtonContainer cart onClick={() => closeModal()}>
                          Go To Cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}
