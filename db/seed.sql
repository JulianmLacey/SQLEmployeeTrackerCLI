INSERT INTO department (name) VALUES
    ('HR'),
    ('Finance'),
    ('IT'),
    ('Marketing');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
    ('HR Manager', 60000.00, 1),
    ('HR Assistant', 40000.00, 1),
    ('Financial Analyst', 65000.00, 2),
    ('Software Engineer', 75000.00, 3),
    ('Marketing Manager', 60000.00, 4),
    ('Marketing Coordinator', 45000.00, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),  -- HR Manager
    ('Jane', 'Smith', 2, 1),   -- HR Assistant, managed by John Doe
    ('Alice', 'Johnson', 3, NULL),  -- Financial Analyst
    ('Bob', 'Williams', 4, NULL),   -- Software Engineer
    ('Mary', 'Davis', 5, NULL),    -- Marketing Manager
    ('David', 'Brown', 6, 5);     -- Marketing Coordinator, managed by Mary Davis