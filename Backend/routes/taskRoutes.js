const express = require("express");
const { TaskModel } = require("../model/taskModel");

const taskRouter = express.Router();

// Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Add a new task
taskRouter.post("/add", async (req, res) => {
  const { taskName, description, dueDate } = req.body;
  try {
    const task = new TaskModel({ taskName, description, dueDate });
    await task.save();
    res.status(201).send({ msg: "A new task has been added", task });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Update a task by ID
taskRouter.patch("/update/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskID, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }
    res.status(200).send({ msg: `Task ${taskID} has been updated`, updatedTask });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Delete a task by ID
taskRouter.delete("/delete/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskID);
    if (!deletedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }
    res.status(200).send({ msg: `Task ${taskID} has been deleted` });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Get a single task by ID
taskRouter.get("/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    const task = await TaskModel.findById(taskID);
    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { taskRouter };
