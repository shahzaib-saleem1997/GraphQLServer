const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql') ;
const schema = require('./schema');

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening on port ${port} ...`)
});