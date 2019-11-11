const userModel = require("../../model/user");
const eventModel = require("../../model/event");

const transformBooking = booking=>{
    return{
        ...booking._doc,
        id: booking._id,
        user: user(booking.user),
        event: singleEvent(booking.event),
        createAt: new Date(booking._doc.createAt),
        updateAt: new Date(booking._doc.updateAt)
    }
}


const transformEvent = event=>{
    return{
       ...event._doc,
       id: event.id,
       date: new Date(event._doc.date),
       creator: user(event._doc.creator)
    }
};


const event = async (eventid)=>{
    try{
        const dataEvent =  await eventModel.find({_id: {$in: eventid}});
       return dataEvent.map(data=>{
            return{
                ...data._doc,
                id: data._id,
                creator: user.bind(this, data._doc.creator)
            };
        })
    }catch(err){
        throw err;
    }
};

const singleEvent = async(eventId)=>{
    try{
        const dataEvent = await eventModel.findById(eventId);
        return{
            ...dataEvent._doc,
             id: dataEvent.id,
             user: user(dataEvent.user)
        }
    }catch(err){
        throw err;
    }
}

const user =async (userId) =>{
    try{
        const userData = await userModel.findById(userId);
        return{
            ...userData._doc,
            id: userData.id,
            createEvents: event.bind(this, userData.createEvents)
        }
    }catch(err){
        throw err;
    }
};

exports.transformEvent = transformEvent;
exports.event = event;
exports.user = user;
exports.singleEvent = singleEvent;
exports.transformBooking = transformBooking;
