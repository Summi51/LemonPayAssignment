const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }, // YYYY-MM-DDTHH:mm:ssZ
},
{ versionKey: false }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = { TaskModel };


// Json data example

// {
//   "taskName": "Complete API Development",
//   "description": "Develop and test the task API with proper validation",
//   "dueDate": "2025-03-10T12:00:00Z"
// }
