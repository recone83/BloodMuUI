import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import About from './Actions/About';
import Home from './Actions/Home';
import Register from './Actions/Register';
import Ranking from './Actions/Ranking';
import Login from './Actions/Login';
import AdditionalData from './Actions/AdditionalData';
import Download from './Actions/Download';
import Character from './Actions/Character';

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
        playersList: [""],
        accounts:0,
        characters:0
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
            <Navbar variant="dark" bg="black" expand="lg" id="navbar" sticky="top">
            <Container>
              <Navbar.Brand href="/home">
              <span className="site-logo" >
                <img src="../img/logo.png" title="BloodMu" />
              </span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-dark" />
              <Navbar.Collapse id="navbar-dark">
                  <Nav className="me-auto" >
                      <Nav.Link as={Link} to="/news">News</Nav.Link>
                      <NavDropdown
                        id="nav-dropdown-dark"
                        title="Register"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to="/download">Download</Nav.Link>
                      <Nav.Link as={Link} to="/ranking">Ranking</Nav.Link>
                      <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
              </Navbar.Collapse>
          </Container>
          </Navbar>

            <div id="header">
              <div className="video-shadow"></div>
              <video id="headervideo" width="100%" height="auto"preload="auto"  muted autoPlay loop >
                <source src="../img/world_2.mp4" type="video/mp4" />
              </video>
              <div className="header-content-container">
              <div className="header-content">
              <div className="row">
                <div className="col-7">
                  <div id="stats-block" className="mblock" >
                      <div>
                          <img src="../img/img-server-top.png" />
                          <div className="server-time">
                                <ul>
                                  <li>
                                    { this.state.serverState?.state === "Online" ?
                                    <Link onClick={()=>this.toggleServerModal()} to="#" >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-broadcast" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                                      <span style={{paddingLeft:"5px"}}>Server is {this.state.serverState?.state} 
                                    <Badge bg="success" style={{marginLeft:"10px"}} pill>{this.state.serverState?.players}</Badge></span>
                                    </Link> : <Button variant="danger">Server is Offline</Button>}

                                    <ServerStatusModal show={this.state.showServerModal} serverState={this.state.serverState} toggleModal={()=>this.toggleServerModal()} />
                                  </li>
                                    <li>Total Accounts: <b>{this.state.serverState?.accounts}</b></li>
                                    <li>Total Characters: <b>{this.state.serverState?.characters}</b></li>
                                </ul> 
                          </div>
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
                </div>
                <div className="col-5">
                    <span className="site-logo2" >
                      <img src="../img/logo.png" title="BloodMu" />
                    </span>
                </div>
              </div>
				      </div>
              </div>
            </div>

            <div id="container">
              <div className="container">
              <div className="row">
                <div className="col-8">
                  <Switch>
                    <Route path="/character/:id"  render={(props) => (
                        <Character id={props.match.params.id}/>
                    )} />
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
