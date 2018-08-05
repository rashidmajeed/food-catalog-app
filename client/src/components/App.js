import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { Get_All_Food } from '../queries';
import NavBar from './layout/navbar';


const App = () => {
  return (
    <div className="App">
      <NavBar />
        <Query query={Get_All_Food}>
          {/* Render Props pattern is used here*/}
          {({ data, loading, error }) => {
            if (loading) return <div>loading</div>
            if (error) return <div>error</div>
            console.log(data);
            return (
            <div>
            <h1><p>Food</p></h1>
            </div>
            );
          }}
        </Query>
    </div>
  );
}


export default App;
