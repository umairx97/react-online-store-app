import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart/Cart";
import Details from "./components/Details";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Login from './components/Login/Login'
import Register from './components/Register/Register'


const PrivateRoute = ({ component: Component, loggedIn, ...rest, }) => {
  return (
    <Route
      {...rest}
      render={props => loggedIn ? (<Component {...props} />) : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />

  )
}
class App extends Component {
  render() {


    const data = JSON.parse(localStorage.getItem('currentUser'))

    return (
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <PrivateRoute loggedIn = {(data && data.hasOwnProperty('username'))}  exact path="/products" component={ProductList} />
          <PrivateRoute loggedIn = {(data && data.hasOwnProperty('username'))}  exact path="/details" component={Details} />
          <PrivateRoute loggedIn = {(data && data.hasOwnProperty('username'))}  exact path="/cart" component={Cart} />
        </Switch>
        {data && data.hasOwnProperty('username') && <Footer />}
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
