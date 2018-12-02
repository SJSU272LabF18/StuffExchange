import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Navbar.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="navbar-nav nav-list">
                    <li class="nav-item nav-li">
                        <Link to="/">Logout</Link>
                        <Link to="/matches">Matches</Link>
                    </li>
                    <li class="nav-item last-nav-btn">
                        <li><Link to="/home" onClick = {this.handleLogout}>Logout</Link></li>
                    </li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="navbar-nav nav-list last-nav-btn">
                    <li class="nav-item">
                        <li><Link to="/login">Login</Link></li>
                    </li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}

                <nav class="navbar navbar-scambio navbar-expand-sm">
                    <a class="navbar-brand" href="#">Scambio</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav nav-list ml-auto">
                            <li class="nav-item nav-li">
                                <Link to="/create">Add</Link>
                            </li>
                            <li class="nav-item nav-li">
                                <Link to="/delete">Delete</Link>
                            </li>
                        </ul>
                        {navLogin}
                    </div>
                </nav>
        </div>
        )
    }
}

export default Navbar;
