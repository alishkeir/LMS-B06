const Validator = require('../validations/Schemas');

const { studentConstructor } = require('../controllers/Constructor');

const validateCreateStudent = (req) => {
  const student = studentConstructor(req);

  const { error } = Validator.createStudentSchema.validate(student);

  if (error) {
    return { error: true, message: error };
    // TODO: Fix return value
    // return { error: true, message: error.details[0].message };
  }

  return { error: false, student };
};

const validateUpdateStudent = (req) => {
  const student = studentConstructor(req);

  const { error } = Validator.updateStudentSchema.validate(student);

  if (error) {
    return { error: true, message: error };
    // TODO: Fix return value
    // return { error: true, message: error.details[0].message };
  }

  return { error: false, student };
};

module.exports = {
  validateCreateStudent,
  validateUpdateStudent,
};
