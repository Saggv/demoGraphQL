const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");

const isAuth = require("./midleware/isAuth");
const mongoose = require("mongoose");


const schemaGraphql = require("./graphql/schema");
const resolversQL = require("./graphql/resolvers");


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });



app.use(isAuth);


app.use("/graphql", graphqlHttp({
    schema: schemaGraphql,
    rootValue: resolversQL,
    graphiql: true
}))

mongoose.connect("mongodb://localhost:27017/demographql",
                    {useUnifiedTopology: true,  useNewUrlParser: true })
        .then(data=>{
            console.log("connect success with mongoose !")
        })
        .catch(err=>{
            console.log(err);
        })

app.listen(7000, ()=>{
    console.log("server run on port 7000")
});

