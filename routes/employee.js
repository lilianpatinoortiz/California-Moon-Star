const mysqlConnection = require("../lib/mysql");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getEmployees() {
  db.promise()
    .query("SELECT * FROM employees")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => db.end());
}

function addEmployee() {}
function updateEmployee() {}

module.exports = { getEmployees, addEmployee, updateEmployee };
