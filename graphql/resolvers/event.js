const eventModel = require("../../model/event");
const userModel = require("../../model/user");
const bookingModel = require("../../model/booking");

const { transformEvent, user, event} = require('./common');

module.exports =  {
        events: async ()=>{
                try{
                    const event = await eventModel.find();
                    return  event.map( data=>{
                            return transformEvent(data)
                        })
                }catch(err){
                    throw err;
                }
        },
        createEvent: async (args, req)=>{
            if(!req.isAuth){
                throw new Error("Unauthenticated!")
            }
                try{
                        const event = new eventModel({
                            title: args.inputEvent.title,
                            description: args.inputEvent.description,
                            price: args.inputEvent.price,
                            creator: req.userId
                        });
                        const result = await event.save();
                        const userss =   await userModel.findById(req.userId);
                        if(!userss){
                                throw new Error("Not found User");
                        }
                        userss.createEvents.push(event);
                        await userss.save();
                        return transformEvent(result);
                }catch(err){
                    throw err;
                }
        },
};