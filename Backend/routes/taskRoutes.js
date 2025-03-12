const express = require("express");
const { body, param, validationResult } = require("express-validator");
const { TaskModel } = require("../model/taskModel");

const taskRouter = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Add a new task with validation
taskRouter.post(
  "/add",
  [
    body("taskName").notEmpty().withMessage("Task name is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("dueDate").isISO8601().toDate().withMessage("Invalid date format"),
    validate
  ],
  async (req, res) => {
    try {
      const { taskName, description, dueDate } = req.body;
      const task = new TaskModel({ taskName, description, dueDate });
      await task.save();
      res.status(201).send({ msg: "A new task has been added", task });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
);

// Update a task by ID with validation
taskRouter.patch(
  "/update/:taskID",
  [
    param("taskID").isMongoId().withMessage("Invalid task ID"),
    body("taskName").optional().isString().withMessage("Task name must be a string"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("dueDate").optional().isISO8601().toDate().withMessage("Invalid date format"),
    validate
  ],
  async (req, res) => {
    try {
      const { taskID } = req.params;
      const updatedTask = await TaskModel.findByIdAndUpdate(taskID, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).send({ msg: "Task not found" });
      }
      res.status(200).send({ msg: `Task ${taskID} has been updated`, updatedTask });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
);

// Delete a task by ID with validation
taskRouter.delete(
  "/delete/:taskID",
  [
    param("taskID").isMongoId().withMessage("Invalid task ID"),
    validate
  ],
  async (req, res) => {
    try {
      const { taskID } = req.params;
      const deletedTask = await TaskModel.findByIdAndDelete(taskID);
      if (!deletedTask) {
        return res.status(404).send({ msg: "Task not found" });
      }
      res.status(200).send({ msg: `Task ${taskID} has been deleted` });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
);

// Get a single task by ID with validation
taskRouter.get(
  "/:taskID",
  [
    param("taskID").isMongoId().withMessage("Invalid task ID"),
    validate
  ],
  async (req, res) => {
    try {
      const { taskID } = req.params;
      const task = await TaskModel.findById(taskID);
      if (!task) {
        return res.status(404).send({ msg: "Task not found" });
      }
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
);

module.exports = { taskRouter };
