import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '../LandingPage/Navbar.js'
import Junk from '../Junk/Junk.js'
import HttpService from '../http-service.js'
import './Home.css'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';

const http = new HttpService();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            junks: [],
            pjunks: [],
            myjunks:[],
            options: [],
          selectedOption: null,
        }
        this.loadData = this.loadData.bind(this);
        this.junkList = this.junkList.bind(this);
        this.loadMyJunks = this.loadMyJunks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderSelectedItem = this.renderSelectedItem.bind(this);


        this.loadData();
        this.loadMyJunks();
    }
    //get the books data from backend
    loadData = () => {
        var self = this;
        http.getJunks().then(data => {
            self.setState({junks: data})
            console.log(data);
            self.setState({pjunks: data});
        },err => {

        });
    }

    loadMyJunks = async () => {
        var self = this;
        let data = await http.getJunks();

        const optn = data.map((d) => {
            return { "value": d.JunkID, "label": d.Title}
        });
        self.setState({
            myjunks: data,
            options:optn
        });
        console.log(data);
    }


    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.loadData();
        console.log(`Option selected:`, selectedOption);
        //this.renderSelectedItem();
    }

    componentDidMount() {
        this.setState({pjunks: this.state.junks});
    }

    junkList = () => {
        const list = this.state.pjunks.map((junk) =>
            <div key={junk.JunkID}>
                <Junk JunkID={junk.JunkID} title={junk.Title} description={junk.Description} imgUrl={junk.ImgUrl} condition={junk.condition}/>
            </div>
        );
        return (list);
    }

    renderSelectedItem = () => {
        const sid = this.state.selectedOption
        console.log({sid});
        if (sid == null){
            return(
                <div class="alert alert-secondary alert-preview" role="alert">
                    Item not selected, pleace select an item to proceed.
                </div>
            )
        }
        else{
            const i = this.state.myjunks.filter(j => sid.value == j.JunkID).map((j) =>
                <div className="card preview-card">
                    <img className="card-img-top" src={ j.ImgUrl } alt="Junk"></img>
                    <div className="card-body">
                      <h5 className="card-title">{ j.Title }</h5>
                      <p className="card-text">{ j.Description }</p>
                    </div>

                </div>

            );
            return i;
        }
    }


    filterList = (e) => {
        var updatedJunks = this.state.junks;
        updatedJunks = updatedJunks.filter(function (item) {
            return item.Title.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });
        this.setState({pjunks: updatedJunks});
    }

    render() {
        let sidebar = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            sidebar = (
                <div></div>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            sidebar = (
                <div className="signup-toggle-div">
                    <div className="signup-toggle-img"></div>
                    <div className="signup-toggle-button-div">
                        <div className="card text-center signup-toggle-card">
                            <div className="card-body">
                                <h5 className="card-title">You aren't logged in. Plese signin t0 continue</h5>

                                <div class="card-footer toggle-card-footer">
                                    <Link to="/login">Log in</Link>
                                </div>
                                <div class="card-footer toggle-card-footer">
                                    <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //const { selectedOption } = this.state;
        //iterate over books to create a table row
        //if not logged in go to login page




        // let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        return (
            <div>




                <div className="main-app-container row">
                    <div className="col-md-9 junk-yard-div">
                        <div className="search-filter-div">
                            <form>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg search-bar" placeholder="Search" onChange={this.filterList}></input>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-columns junk-card-deck">
                            {this.junkList()}
                        </div>
                    </div>
                    <div className="col-md-3 cb-box-div">
                        {sidebar}
                        <Scrollbars>

                        <div className="junk-select-div">
                            <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.options}
                            />
                        </div>
                        <div className="myjunk-preview">
                            {this.renderSelectedItem()}
                        </div>


                        </Scrollbars>
                    </div>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;
