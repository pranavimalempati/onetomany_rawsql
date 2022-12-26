const { Client } = require("pg")

const client =  new Client({
            user: "postgres",
            host: "localhost",
            database: "sql_db",
            password:"root",
            port: 5432,
})

module.exports = {client}