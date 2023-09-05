const inquirer = require("inquirer");
const mysqlConnection = require("../db/mysql");
const server = require("../../server");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getEmployees() {
  // Do query action
  db.promise()
    .query(
      "SELECT e.id, concat(e.first_name,' ',e.last_name) as 'Employee', r.title as 'Role' , concat('$',r.salary) as 'Salary' ,d.name as 'Department', concat(m.first_name,' ',m.last_name) as 'Manager' FROM employees as e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN departments as d ON d.id = r.department_id"
    )
    .then(([rows, fields]) => {
      console.table(rows);
      server.init();
    })
    .catch(console.log);
}

function addEmployee() {
  // arrays to provide choices
  rolesNamesArray = [];
  rolesIdsArray = [];
  managersNamesArray = [];
  managersIdsArray = [];

  // we fill the arrays with the data - roles
  db.promise()
    .query("SELECT *  FROM roles")
    .then(([rows, fields]) => {
      rows.forEach((role) => {
        rolesNamesArray.push(role.title);
        rolesIdsArray.push(role.id);
      });
      // we fill the arrays with the data - employees
      db.promise()
        .query("SELECT *  FROM employees")
        .then(([rows, fields]) => {
          rows.forEach((manager) => {
            managersNamesArray.push(
              manager.first_name + " " + manager.last_name
            );
            managersIdsArray.push(manager.id);
          });
          managersNamesArray.push("No manager"); // If no manager
          inquirer
            .prompt([
              {
                name: "firstName",
                type: "input",
                message: "Please provide the first name:",
              },
              {
                name: "lastName",
                type: "input",
                message: "Please provide the last name:",
              },
              {
                name: "role",
                type: "list",
                message: "Please select the role:",
                choices: rolesNamesArray,
              },
              {
                name: "manager",
                type: "list",
                message: "Please select the manager:",
                choices: managersNamesArray,
              },
            ])
            .then((answer) => {
              // Do query action
              db.promise()
                .query(
                  "INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?)",
                  [
                    answer.firstName,
                    answer.lastName,
                    rolesIdsArray[rolesNamesArray.indexOf(answer.role)],
                    managersIdsArray[
                      managersNamesArray.indexOf(answer.manager)
                        ? managersNamesArray.indexOf(answer.manager)
                        : null
                    ],
                  ]
                )
                .then(([rows, fields]) => {
                  console.table(rows);
                  getEmployees();
                })
                .catch(console.log);
            });
        });
    });
}

function updateEmployee() {
  // arrays to provide choices
  rolesNamesArray = [];
  rolesIdsArray = [];
  employeesNamesArray = [];
  employeesIdsArray = [];

  // we fill the arrays with the data - employees
  db.promise()
    .query(
      "SELECT e.id, concat(e.first_name,' ',e.last_name) as 'Employee' FROM employees e"
    )
    .then(([rows, fields]) => {
      rows.forEach((employee) => {
        employeesNamesArray.push(employee.Employee);
        employeesIdsArray.push(employee.id);
      });

      // we fill the arrays with the data - roles
      db.promise()
        .query("SELECT *  FROM roles")
        .then(([rows, fields]) => {
          rows.forEach((role) => {
            rolesNamesArray.push(role.title);
            rolesIdsArray.push(role.id);
          });

          inquirer
            .prompt([
              {
                name: "employee",
                type: "list",
                message: "Please select the employee you want to update:",
                choices: employeesNamesArray,
              },
              {
                name: "role",
                type: "list",
                message: "Please select the new role:",
                choices: rolesNamesArray,
              },
            ])
            .then((answer) => {
              // Do query action
              db.promise()
                .query("UPDATE employees SET role_id = (?) WHERE id = (?)", [
                  rolesIdsArray[rolesNamesArray.indexOf(answer.role)],
                  employeesIdsArray[
                    employeesNamesArray.indexOf(answer.employee)
                  ],
                ])
                .then(([rows, fields]) => {
                  console.table(rows);
                  getEmployees();
                })
                .catch(console.log);
            });
        });
    });
}

module.exports = { getEmployees, addEmployee, updateEmployee };
