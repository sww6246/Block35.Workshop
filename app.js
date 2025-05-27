import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

export default app;
