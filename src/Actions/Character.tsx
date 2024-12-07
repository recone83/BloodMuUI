import  React from "react";
import { Component } from "react";

import { CommunicationService } from "../Services/CommunicationService";
import {  CharacterModel } from "../Model/CharacterModel";

type ModalState = {
    character: CharacterModel | null
}

type ModalProps = {
    id: string;
}

export default class Character extends Component<ModalProps, ModalState> {
    private comm: CommunicationService = CommunicationService.getInstance();

    constructor(props:any) {
        super(props);
        this.state = {
            character: null
        }
    }

    componentDidMount() {
        this.comm.getCharacter(this.props.id, (st) => {
            this.setState({
                character: st.data,
            })
        });
    }

    componentWillUpdate(props: ModalProps, stats: ModalState) {
        if(props.id !== stats.character?.name) {
            this.comm.getCharacter(this.props.id, (st) => {
                this.setState({
                    character: st.data,
                })
            });
        }
    }

    renderSwitch(param: string|undefined) {
        let dir = "/img/character-avatars/";

        switch(param) {
            case 'Dark Wizard':
            case 'Soul Master':
            case 'Grand Master':
                return dir+'dw.jpg';
            case 'Dark Knight':
            case 'Blade Knight':
            case 'Blade Master':
                return dir+'dk.jpg';
            case 'Muse Elf':
            case 'Fairy Elf':
            case 'High Elf':
                return dir+'elf.jpg';
            case 'Summoner':
            case 'Bloody Summoner':
                return dir+'sum.jpg';
            case 'Duel Master':
            case 'Magic Gladiator':
            case 'Magic Knight':
                return dir+'mg.jpg';
            default:
                return dir+"avatar.jpg";
        }
    }

    render() {
        return (
        <div className="container">
        { this.state.character ? <div>
            <h1>{this.state.character?.name}</h1>
            <div style={{float:"left", width:"100px", height:"100px",margin:"5px 5px 5px 5px"}} >
                <img src={this.renderSwitch(this.state.character?.class)} />
            </div>

            Character Class: <b>{this.state.character?.class}</b><br />
            Current map: <b>{this.state.character?.currentMap} ({this.state.character?.x}, {this.state.character?.y})</b> <br />
            Experience: <b>{this.state.character?.exp}</b> <br />
            Level: <b>{this.state.character?.lvl}</b> <br />
            Resets: <b>{this.state.character?.reset}</b> <br />
            </div> : <div className="loadinggif" ></div>}
        </div>);
    }
}
