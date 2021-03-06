const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//allow cross-origin requests
app.use(cors());

mongoose
    .connect("mongodb://localhost:27017/booksData", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

mongoose.connection.once('open', () => {
    console.log("connection successfull...")
});



//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("now listening for the requests on the port 4000");
});