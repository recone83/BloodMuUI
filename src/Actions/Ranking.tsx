
import  React from "react";
import { Component } from "react";
import { CommunicationService } from "../lib/CommunicationService";
import { CharacterList, FullList } from "../Model/CharacterModel";
import { NavLink } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

type RankingState = {
    resetList: CharacterList,
    allList: FullList
}

export default class Ranking extends Component<any, RankingState> {
    private comm: CommunicationService = CommunicationService.getInstance();

    constructor(props:any) {
        super(props);
        this.state = {
            resetList: {},
            allList: {}
        }
    }

    public getResets() {
        if (Object.keys(this.state.resetList).length == 0)
        this.comm.getCharacterList(data => {
            if(data.status == 200) {
                this.setState({resetList: data.data});
            }
        })
    }
    
    public getAll() {
        if(Object.keys(this.state.allList).length == 0)
            this.comm.getFullList(data => {
                if(data.status == 200) {
                    this.setState({allList: data.data});
                }
            })
    }

    componentDidMount() {this.getAll();
    }

    componentWillUpdate() {
    }

    handleSelect(eventKey:any) {
        switch (eventKey) {
            case "all":
                this.getAll();
                break;
            case "resets": 
                this.getResets();  
            break; 
            default: 
        }
    }

    render() {
        return (
        <div className="container">
        <h1>Ranking</h1>
        <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3" onSelect={(eventKey)=>this.handleSelect(eventKey)}>
            <Tab id="tab1" eventKey="all" title="All players">
            {Object.keys(this.state.allList).length > 0 ?
                        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Lvl</th>
                                <th scope="col">Reset</th>
                            </tr>
                        </thead>
                            <tbody>
                                {Object.keys(this.state.allList).map((key) => (
                                    <tr>
                                        <td>
                                            <span>
                                                <NavLink to={"/character/"+this.state.allList[key].name} >
                                                    <strong>{this.state.allList[key].name}</strong><br />
                                                    <small>{this.state.allList[key].class}</small>
                                                </NavLink>
                                            </span>
                                        </td>
                                        <td>{this.state.allList[key].lvl}</td>
                                        <td>{this.state.allList[key].reset}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>   
                        </table>
                    : <div className="loadinggif" ></div>}
            </Tab>
            <Tab id="tab2" eventKey="resets" title="Top Resets">
                    {Object.keys(this.state.resetList).length > 0 ?
                        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Reset</th>
                            </tr>
                        </thead>
                            <tbody>
                                {Object.keys(this.state.resetList).map((key) => (
                                    <tr>
                                        <td>
                                            <span>
                                                <NavLink to={"/character/"+this.state.resetList[key].name} >
                                                    <strong>{this.state.resetList[key].name}</strong><br />
                                                    <small>{this.state.resetList[key].class}</small>
                                                </NavLink>
                                            </span>
                                        </td>
                                        <td>{this.state.resetList[key].resets}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>   
                        </table>
                    : <div className="loadinggif" ></div>}
            </Tab>
        </Tabs>
        </div>);
    }
}
