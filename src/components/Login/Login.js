import React, { Component } from "react";
import Input from "../Input/Input";
import { Link } from 'react-router-dom'

export default class Login extends Component {
  state = {
    users: [
      { id: 0, username: "admin", password: "admin" },
      { id: 1, username: "umair", password: "ahmed" },
      { id: 2, username: "aamir", password: "pinger" },
    ],
    isAuth: false,
    currentUser: null,

    errors: {
      hasError: false,
      errorObj: {},
      serverError: ''
    },

    username: "",
    password: "",
    successMessage: '',
  };


  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('currentUser'))
    if (data) {
      this.props.history.push('/products')
    }
  }

  onSubmit = async ev => {
    ev.preventDefault();


    const { users, errors, username, password } = this.state

    if (username.length < 3) {
      console.log('username block is running')

      errors.hasError = true;
      errors.errorObj['username'] = { message: 'The user should be greater than 3' };
      this.setState({ errors })
      return

    } else {
      errors.hasError = false
      errors.errorObj = {}
      this.setState({
        errors
      })
    }


    if (password.length < 4) {

      errors.hasError = true;
      errors.errorObj['password'] = { message: 'The password should be greater than 4' };
      console.log(errors)
      this.setState({ errors })
      return
    } else {
      errors.hasError = false
      errors.errorObj = {}
      this.setState({
        errors
      })

    }
    const user = JSON.parse(localStorage.getItem('regUser'))

    if (user === null) {

      const checkedUser = this.state.users.filter(user => {
        return username === user.username && password === user.password
      })

      console.log(checkedUser)


      if (checkedUser.length) {
        localStorage.setItem('currentUser', JSON.stringify(checkedUser[0]));

        this.setState({
          successMessage: 'Very good',
          errors

        })
        this.props.history.push('/products')

      } else {
        errors.serverError = "Invalid Username or Password";
        this.setState({
          errors,
          isAuth: false,
          successMessage: ''
        })
      }


    } else if (user && user.username) {

      this.setState({
        users: [user, ...this.state.users]
      }, () => {

        const checkedUser = this.state.users.filter(user => {
          return username === user.username && password === user.password
        })

        if (checkedUser.length) {
          localStorage.setItem('currentUser', JSON.stringify(checkedUser[0]));

          this.setState({
            successMessage: 'Very good',
            errors

          })
          this.props.history.push('/products')

        } else {
          errors.serverError = "Invalid Username or Password";
          this.setState({
            errors,
            isAuth: false,
            successMessage: ''
          })
        }

      })

    };
  }

  render() {


    const { username, errors, password, successMessage } = this.state;

    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
              <form
                className="login100-form validate-form"
                onSubmit={ev => this.onSubmit(ev)}
              >
                <span className="login100-form-title p-b-33">Customer Login</span>

                {successMessage && <p className="text-success text-center font-weight-bold">{successMessage}</p>}
                {errors.serverError && <p className="text-danger text-center font-weight-bold">{errors.serverError}</p>}


                <Input
                  type="text"
                  classes="input100"
                  value={username}
                  name="username"
                  id="username"
                  label="Username"
                  placeholder="Enter the username"
                  onChange={ev =>
                    this.setState({ [ev.target.name]: ev.target.value })
                  }
                  errors={errors}
                />

                {errors && errors.errorObj["username"] && (
                  <div className="ml-4">
                    <p className="text-danger font-weight-bold">
                      {errors.errorObj["username"].message}
                    </p>
                  </div>
                )}

                <Input
                  type="password"
                  classes="input100"
                  value={password}
                  name="password"
                  label="password"
                  id="password"
                  placeholder="Enter the Password"
                  onChange={ev =>
                    this.setState({ [ev.target.name]: ev.target.value })
                  }
                  errors={errors}
                />

                {errors && errors.errorObj["password"] && (
                  <div className="ml-4">
                    <p className="text-danger font-weight-bold">
                      {errors.errorObj["password"].message}
                    </p>
                    <br />
                  </div>
                )}

                <Input
                  type="submit"
                  value="Login"
                  classes="login100-form-btn"
                />
                <br></br>

                <div className="text-center">
                  <span className="txt1">Create an account? </span>

                  <Link to="/register" className="txt2 hov1">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
