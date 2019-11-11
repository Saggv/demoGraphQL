import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import Auth from './pages/auth';
import Navigation from './componnet/Navigation/Navigation';
import Booking from './pages/booking';
import Event from './pages/event';

import authContext from "./context/auth-context";

class App extends Component{
    state={
         token: null,
         userId: null
    }
    login=(userId, token)=>{
            this.setState({
                userId: userId,
                token: token
            })
    }
    logout=()=>{
         this.setState({
             userId: null,
             token: null
         })
    }
    render(){
        console.log(this.state);
        return (
            <Fragment>
                <authContext.Provider value={{
                    userId: this.state.userId,
                    token:this.state.token,
                    login:this.login,
                    logout:this.logout
                }}>
                    <BrowserRouter>
                        <Navigation></Navigation>
                        <Switch>
                            {this.state.token && <Redirect from="/auth" to="/event" exact></Redirect>}
                            <Route path="/auth" component={Auth} exact ></Route>
                            {this.state.token && <Route path="/booking" component={Booking}></Route>}
                            <Route path="/event" component={Event}></Route>
                        </Switch>
                    </BrowserRouter>
                </authContext.Provider>
            </Fragment>
          );
    }
}

export default App;
