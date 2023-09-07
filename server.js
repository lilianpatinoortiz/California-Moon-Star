// Packages needed for this application
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
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
function header() {
  console.log(
    chalk.bgCyan.bold(`***********************************************`)
  );
  console.log(" ");
  console.log(chalk.cyan.bold(figlet.textSync("Employee")));
  console.log(chalk.cyan.bold(figlet.textSync("Manager")));
  console.log(" ");
  console.log(
    chalk.bgCyan.bold(`***********************************************`)
  );
  console.log(" ");
}

function bye() {
  console.log(" ");
  console.log(chalk.yellow.bold(figlet.textSync("See you later alligator")));
  console.log(" ");
}

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
        bye();
        db.end();
        break;
      default:
        db.end();
        break;
    }
  });
}

// call initialization of the app
header();
init();

exports.init = init; // to bbe able to call init, avoiding circular dependencies with routes
