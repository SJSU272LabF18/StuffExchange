import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../LandingPage/Navbar.js'
import Junk from '../Junk/Junk.js'
import HttpService from '../http-service.js'
import './Matches.css'
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';

const http = new HttpService();

class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ilist: []
        }
        this.loadData = this.loadData.bind(this);
        this.renderMatches = this.renderMatches.bind(this);

        this.loadData();
    }

    loadData = () => {
        var self = this;
        http.getMatches().then(data => {
            self.setState({ilist: data});
            console.log(data);
            console.log(this.state.ilist);
        },err => {

        });
    }

    renderMatches = () => {
        const list = null;
        console.log(this.state.ilist);
        if(this.state.ilist.length == 0){
            return(
                <div class="alert alert-secondary alert-preview" role="alert">
                    You have no items currently.
                </div>
            )
        }
        else{
            const list = this.state.ilist.map((myitem) =>
                <div className="match-group">
                    <div className="row">
                        <div className="card myitem-card">
                            <img className="card-img-top" src={ myitem.ImageURL } alt="Card image cap"></img>
                        </div>
                        <div className="col-2 myitem-title">
                            <h5 className="card-title">{myitem.Name}</h5>
                        </div>

                    </div>
                    <div className="match-heading-div">
                        <h6 className="match-header">Matches</h6>
                    </div>
                    <div className="row match-row">
                        {myitem.MatchedWith.map((item) =>
                            <div className="col-md-2">
                                <div className="card match-card">
                                    <img className="card-img-top" src={ item.ImageURL } alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.Name}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
            return list;
        }

    }

    render(){
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return(
            <div className="container">
            {redirectVar}
            <h2>Your matches</h2>
                {this.renderMatches()}
            </div>
        )

    }
}

export default Matches;
