
import  React from "react";
import { Component } from "react";
import { CommunicationService } from "../lib/CommunicationService";
import { CharacterList, CharacterList11, CharacterModel } from "../Model/CharacterModel";


type RankingState = {
    characterList: CharacterList
}

export default class Ranking extends Component<{}, RankingState> {
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

    render() {
        return (
        <div className="container">
        <h1>Ranking</h1>

        {Object.keys(this.state.characterList).length > 1 ?
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
                                    <span><b>{this.state.characterList[key].name}</b><br />
                                    <small>{this.state.characterList[key].class}</small>
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
            : <div className="loading-gif" style={{marginTop:'100px'}} ></div>}
        </div>);
    }
}
