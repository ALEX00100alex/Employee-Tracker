const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ALEX00100alex!!',
  database: 'employee_DB',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees by Department',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View All Roles',
        'Add Role',
        'Remove Role',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View All Employees by Department':
          viewAllByDepart();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee Role':
          updateEmployee();
          break;

        case 'Update Employee Manager':
          updateEmployeeManager();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Remove Role':
          removeRole();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewAllEmployees = () => {
  inquirer
    .prompt({
      name: 'employee',
      type: 'choices',
      message: 'Here are all the employees in the database:',
    })
    .then((answer) => {
      const query = 'SELECT * FROM employees';
      connection.query(query, { employee: answer.employee }, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};
const viewAllByDepart = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Which department would you like to search?',
    })
    .then((answer) => {
      console.log(`You searched for "${answer.department}"`);
      let query =
        'SELECT departments.name AS department, employees.first_name AS first_name, employees.last_name AS last_name';
      query +=
        ` FROM departments INNER JOIN employees ON (departments.id = employees.role_id) WHERE departments.name = "${answer.department}"`;
      connection.query(query, { department: answer.department }, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
      name: 'first_name',
      message: 'Add first name of employee:',
    },
    { name: 'last_name',
      message: 'Add last name of employee:',  
    },
    {
      name: 'department',
      type: 'list',
      choices: listDepartments(),
      message: 'Add department of employee:',
    },
    {
      name: 'title',
      message: 'Add title of employee:',
    },
    {
      name: 'salary',
      message: 'Add salary of employee:',
    },
  ])
    .then((answer) => {
      const query = 'SELECT * FROM employees';