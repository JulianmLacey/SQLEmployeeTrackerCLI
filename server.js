const inquirer = require("inquirer");
const mysql = require("mysql2");

inquirer.prompt([{ type: "list", message: "Select An Option: ", name: "init", choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"] }]).then((answers) => {
	writeToFile(answers);
});
