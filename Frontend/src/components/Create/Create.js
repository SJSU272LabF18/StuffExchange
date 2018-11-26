import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            BookID: '',
            Author: '',
            Title: ''
        };
        this.handleBookChange = this.handleBookChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }


    handleBookChange(event) {
        this.setState({ BookID: event.target.value })
    }


    handleAuthorChange(event) {
        this.setState({ Author: event.target.value })
    }

    handleTitleChange(event) {
        this.setState({ Title: event.target.value })
    }

    handleSubmit() {
        console.log('In handleSubmit')
        console.log('books.BookID ' + this.state.BookID)
        console.log('books.author ' + this.state.Author)
        console.log('books.Title ' + this.state.Title)
        axios.post(`http://127.0.0.1:3001/create`,
            {
                params:
                {
                    BookID: this.state.BookID,
                    Author: this.state.Author,
                    Title: this.state.Title
                }
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data == '/home' && res.status === 200) {
                    window.location = '/home';
                }
            });
    }


    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <br />
                <div className="container">
                    {/* <div style={{ width: '100%' },{ height: '100%' }} className="form-group"> */}
                        <input type="textarea" className="form-control" name="BookID" value={this.state.value} onChange={this.handleBookChange} placeholder="Enter Description" required />
                    {/* </div> */}
                    <br />
                    {/* <div style={{ width: '30%' }} className="form-group">
                        <input type="text" className="form-control" name="Title" value={this.state.value} onChange={this.handleTitleChange} placeholder="Book Title" required />
                    </div>
                    <br />
                    <div style={{ width: '30%' }} className="form-group">
                        <input type="text" className="form-control" name="Author" value={this.state.value} onChange={this.handleAuthorChange} placeholder="Book Author" required />
                    </div> */}
                    <br />
                    <div style={{ width: '30%' }}>
                        <button className="btn btn-success" type="submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;