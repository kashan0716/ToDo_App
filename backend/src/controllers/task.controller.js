import { Task } from "../models/Task.js";

export const getTask = async (req, res) => {
  let response;
  try {
    response = await Task.find({});
  } catch (error) {
    return res.json(error);
  }
  if (!response) {
    return res.json({
      message: "Tasks not found",
    });
  }
  return res.status(200).json(response);
};

export const addTask = async (req, res) => {
  const { task } = req.body;

  if (!task || task == "" || task == null) {
    return res.json({
      message: "task is required",
    });
  }

  // if (typeof task != String) {
  //     return res.json({
  //         message: "task only in string or valid task name"
  //     });
  // }

  const newTask = Task.create({
    task: task,
  });

  if (!newTask) {
    return res.json({
      message: "task not created",
    });
  }

  return res.status(201).json({
    message: "task created succesfully",
  });
};

export const updateTask = async (req, res) => {
  const { task, taskStatus } = req.body;

  const { id } = req.params;

  if (!task || task == "" || task == null) {
    return res.json({
      message: "task is required ",
    });
  }
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: id },
      { task, taskStatus: taskStatus || false }
    );
    if (!updated) {
      return res.json({
        message: "task not updated",
      });
    }

    return res.status(200).json({
      message: "task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Task.findByIdAndDelete({ _id: id });
    if (!response) {
      return res.json({
        message: "task not deleted",
      });
    }
    return res.status(200).json({
      message: "Task deleted success fully",
    });
  } catch (error) {
    return res.json(error);
  }
};
