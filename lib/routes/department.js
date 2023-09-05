const inquirer = require("inquirer");
const mysqlConnection = require("../db/mysql");
const server = require("../../server");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getDepartments() {
  db.promise()
    .query("SELECT * FROM departments")
    .then(([rows, fields]) => {
      console.table(rows);
      server.init();
    })
    .catch(console.log);
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Please provide the department name:",
      },
    ])
    .then((answer) => {
      db.promise()
        .query("INSERT INTO departments (name) VALUES (?)", answer.department)
        .then(([rows, fields]) => {
          console.table(rows);
          getDepartments();
        })
        .catch(console.log);
    });
}

module.exports = { getDepartments, addDepartment };
