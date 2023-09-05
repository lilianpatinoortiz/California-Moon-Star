INSERT INTO departments (name)
VALUES ("Business"),
       ("Marketing"),
       ("Finance"),
       ("Engineering"),
       ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 6000, 4),
       ("Engineer", 3000, 4);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Lilian", "Patino", 1,null),
       ("Paola", "Patino", 2,1);
       
