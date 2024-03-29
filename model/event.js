const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
      title:{
          type: String,
          required: true
      },
      description:{
          type:String,
          required: true
      },
      price:{
          type: Number,
          required: true
      },
      date:{
          type: Date,
          default: Date.now
      },
      creator:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel"
      }
});

module.exports = mongoose.model("eventModel", eventSchema);