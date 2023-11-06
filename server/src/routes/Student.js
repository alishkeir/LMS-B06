const StudentRouter = require('express').Router();

const upload = require('../configs/Multer');

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/Student');

StudentRouter.get('/students', getAllStudents);

StudentRouter.get('/students/:student_id', getStudentById);

StudentRouter.post('/students', upload.single('picture'), createStudent);

// Logging middleware (you can place your console.log here)

StudentRouter.patch(
  '/students/:student_id',
  upload.single('picture'),
  updateStudent
);

StudentRouter.delete('/students/:student_id', deleteStudent);

module.exports = StudentRouter;
