const studentConstructor = (req) => {
  const student = new Object();

  if (req.body.first_name) student.first_name = req.body.first_name;
  if (req.body.last_name) student.last_name = req.body.last_name;
  if (req.body.email) student.email = req.body.email;
  if (req.body.phone_number) student.phone_number = req.body.phone_number;
  if (req.body.class_id) student.class_id = req.body.class_id;
  if (req.body.section_id) student.section_id = req.body.section_id;

  if (req?.file?.path) {
    student.picture = `${req.get('host')}/${req.file.path}`;
  }

  return student;
};

module.exports = {
  studentConstructor,
};
