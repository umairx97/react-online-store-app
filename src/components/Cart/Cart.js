import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";

import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import Navbar from "../Navbar";

export default class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;

            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <div className="m-3">
                    <Title name="Your" title="Cart" />
                  </div>
                  <CartColumns />
                  <CartList value={value} />

                  <CartTotals value={value} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
      </React.Fragment>
    );
  }
}
