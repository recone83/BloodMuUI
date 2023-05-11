import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge';

import About from './Actions/About';
import Home from './Actions/Home';
import Register from './Actions/Register';
import Ranking from './Actions/Ranking';
import Login from './Actions/Login';
import AdditionalData from './Actions/AdditionalData';
import Download from './Actions/Download';

import Footer from './Footer';
import { CommunicationService } from "./lib/CommunicationService";
import  Chat from "./lib/Chat/Chat";

import { ServerStatus } from "./Model/Type/Default";

export  interface AppSet {
  serverState: ServerStatus|null;
  chatShow: boolean;
}

export default class App extends Component<any, AppSet> {
  private comm: CommunicationService = CommunicationService.getInstance();
  constructor(props:any) {
    super(props);
    this.state = {
      serverState: {
        players: 0,
        state:"",
        playersList:[""]
      },
      chatShow: false
    }
  }

  componentDidMount() {
    document.title = "BloodMu private MuOnline server"
    this.comm.getServerStatus((st, data) => {
        if(st === 200) {
            this.setState({serverState: data});
        } 
    });
  }

  toggleChat() {
    this.setState({chatShow: !this.state.chatShow});
  }

  render() {
    return (
      <Router>
      <AdditionalData />
      <div className="container-fluid h-100">
          <div className="row h-100">         
          <div className="col text-white bg-dark p-4" style={{ maxWidth: "330px"}}>
              <Link to="/" className="align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <img src="/logo.png" alt="BloodMu" style={{margin:"auto"}}/>
              </Link>
            <div style={{listStyle: "none", color: "greenyellow", margin:"auto"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-broadcast" viewBox="0 0 16 16">
                    <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                  </svg>
                 <span style={{paddingLeft:"10px"}}>Server is {this.state.serverState?.state} 
                 <Badge bg="success" pill>{this.state.serverState?.players}</Badge></span>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link text-white" aria-current="page" to="/news" >
                  <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                  Home
                  </NavLink>
                  <ul className="nav-sub-item">
                    <li><Link to="#" className="text-white" onClick={this.toggleChat.bind(this)} >Game Chat</Link></li>
                  </ul>
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
          
          <Chat showChat={this.state.chatShow} toggleChat={()=>this.toggleChat()} />

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
