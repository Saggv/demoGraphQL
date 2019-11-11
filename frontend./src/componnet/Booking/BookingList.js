import React from "react";


const BookingList = (props)=>{
    const {Bookings, onCancel}= props;
    const listBooking = Bookings.map( booking=>{
        return(
            <li key={booking.id} className="events__list-item">
                <div>
                    <h1>{booking.event.title}</h1>
                    <h2>
                        ${booking.event.price} - {new Date(booking.createdAt).toLocaleString()}
                    </h2>
                </div>
                <div>
                        <button className="btn__primary" onClick={()=>onCancel(booking.id)} >
                            Cancel
                        </button>
                </div>
            </li>
        )}

    )
     return(
         <div>
                <ul className="events__list">{listBooking}</ul>
         </div>
     )
};

export default BookingList;