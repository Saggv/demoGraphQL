const eventModel = require("../../model/event");
const bookingModel = require("../../model/booking");

const {transformBooking, user, event, singleEvent} = require('./common');



module.exports =  {
        booking: async()=>{
            try{
                  const result = await bookingModel.find();
                 return result.map( items=>{
                     return transformBooking(items);
                 })
            }catch(err){
                throw err;
            }
        },
        bookEvent: async(args)=>{
            try{
                 const fechEvent = await eventModel.findById(args.eventId);
                 const newBooking = new bookingModel({
                       user:"5da7593587eb290dec77163d",
                       event: fechEvent
                 });
                 const result = await newBooking.save();
                 return transformBooking(result);
            }catch(err){
                throw err;
            }
        },
        cancleBooking: async(args)=>{
            try{
                 const dataEvent =await bookingModel.findById(args.bookingId).populate('event');
                 const event={
                     ...dataEvent.event._doc,
                     id:dataEvent._id,
                     creator: user(dataEvent.event._doc.creator)
                 }
                 await bookingModel.findOneAndDelete({_id: args.bookingId});
                 return event;
            }catch(err){
                throw err;
            }
        }
};