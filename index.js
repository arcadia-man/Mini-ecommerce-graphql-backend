const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const expressPlayground = require('graphql-playground-middleware-express').default
const db = require("./models")
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const graphqlMiddleWare = require("./middleware/graphqlMiddleWare");
const permissions = require("./middleware/shieldMiddleWare");
const resolvers = require("./graphql/resolver")
require('dotenv').config()
const schema = makeExecutableSchema({
    typeDefs: loadSchemaSync("./graphql/schema/*.graphql",
        { loaders: [new GraphQLFileLoader()] }), resolvers
});

const schemaWithMiddleWare = applyMiddleware(schema, graphqlMiddleWare, permissions);

const root = {
    dbconfig: db
}


app.use('/graphql', graphqlHTTP(async (req) => {
    return {
        schema: schemaWithMiddleWare,
        rootValue: root,
        context: req.headers, 
        graphiql: true
    }
}))


app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen(port, () => {
    console.log(`App is starting at http://localhost:${process.env.PORT}`)
});