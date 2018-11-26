import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


class Delete extends Component {
    constructor() {
        super();
        this.state = {
            BookID: ''
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBookid = this.handleBookid.bind(this);

    }

    handleBookid(event) {
        this.setState({
            BookID: event.target.value
        });
    }

    handleDelete(event) {
        event.preventDefault();

        axios.delete(`http://127.0.0.1:3001/delete/${this.state.BookID}`)
            .then(res => {
                console.log('res ' + res);
                console.log('res.data' + res.data);
                console.log('res.data.redirect ' + res.data.redirect)
                if (res.data == '/home' && res.status === 200) {
                    window.location = '/home'
                }
            })
        console.log('handleDelete ' + event.target.value)
    }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div className="container">
                {redirectVar}
                <div style={{ width: "50%", float: "left" }} className="form-group">
                    <input type="text" className="form-control" name="BookID" value={this.state.value} onChange={this.handleBookid} placeholder="Search a Book by Book ID" />
                </div>
                <div style={{ width: "50%", float: "right" }}>
                    <button className="btn btn-success" type="submit" onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Delete;