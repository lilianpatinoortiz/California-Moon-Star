const mysqlConnection = require("../mysql");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getDepartments() {
  db.promise()
    .query("SELECT * FROM departments")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => db.end());
}

function addDepartment() {}

module.exports = { getDepartments, addDepartment };
