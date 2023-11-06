require('dotenv').config();

const express = require('express');

const StudentRouter = require('./routes/Student');

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use([StudentRouter]);

app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
