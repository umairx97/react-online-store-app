import React, { Component, createContext } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

// Main Props provider
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  // Getting Products from data
  componentDidMount() {
    this.setProducts();
  }

  // Creating a copy of products and storing in state
  setProducts = () => {
    let products = [];

    // Loop through products in data and storing them as value
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });

    // Setting the state of products from data
    this.setState(() => {
      return { products };
    });
  };

  // Returns a product based on id passed
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  // Sets the id of product clicked
  handleDetail = id => {
    const product = this.getItem(id);

    this.setState(() => {
      return { detailProduct: product };
    });
  };

  // Item added to cart based on id passed
  addToCart = id => {
    // Setting the initial values and creating a copy
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    // Appending the state with new products
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        // Adds the total of product whenever a new product is added
        this.addTotals();
      }
    );
  };

  // Modal Methods
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  // Closes the Modal
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  // Increment the product quantity in cart page
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    // Setting values to increment
    product.count = product.count + 1;
    product.total = product.price * product.count;

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => {
        // Calculates the total again based on products added to cart
        this.addTotals();
      }
    );
  };

  // Decrements quantity on the cart page
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    // If quantity falls below 1 item is removed automatically
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      // Decrements the quantity and sets the total price
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  // Removes an item from the cart based on id passed
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];

    // Resets the product values
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          producs: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  // Clears the products added to cart
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  // Calculations for the product price and total
  addTotals = () => {
    const { cart } = this.state;
    let subTotal = 0;
    cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      // Provider Component for the App
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

// Consumer Component Declaration
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
