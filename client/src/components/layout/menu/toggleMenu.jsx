import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';


const handleSignout =(client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');  
}
const ToggleMenu = () => (
    
        <ApolloConsumer>
            {client => {
                return handleSignout;
            }}
        </ApolloConsumer>
    );

export default withRouter(ToggleMenu);