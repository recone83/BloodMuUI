
import  React from "react";
import { Component } from "react";

export default class Download extends Component {
    constructor(props:any) {
        super(props);

        this.state = {
            history: []
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
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
        <th scope="row">1</th>
        <td>700MB</td>
        <td>BloodMu V4</td>
        <td><a href="/BloodMuV4.zip" target={'_blank'}>BloodMuV4.zip</a></td>
        </tr>
        </tbody>   
    </table>
    </div>
</div>
            </div>
        );
    }
}
