import dotenv from "dotenv"
dotenv.config()

import { 
  createNewTeamSpace, 
  getAllTeamSpaces,
  getAllTransactions
} from './dynamo.js';

import express from "express"
const app = express();

import bodyParser from "body-parser"
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const PORT = 5000;


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get("/getAllTeamSpaces", async (req, res) => {
  let teamSpaces = await getAllTeamSpaces();
  res.send(teamSpaces);
});

app.get("/getAllTransactions", async (req, res) => {
  let transactions = await getAllTransactions(req.body.teamSpaceID)
  res.send(transactions);
});

app.post("/createTeamSpace", (req, res) => {
  createNewTeamSpace(req.body.teamSpaceName, req.body.teamSpaceLeaderUserID, req.body.teamSpaceUserName);
  res.send("Success");
});

app.listen(PORT, () => console.info(`App listening on port ${PORT}`))