-- Create the Admins table for authentication
CREATE TABLE admins (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20),
  password VARCHAR(20)
);

-- Create the Classes table
CREATE TABLE classes (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(80)
);

-- Create the Sections table
CREATE TABLE sections (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  section_name VARCHAR(10),
  max_students INT,
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(ID) ON DELETE RESTRICT
);

-- Create the Students table
CREATE TABLE students (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  picture VARCHAR(255),
  class_id INT,
  section_id INT,
  FOREIGN KEY (class_id) REFERENCES classes(ID) ON DELETE RESTRICT,
  FOREIGN KEY (section_id) REFERENCES sections(ID) ON DELETE RESTRICT
);

-- Create the Attendance table
CREATE TABLE attendance (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT,
  section_id INT,
  attendance_date DATE,
  status VARCHAR(10),
  FOREIGN KEY (student_id) REFERENCES students(ID),
  FOREIGN KEY (section_id) REFERENCES sections(ID)
);



-- make admin username unique
ALTER TABLE admins
ADD CONSTRAINT uu UNIQUE (username);


-- make class name unique
ALTER TABLE classes
ADD CONSTRAINT uc UNIQUE (class_name);


-- make section name unique within a class
ALTER TABLE sections
ADD CONSTRAINT us UNIQUE (section_name, class_id);


-- make student email and phone_number unique
ALTER TABLE students
ADD CONSTRAINT ue UNIQUE (email),
ADD CONSTRAINT uph UNIQUE (phone_number);


-- make sure one student can have only one attendance daily
ALTER TABLE attendance
ADD CONSTRAINT ud UNIQUE (student_id, attendance_date);