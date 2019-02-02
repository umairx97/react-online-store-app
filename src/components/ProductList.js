import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";

export default class ProductList extends Component {
  state = {
    products: []
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Our" title="Products" />
            <div className="row" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
