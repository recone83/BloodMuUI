
import  React from "react";
import { Component } from "react";


export default class Success extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Success
                </div>
                <div className="card-body">
                    <p className="card-text">Calculation was saved to history.</p>
                    <button className="btn btn-primary" >Close</button>
                </div>
            </div>);
    }
}
