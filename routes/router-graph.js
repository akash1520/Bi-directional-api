const { default: axios } = require("axios");
const express = require("express");
const router = new express.Router();
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type API {
    Url: String!
    Method: String!
  }
  
  type Query {
    api(id: ID!): API
  }
  type Mutation {
    createAPI(Url: String!, Method: String!): API!
  }  
`);

const createAPI = async (args) => {
    try {
      const response = await axios.get(args.Url);
      console.log(`GET request to ${args.Url} successful`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(`Error sending GET request to ${args.Url}: ${error.message}`);
      throw error;
    }
  };

// const createAPI = (args) => {
//     // Perform any necessary operations with the arguments here
//     console.log(`Creating new API with URL: ${args.url}`);
 

//     // Create a new API object with a unique ID
//     const api = {
//       Url: args.Url,
//       Method: args.Method
//     };
  
//     return api;
//   };

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