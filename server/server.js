require('dotenv').config()
const { createNewTeamSpace } = require('./dynamo.js');


const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))





const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post("/createTeamSpace", (req, res) => {
  createNewTeamSpace(req.body.teamSpaceName, req.body.teamSpaceLeaderUserID, req.body.teamSpaceUserName);
  res.send("Success");
});

app.listen(PORT, () => console.info(`App listening on port ${PORT}`))