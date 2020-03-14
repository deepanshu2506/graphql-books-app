const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://books:books123@cluster0-t1t7l.mongodb.net/books"
);
mongoose.connection.once("open", () => {
  console.log("connected to db");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listening for requests on port 4000");
});
