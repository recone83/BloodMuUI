import  React from "react";
import { Component } from "react";

export default class Login extends Component {
    
    render() {
        return (

        <div className="container">
        <h1>Login</h1>
        <div className="col-10">
            <form>
            <div  className="mb-3 mt-3">
                <label className="form-label">Username </label>
                <input type="text" name="uname" required className="form-control" />
               
            </div>
            <div  className="mb-3 mt-3">
                <label className="form-label">Password </label>
                <input type="password" name="pass" required className="form-control" />
                
            </div>
            <div  className="mb-3 mt-3">
                <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            </form>
        </div>
        </div>);
    }
}
