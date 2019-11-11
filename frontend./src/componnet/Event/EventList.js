import React, { Component } from 'react';
import "./EventList.css";

const EventList = (props)=>{
    const {events, onDetail} = props;
    const listEvent = events.map( item => {
         return(
            <li key={item.id} className="events__list-item">
                <div>
                    <h1>{item.title}</h1>
                    <h2>
                        ${item.price} - {new Date(item.date).toLocaleString()}
                    </h2>
                </div>
                <div>
                    {props.userId === item.creator.id ? (
                        <p>Your the owner of this event.</p>
                      ) : (
                        <button className="btn__primary" onClick={()=>onDetail(item.id)} >
                            View Details
                        </button>
                       // onClick={props.onDetail.bind(this, props.eventId)}
                    )}
                </div>
            </li>
            )})
    return(
        <div>
             <ul className="events__list">{listEvent}</ul>
        </div>
    )
}

export default EventList;