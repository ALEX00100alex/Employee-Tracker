INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO departments (name)
VALUES ("Engineering");

INSERT INTO departments (name)
VALUES ("Finance");

INSERT INTO departments (name)
VALUES ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Executive", 50000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 30000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Engineer", 100000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Engineer", 70000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 80000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Financial Analyst", 65000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 150000.00, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Paralegal", 40000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Jones", 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Smith", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Serena", "Cooper", 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "Matheson", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Debbie", "Downer", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Black", 3, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Alistair", "Taylor", 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Eric", "Patterson", 4, 1);
