const DB = require('../configs/DB');

const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    let connection = DB.getConnection();

    // console.log(connection);
    connection.query('SELECT * FROM students', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }

      connection.end();
    });
  });
};

const getStudentById = (studentId) => {
  console.log('getStudentById');
  return new Promise((resolve, reject) => {
    const connection = DB.getConnection();
    connection.query(
      'SELECT * FROM students WHERE id = ?',
      [studentId],
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      }
    );
  });
};

const createStudent = (student) => {
  return new Promise((resolve, reject) => {
    const connection = DB.getConnection();

    connection.query(
      'INSERT INTO students SET ?',
      student,
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const updateStudent = (studentId, student) => {
  return new Promise((resolve, reject) => {
    const connection = DB.getConnection();
    connection.query(
      'UPDATE students SET ? WHERE id = ?',
      [student, studentId],
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const deleteStudent = (studentId) => {
  return new Promise((resolve, reject) => {
    const connection = DB.getConnection();

    connection.query(
      'DELETE FROM students WHERE id = ?',
      [studentId],
      (error, results) => {
        connection.end();

        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      }
    );
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
