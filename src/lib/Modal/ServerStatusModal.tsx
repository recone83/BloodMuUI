import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ServerStatus } from "../../Model/Type/Default";

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

    componentWillUpdate(props: ServerProps, props2: ServerProps) {
        console.log(props, props2);
        console.log(this.state);
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
                <p>Players online:
                   
                {this.props.serverState?.playersList.map(item => item+", ")}
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
