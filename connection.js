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
        message: 'Here are all the employees in the database',
      })
      .then((answer) => {
        const query = 'SELECT * FROM employees';
        connection.query(query, { employee: answer.employee }, (err, res) => {
          if (err) throw err;
          res.forEach(({ employee }) => {
          console.log(
            employee
          );
        });
        runSearch();
      });
    });
};