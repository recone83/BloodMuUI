
import  React, { useState } from "react";
import { Component } from "react";
import { NewAccountPostData, CommunicationService } from "../lib/CommunicationService";

export interface RegisterState {
    LoginName: string; 
    Password: string; 
    PasswordRe: string; 
    EMail: string;

    Disabled:boolean;

    BadLoginName:boolean;
    BadPassword:boolean;
    BadEMail:boolean;
    
    RegisterStatus:string,
    FormSuccessState:string
}

interface RegisterProps {
    scale: string;
}
 
export default class Register extends Component<any, RegisterState> {
    private comm: CommunicationService = CommunicationService.getInstance();

    constructor(props:any) {
        super(props);

        this.state = {
            EMail:"",
            
            LoginName:"",
            Password:"",
            PasswordRe:"",

            Disabled:true,

            BadLoginName:false,
            BadPassword:false,
            BadEMail:false,

            RegisterStatus:"",
            FormSuccessState:""
        }

        this.changeLogin = this.changeLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordRe = this.changePasswordRe.bind(this);
        this.saveAccount = this. saveAccount.bind(this);
        this.resetRegistration = this.resetRegistration.bind(this);
    }

    resetRegistration() {
        this.setState({
            EMail:"",
            LoginName:"",
            Password:"",
            PasswordRe:"",

            Disabled:true,

            BadLoginName:true,
            BadPassword:true,
            BadEMail:true,

            RegisterStatus:"",
            FormSuccessState:"is-valid"
        });
    }

    changeLogin(e:React.ChangeEvent<HTMLInputElement>) {
        this.setState({ LoginName: e.target.value },()=>{
            this.formValidate();
        });
    }

    changePassword(e:React.ChangeEvent<HTMLInputElement>) {
        this.setState({ Password: e.target.value },()=>{
            this.formValidate();
        });
    }

    changePasswordRe(e:React.ChangeEvent<HTMLInputElement>) {
        this.setState({ PasswordRe: e.target.value },()=>{
            this.formValidate();
        });
    }

    changeEmail(e:React.ChangeEvent<HTMLInputElement>) {
        this.setState({ EMail: e.target.value },()=>{
            this.formValidate();
        });
    }

    saveAccount() {
        let postData:NewAccountPostData = {
            LoginName:this.state.LoginName,
            EMail: this.state.EMail,
            Password: this.state.Password
        }
        this.comm.createAccount(postData, (data) => {
            this.setState({RegisterStatus: data.status.toString()})
        });
    }

    formValidate() {
        let isDisabled = false;

        if (!this.state.LoginName || this.state.LoginName.length < 4) {
            isDisabled = true;
            this.setState({ BadLoginName: true});
        } else {
            this.setState({ BadLoginName: false});
        }

        if (!this.state.EMail || this.state.EMail.length < 4 ) {
            isDisabled = true;
            this.setState({ BadEMail: true});
        } else {
            this.setState({ BadEMail: false});
        }
        if (!this.state.Password || !this.state.PasswordRe || this.state.Password !== this.state.PasswordRe || this.state.Password.length < 4) {
            isDisabled = true;
            this.setState({ BadPassword: true});
        } else {
            this.setState({ BadPassword: false});
        }

        this.setState({
            Disabled: isDisabled,
            FormSuccessState: "is-valid"
        });
    }

    render() {
        return  (
        <div className="container">
        {this.state.RegisterStatus == '' ?
            <div className="row">
                <div className="col-8">
                    <h1>Register</h1>
                    <p className="small">Use this form to creat new account.</p>
                    <form  autoComplete="off" >
                    <div className="mb-3 mt-3">
                        <label htmlFor="username" className="form-label">Login:</label>
                        <input value={this.state.LoginName} onChange={this.changeLogin} type="text" className={`form-control ${this.state.BadLoginName ? 'is-invalid' : this.state.FormSuccessState }`} id="login" placeholder="Enter login" />
                        <div className="invalid-feedback small">Please provide a valid login.</div>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input required value={this.state.EMail} onChange={this.changeEmail} type="email" className={`form-control ${this.state.BadEMail ? 'is-invalid' : this.state.FormSuccessState }`} id="email" placeholder="Enter email" />
                        <div className="invalid-feedback">Please provide a valid email.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password:</label>
                        <input value={this.state.Password} onChange={this.changePassword} type="password" className={`form-control ${this.state.BadPassword ? 'is-invalid' : this.state.FormSuccessState }`} id="pwd" placeholder="Enter password" autoComplete="off" />
                        <div className="invalid-feedback">Please provide a valid password.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwdre" className="form-label">Password re.:</label>
                        <input value={this.state.PasswordRe} onChange={this.changePasswordRe} type="password" className={`form-control ${this.state.BadPassword ? 'is-invalid' : this.state.FormSuccessState }`} id="pwdre" placeholder="Enter password" autoComplete="off"  />
                        <div className="invalid-feedback">Password & Password re. needs to mach</div>
                    </div>
                    <div className="mb-3">
                        <button type="button" disabled= {this.state.Disabled} className="btn btn-primary" onClick={this.saveAccount} >Submit</button>
                    </div>
                    </form>
                </div>
            </div> :
            <div className="row">
                {this.state.RegisterStatus == "200" &&
                <div className="col-8">
                    <h1>Register</h1>
                    <p className="small text-success">New account was created for you.</p> 
                </div>}
                {this.state.RegisterStatus == "400" &&
                <div className="col-8">
                    <h1>Register</h1>
                    <p className="small text-danger">Failed to create account.</p>
                    <button type="button" className="btn btn-primary" onClick={this.resetRegistration} >Back</button>
                </div>}
            </div>}
        </div>);
    }
}
