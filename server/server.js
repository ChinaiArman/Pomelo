import dotenv from "dotenv"
dotenv.config()

import { 
  createNewTeamSpace, 
  getAllTeamSpaces,
  getAllTransactions,
  getTransactionsBySpendingCategory,
  getAllSpendingCategories,
  getSpendingCategoryByID,
  getTeamSpaceUsers,
  getTeamSpaceLeader,
  getTeamSpaceByUserID,
  getTransactionsByUserID
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

app.get("/getTransactionsBySpendingCategory" , async (req, res) => {
  let transactions = await getTransactionsBySpendingCategory(req.body.teamSpaceID, req.body.spendingCategoryID)
  res.send(transactions);
});

app.get("/getAllSpendingCategories" , async (req, res) => {
  let spendingCategories = await getAllSpendingCategories(req.body.teamSpaceID)
  res.send(spendingCategories);
});

app.get("/getSpendingCategoryByID" , async (req, res) => {
  let spendingCategory = await getSpendingCategoryByID(req.body.teamSpaceID, req.body.spendingCategoryID)
  res.send(spendingCategory);
});

app.get("/getTeamSpaceUsers" , async (req, res) => {
  let teamSpaceUsers = await getTeamSpaceUsers(req.body.teamSpaceID)
  res.send(teamSpaceUsers);
});

app.get("/getTeamSpaceLeader" , async (req, res) => {
  let teamSpaceLeader = await getTeamSpaceLeader(req.body.teamSpaceID)
  res.send(teamSpaceLeader);
});

app.get("/getTeamSpaceByUserID" , async (req, res) => {
  let teamSpace = await getTeamSpaceByUserID(req.body.userID)
  res.send(teamSpace);
});

app.get("/getTransactionsByUserID", async (req, res) => {
  let transactions = await getTransactionsByUserID(req.body.userID)
  res.send(transactions);
});

app.post("/createTeamSpace", (req, res) => {
  createNewTeamSpace(req.body.teamSpaceName, req.body.teamSpaceLeaderUserID, req.body.teamSpaceUserName);
  res.send("Success");
});

app.listen(PORT, () => console.info(`App listening on port ${PORT}`))