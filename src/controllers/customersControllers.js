import { connection } from "../database/database.js";

async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const query = connection.query(
    "INSERT INTO customers (name, phone, cpf, birthday) VALUES($1, $2, $3, $4);",
    [name, phone, cpf, birthday]
  );

  res.sendStatus(201);
}

async function listCustomers(req, res) {
  const { cpf } = req.query;
  let customerList;

  try {
    if (cpf) {
      customerList = await connection.query(
        `SELECT * FROM customers WHERE cpf ILIKE '${cpf}%';`
      );
    } else {
      customerList = await connection.query(`SELECT * FROM customers;`);
    }
    res.send(customerList.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function searchCustomer(req, res) {
  const { id } = req.params;
  let customer;

  try {
    customer = await connection.query(
      `SELECT * FROM customers WHERE id = ($1);`,
      [id]
    );

    if (customer.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.send(customer.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.query;

  try {
    const customer = await connection.query(
      `SELECT * FROM customers WHERE cpf=($1);`,
      [cpf]
    );

    const customerId = await connection.query(
      `SELECT * FROM customers WHERE id=($1);`,
      [id]
    );

    if (customerId.rows.length === 0) {
      res.status(404).send("Id not found");
      return;
    }

    if (customer.rows.length === 0) {
      await connection.query(
        `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = ${id};`,
        [name, phone, cpf, birthday]
      );
      return res.sendStatus(200);
    }

    if (customer.rows[0].cpf === customerId.rows[0].cpf) {
      res.status(409).send("Cpf already up to date");
    }

    if (customer.rows[0].cpf !== customerId.rows[0].cpf) {
      res.status(404).send("Invalid request");
      return;
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export { insertCustomer, listCustomers, searchCustomer, updateCustomer };
