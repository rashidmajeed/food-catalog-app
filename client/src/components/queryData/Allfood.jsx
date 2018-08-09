import React from 'react';
import { Query } from 'react-apollo';
import { Get_All_Food } from '../../queries';

const QueryAllFood = () => {
  return (
   <div className="App">
  <Query query={Get_All_Food}>
    {/* Render Props pattern is used here*/}
    {({ data, loading, error }) => {
      if (loading) return <div>loading</div>
      if (error) return <div>error</div>
      console.log(data);
      return (
        <h1><p>Food</p></h1>
      );
    }}
  </Query>
  </div>
  );
}

export default QueryAllFood;