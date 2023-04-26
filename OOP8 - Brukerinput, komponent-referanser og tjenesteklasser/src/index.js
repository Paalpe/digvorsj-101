import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/programs" activeStyle={{ color: 'darkblue' }}>
          Programs
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

  addStudent() {
    studentService.addStudent({ name: 'New student', email: 'new@Stud.no', program_id: 1 }, (insertId) => {
      history.push('/students/' + insertId + '/edit');
    });
  }

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
          </li>
        ))}
        <button type="button" onClick={this.addStudent}>
          Add new student
        </button>

      </ul>


    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class ProgramList extends Component {
  programs = [];
  students = [];

  addProgram() {
    studentService.addProgram({ name: 'New program', info: 'This is added with client' }, (insertId) => {
      history.push('/programs/' + insertId + '/edit');
    });

  }
  //hotkey for showing console in chrome: ctrl+shift+i

  render() {
    return (
      <ul>
        {this.programs.map((program) => (
          <li key={program.id}>
            <NavLink to={'/programs/' + program.id + '/edit'}>{program.name}</NavLink>
            <ul>
              {this.students.filter((student) => student.program_id == program.id).map((student) => (
                <li key={student.id}>
                  <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
                </li>
              ))}
            </ul>
          </li>


        ))}
        <button type="button" onClick={this.addProgram}>
          Add new program
        </button>

      </ul>

    );
  }

  mounted() {
    studentService.getPrograms((programs) => {
      this.programs = programs;
    });
    studentService.getStudents((students) => {
      this.students = students;
    }
    );
  }
}


class StudentEdit extends Component {
  student = null;
  programs = [];

  render() {
    if (!this.student) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />
        {/* Dropdown  menu of program*/}

        <select
          value={this.student.program_id}
          onChange={(event) => (this.student.program_id = event.currentTarget.value)}
        >
          {this.programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
    studentService.getPrograms((programs) => {
      this.programs = programs;
    }
    );
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }

  delete() {
    studentService.deleteStudent(this.student.id, () => {
      history.push('/students');
    });
  }
}


class programEdit extends Component {
  program = null;

  render() {
    if (!this.program) return null;
    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.program.name}
          onChange={(event) => (this.program.name = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getProgram(this.props.match.params.id, (program) => {
      this.program = program;
    });

  }

  save() {
    studentService.updateProgram(this.program, () => {
      history.push('/programs');
    });
  }

  delete() {
    studentService.deleteProgram(this.program.id, () => {
      history.push('/programs');
    });
  }
}







createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route exact path="/programs" component={ProgramList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
    <Route path="/programs/:id/edit" component={programEdit} />
  </HashRouter>
);
