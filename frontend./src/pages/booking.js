import React, { Component } from 'react';
import AuthContext from "../context/auth-context";
import BookingList from "../componnet/Booking/BookingList";
class Booking extends Component {
    constructor(props) {
        super(props);
         this.state={
             bookings:[]
         }
    }
    
    componentDidMount(){
        this.fetchBooking();
    }
   static contextType = AuthContext;
    fetchBooking=()=>{
        let requesBody={
            query:`
               query{
                   booking{
                       id,
                       createdAt,
                       updatedAt,
                       event{
                           title,
                           id,
                           price,
                           description
                       }
                   }
               }
            `
        };
        fetch("http://localhost:7000/graphql",{
              method:"POST",
              body:JSON.stringify(requesBody),
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Beare "+this.context.token
              }
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            console.log(data);
            this.setState({
                bookings:data.data.booking
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    onCancel=(id)=>{
        const requestBody = {
            query: `
                mutation {
                  cancleBooking(bookingId: "${id}") {
                   id
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
            return res.json();
        })
        .then(data=>{
             this.setState( prevState=>{
                  const updateBooking = prevState.bookings.filter(item => item.id !==id);
                  return{bookings:updateBooking}
             })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                  <BookingList Bookings ={this.state.bookings} onCancel={(id)=>this.onCancel(id)}></BookingList>
            </div>
        );
    }
}

export default Booking;