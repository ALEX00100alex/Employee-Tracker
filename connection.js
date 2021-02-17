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
      {
        name: 'last_name',
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
      const department_id = getIdByDept(answer.department);
      inquirer.prompt({
        name: 'manager',
        type: 'list',
        choices: getManagerbyDept(department_id),
        message: 'Add manager of employee (if any):',
      }).then((answer2) => {
        const manager_id = getManagerIdByName(answer2.manager);
        let query = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${department_id}")`;
        connection.query(query, (err, res) => {
          if (err) throw err;
          let role_id = res.insertId;
          let query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${role_id}", "${manager_id}")`;
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("Employee successfully created!");
            runSearch();
          });
        });
      });
    });
  };
  const listDepartments = async () => {
   let query = 'SELECT name FROM departments';
   try {
      const res = await connection.query(query, (err, res) => {
        return res; 
      });
      console.log(res);
    } 
   catch(err) {throw err;}
  };
  const getIdByDept = (dept) => {
    return 10;
  };
  const getManagerbyDept = (dept) => {
    return ['Mike Jones'];
  };
  const getManagerIdByName = (name) => {
    return 15;
  };
