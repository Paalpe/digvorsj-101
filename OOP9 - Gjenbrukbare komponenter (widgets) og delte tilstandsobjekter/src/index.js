import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/groups">Groups</NavBar.Link>
      </NavBar>

    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to StudAdm</Card>;
  }
}

class GroupList extends Component {
  groups = [];
  Selected = null;
  studentsInGroup = [];


  render() {
    return (
      <>
        <Card title="Groups">
          {this.groups.map((group) => (
            <Row key={group.id}>
              <Column>
                <Button.Success onClick={() => {
                  this.Selected = group;
                  console.log(this.Selected);
                  studentService.getStudentsInGroup(this.Selected.id, (students) => {
                    this.studentsInGroup = students;
                  });

                }}>{group.name}</Button.Success>
              </Column>
            </Row>
          ))}
        </Card>



        <Card title="details">
          {/* Show name and and Img of selecred group */}
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.Selected ? this.Selected.name : ''}</Column>
          </Row>
          <Row>
            <Column width={2}>Img:</Column>

            <Column>{this.Selected ? <img src={this.Selected.img} /> : ''}</Column>
          </Row>
          <Row>
            <Column width={2}>Students:</Column>
            {/* Show students in selected group}
             */}
            <Column>{this.studentsInGroup.map((student) => (
              <Row key={student.id}>
                <Column>
                  <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
                </Column>
              </Row>
            ))}</Column>
          </Row>



        </Card>


      </>



    );
  }

  mounted() {
    studentService.getGroups((groups) => {
      this.groups = groups;
    });
  }


}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Group:</Column>
            <Column>{this.student.group_id}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
          {/* <Form.Label>Group</Form.Label>
          <Form.Select
            value={this.student.group_id}
            onChange={(event) => (this.student.student.group_id = event.currentTarget.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </Form.Select> */}

        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

createRoot(document.getElementById('root')).render(
  <div>
    <Alert />
    <HashRouter>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/groups" component={GroupList} />
    </HashRouter>
  </div>
);
