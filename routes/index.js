const express = require("express");

// Import our modular routers
const departmentRouter = require("./api/department");
const employeeRouter = require("./api/employee");
const roleRouter = require("./api/role");

// Declare app
const app = express();

app.use("/api/departments", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/role", roleRouter);

module.exports = app;
