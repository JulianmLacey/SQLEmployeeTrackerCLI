const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: "root",
		// TODO: Add MySQL password here
		password: "password",
		database: "Employee_Tracker",
	},
	console.log(`Connected to the Employee_Tracker database.`)
);

async function q(answers) {
	switch (answers.menu[0]) {
		case "v":
			const Queries = {
				"view all departments": `SELECT name FROM department`,
				"view all roles": `SELECT role.id, role.title, role.salary,	department.name AS department FROM role	JOIN department ON role.department_id = department.id`,
				"view all employees": `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`,
			};

			db.query(Queries[answers.menu], (err, result) => {
				console.table(result);
			});
			return;

		case "a":
			switch (answers.menu[6]) {
				case "d":
					await inquirer.prompt([{ message: "Enter Department Name: ", name: "dept" }]).then((answers) => {
						db.query(`INSERT INTO department (name) VALUES (?)`, [answers.dept], (err, result) => {
							//console.log(result);
						});
					});

					break;
				case "r":
					await inquirer
						.prompt([
							{
								name: "title",
								message: "Enter Role Title:",
							},
							{
								name: "salary",
								message: "Enter Role Salary:",
							},
							{
								name: "dept",
								message: "Enter New Role Department ID:",
							},
						])
						.then(async (answers) => {
							db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.title, answers.salary, answers.dept], (err, result) => {
								//console.log(result);
							});
						});
					break;
				case " ":
					await inquirer
						.prompt([
							{
								name: "first",
								message: "Enter Employee's First Name:",
							},
							{
								name: "last",
								message: "Enter Employee's Last Name:",
							},
							{
								name: "role",
								message: "Enter Employee's Role ID:",
							},
							{
								name: "manager",
								message: "Enter Employee's Manager's ID:",
							},
						])
						.then(async (answers) => {
							db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first, answers.last, answers.role, answers.manager], (err, result) => {
								//console.log(result);
							});
						});
					break;
			}
			break;
	}
	return true;
}

async function run() {
	await inquirer.prompt([{ type: "list", message: "Select An Option: ", name: "menu", choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"] }]).then(async (answers) => {
		await q(answers);
	});
}
run();
const sql = `SELECT name FROM department`;
//const params = [body.movie_name];
