import React from 'react';
import { Image, Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import handleSignout from './toggleMenu';

const SignInMenu = ({session}) => {
  console.log(handleSignout);

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/loggedin.png" />
      <Dropdown pointing="top left" text={session.getCurrentUser.username}>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to='/addfood' text="Create Food" icon="utensils" />
          <Dropdown.Item as={NavLink} to='/profile' text="My Profile" icon="user" />
          <Dropdown.Item 
          onClick={() => handleSignout} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignInMenu;