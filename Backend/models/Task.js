const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    default: 1,
  },
});



module.exports = mongoose.model("tasks", TaskSchema);
