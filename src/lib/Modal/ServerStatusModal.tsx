import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ServerStatus } from "../../Model/Type/Default";
import { NavLink } from 'react-router-dom'

type ServerProps = {
    show: boolean;
    serverState: ServerStatus|null;
    toggleModal:any
}

type ServerState = {
    show: boolean;
}

export default class ServerStatusModal extends Component<ServerProps, ServerState> {

    constructor(props: ServerProps) {
        super(props);
        this.state = {
            show: props.show
        }
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.toggleModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Server status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Server state: {this.props.serverState?.state} ({this.props.serverState?.players})</p>
                <p>
                    {this.props.serverState && this.props.serverState?.players > 0 ? "Players online: ":""}
                    {this.props.serverState?.playersList.map((item) => {     
                    return (
                        <NavLink to={"/character/"+item} >{item+","}</NavLink>) 
                    })}

                </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.props.toggleModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        );
    }
}
