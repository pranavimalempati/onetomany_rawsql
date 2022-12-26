const { client } = require("./db");

const express = require("express");
const main = express();
const router = require("./router/router");

require("dotenv").config();

const body_parser = require("body-parser");
const cors = require("cors");

main.use(body_parser.urlencoded({ extended: true }));
main.use(body_parser.json());
main.use("/", router);
main.use(cors());

async function run() {
  await client.connect();
  console.log(`datasource initialized...`);
  await client.query(
    `CREATE TABLE if not exists customers(cust_id serial PRIMARY KEY,
      cust_name	VARCHAR(50) NOT NULL);
  
      CREATE TABLE if not exists orders(order_id 	serial  PRIMARY KEY,
      order_name VARCHAR(50)NOT NULL,
        cust_id INT,
        CONSTRAINT FK_orders_customers FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id));`
    )
console.log("tables created")
  main.listen(process.env.PORT, () => {
    console.log('server running at port',process.env.PORT);
  });
}
run();

