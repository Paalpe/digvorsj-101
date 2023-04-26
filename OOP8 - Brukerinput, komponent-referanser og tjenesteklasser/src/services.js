import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, program_id=? WHERE id=?',
      [student.name, student.email, student.program_id, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  addStudent(student, success) {
    // add new student to database with "name" and "email" from the student object
    pool.query(
      'INSERT INTO Students (name, email, program_id) VALUES (?, ?, ?)',
      [student.name, student.email, student.program_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  getPrograms(success) {
    pool.query('SELECT * FROM Programs', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getProgram(id, success) {
    pool.query('SELECT * FROM Programs WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateProgram(program, success) {
    pool.query(
      'UPDATE Programs SET name=? WHERE id=?',
      [program.name, program.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addProgram(program, success) {
    // add new program to database with "name" and "info" from the program object
    pool.query(
      'INSERT INTO Programs (name, info) VALUES (?, ?)',
      [program.name, program.info],
      (error, results) => {
        if (error) return console.error(error);
        success(results.insertId);
      }
    );
  }

  deleteProgram(id, success) {
    pool.query('DELETE FROM Programs WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }






}
export let studentService = new StudentService();
