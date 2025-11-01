import express from "express";
import Project from "../models/project.js";

const router = express.Router();

// GET all
router.get("/", async (_req, res) => {
  const items = await Project.find();
  res.json(items);
});

// GET by id
router.get("/:id", async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

// POST create
router.post("/", async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const created = await Project.create({ title, description, link });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: "Invalid data", error: e.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE one
router.delete("/:id", async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted", id: deleted._id });
});

// DELETE all
router.delete("/", async (_req, res) => {
  const result = await Project.deleteMany({});
  res.json({ message: "All projects removed", deletedCount: result.deletedCount });
});

export default router;
