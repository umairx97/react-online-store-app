import React, { Component } from "react";
import { Link } from "react-router-dom";
// import logo from "../logo.svg";
// import styled from "styled-components";
import { ButtonContainer, NavWrapper } from "../widgets/Styles";
export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          {/* <img src={logo} alt="store" className="navbar-brand" /> */}
          <i className="fas fa-store" style={{ color: "red" }} />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              {" "}
              Products
            </Link>
          </li>
        </ul>

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

