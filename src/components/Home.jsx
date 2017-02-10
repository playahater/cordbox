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
              <RB.NavItem eventKey={1} href="/">Home</RB.NavItem>
              <RB.NavItem eventKey={2} href="/app">Contact</RB.NavItem>
            </RB.Nav>
          </RB.Navbar.Collapse>
        </RB.Navbar>
        <RB.PageHeader>
          <div className="container">
            <h1>Foo's Bar</h1>
          </div>
        </RB.PageHeader>
        <div className="container">
          <RB.Jumbotron>
            <h2>Server response</h2>
            <p>this is some json response from the centauri rest api.</p>
            <p><RB.Button bsStyle="primary">more</RB.Button></p>
          </RB.Jumbotron>
        </div>
      </div>
    );
  }
}

export default Home;
