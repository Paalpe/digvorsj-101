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
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  // get groups
  getGroups(success) {
    pool.query('SELECT * FROM Groups', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // get group
  getGroup(id, success) {
    pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  getStudentsInGroup(id, success) {
    pool.query('SELECT * FROM Students WHERE group_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

}
export let studentService = new StudentService();
