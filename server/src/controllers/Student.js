const studentModel = require('../models/Student');
const Validator = require('../middlewares/Validation');

const getAllStudents = (req, res) => {
  try {
    studentModel.getAllStudents().then((students) => {
      res.status(200).json({ students });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = (req, res) => {
  if (!req.params.student_id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  try {
    studentModel
      .getStudentById(req.params.student_id)
      .then((student) => {
        if (student?.student) {
          res.status(200).json({ student });
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = (req, res, next) => {
  try {
    const validationResults = Validator.validateCreateStudent(req);

    if (validationResults.error) {
      return res.status(400).json({ error: validationResults.message });
    }

    studentModel
      .createStudent(validationResults.student)
      .then((student) => {
        res.status(200).json({ student });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = (req, res) => {
  if (!req?.params?.student_id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  try {
    const validationResults = Validator.validateUpdateStudent(req);

    if (validationResults.error) {
      return res.status(400).json({ error: validationResults.message });
    }

    studentModel
      .updateStudent(req.params.student_id, validationResults.student)
      .then((student) => {
        if (student.affectedRows === 0) {
          return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ student });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = (req, res) => {
  if (!req.params.student_id) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  try {
    studentModel
      .deleteStudent(req.params.student_id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ student });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
