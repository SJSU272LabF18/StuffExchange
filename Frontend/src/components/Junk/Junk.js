import React, {Component} from 'react';
import './Junk.css';

class Junk extends Component{
    render(){
        return(
            <div className="card junkyard-card">
                <img class="card-img-top" src={ this.props.imgUrl } alt="Junk"></img>
                <div class="card-body">
                    <h5 class="card-title">{ this.props.title }</h5>
                    <p class="card-text">{ this.props.description }</p>
                    <div className="condition-div">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <span className="condition-span">{ this.props.condition }</span>
                            </div>
                            <div className="col-2 ml-auto">
                                <i class="fas fa-expand-arrows-alt scambio-expand" data-toggle="modal" data-target={`#modal ${this.props.JunkID}`}></i>
                            </div>
                        </div>


                    </div>
                  <a href="#" className="btn exchange-btn">Exchange</a>
                </div>
                <div className="modal fade bd-example-modal-lg" id={`modal ${this.props.JunkID}`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="row">
                            <div className="col-8 junk-img-div">
                                <img class="card-img-top" src={ this.props.imgUrl } alt="Junk"></img>
                            </div>
                            <div className="col-4 junk-data-div">
                                <div class="card junk-card">
                                    <div class="card-body">
                                        <h3 class="card-title">{ this.props.title }</h3>
                                        <p class="card-text">{this.props.description}</p>
                                        <div className="condition-div">
                                            <span className="condition-span">{ this.props.condition }</span>
                                        </div>
                                        <a href="#" className="btn exchange-btn">Exchange</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        );

    }
}
export default Junk;
