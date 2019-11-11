const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
      user:{
          type: Schema.Types.ObjectId,
          ref:'userModel'
      },
      event:{
          type:Schema.Types.ObjectId,
          ref:'eventModel'
      }
},
   {timestamps: true}
);

module.exports = mongoose.model("bookingModel", bookingSchema);