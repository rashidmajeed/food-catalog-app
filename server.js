const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

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

// create GraphiQl application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Food,
        User
    }

}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})