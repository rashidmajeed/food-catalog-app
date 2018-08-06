import React from 'react';
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'


const initialState = {
  username: "",
  password: ""
}

class SignIn extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/home');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='signin-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.signin-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Login to Food Catalog
          </Header>

            {/*Wrap Mutation component to Signup Component*/}
            <Mutation mutation={SIGNIN_USER} variables={{ username, password }} >
              {/*Wrap with the render props*/}
              {(signinUser, { data, loading, error }) => {
                return (
                  <Form size='large' onSubmit={event => this.handleSubmit(event, signinUser)} >
                    <Segment stacked>
                      <Form.Input fluid icon='user' iconPosition='left' name="username" value={username} onChange={this.handleChange} placeholder='Username' />
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      <Button disabled={loading || this.validateForm()} color='teal' fluid size='large' >
                        Login
                </Button>
                    </Segment>
                    <Message>
                      New to us? <Link to="/signup">SignUp</Link>
                    </Message>
                    {error && <Error error={error} />}
                  </Form>
                )
              }}
            </Mutation>
            {/*End Mutation component to Signin Component*/}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default withRouter(SignIn)