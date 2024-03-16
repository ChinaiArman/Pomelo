import dotenv from "dotenv"
dotenv.config()

import { 
  getAllTeamSpaces,
  getAllTransactions,
  getTransactionsBySpendingCategory,
  getAllSpendingCategories,
  getSpendingCategoryByID,
  getAllTeamSpaceUsers,
  getTeamSpaceLeader,
  getTeamSpaceByUserID,
  getTransactionsByUserID,
  getJoinCode,
  getTeamSpaceByID,
  getUserByID,
  createNewTeamSpace, 
  createNewSpendingCategory,
  createNewTransaction,
  addUserToTeamSpace,
  deleteTransaction,
  removeUserFromTeamSpaceByID,
  generateNewTeamSpaceJoinCode,
  deleteCategory,
  changeBudgetLimit
} from './dynamo.js';

import {
  login,
} from './cognito.js'

import express from "express"
const app = express();

import bodyParser from "body-parser"
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const PORT = 5000;


// Dynamo GETs
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

app.get("/getAllTeamSpaceUsers" , async (req, res) => {
  let teamSpaceUsers = await getAllTeamSpaceUsers(req.body.teamSpaceID)
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

app.get("/getJoinCode", async (req, res) => {
  let joinCode = await getJoinCode(req.body.teamSpaceID)
  res.send(joinCode);
});

app.get("/getTeamSpaceByID", async (req, res) => {
  let teamSpace = await getTeamSpaceByID(req.body.teamSpaceID)
  res.send(teamSpace);
});

app.get("/getUserByID", async (req, res) => {
  let user = await getUserByID(req.body.userID)
  res.send(user);
});

// Dynamo POSTs
app.post("/createTeamSpace", (req, res) => {
  createNewTeamSpace(req.body.teamSpaceName, req.body.teamSpaceLeaderUserID, req.body.teamSpaceUserName);
  res.send("Success");
});

app.post("/createSpendingCategory", (req, res) => {
  createNewSpendingCategory(req.body.teamSpaceID, req.body.spendingCategoryName, req.body.budgetLimit);
  res.send("Success");
});

app.post("/createTransaction", (req, res) => {
  createNewTransaction(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.userID, req.body.transactionName, req.body.transactionAmount);
  res.send("Success");
});

app.post("/addUserToTeamSpace", (req, res) => {
  addUserToTeamSpace(req.body.teamSpaceJoinCode, req.body.userID, req.body.userName);
  res.send("Success");
});

app.post("/deleteTransaction", (req, res) => {
  deleteTransaction(req.body.teamSpaceID, req.body.transactionID);
  res.send("Success");
});

app.post("/removeUserFromTeamSpaceByID", (req, res) => {
  removeUserFromTeamSpaceByID(req.body.teamSpaceID, req.body.userID);
  res.send("Success");
});

app.post("/generateNewTeamSpaceJoinCode", async (req, res) => {
  generateNewTeamSpaceJoinCode(req.body.teamSpaceID)
  res.send("Success");
});

app.post("/deleteCategory", async (req, res) => {
  deleteCategory(req.body.teamSpaceID, req.body.spendingCategoryID)
  res.send("Success");
});

app.post("/changeBudgetLimit", async (req, res) => {
  changeBudgetLimit(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.budgetLimit)
  res.send("Success");
});

// Cognito
app.post("/login", async (req, res) => {
  let result = await login(req.body.username, req.body.password)
  res.send(result)
});


app.listen(PORT, () => console.info(`App listening on port ${PORT}`))