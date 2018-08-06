import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import SignIn from './components/authentication/signIn';
import SignUp from './components/authentication/signUp';
import Homepage from './components/layout/homepage';
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
const Root = ({ refetch }) => (
  <Router>
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/home" component={App} />
      <Route path="/signin" render={() => <SignIn refetch={refetch} />} /> 
      <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </Router>
);


// wrap all components with withSession components
const RootWithSession = withSession(Root);


ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root'));

