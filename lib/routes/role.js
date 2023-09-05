const inquirer = require("inquirer");
const mysqlConnection = require("../mysql");
const server = require("../../server");
const { rolesQuestions } = require("../questions/userQuestions");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getRoles() {
  db.promise()
    .query("SELECT * FROM roles")
    .then(([rows, fields]) => {
      console.table(rows);
      server.init();
    })
    .catch(console.log);
}

function addRole() {
  departmentsNamesArray = [];
  departmentsIdsArray = [];
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
          console.log(answer);
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
              console.table(rows);
              getRoles();
            })
            .catch(console.log);
        });
    });
}

module.exports = { getRoles, addRole };
