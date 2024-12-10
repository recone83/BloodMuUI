import  React from "react";
import { Component } from "react";

export default class About extends Component {
    componentDidMount(){
        document.title = "About"
    }
    render() {
        return (
        <div>
            <h1>About</h1>
            <p> <br />
                <small>BloodMu is free Mu server, beta testing / in development<br/>
                OpenMu - <a href="https://github.com/MUnique/OpenMU" target={"_blank"}>https://github.com/MUnique/OpenMU</a>
                </small>
                <br />
                <br />
                BloodMu:<br />
                <a href="https://github.com/recone83/BloodMuUI">https://github.com/recone83/BloodMuUI</a><br />
                <a href="https://github.com/recone83/BloodMuApi">https://github.com/recone83/BloodMuApi</a>
            </p>
        </div>);
    }
}
