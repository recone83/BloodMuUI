
import  React from "react";
import { Component } from "react";
import { CommunicationService } from "../lib/CommunicationService";
import { CharacterList } from "../Model/CharacterModel";
import { NavLink } from 'react-router-dom'

type RankingState = {
    characterList: CharacterList
}

export default class Ranking extends Component<any, RankingState> {
    private comm: CommunicationService = CommunicationService.getInstance();

    constructor(props:any) {
        super(props);
        this.state = {
            characterList: {}
        }
    }

    public componentDidMount() {
        this.comm.getCharacterList(data => {
            if(data.status == 200) {
                this.setState({characterList: data.data});
            } 
        })
    }
    componentWillUpdate() {
    }
    render() {
        return (
        <div className="container">
        <h1>Ranking</h1>

        {Object.keys(this.state.characterList).length > 0 ?
        <div className="card">
            <div className="card-body">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Reset</th>
                    </tr>
                </thead>
                    <tbody>
                        {Object.keys(this.state.characterList).map((key) => (
                            <tr>
                                <td>
                                    <span>
                                        <NavLink to={"/character/"+this.state.characterList[key].name} >
                                            <strong>{this.state.characterList[key].name}</strong><br />
                                            <small>{this.state.characterList[key].class}</small>
                                        </NavLink>
                                    </span>
                                </td>
                                <td>{this.state.characterList[key].resets}</td>
                            </tr>
                            ))
                        }
                    </tbody>   
                </table>
                </div>
             </div>
            : <div className="loadinggif" ></div>}
        </div>);
    }
}
