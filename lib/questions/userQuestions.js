// Array of questions for user input
const questions = [
  {
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Exit",
    ],
    validate(answer) {
      //I select circle, triangle, or square
      return answer in
        [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ]
        ? true
        : "Invalid shape, please try again.";
    },
  },
];

module.exports = questions;
