import  React from "react";
import { Component } from "react";
import { CommunicationService } from "../../Services/CommunicationService";

import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

export interface ChatState {
    showChat: boolean;
    toggleChat:any;
    chatLog:Array<string>;
}

export default class Chat extends Component<any, ChatState> {
    private comm: CommunicationService = CommunicationService.getInstance();
    constructor(props:ChatState) {
        super(props);
        this.state = props;
    }

    public getChatLog() {
        this.comm.getChatLog((data:any) => { 
          let buffor:string[] = data.data;
          this.setState({chatLog: buffor});
        });
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<ChatState>, snapshot?: any): void {
        if(prevProps.showChat ==false && this.props.showChat == true) {
            this.getChatLog();
        }
    }
    render() {
        return (
        <Offcanvas show={this.props.showChat} onHide={()=>this.props.toggleChat()} placement={'end'} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton >
                <Offcanvas.Title>Server Chat</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <div className="form-group" style={{height: "92%"}}>
              <div className="form-control text-black" id="chat-log" style={{height: "98%"}} >
              {this.state.chatLog !==null ? this.state.chatLog?.map((line, index) => ( <p key={index}>{line}</p>)) : ""}
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
