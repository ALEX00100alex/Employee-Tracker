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
          updateEmployeeRole();
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
  const query = 'SELECT * FROM employees';
  connection.query(query,(err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
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

const removeEmployee = () => {
  inquirer.prompt ({
    name: "employee_id",
    message: "What employee would you like to remove?",
  }).then((answer) => {
      console.log(`You are deleting "${answer.employee_id}" from the database`);
      let query = `DELETE from employees WHERE id = "${answer.employee_id}"`;
      connection.query(query, (err, res) => {
         if (err) throw err;
         runSearch(); 
      });
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt ([
    {
      name: "employee_id",
      messsage: "What is the employee ID of the employee you want to change?"
    },
    {
      name: "role_id",
      message: "What is the new role ID?"
    }
  ]).then(answer => {
      let query = `UPDATE employees SET role_id = "${answer.role_id}" WHERE id = "${answer.employee_id}"`;
      connection.query(query, (err,res) => {
        if (err) throw err;
        runSearch();
      }) 
  });
};

const updateEmployeeManager = () => {
  inquirer.prompt ([
    {
      name: "employee_id",
      messsage: "What is the employee ID of the employee you want to change?"
    },
    {
      name: "manager_id",
      message: "Who is the new manager for this employee?"
    }
  ]).then(answer => {
      let query = `UPDATE employees SET manager_id = "${answer.manager_id}" WHERE id = "${answer.employee_id}"`;
      connection.query(query, (err,res) => {
        if (err) throw err;
        runSearch();
      }) 
  });
};
const viewRoles = () => {
  const query = 'SELECT * FROM roles';
  connection.query(query,(err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
const addRole = () => {
  inquirer.prompt([
    {
      name:"title",
      message: "What is the employee job title?"  
    },
    { 
      name: "salary",
      message: "What is the job salary?",
    },
    {
      name: "department_id",
      message: "What is the department id?",
    }
  ]).then(answer =>{
    let query = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.department_id}")`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      runSearch();
    });
  });
};

const removeRole = () => {
  inquirer.prompt ({
    name: "role_id",
    message: "What role would you like to remove?",
  }).then((answer) => {
      console.log(`You are deleting "${answer.role_id}" from the database`);
      let query = `DELETE from roles WHERE id = "${answer.role_id}"`;
      connection.query(query, (err, res) => {
         if (err) throw err;
         runSearch(); 
      });
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name:"first_name",
      message: "What is the employee's first name?"  
    },
    { 
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      name: "role_id",
      message: "What is the role id?",
    },
    {
      name: "manager_id",
      message: "Who is the employee's manager?",
    },
  ]).then(answer =>{
    let query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      runSearch();
    });
  });
};


