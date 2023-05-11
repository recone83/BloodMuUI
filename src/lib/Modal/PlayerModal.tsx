import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CommunicationService } from "../../lib/CommunicationService";
import {  CharacterModel } from "../../Model/CharacterModel";

type ModalState = {
    show: boolean;
    character: CharacterModel|null
}

type ModalProps = {
    show: boolean;
    children: string;
}

export default class PlayerModal extends Component<ModalProps, ModalState> {
    private comm: CommunicationService = CommunicationService.getInstance();

    constructor(props: ModalProps) {
        super(props);
        this.state = {
            show: props.show,
            character: null
        }
    }

    componentWillUpdate(props: ModalProps, props2: ModalState) {
        if(props2.character === null) {
            this.comm.getCharacter(this.props.children, (st) => {
                this.setState({character: st.data})
            });
        }
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    render() {
        return (<span><span style={{cursor:"pointer"}} onClick={() => this.showModal()}>{this.props.children}</span>
            <Modal show={this.state.show} onHide={() => this.hideModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Character details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Name: {this.state.character?.name}</p>
                <p>Class: {this.state.character?.class}</p>
                <p>Reset: {this.state.character?.reset}</p>
                <p>Lvl: {this.state.character?.lvl}</p>
                <p>Map: {this.state.character?.currentMap}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.hideModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          </span>
        );
    }
}
