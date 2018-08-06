import React from 'react';
import {  withRouter } from 'react-router-dom';
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from '../Error';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  }

class SignUp extends React.Component {

  state = {...initialState};

  clearState = () => {
    this.setState({ ...initialState });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/home');
    });
  };

  validateForm = () => {
    const { username, email, password, confirmpassword } = this.state;
    const isInvalid = !username || !email || !password || password !== confirmpassword;
    return isInvalid;
  }


  render() {
    const { username, email, password, confirmpassword } = this.state;
    return (

      <div className='signup-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.signup-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Signup with account
          </Header>

            {/*Wrap Mutation component to Signup Component*/}
            <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }} >
              {/*Wrap with the render props*/}
              {(signupUser, { data, loading, error }) => {

                return (
                  <Form size='large' onSubmit={event => this.handleSubmit(event, signupUser)} >
                    <Segment stacked>
                      <Form.Input fluid icon='user' iconPosition='left' name="username" value={username} onChange={this.handleChange} placeholder='Username' />
                      <Form.Input fluid icon='mail' iconPosition='left' name="email" value={email} onChange={this.handleChange} placeholder='Email address' />
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
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        type='password'
                        name="confirmpassword"
                        value={confirmpassword}
                        onChange={this.handleChange}
                      />

                      <Button disabled={ loading || this.validateForm()} color='teal' fluid size='large' >
                        Register 
                </Button>
                    </Segment>
                    {error && <Error error={error} />}
                  </Form>
                )
              }}

            </Mutation>
            {/*End Mutation component to Signup Component*/}
          </Grid.Column>
        </Grid>
      </div>

    );
  }
}
export default withRouter(SignUp);