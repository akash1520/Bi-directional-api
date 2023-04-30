const axios = require("axios");
const express = require("express");
const router = new express.Router();
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type API {
    Url: String!
    Method: String!
    Data:String!
  }
  
  type Query {
    api(id: ID!): API
  }
  type Mutation {
    createAPI(Url: String!, Method: String!): API!
  }  
`);



const createAPI = async(args) => {
    // Perform any necessary operations with the arguments here
    
      const response = await axios.get(args.Url);

    const api = {
      Url: args.Url,
      Method: args.Method,
      Data:JSON.stringify(response.data)
    };
    return api;

 };

const root = {
    createAPI: createAPI
  };



router.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

module.exports = router;