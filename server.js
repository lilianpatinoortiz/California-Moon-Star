// Packages needed for this application
const inquirer = require("inquirer");
const userQuestions = require("./lib/userQuestions.js");
const mysqlConnection = require("./lib/mysql.js");
const { getDepartments, addDepartment } = require("./routes/department.js");
const {
  getEmployees,
  addEmployee,
  updateEmployee,
} = require("./routes/employee.js");
const { getRoles, addRole } = require("./routes/role.js");

// database connection
const db = mysqlConnection;

// function to show the user the questions
function init() {
  inquirer.prompt(userQuestions).then((answers) => {
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
        break;
    }
  });
}

// call initialization of the app
init();
