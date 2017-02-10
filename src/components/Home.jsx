import React from 'react';
import * as RB from 'react-bootstrap';

class Home extends React.Component {

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
              <RB.NavItem eventKey={2} href="#">Battery</RB.NavItem>
              <RB.NavItem eventKey={2} href="#">Wireless</RB.NavItem>
            </RB.Nav>
          </RB.Navbar.Collapse>
        </RB.Navbar>
        <RB.PageHeader>
          <div className="container">
            <h2>Welcome</h2>
          </div>
        </RB.PageHeader>
        <div className="container">
        </div>
      </div>
    );
  }
}

export default Home;
