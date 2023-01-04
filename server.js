const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const { CORS, checkJWT } = require("./middleware");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(checkJWT);
app.use(CORS);

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
    })
);

mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://0.0.0.0:27017/", {
        dbName: "testme",
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((res) => {
        app.listen(port, (req, res) => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
