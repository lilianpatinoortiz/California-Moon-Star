// Array of questions for user input
const mainQuestions = [
  {
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      "Exit",
    ],
    validate(answer) {
      return answer in
        [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
          "Exit",
        ]
        ? true
        : "Invalid shape, please try again.";
    },
  },
];

module.exports = { mainQuestions };
