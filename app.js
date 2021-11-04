const express = require('express');

// import model functions that let you interact with AWS Dynamo Database
const { 
  getCharacters, 
  getCharacterById, 
  addOrUpdateCharacter,
  deleteCharacter 
} = require('./dynamo');

const app = express();

// lets you receive/parse POST body data from client
app.use(express.json());

// BASIC CRUD ROUTES

// creates an GET API endpoint with root path "/"
app.get('/', (req, res) => {
  res.send('YO');
})


// create GET API endpoint with path "/characters" that returns all character objects in DB
app.get('/characters', async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);

  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'Something went wrong'})
  }
})


// create GET API endpoint with path "/characters/:id" that returns 1 character specified by url string param
app.get('/characters/:id', async (req, res) => {

  // grab id from query string
  const id = req.params.id;

  try {
    const character = await getCharacterById(id);
    res.json(character);

  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'Something went wrong'})
  }
})


// create POST API endpoint with path "/characters" that adds a new character to Database
app.post('/characters', async (req, res) => {

  // grab character from client body
  const character = req.body;

  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);

  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'Something went wrong'})
  }
})

// create PUT API endpoint with path "/characters/:id" that updates an existing character in DB
app.put('/characters/:id', async (req, res) => {

  // grab character from client body
  const character = req.body;

  // grab id from query string
  const { id } = req.params;
  // const id = req.params.id; // same as above

  // ? why is this needed?
  character.id = id;
  
  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);

  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'Something went wrong'})
  }
})



// create DELETE API endpoint with path "/characters/:id" that deletes an existing character in DB
app.delete('/characters/:id', async (req, res) => {

  // grab id from query string
  const { id } = req.params;

  // ? why is this needed?
  character.id = id;
  
  try {
    res.json(await deleteCharacter(id));

  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'Something went wrong'})
  }
})

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})