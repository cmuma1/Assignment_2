import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// GET /api/contacts  -> all
router.get("/", async (_req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// GET /api/contacts/:id  -> by id
router.get("/:id", async (req, res) => {
  const item = await Contact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

// POST /api/contacts  -> create
router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const created = await Contact.create({ firstname, lastname, email });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

// PUT /api/contacts/:id  -> update
router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE /api/contacts/:id  -> delete one
router.delete("/:id", async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted", id: deleted._id });
});

// DELETE /api/contacts  -> delete all
router.delete("/", async (_req, res) => {
  const result = await Contact.deleteMany({});
  res.json({ message: "All contacts removed", deletedCount: result.deletedCount });
});

export default router;
