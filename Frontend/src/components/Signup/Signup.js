import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Signup.css';

//Define a Login Component
class Signup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            zip: "",
            authFlag: false,
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.zipChangeHandler = this.zipChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    firstnameChangeHandler = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    zipChangeHandler = (e) => {
        this.setState({
            zip: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    localStorage.setItem('response', response.data)
                    this.setState({
                        authFlag: true
                    });
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div className="row login_container">
                    <div className="col-md-4 side-swag">
                        <a href="#" className="side-swag-logo">Scambio</a>
                        <div className="side-swag-quotes">
                            <div className="sign-up-quote">
                                <p className="quote-para">
                                    "I was able to swap accesories of my old MacBook for stuff that goes with my new laptop."
                                </p>
                                <p className="quote-name">
                                    Jane Doe
                                </p>
                                <p className="quote-para">
                                    Student
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" container sign-in-container col-md-8">
                        <div className="panel panel-default">
                            {/* <FormErrors formErrors={this.state.formErrors} /> */}
                        </div>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-8">

                                <div className="card sign-in-card">
                                    <h2 className="form-title">Let's get started.</h2>
                                    <h6 className="form-description">Enter your details below.</h6>
                                    <div className="card-block">
                                        <form className="scambio-login">
                                            <div className="form-group">
                                                <label for="firstname">First Name</label>
                                                <input type="text" onChange={this.firstnameChangeHandler} className="form-control" id="firstname" aria-describedby="emailHelp"  name="firstname" placeholder="Jon/Jane" required></input>
                                            </div>
                                            <div className="form-group">
                                                <label for="lastname">Last Name</label>
                                                <input type="text" onChange={this.lastnameChangeHandler} className="form-control" id="lastname" aria-describedby="emailHelp"  name="lastname" placeholder="Doe" required></input>
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" onChange={this.usernameChangeHandler} className="form-control" id="username" aria-describedby="emailHelp"  name="username" placeholder="Enter email" required></input>
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" onChange={this.passwordChangeHandler} className="form-control" id="password"  name="password" placeholder="Password" required></input>
                                                <small id="emailHelp" className="form-text text-muted"><a href='#'>Forgot Password?</a></small>
                                            </div>
                                            <div className="form-group">
                                                <label for="zipcode">Zip code</label>
                                                <input type="email" onChange={this.zipChangeHandler} className="form-control" id="zipcode" aria-describedby="emailHelp"  name="zipcode" placeholder="Enter zip code" required></input>
                                            </div>
                                            <div className="form-group text-center">
                                                <button onClick={this.submitLogin} type="submit" className="btn scambio-submit">SIGN IN</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Signup;
