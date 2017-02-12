import React, { Component, PropTypes } from 'react'
import * as RB from 'react-bootstrap';

export default class App extends Component {

  render() {

    navigator.app.clearHistory();

    return (
      <div>
        <nav id="menu">
          <header>
            <h3>navigation</h3>
          </header>
          <RB.Nav>
            <RB.NavItem eventKey={1} href="#/">Home</RB.NavItem>
            <RB.NavItem eventKey={2} href="#location">Location</RB.NavItem>
            <RB.NavItem eventKey={3} href="#wireless">Wireless</RB.NavItem>
            <RB.NavItem eventKey={4} href="#camera">Camera</RB.NavItem>
          </RB.Nav>
        </nav>

        <main id="panel">
          <header>
            <div class="toggle-button">☰</div>
          </header>
          <div className="container">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}
