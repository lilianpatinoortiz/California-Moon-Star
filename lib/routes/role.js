const inquirer = require("inquirer");
const mysqlConnection = require("../db/mysql");
const server = require("../../server");

// Connect to database
const db = mysqlConnection;

// Create a pool connection
function getRoles() {
  // Do query action
  db.promise()
    .query(
      "SELECT r.title,concat('$',r.salary) as 'Salary', d.name as 'Department' FROM roles r LEFT JOIN departments d ON r.department_id = d.id"
    )
    .then(([rows, fields]) => {
      console.table(rows);
      server.init();
    })
    .catch(console.log);
}

function addRole() {
  // arrays to provide choices
  departmentsNamesArray = [];
  departmentsIdsArray = [];

  // we fill the arrays with the data
  db.promise()
    .query("SELECT *  FROM departments")
    .then(([rows, fields]) => {
      rows.forEach((department) => {
        departmentsNamesArray.push(department.name);
        departmentsIdsArray.push(department.id);
      });
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Please provide the role title:",
          },
          {
            name: "salary",
            type: "input",
            message: "Please provide the role salary:",
          },
          {
            name: "department",
            type: "list",
            message: "Please select the department:",
            choices: departmentsNamesArray,
          },
        ])
        .then((answer) => {
          // Do query action
          db.promise()
            .query(
              "INSERT INTO roles (title,salary,department_id) VALUES (?, ?, ?)",
              [
                answer.title,
                answer.salary,
                departmentsIdsArray[
                  departmentsNamesArray.indexOf(answer.department)
                ],
              ]
            )
            .then(([rows, fields]) => {
              getRoles();
            })
            .catch(console.log);
        });
    });
}

module.exports = { getRoles, addRole };
