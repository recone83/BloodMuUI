import  React, { Component } from "react";
import  Chat from "../lib/Chat/Chat";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export  interface AppSet {
    chatShow: boolean;
}

export default class Home extends Component<any, AppSet> {

    constructor(props:any) {
        super(props);
        this.state = {
        chatShow: false
        }
    }
    
    toggleChat() {
        this.setState({chatShow: !this.state.chatShow});
    }
    componentDidMount(){
        document.title = "BloodMu is MuOnLine private server"
    }
    render() {
        return (
        <div>
            <div className="row" style={{marginTop:"20px"}}>         
                <div className="col-12">
                    <h3>
                        Home page & News
                        <span>
                          {!this.state.chatShow &&<Button onClick={this.toggleChat.bind(this)} variant="primary" style={{float:"right"}}>Show chat</Button>}
                        </span>
                    </h3>
                <br />
                <Card  style={{ width: '100%' }}>
                    <Card.Body>
                    <Card.Title>Welcome </Card.Title>
                        <Card.Text>
                        BloodMu is free to play game, online RPG, based on oryginal Muonline. 
                        <br />
                        Please join us on Continent to fight evil and improve own sills & gear!
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card  style={{ width: '100%', marginTop:'20px' }}>
                    <Card.Body>
                        <Card.Text>
                        BloodMu start 01/03/2023
                        </Card.Text>
                    </Card.Body>
                </Card>            
                </div>
            </div>
            <Chat showChat={this.state.chatShow} toggleChat={()=>this.toggleChat()} />
        </div> 
        );
    }
}
