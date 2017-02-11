import React, { Component, PropTypes } from 'react'
import * as RB from 'react-bootstrap';

export default class App extends Component {

  render() {
    return (
      <div>
        <RB.Navbar>
          <RB.Navbar.Header>
            <RB.Navbar.Brand>
              <a href="/">CordBox sandbox</a>
            </RB.Navbar.Brand>
            <RB.Navbar.Toggle />
          </RB.Navbar.Header>
          <RB.Navbar.Collapse>
            <RB.Nav>
              <RB.NavItem eventKey={1} href="#">Home</RB.NavItem>
              <RB.NavItem eventKey={2} href="#">Location</RB.NavItem>
              <RB.NavItem eventKey={2} href="#">Wireless</RB.NavItem>
              <RB.NavItem eventKey={2} href="#">Camera</RB.NavItem>
            </RB.Nav>
          </RB.Navbar.Collapse>
        </RB.Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
