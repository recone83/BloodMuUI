
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
            <div id="video">
                <h1 style={{color: "white", position: "absolute", top: "170px"}}>Home</h1>
                <video width="100%" height="auto" loop={true} preload="auto" autoPlay >
                    <source src="/world_2.mp4" type="video/mp4" />
                </video>
            </div>
        </div> 
        );
    }
}
