import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <td><NavLink to="/">Knut's CV</NavLink></td>
            <td><NavLink to="/utdanning">Utdanning</NavLink></td>
            <td><NavLink to="/arbeidserfaring">Arbeidserfaring</NavLink></td>
            <td><NavLink to="/interesser">Interesser</NavLink></td>

          </tr>
        </table>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Velkommen til Knut's CV</div>;
  }
}

class Page1 extends Component {
  render() {
    return <div>Digfor</div>;
  }
}

class Page2 extends Component {
  render() {
    return <div>Sommerjobb</div>;
  }
}

class Page3 extends Component {
  render() {
    return <div>Programmering</div>;
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/utdanning" component={Page1} />
      <Route path="/arbeidserfaring" component={Page2} />
      <Route path="/interesser" component={Page3} />

    </div>
  </HashRouter>
);
