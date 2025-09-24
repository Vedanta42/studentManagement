const db = require("../utils/dbConnection");

const createStudent = (req,res) => {
    const {name,email,age} = req.body;
    if (!name || !email || !age) {
        return res.status(400).send("name, email and age are required");
    }
    const insertQuery = `insert into students (name, email, age) values (?,?,?)`;

    db.execute(insertQuery,[name,email,age],(err,result)=> {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        };
        console.log(`Value has been inserted ${name} (ID:${result.insertId})`);
        res.status(200).send(`Student with name ${name} successfully added`);
    });
};

const getAllStudents = (req, res) => {
  const selectQuery = `SELECT * FROM students`;

  db.execute(selectQuery, [], (err, rows) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    }
    console.log('Retrieved all students');
    res.status(200).send(rows);
  });
};

// Retrieve a student by ID
const getStudentById = (req, res) => {
  const { id } = req.params;
  const selectQuery = `SELECT * FROM students WHERE id = ?`;

  db.execute(selectQuery, [id], (err, rows) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Student not found');
      return;
    }
    console.log(`Retrieved student with ID: ${id}`);
    res.status(200).send(rows[0]);
  });
};

// Update a student
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).send('Name, email, and age are required');
  }

  const updateQuery = `UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?`;

  db.execute(updateQuery, [name, email, age, id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Student not found');
      return;
    }
    console.log(`Updated student with ID: ${id}`);
    res.status(200).send('Student has been updated');
  });
};

// Delete a student
const deleteStudent = (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM students WHERE id = ?`;

  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Student not found');
      return;
    }
    console.log(`Deleted student with ID: ${id}`);
    res.status(200).send(`Student with id ${id} is deleted`);
  });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};