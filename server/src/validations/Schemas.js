const Joi = require('joi');

const createStudentSchema = Joi.object({
  first_name: Joi.string().required().min(2).max(255),
  last_name: Joi.string().required().min(2).max(255),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  class_id: Joi.string().required(),
  section_id: Joi.string().required(),
  picture: Joi.string().required(),
});

const updateStudentSchema = Joi.object({
  first_name: Joi.string().min(2).max(255),
  last_name: Joi.string().min(2).max(255),
  email: Joi.string().email(),
  phone_number: Joi.string(),
  picture: Joi.string(),
  class_id: Joi.string(),
  section_id: Joi.string(),
});

const adminSchema = Joi.object({
  username: Joi.string().required().min(5).max(255),
  password: Joi.string()
    .required()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .min(8)
    .max(255),
  confirm_password: Joi.ref('password'),
});

const classSchema = Joi.object({
  class_name: Joi.string().required(),
});

const sectionSchema = Joi.object({
  section_name: Joi.string().required().max(255),
  max_students: Joi.string().required(),
  class_id: Joi.string().required(),
});

const attendanceSchema = Joi.object({
  student_id: Joi.string().required(),
  section_id: Joi.string().required(),
  date: Joi.string().required(),
  status: Joi.string().required().max(10).valid('Present', 'Late', 'Absent'),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
  adminSchema,
  classSchema,
  sectionSchema,
  attendanceSchema,
};
