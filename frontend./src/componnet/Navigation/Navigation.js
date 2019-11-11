import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./navigation.css";
import AuthContext from "../../context/auth-context";

const Navigation= props =>{
    return <AuthContext.Consumer>
          {(context)=>{
               return (
                    <div className="nav">
                         <div className="nav__logo">
                              <h3>Sagvv</h3>
                         </div>
                         <div className="nav__item">
                              <ul className="list__item">
                                   <li className="item">
                                        <NavLink to="/event">Events</NavLink>
                                   </li>
                                   {context.token && <li className="item">
                                        <NavLink to="booking">Booking</NavLink>
                                   </li>}
                                  {!context.token && <li className="item">
                                        <NavLink to="/auth">Autherization</NavLink>
                                   </li>}
                              </ul>
                         </div>
                    </div>
               );
          }}
     </AuthContext.Consumer>
}

export default Navigation;



