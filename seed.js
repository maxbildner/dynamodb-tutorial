const axios = require("axios");

const { addOrUpdateCharacter } = require("./dynamo");

const URL = "http://hp-api.herokuapp.com/api/characters";

const seedData = async () => {
  try {
    // make request to harry potter API and grab all data
    const { data: characters } = await axios.get(URL);
    // same as above line of code^
    // const res = await axios.get(url)
    // const characters = res.data;

    // create array of promisses
    const characterPromises = characters.map((character, i) => {
      
      // save character to dynamo DB
      return addOrUpdateCharacter({ ...character, id: i + "" }); // add index to each character object (make it a string)
    });

    // trigger all of these requests independently of each other at the same time
    await Promise.all(characterPromises);

  } catch (error) {
    console.error(error);
  }
};

seedData();
