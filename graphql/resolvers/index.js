const event = require("./event");
const user = require("./auth");
const booking = require("./booking");

module.exports ={
    ...event,
    ...user,
    ...booking
};