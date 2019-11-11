import React, { Component } from 'react';
import "./auth.css";
import authContext from "../context/auth-context";

class Auth extends Component {
    constructor(props) {
        super(props);
         this.email = React.createRef();
         this.password = React.createRef();
         this.state={
             isLogin:true
         }
    }
    static contextType = authContext;
    changeLogin=()=>{
        this.setState({
            isLogin: !this.state.isLogin
        })
    }


     handelSubmit = (e)=>{
            e.preventDefault();
            const email = this.email.current.value;
            const password = this.password.current.value;
            if(email.trim().lenght ===0 || password.trim().lenght ===0){
                return;
            }

            let requestBody = {
                query: `
                mutation {
                    createUser(inputUser: {email: "${email}", password: "${password}"}) {
                    id
                    email
                    }
                }
                `
            };
            if(this.state.isLogin){
                requestBody = {
                    query: `
                      query {
                        login(email: "${email}", password: "${password}") {
                          userId
                          token
                        }
                      }
                    `
                  };
             }
            
            fetch('http://localhost:7000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(res=>{
                    return res.json();
            })
            .then(data=>{
                console.log(this.context);
                 if(data.data.login.token){
                      this.context.login(data.data.login.userId, data.data.login.token);
                 }
            }).catch(err=>{
                console.log(err);
            })
     }
    render() {
        return (
            <div className="auth">
                <form onSubmit={this.handelSubmit}>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input name="email" id="email"  ref={this.email}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Email</label>
                            <input name="password" id="password" ref={this.password}></input>
                        </div>
                        <div className="form-action">
                            <button className="button" type="button" onClick={()=>this.changeLogin()}>You are {this.state.isLogin ? "Login": "Singup"}</button>
                            <button className="button" type="submit">Submit</button>
                        </div>
                </form>
            </div>
        );
    }
}

export default Auth;