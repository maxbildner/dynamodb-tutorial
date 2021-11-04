// FROM VIDEO TUTORIAL: https://www.youtube.com/watch?v=JPQPPLQnyB4

const AWS = require("aws-sdk");

// lets us load in environment variables
require("dotenv").config();

// connect to AWS Dynamo DB
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

// make sure this matches the aws dynamo db table name
const TABLE_NAME = "harrypotter-api";

const getCharacters = async () => {
  const params = {
    // table name we're going to be querying from
    TableName: TABLE_NAME,
  };

  // SCAN will read/look in the DB
  const characters = await dynamoClient.scan(params).promise();

  // console.log(characters);
  //=> { Items: [], Count: 0, ScannedCount: 0 }

  return characters;
};

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character, // item we want to save/update
  };

  // PUT = adds a new item to DB or updates an existing item
  return await dynamoClient.put(params).promise();
};

const getCharacterById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  // return character object by id
  return await dynamoClient.get(params).promise();
};

const deleteCharacter = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  // return deleted object?
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter,
};

// FOR TESTING:
// getCharacters();

// const hp = {
//   id: "0", // added in manually
//   name: "Harry Potter",
//   alternate_names: [""],
//   species: "human",
//   gender: "male",
//   house: "Gryffindor",
//   dateOfBirth: "31-07-1980",
//   yearOfBirth: 1980,
//   wizard: true,
//   ancestry: "half-blood",
//   eyeColour: "green",
//   hairColour: "black",
//   wand: { wood: "holly", core: "phoenix feather", length: 11 },
//   patronus: "stag",
//   hogwartsStudent: true,
//   hogwartsStaff: false,
//   actor: "Daniel Radcliffe",
//   alternate_actors: [""],
//   alive: true,
//   image: "http://hp-api.herokuapp.com/images/harry.jpg",
// };
// addOrUpdateCharacter(hp);    //=> returns promise
