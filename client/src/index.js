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
const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/food" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root'));

