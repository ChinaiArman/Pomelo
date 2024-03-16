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
  getTeamSpaceStyleObject,
  getSpendingCategoryStyleObject,
  getTransactionStyleObject,
  getUserStyleObject,
  createNewTeamSpace, 
  createNewSpendingCategory,
  createNewTransaction,
  addUserToTeamSpace,
  deleteTransaction,
  removeUserFromTeamSpaceByID,
  generateNewTeamSpaceJoinCode,
  deleteSpendingCategory,
  changeBudgetLimit,
  editTeamSpace,
  editSpendingCategory,
  editTransaction
} from './dynamo.js';

import {
  login,
  signup,
  verify
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

app.get("/getTeamSpaceStyleObject", async (req, res) => {
  let styleObject = await getTeamSpaceStyleObject(req.body.teamSpaceID)
  res.send(styleObject);
});

app.get("/getSpendingCategoryStyleObject", async (req, res) => {
  let styleObject = await getSpendingCategoryStyleObject(req.body.teamSpaceID, req.body.spendingCategoryID)
  res.send(styleObject);
});

app.get("/getTransactionStyleObject", async (req, res) => {
  let styleObject = await getTransactionStyleObject(req.body.teamSpaceID, req.body.transactionID)
  res.send(styleObject)
});

app.get("/getUserStyleObject", async (req, res) => {
  let styleObject = await getUserStyleObject(req.body.userID)
  res.send(styleObject)
});

// Dynamo POSTs
app.post("/createTeamSpace", async (req, res) => {
  let response = await createNewTeamSpace(req.body.teamSpaceName, req.body.teamSpaceLeaderUserID, req.body.teamSpaceLeaderUsername);
  res.send(response);
});

app.post("/createSpendingCategory", async (req, res) => {
  let response = await createNewSpendingCategory(req.body.teamSpaceID, req.body.spendingCategoryName, req.body.budgetLimit);
  res.send(response);
});

app.post("/createTransaction", async (req, res) => {
  let response = await createNewTransaction(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.userID, req.body.username, req.body.transactionName, req.body.transactionAmount);
  res.send(response);
});

app.post("/addUserToTeamSpace", async (req, res) => {
  let response = await addUserToTeamSpace(req.body.teamSpaceJoinCode, req.body.userID, req.body.username);
  res.send(response);
});

app.post("/deleteTransaction", async (req, res) => {
  let response = await deleteTransaction(req.body.teamSpaceID, req.body.transactionID);
  res.send(response);
});

app.post("/removeUserFromTeamSpaceByID", async (req, res) => {
  let response = await removeUserFromTeamSpaceByID(req.body.teamSpaceID, req.body.userID);
  res.send(response);
});

app.post("/generateNewTeamSpaceJoinCode", async (req, res) => {
  let response = await generateNewTeamSpaceJoinCode(req.body.teamSpaceID)
  res.send(response);
});

app.post("/deleteSpendingCategory", async (req, res) => {
  let response = await deleteSpendingCategory(req.body.teamSpaceID, req.body.spendingCategoryID)
  res.send(response);
});

app.post("/changeBudgetLimit", async (req, res) => {
  let response = await changeBudgetLimit(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.budgetLimit)
  res.send(response);
});

app.post("/editTeamSpace", async (req, res) => {
  let response = await editTeamSpace(req.body.teamSpaceID, req.body.newTeamSpaceName)
  res.send(response);
});

app.post("/editSpendingCategory", async (req, res) => {
  let response = await editSpendingCategory(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.newSpendingCategoryName, req.body.newSpendingCategoryBudgetLimit)
  res.send(response);
});

app.post("/editTransaction", async (req, res) => {
  let response = await editTransaction(req.body.teamSpaceID, req.body.transactionID, req.body.newTransactionName, req.body.newTransactionAmount)
  res.send(response);
});

// Cognito
app.post("/login", async (req, res) => {
  let response = await login(req.body.username, req.body.password)
  res.send(response)
});

app.post("/signup", async (req, res) => {
  let response = await signup(req.body.username, req.body.email, req.body.password)
  res.send(response)
});

app.post("/verify", async (req, res) => {
  let response = await verify(req.body.username, req.body.code)
  res.send(response)
});


app.listen(PORT, () => console.info(`App listening on port ${PORT}`))