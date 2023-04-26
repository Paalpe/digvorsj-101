import { pool } from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
}

export class Group {
  id: number = 0;
  name: string = '';
  img: string = '';
}

class StudentService {
  getStudents(success: (students: Student[]) => void) {
    pool.query('SELECT * FROM Students', (error, results: RowDataPacket[]) => {
      if (error) return console.error(error);

      success(results as Student[]);
    });
  }

  getStudent(id: number, success: (student: Student) => void) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results: RowDataPacket[]) => {
      if (error) return console.error(error);

      success(results[0] as Student);
    });
  }

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  // get groups
  getGroups(success: (groups: Group[]) => void) {
    pool.query('SELECT * FROM Groups', (error, results) => {
      if (error) return console.error(error);

      success(results as Group[]);
    });
  }
  // get group
  getGroup(id: number, success: (group: Group) => void) {
    pool.query('SELECT * FROM Groups WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success((results as Group[])[0]);

    });
  }
  getStudentsInGroup(id: number, success: (students: Student[]) => void) {
    pool.query('SELECT * FROM Students WHERE group_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results as Student[]);
    });
  }


}
export let studentService = new StudentService();
