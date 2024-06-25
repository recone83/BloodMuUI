import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

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
import ServerStatusModal from "./lib/Modal/ServerStatusModal";

export interface AppSet {
  serverState: ServerStatus|null;
  showServerModal: boolean;
}

export default class App extends Component<any, AppSet> {
  private comm: CommunicationService = CommunicationService.getInstance();
  constructor(props:any) {
    super(props);
    this.state = {
      serverState: {
        players: 0,
        state: "",
        playersList: [""]
      },
      showServerModal: false
    }
  }

  toggleServerModal() {
    this.setState({showServerModal: !this.state.showServerModal})
  }

  componentDidMount() {
    document.title = "BloodMu private MuOnline server"
    this.comm.getServerStatus((st, data) => {
        if (st === 200) {
            this.setState({serverState: data});
        } 
    });
  }

  render() {
    return (
    <Router>
      <AdditionalData />
      <div className="container-fluid h-100" style={{padding:"0px", margin:"0px",float:"left",width:"100%"}}>
            <div id="navbar">
                <ul>
                  <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/news" >
                  Home
                  </NavLink>
                  </li>
                  <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/register" >
                  Register
                  </NavLink>
                  </li>
                  <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/download" >
                  Download
                  </NavLink>
                  </li>
                  <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/ranking" >
                  Ranking
                  </NavLink>
                  </li>
                  <li>
                  <NavLink className="nav-link text-white" aria-current="page" to="/about" >
                  About
                  </NavLink>
                  </li>
                </ul>
            </div>
            <div id="header">
              <div className="video-shadow"></div>
              <video id="headervideo" width="100%" height="auto"preload="auto"  muted autoPlay loop >
                <source src="../img/world_2.mp4" type="video/mp4" />
              </video>
              <div className="header-content-container">
              <div className="header-content">
                <div id="stats-block" className="mblock" >
                    <div>
                      <a href="/server">
                        <img src="../img/img-server-top.png" />
                        <div className="server-time">
                              <ul>
                                  <li><b>Server is Online</b></li>
                                  <li>Users online: <b className="players" style={{color:"green", fontSize:"18px"}}></b></li>
                                  <li>Total Accounts: <b></b></li>
                                  <li>Total Characters: <b></b></li>
                              </ul> 
                        </div>
                      </a> 
                    </div>	
                </div>
                
                <div id="stats-block-right" className="mblock" >
                  <div>
                    <img src="../img/img-server-bottom.png" />
                    <div className="server-time">
                    <ul style={{float:"left"}}>
                      <li><b>MuOnline Season 6.3</b></li>
                      <li>Reset 400lvl</li>
                    </ul>
                    </div>
                  </div>
                </div>

					      <div className="col-xs-8 header-front"></div>
                <div className="col-xs-4 header-front">
                      <span style={{fontFamily:"fantasy",textShadow:"1px 1px 5px black",fontSize:"40px",left:"+350px",fontWeight:"bold",color:"red",letterSpacing:"-2px",textAlign:"center", margin:"auto",position:"relative",top:"220px",filter:"blur(0.5px)"}} >
                          Blood
                      </span>
                      <img className="site-logo" src="../img/logo.png" title="" />
                </div>
				      </div>
              </div>
            </div>

            <div id="container">
              <div className="container">
              <div className="row">
                <div className="col-8">
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
                </div>
                <div className="col-4">
                  <div className="sidebar-banner">
                    <NavLink className="nav-link text-white" aria-current="page" to="/register" >
                      <img src="../img/register_sidebar_banner.jpg"/>
                    </NavLink>
                  </div>
                  <div className="sidebar-banner">
                    <NavLink className="nav-link text-white" aria-current="page" to="/download" >
                      <img src="../img/download_sidebar_banner.jpg"/>
                    </NavLink>
                  </div>

                  <div className="panel panel-sidebar">
                    <div className="panel-heading">
                      <h3 className="panel-title">Contact</h3>
                    </div>
                    <div className="panel-body">
                      <a href="mailme:admin[at]bloodmu.pl" >admin[at]bloodmu.org</a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <footer className="footer">
              <div className="footer-container">
                <div className="col-xs-8">
                  <p>&copy; 2024</p>
                  <p>This site is in no way associated with or endorsed by Webzen Inc.</p>
                  <br />
                  <p>MU Online is a free-to-play medieval fantasy MMORPG from Webzen. The game features fast-paced combat, quests, dungeons, PvP, castle sieges, and more. Players can choose from the seven classes of Dark Knight, Dark Wizard, Fairy Elf, Magic Gladiator, Dark Lord, Summoner, and Rage Fighter, and participate in a variety of official combat-centric events and prize challenges.</p>
                </div>
                <div className="col-xs-4">
                  <div className="col-xs-6 text-center">
                    <span style={{fontWeight:"bold"}}></span><br />
                    <span className="footer-time"><time id="tServerTime"></time></span>
                  </div>
                  <div className="col-xs-6 text-center">
                    <span style={{fontWeight:"bold"}}></span><br />
                    <span className="footer-time"><time id="tLocalTime"></time></span>
                  </div>
                  <div className="col-xs-12 text-center"></div>
                </div>
              </div>
            </footer>
      </div>
    </Router>
    );
  }
}
