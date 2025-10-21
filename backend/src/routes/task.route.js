import express from "express";
import {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/get", getTask);
router.post("/add", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export const taskRouter = router;
