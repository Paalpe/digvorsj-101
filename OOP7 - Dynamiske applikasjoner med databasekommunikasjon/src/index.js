import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';
/**
 * Det forutsettes at du endrer og/eller legger til nødvendige databasetabeller med eventuell testdata. Testdata legges inn i databasetabellene ved hjelp av INSERT-setninger som vist i leksjonen.
 * Implementer følgende:
 * Legg til visninger for studieprogram. Studieprogrammene kan vises på lignende måte som studentene blir vist.
 * En student er tilknyttet maks ett studieprogram, men et studieprogram kan ha mange tilknyttede studenter
 * I visningen for en student, skal studieprogrammet studenten er tilknyttet vises
 * I visningen for et studieprogram, skal studentene som er tilknyttet studieprogrammet vises
 * Applikasjonen kan for eksempel se omtrent slik ut, men listen over studieprogram trenger ikke å bli vist når studieprogram detaljer vises:
 */

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

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.program_id + '/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name, program_id FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

class StudentDetails extends Component {
  student = null;
  program = '';

  render() {
    if (!this.student) return null;

    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>Program: {this.program}</li>
      </ul>
    );
  }

  mounted() {
    pool.query(
      'SELECT * FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.student = results[0];
      }
    )
    // console.log(this.props.match.params.program_id);
    pool.query(
      'SELECT name FROM Programs WHERE id=?',
      [this.props.match.params.program_id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        console.log(results);
        this.program = results[0].name;
      }
    );
  }
}
class ProgramList extends Component {
  programs = [];
  students = [];

  render() {
    return (
      <ul>
        {this.programs.map((program) => (

          <li key={program.id}>
            {/* <NavLink to={'/programs/' + program.id}>{program.name}</NavLink> */}
            {program.name}
            <ul>
              {this.students.filter((student) => student.program_id == program.id).map((student) => (
                <li key={student.id}>
                  <NavLink to={'/students/' + student.program_id + '/' + student.id}>{student.name}</NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name FROM Programs', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.programs = results;
    });
    pool.query('SELECT id, name, program_id FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    }
    );
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:program_id/:id" component={StudentDetails} />
      <Route exact path="/programs" component={ProgramList} />
    </div>
  </HashRouter>
);
