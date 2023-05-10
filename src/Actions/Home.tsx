
import  React from "react";
import { useRef, useState, useEffect  } from 'react';
import { Component } from "react";

export default class Home extends Component {

    constructor(props:any) {
        super(props);

    }
    componentDidMount() {
     }
    
    render() {
        return (
        <div className="container">
            <div className="row" style={{marginTop:"20px"}}>         
                <div className="col">
                    <h3>BloodmMu server start</h3>
                    <span>Server season start!</span>
                    <hr />
                </div>
            </div>
        </div> 
        );
    }
}
