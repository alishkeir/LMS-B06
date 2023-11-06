-- Create the Admins table for authentication
CREATE TABLE admins (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  password VARCHAR(255)
);

-- Create the Classes table
CREATE TABLE classes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(255)
);

-- Create the Sections table
CREATE TABLE sections (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  section_name VARCHAR(255),
  max_students INT,
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(ID) ON DELETE RESTRICT
);

-- Create the Students table
CREATE TABLE students (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  picture VARCHAR(255),
  class_id INT,
  section_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(ID), ON DELETE RESTRICT
  FOREIGN KEY (section_id) REFERENCES sections(ID) ON DELETE RESTRICT
);

-- Create the Attendance table
CREATE TABLE attendance (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT,
  section_id INT,
  date DATE,
  status VARCHAR(10),
  FOREIGN KEY (student_id) REFERENCES students(ID),
  FOREIGN KEY (section_id) REFERENCES sections(ID)
);



-- make admin username unique
ALTER TABLE admins
ADD CONSTRAINT unique_admin_username UNIQUE (username);


-- make class name unique
ALTER TABLE classes
ADD CONSTRAINT unique_class_name UNIQUE (class_name);


-- make section name unique within a class
ALTER TABLE sections
ADD CONSTRAINT unique_section_name_in_class UNIQUE (section_name, class_id);


-- make student email and phone_number unique
ALTER TABLE students
ADD CONSTRAINT unique_student_email UNIQUE (email),
ADD CONSTRAINT unique_student_phone UNIQUE (phone_number);


-- make sure one student can have only one attendance daily
ALTER TABLE attendance
ADD CONSTRAINT unique_student_date UNIQUE (student_id, date);