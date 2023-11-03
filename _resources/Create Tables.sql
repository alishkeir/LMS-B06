-- Create the Admins table for authentication
CREATE TABLE admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  password VARCHAR(255)
);

-- Create the Classes table
CREATE TABLE classes (
  class_id INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(255)
);

-- Create the Sections table
CREATE TABLE sections (
  section_id INT PRIMARY KEY AUTO_INCREMENT,
  section_name VARCHAR(255),
  max_students INT,
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

-- Create the Students table
CREATE TABLE students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  picture VARCHAR(255),
  class_id INT,
  section_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(class_id),
  FOREIGN KEY (section_id) REFERENCES sections(section_id)
);

-- Create the Attendance table
CREATE TABLE attendance (
  attendance_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT,
  section_id INT,
  date DATE,
  status VARCHAR(10),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (section_id) REFERENCES sections(section_id)
);

