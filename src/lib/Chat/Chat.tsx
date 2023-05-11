import  React from "react";
import { Component } from "react";

import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

export interface ChatState {
    showChat: boolean,
    toggleChat:any
}

export default class Chat extends Component<ChatState, ChatState> {

    constructor(props:ChatState) {
        super(props);
        this.state = props;
    }

    componentWillUpdate(props:ChatState, props2:ChatState) {
    }

    componentDidUpdate(props:ChatState, props2:ChatState) {
    }

    render() {
        return (
        <Offcanvas show={this.props.showChat} onHide={()=>this.props.toggleChat()} placement={'end'} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton >
                <Offcanvas.Title>Server Chat</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <div className="form-group" style={{height: "92%"}}>
              <div className="form-control text-black" id="item1" style={{height: "98%"}} >
                In progress...
              </div>
              <form className="d-flex flex-row py-2">
              <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Char
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              <input type="text" className="form-control d-inline" placeholder="Message" />
              </form>
              </div>
            </Offcanvas.Body>
        </Offcanvas>
        );
    }
}
