import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer, NavWrapper } from "../widgets/Styles";
export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          {/* <img src={logo} alt="store" className="navbar-brand" /> */}
          <i
            className="fas fa-store"
            style={{ color: "red", fontSize: "2rem" }}
          />
        </Link>

        <Link to="/" className="nav-link align-items-center ml-1">
          {" "}
          Products
        </Link>

        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              {" "}
              <i className="fas fa-cart-plus" />
            </span>
            My Cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}
