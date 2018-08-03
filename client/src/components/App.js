import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { Get_All_Food } from '../queries';


const App = () => {
  return (
    <div className="App">
      <h1>Frontend is with react and apollo client</h1>

      <Query query={Get_All_Food}>
        {/* Render Props pattern is used here*/}
        {({ data, loading, error }) => {
          if (loading) return <div>loading</div>
          if (error) return <div>error</div>
          console.log(data);
          return (
            <p>Food</p>
          );
        }}
      </Query>

    </div>
  );
}


export default App;
