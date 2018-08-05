const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// import models into our server
const Food = require('./models/Food');
const User = require('./models/User');

// Bring in GraphQl-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');


// graphql schema for type checking
const { typeDefs } = require('./schema');
const { resolvers } = require('./reslovers');


// creating a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// connect to mongodb database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB is connected with the web application...'))
  .catch(err => console.error(err));

// Intializing application
const app = express();

const corsOptions = {

  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// setup jwt authentication
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  //console.log(token , typeof token); 

  if(token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      //console.log(currentUser);
      // passing current user into the graphql express middleware
      req.currentUser = currentUser;
    }
    catch (err){
      console.error(err);
    }
  
  }
  next();
});

// create GraphiQl application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// connect Schema with GraphQl
app.use(
  '/graphql',
  bodyParser.json(),
  // wrap middleware with parenthese
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Food,
      User,
      currentUser
    }
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})