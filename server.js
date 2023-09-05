// Packages needed for this application
const inquirer = require("inquirer");
const mysqlConnection = require("./lib/db/mysql.js");
const { mainQuestions } = require("./lib/questions/mainQuestions");
const { getDepartments, addDepartment } = require("./lib/routes/department");
const {
  getEmployees,
  addEmployee,
  updateEmployee,
} = require("./lib/routes/employee");
const { getRoles, addRole } = require("./lib/routes/role");

// database connection
const db = mysqlConnection;

// function to show the user the questions
function init() {
  inquirer.prompt(mainQuestions).then(async (answers) => {
    const { question } = answers;
    switch (question) {
      case "View All Employees":
        getEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployee();
        break;
      case "View All Roles":
        getRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        getDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Exit":
        db.end();
        break;
      default:
        db.end();
        break;
    }
  });
}

// call initialization of the app
init();

exports.init = init; // to bbe able to call init, avoiding circular dependencies with routes
