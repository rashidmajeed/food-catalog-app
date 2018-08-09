import React from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import QueryAllFood from '../components/queryData/Allfood';

const App = () => {
  return (
    <div>
      <Container className="App">
      < QueryAllFood />
      </Container>
    </div>
  );
}


export default App;
