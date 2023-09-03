const mysqlConnection = require("../mysql");
const server = require("../../server");

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

function addEmployee() {}
function updateEmployee() {}

module.exports = { getEmployees, addEmployee, updateEmployee };
