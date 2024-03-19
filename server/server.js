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
  getTeamSpaceTotalBudget,
  getTeamSpaceTotalAmountUsed,
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

import cors from 'cors'
app.use(cors())

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
  let transactions = await getAllTransactions(req.query.teamSpaceID)
  res.send(transactions);
});

app.get("/getTransactionsBySpendingCategory", async (req, res) => {
  let transactions = await getTransactionsBySpendingCategory(req.query.teamSpaceID, req.query.spendingCategoryID)
  res.send(transactions);
});

app.get("/getAllSpendingCategories", async (req, res) => {
  let spendingCategories = await getAllSpendingCategories(req.query.teamSpaceID)
  res.send(spendingCategories);
});

app.get("/getSpendingCategoryByID", async (req, res) => {
  let spendingCategory = await getSpendingCategoryByID(req.query.teamSpaceID, req.query.spendingCategoryID)
  res.send(spendingCategory);
});

app.get("/getAllTeamSpaceUsers", async (req, res) => {
  let teamSpaceUsers = await getAllTeamSpaceUsers(req.query.teamSpaceID)
  res.send(teamSpaceUsers);
});

app.get("/getTeamSpaceLeader", async (req, res) => {
  let teamSpaceLeader = await getTeamSpaceLeader(req.query.teamSpaceID)
  res.send(teamSpaceLeader);
});

app.get("/getTeamSpaceByUserID", async (req, res) => {
  let teamSpace = await getTeamSpaceByUserID(req.query.userID)
  res.send(teamSpace);
});

app.get("/getTransactionsByUserID", async (req, res) => {
  let transactions = await getTransactionsByUserID(req.query.userID)
  res.send(transactions);
});

app.get("/getJoinCode", async (req, res) => {
  let joinCode = await getJoinCode(req.query.teamSpaceID)
  res.send(joinCode);
});

app.get("/getTeamSpaceByID", async (req, res) => {
  let teamSpace = await getTeamSpaceByID(req.query.teamSpaceID)
  res.send(teamSpace);
});

app.get("/getUserByID", async (req, res) => {
  let user = await getUserByID(req.query.userID)
  res.send(user);
});

app.get("/getTeamSpaceStyleObject", async (req, res) => {
  let styleObject = await getTeamSpaceStyleObject(req.query.teamSpaceID)
  res.send(styleObject);
});

app.get("/getSpendingCategoryStyleObject", async (req, res) => {
  let styleObject = await getSpendingCategoryStyleObject(req.query.teamSpaceID, req.query.spendingCategoryID)
  res.send(styleObject);
});

app.get("/getTransactionStyleObject", async (req, res) => {
  let styleObject = await getTransactionStyleObject(req.query.teamSpaceID, req.query.transactionID)
  res.send(styleObject)
});

app.get("/getUserStyleObject", async (req, res) => {
  let styleObject = await getUserStyleObject(req.query.userID)
  res.send(styleObject)
});

app.get("/getTeamSpaceTotalBudget", async (req, res) => {
  let totalBudget = await getTeamSpaceTotalBudget(req.query.teamSpaceID)
  res.send(totalBudget)
});

app.get("/getTeamSpaceTotalAmountUsed", async (req, res) => {
  let totalAmountUsed = await getTeamSpaceTotalAmountUsed(req.query.teamSpaceID)
  res.send(totalAmountUsed)
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
  let response = await createNewTransaction(req.body.teamSpaceID, req.body.spendingCategoryID, req.body.spendingCategoryName, req.body.userID, req.body.username, req.body.transactionName, req.body.transactionAmount);
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
  let response = await editTeamSpace(req.body.teamSpaceID, req.body.newTeamSpaceName, req.body.newTotalBudget)
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
  console.log(response)
  res.send(response)
});

app.post("/verify", async (req, res) => {
  let response = await verify(req.body.username, req.body.verificationCode)
  res.send(response)
});


app.listen(PORT, () => console.info(`App listening on port ${PORT}`))