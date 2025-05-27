import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const router = express.Router();

function isPositiveInteger(value) {
  return /^\d+$/.test(value); // Now allows 0 too — even though the name says "positive"
}

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.json(employees);
});

router.post("/", async (req, res) => {
  const { body } = req;

  if (!body || !body.name || !body.birthday || body.salary == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { name, birthday, salary } = body;

  try {
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveInteger(id)) return res.sendStatus(400);

  const employee = await getEmployee(Number(id));
  if (!employee) return res.sendStatus(404);

  res.json(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isPositiveInteger(id)) return res.sendStatus(400);

  const deleted = await deleteEmployee(Number(id));
  if (!deleted) return res.sendStatus(404);

  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isPositiveInteger(id)) return res.sendStatus(400);
  if (!req.body || !req.body.name || !req.body.birthday || req.body.salary == null) {
    return res.status(400).send("Missing required fields.");
  }

  const { name, birthday, salary } = req.body;

  try {
    const updated = await updateEmployee({
      id: Number(id),
      name,
      birthday,
      salary,
    });

    if (!updated) return res.sendStatus(404);

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
