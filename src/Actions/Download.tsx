
import  React from "react";
import { Component } from "react";

export default class Download extends Component {
    constructor(props:any) {
        super(props);

        this.state = {
            history: []
        }
    }
    componentDidMount(){
        document.title = "Download BloodMu client"
    }
    render() {
        return (
            <div>
            <h1>Download</h1>
                <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Size</th>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">2</th>
                            <td>~750MB</td>
                            <td>Muonline client - BloodMu V4</td>
                            <td><a href="/BloodMuV4.zip" target={'_blank'}><u>BloodMu V4.zip</u></a></td>
                        </tr>
                        </tbody>   
                    </table>
                    </div>
                </div>
            </div>
        );
    }
}
