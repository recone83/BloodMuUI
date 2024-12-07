import  React from "react";
import { Component } from "react";
import { LoginModel } from "../Model/LoginModel";
import { CommunicationService } from "../lib/CommunicationService";
import Alert from 'react-bootstrap/Alert';

type LoginState = {
    login: LoginModel;
    loginStatus: boolean
}
export default class Login extends Component<any, LoginState> {
    private comm: CommunicationService = CommunicationService.getInstance();
    private status:boolean = false;

    constructor(props:any) {
        super(props);
        this.state = {
            login: {
                Username:"",
                Password:"",
            },
            loginStatus:false
        }
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.loginSubmitt = this.loginSubmitt.bind(this);

    }
    changeUsername(e:React.ChangeEvent<HTMLInputElement>){
        let login = this.state.login;
        login.Username = e.target.value;
        this.setState({ login });
    }
    changePassword(e:React.ChangeEvent<HTMLInputElement>) {
        let login = this.state.login;
        login.Password = e.target.value;
        this.setState({ login });
    }
    loginSubmitt() {
        let loginState = this.state.login;
        this.comm.logIn(loginState,(resp:any) => {
            this.setState({ loginStatus: resp  });
        });
    }
    render() {
        return (
        <div className="container">
            <h1>Login</h1>
            <div className="col-10">
            {this.state.loginStatus === false ?
                <form>
                    <div  className="mb-3 mt-3">
                        <label className="form-label">Username </label>
                        <input type="text" name="uname" required className="form-control" value={this.state.login.Username} onChange={this.changeUsername} />
                    
                    </div>
                    <div  className="mb-3 mt-3">
                        <label className="form-label">Password </label>
                        <input type="password" name="pass" required className="form-control" value={this.state.login.Password} onChange={this.changePassword} />
                        
                    </div>
                    <div  className="mb-3 mt-3">
                        <input type="button" className="btn btn-primary" value="Login" onClick={this.loginSubmitt} />
                    </div>
                </form>
                :
                <Alert key="success" variant="success">
                    Success - You are logged in now!
                </Alert>
            }
            </div>
        </div>);
    }
}
