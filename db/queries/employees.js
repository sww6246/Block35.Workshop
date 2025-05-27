import db from "#db/client";

export async function createEmployee({ name, birthday, salary }) {
  const sql = `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const { rows } = await db.query(sql, [name, birthday, salary]);
  return rows[0];
}

export async function getEmployees() {
  const { rows } = await db.query("SELECT * FROM employees");
  return rows;
}

export async function getEmployee(id) {
  const { rows } = await db.query("SELECT * FROM employees WHERE id = $1", [id]);
  return rows[0];
}

export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
    UPDATE employees
    SET name = $2, birthday = $3, salary = $4
    WHERE id = $1
    RETURNING *`;
  const { rows } = await db.query(sql, [id, name, birthday, salary]);
  return rows[0];
}

export async function deleteEmployee(id) {
  const { rows } = await db.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
}
