//Spustit server 'npm run server'

const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect database
connectDB();

//Init middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.send('API Runnig'));

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



//GraphQL
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));