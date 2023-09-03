const mysqlConnection = require("../lib/mysql");

// Connect to database
const db = mysqlConnection;

// Create a pool connections
function getRoles() {
  db.promise()
    .query("SELECT * FROM roles")
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log)
    .then(() => db.end());
}

function addRole() {}

module.exports = { getRoles, addRole };
