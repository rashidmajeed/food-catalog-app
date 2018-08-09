import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import SignInForm from './components/Auth/authForm/signInForm';
import SignUpForm from './components/Auth/authForm/signUpForm';
import HomePage from './components/layout/homepage/homepage';
import NavBar from './components/layout/navbar/navbar';
import AddFood from './components/Food/addFood';
import SearchFood from './components/Food/searchFood';
import Profile from './components/profile/profile';
import withSession from './components/withSession';


const client = new ApolloClient({

  uri: 'http://localhost:4444/graphql',

  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {

      console.log('networkError', networkError);

      /*if (networkError.statuscode === 401) {
        localStorage.removeItem('token');
      }*/
    }
  }

});

// Stateless function for routing
const Root = ({ refetch, session }) => (
  <Router>
   <Fragment>
  <Switch>
    <Route exact path="/" component={HomePage} />
  </Switch>
  <Route
    path="/(.+)"
    render={() => (
      <div>
        <NavBar session={session} />
        <Container className="main">
          <Switch>

            <Route path="/food" component={App} />
            <Route path="/addfood" component={AddFood} />
            <Route path="/search" component={SearchFood} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" render={() => <SignInForm refetch={refetch} />} />
            <Route path="/register" render={() => <SignUpForm refetch={refetch} />} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </div>
    )}
  />
  </Fragment>
  </Router>
    );
    
    
    // wrap all components with withSession components
    const RootWithSession = withSession(Root);
    
    
    ReactDOM.render(
  <ApolloProvider client={client}>
      <RootWithSession />
    </ApolloProvider>,
    document.getElementById('root'));
  
