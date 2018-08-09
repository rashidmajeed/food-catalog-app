import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const SignOutMenu = ({ history }) => {
  return (
       <Menu.Item position="right">
      <Button onClick={() => history.push('/login')} basic inverted content="Login" />
      <Button
        onClick={() => history.push('/register')}
        basic
        inverted
        content="Register"
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
   
  );
};

export default withRouter(SignOutMenu);