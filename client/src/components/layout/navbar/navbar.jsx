import React from 'react';
import { Container, Button, Menu } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignOutMenu from '../menu/signoutMenu';
import SignInMenu from '../menu/signinMenu';


const NavBar = ({ session, history }) => {
 
    return (
      <Menu inverted fixed="top">
      <Container>
      <Menu.Item as={Link} to="/" header>
            <img src="/logo.png" alt="logo" />
            FOOD-CATALOG
          </Menu.Item>
        <Menu.Item as={NavLink} to='/food' name='Food' />
        <Menu.Item as={NavLink} to='/search' name='Search' />
        <Menu.Item>
          <Button onClick={() => history.push('/addfood')} floated="right" positive inverted content="New Food" />
        </Menu.Item>
        {session && session.getCurrentUser ? <SignInMenu  session={session}/> : <SignOutMenu />}   
      </Container>
    </Menu>
     
    
      );
  }
 
export default withRouter(NavBar);