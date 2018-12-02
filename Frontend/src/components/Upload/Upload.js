import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './Upload.css';

//Define a Login Component
class Upload extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            Name: "",
            ItemDescription: "",
            ItemCondition: "",
            Category: "",
            Image: null,
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.descChangeHandler = this.descChangeHandler.bind(this);
        this.condChangeHandler = this.condChangeHandler.bind(this);
        this.imageChangeHandler = this.imageChangeHandler.bind(this);
        this.submitUpload = this.submitUpload.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            Name: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    descChangeHandler = (e) => {
        this.setState({
            ItemDescription: e.target.value
        })
    }
    condChangeHandler = (e) => {
        this.setState({
            ItemCondition: e.target.value
        })
    }
    imageChangeHandler = (e) => {
        this.setState({
            Image: e.target.files[0]
        })
    }
    //submit Login handler to send a request to the node backend
    submitUpload = (e) => {
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
        console.log(this.state);
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <div className="row login_container">
                    <div className="col-md-4 signup-page side-swag">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card side-gif-card">
                                    <img className="card-img-top" src="https://i.giphy.com/media/VRolEcq3Z4axa/giphy.webp" alt="Card image cap"></img>
                                    <div className="card-body">
                                        <p className="card-text gif-caption">Wave your old stuff goodbye!. Let's find something exciting in its stead.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" container upload-container col-md-8">
                        <div className="panel panel-default">
                            {/* <FormErrors formErrors={this.state.formErrors} /> */}
                        </div>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-8">

                                <div className="card sign-in-card">
                                    <h2 className="form-title">What do you wanna get rid of ?</h2>
                                    <h6 className="form-description">Enter details about your stuff.</h6>
                                    <div className="card-block">
                                        <form className="scambio-login">
                                            <div className="form-group">
                                                <label for="name">Name</label>
                                                <input type="text" onChange={this.nameChangeHandler} className="form-control" id="name" aria-describedby="emailHelp"  name="name" placeholder="Name your item" required></input>
                                            </div>
                                            <div className="form-group">
                                                <label for="desc">Description</label>
                                                <textarea className="form-control" onChange={this.descChangeHandler} id="desc" name="desc" rows="3" placeholder="Details about your item" required></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label for="cond">Condition</label>
                                                <select class="form-control" id="cond" onChange={this.condChangeHandler}>
                                                  <option>New</option>
                                                  <option>Fairly-new</option>
                                                  <option>Used</option>
                                                </select>
                                            </div>
                                            <div className="form-group upload-form-group">
                                                <label for="image">Upload an Image</label>
                                                <input type="file" class="form-control-file" id="image" onChange={this.imageChangeHandler}></input>
                                            </div>
                                            <div className="signup-submit form-group text-center">
                                                <button onClick={this.submitUpload} type="submit" className="btn scambio-submit">ADIOS !</button>
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
export default Upload;
