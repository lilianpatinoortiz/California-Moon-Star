const inquirer = require("inquirer");
const mysqlConnection = require("../mysql");
const server = require("../../server");
const { employeeQuestions } = require("../questions/userQuestions");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getEmployees() {
  db.promise()
    .query("SELECT * FROM employees")
    .then(([rows, fields]) => {
      console.table(rows);
      server.init();
    })
    .catch(console.log);
}

function addEmployee() {
  inquirer.prompt(employeeQuestions).then((answer) => {
    db.promise()
      .query("INSERT INTO employees (name) VALUES (?)", answer.department)
      .then(([rows, fields]) => {
        console.table(rows);
        getEmployees();
      })
      .catch(console.log);
  });
}
function updateEmployee() {}

module.exports = { getEmployees, addEmployee, updateEmployee };
