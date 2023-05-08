import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'

import About from './Actions/About';
import Home from './Actions/Home';
import Register from './Actions/Register';
import Ranking from './Actions/Ranking';
import Login from './Actions/Login';
import AdditionalData from './Actions/AdditionalData';
import Download from './Actions/Download';

import Footer from './Footer';
import { CommunicationService } from "./lib/CommunicationService";

import { ServerStatus } from "./Model/Type/Default";

export default class App extends Component<any, ServerStatus> {
  private comm: CommunicationService = CommunicationService.getInstance();
  constructor(props:any) {
    super(props);
    this.state = {
      players: 0,
      state:"",
      playersList:[""]
    }
  }

  componentDidMount() {
    document.title = "BloodMu private MuOnline server"
    this.comm.getServerStatus((st, data) => {
        if(st == 200) {
            this.setState(data);
        } 
    });
  }

  render() {
    return (
      <Router>
      <AdditionalData />
      <div className="container-fluid h-100">
          <div className="row h-100">         
          <div className="col text-white bg-dark p-4" style={{ maxWidth: "270px"}}>
            <Link to="/" className="align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32">
                <use xlinkHref="#bloodmu"></use>
              </svg>
              <span className="fs-4">BloodMu</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link text-white" aria-current="page" to="/news" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                  Home
                  </NavLink>
              </li>
              <li>
                  <NavLink activeClassName="active" className="nav-link text-white" aria-current="page" to="/register" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                  Register
                  </NavLink>
              </li>
              <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/download" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                  Download
                  </NavLink>
              </li>
              <li>
                  <NavLink activeClassName="active" className="nav-link text-white" aria-current="page" to="/ranking" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                  Ranking
                  </NavLink>
              </li>
              <li>
                  <NavLink activeClassName="active"  className="nav-link text-white" aria-current="page" to="/about" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                  About
                  </NavLink>
              </li>
            </ul>
            <hr />
            {/* <NavLink activeClassName="active"  className="nav-link text-white" aria-current="page" to="/login" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                  Login
                </NavLink> */}
          </div>
          <div className="col text-white bg-secondary py-4" style={{maxWidth: "290px"}} >
            <span className="align-items-center fs-10 text-decoration-none">
              Server Info
            </span>
            <ul className="list-group list-group-flush" style={{listStyle: "none", color: "greenyellow"}}>
              <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-broadcast" viewBox="0 0 16 16">
               <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
              </svg> server is {this.state.state} ({this.state.players})
              </li>
            </ul>
            <div className="form-group py-3" style={{height: "85%"}}>
              <label htmlFor="item1" ><b>Game chat</b></label>
              <div className="form-control text-black" id="item1" style={{height: "98%"}} >
                In progress...
              </div>

              <form className="d-flex flex-row py-2">
              <select className="form-control d-inline" data-style="btn-success" style={{width: "40px"}}>
                <option ></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <input type="text" className="form-control d-inline" placeholder="Message" />
              </form>
            </div>
          </div>
          <div className="col py-3" >
            <Switch>
            <Route path="/login" >
                <Login />
              </Route>
              <Route path="/about" >
                <About />
              </Route>
              <Route path="/download" >
                <Download />
              </Route>
              <Route path="/ranking" >
                <Ranking />
              </Route>
              <Route path="/register" >
                <Register />
              </Route>
              <Route path="/" >
                <Home />
              </Route>
            </Switch>
            <Footer />  
          </div>    
      </div>
    </div>
    </Router>
    );
  }
}
