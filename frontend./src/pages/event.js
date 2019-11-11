import React, { Component } from 'react';
import "./event.css";
import Model from '../componnet/Model/Model';
import AuthContext from "../context/auth-context";
import EventList from '../componnet/Event/EventList';
class Event extends Component {
    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.price = React.createRef();
        this.description = React.createRef();
         this.state={
             create: false,
             events:[],
             selectedEvent: null
         }
    }
    componentDidMount(){
        this.fetchEvent();
    }
    static contextType = AuthContext;
    isCreate=()=>{
        this.setState({
             create:!this.state.create
        })
    }
    onCancel=()=>{
        this.setState({
            create:false,
            selectedEvent: null
        })
    }
    onConfirm=()=>{
        this.setState({
            create:false
        });
        const title = this.title.current.value;
        const price = this.price.current.value;
        const description = this.description.current.value;
        if(title.trim().lenght === "" || price <=0 || description.trim().lenght ===""){
            return;
        }
        const requestBody = {
            query: `
                mutation {
                  createEvent(inputEvent: {title: "${title}", description: "${description}", price: ${price}}) {
                    title
                  }
                }
              `
          };
        let token = this.context.token;
        fetch('http://localhost:7000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Beare '+token
            }
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            this.fetchEvent();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    fetchEvent =()=>{
        const requestBody = {
            query: `
                query {
                  events {
                    id
                    title
                    description
                    date
                    price
                    creator {
                      id
                      email
                    }
                  }
                }
              `
          };
        fetch("http://localhost:7000/graphql",{
              method:"POST",
              body: JSON.stringify(requestBody),
              headers:{
                  "Content-Type":"application/json"
              }
        })
        .then(res=>{
             return res.json();
        })
        .then(data=>{
            //console.log(data);
            const events = data.data.events
            this.setState({
                events:events
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    onShowViewDetail=(id)=>{
        this.setState(prevState=>{
              const selectEvent = prevState.events.find( e=>e.id === id);
              return{selectedEvent: selectEvent}
        })
    }
    bookEventHandler=()=>{
        if(!this.context.token){
            this.setState({
                selectedEvent: null
            });
            return;
        };
        const requestBody = {
            query: `
                mutation {
                  bookEvent(eventId: "${this.state.selectedEvent.id}") {
                    id
                   createdAt
                   updatedAt
                  }
                }
              `
          };
        fetch("http://localhost:7000/graphql",{
             method:"POST",
             body:JSON.stringify(requestBody),
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Beare "+this.context.token 
             }
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
             this.setState({
                selectedEvent: null
            });
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <div className="create-event">
                    <button type="button" className="btn__primary" onClick={()=>this.isCreate()}>Create Event</button>
                </div>
                {this.state.create && <Model 
                       title="Add event"
                       onCancel={()=>this.onCancel()}
                       onConfirm ={this.onConfirm}
                       >
                         <form>
                              <div className="form-control">
                                  <label htmlFor="title">Title</label>
                                  <input type="text" name="title" id="title" ref={this.title}></input>
                              </div>
                              <div className="form-control">
                                  <label htmlFor="price">Price</label>
                                  <input type="number" name="price" id="price" ref={this.price}></input>
                              </div>
                              <div className="form-control">
                                  <label htmlFor="description">Description</label>
                                  <textarea rowss="4" name="description" id="description" ref={this.description}></textarea>
                              </div>
                         </form>
                 </Model>}
                        {this.state.selectedEvent && (
                <Model
                    title={this.state.selectedEvent.title}
                    onCancel={this.onCancel}
                    onConfirm={this.bookEventHandler}
                    confirmText="Book"
                    >
                    <h1>{this.state.selectedEvent.title}</h1>
                    <h2>
                    ${this.state.selectedEvent.price} -{' '}
                    {new Date(this.state.selectedEvent.date).toLocaleDateString()}
                    </h2>
                    <p>{this.state.selectedEvent.description}</p>
                </Model>
                    )}
                <EventList events={this.state.events} userId={this.context.userId} onDetail={(id)=>this.onShowViewDetail(id)}></EventList>
            </div>
        );
    }
}

export default Event;