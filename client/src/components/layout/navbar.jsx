import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const NavBar = ({ history }) => {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
           FOOD CATALOG
          </Menu.Item>
          <Menu.Item>
            <Button floated="right" positive inverted content="Home" />
          </Menu.Item>
          <Menu.Item>
            <Button floated="right" positive inverted content="Search" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button onClick={() => history.push('/signin')} basic inverted content="Login" />
            <Button
              onClick={() => history.push('/signup')}
              basic
              inverted
              content="Signup"
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }

export default withRouter(NavBar);