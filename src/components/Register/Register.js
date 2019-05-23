import React, { Component } from "react";
import Input from "../Input/Input";
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import validator from 'validator';

export default class Register extends Component {
    state = {
        errors: {
            hasError: false,
            errorObj: {},
            serverError: ''
        },

        username: "",
        password: "",
        email: "",
    };




  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('currentUser'))
    if(data){ 
      this.props.history.push('/products')
    }
  }

    onSubmit = ev => {
        ev.preventDefault();
        const { errors, username, password, email } = this.state

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


        if (!validator.isEmail(email)) {
            errors.hasError = true;
            errors.errorObj['email'] = { message: 'Incorrect Email' };
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


        const newObj = { 
            id: 1,
            username, 
            password,
            email
        }

        localStorage.setItem('regUser',JSON.stringify(newObj))
        swal("Welcome", "You Can Now Login", "success");
        this.props.history.push('/')
    };

    render() {
        const { username, errors, password, email } = this.state;

        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                            <form
                                className="login100-form validate-form"
                                onSubmit={ev => this.onSubmit(ev)}
                            >
                                <span className="login100-form-title p-b-33">Customer Registration</span>

                                {errors.serverError && <p className="text-danger text-center font-weight-bold">{errors.serverError}</p>}

                                <Input
                                    type="text"
                                    classes="input100"
                                    value={email}
                                    name="email"
                                    id="email"
                                    label="email"
                                    placeholder="Enter the Email"
                                    onChange={ev =>
                                        this.setState({ [ev.target.name]: ev.target.value })
                                    }
                                    errors={errors}
                                />

                                {errors && errors.errorObj["email"] && (
                                    <div className="ml-4">
                                        <p className="text-danger font-weight-bold">
                                            {errors.errorObj["email"].message}
                                        </p>
                                    </div>
                                )}


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
                                    value="Register"
                                    classes="login100-form-btn"
                                />
                                <br></br>

                                <div className="text-center">
                                    <span className="txt1">Already a user? </span>

                                    <Link to="/" className="txt2 hov1">
                                        Login
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
