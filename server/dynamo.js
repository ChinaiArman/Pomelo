import dotenv from "dotenv"
dotenv.config()

import crypto from "crypto"
import pkg from 'aws-sdk'
const { config, DynamoDB } = pkg


let awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY_ID
}
config.update(awsConfig)
const TABLENAME = "TeamSpaces"
let dynamoDB = new DynamoDB.DocumentClient();


export let getAllTeamSpaces = async function () {
    let params = {
        TableName: TABLENAME
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Items)
            }
        })
    })
}

export let getAllTransactions = async function(teamSpaceID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let transactions = []
                for (let i = 0; i < data.Items[0].spendingCategories.length; i++) {
                    transactions = transactions.concat(data.Items[0].spendingCategories[i].transactions)
                }
                resolve(transactions)
            }
        })
    })
}

export let getTransactionsBySpendingCategory = async function(teamSpaceID, categoryID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let transactions = []
                for (let i = 0; i < data.Items[0].spendingCategories.length; i++) {
                    if (data.Items[0].spendingCategories[i].categoryID === categoryID) {
                        transactions = data.Items[0].spendingCategories[i].transactions
                    }
                }
                resolve(transactions)
            }
        })
    })
}

export let getAllSpendingCategories = async function(teamSpaceID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Items[0].spendingCategories)
            }
        })
    })
}

export let getSpendingCategoryByID = async function(teamSpaceID, spendingCategoryID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let spendingCategories = data.Items[0].spendingCategories
                for (let i = 0; i < spendingCategories.length; i++) {
                    if (spendingCategories[i].categoryID === spendingCategoryID) {
                        resolve(spendingCategories[i])
                    }
                }
            }
        })
    })
}

export let getTeamSpaceUsers = async function(teamSpaceID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Items[0].users)
            }
        })
    })
}

export let getTeamSpaceLeader = async function(teamSpaceID) {
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let users = data.Items[0].users
                for (let i = 0; i < users.length; i++) {
                    if (users[i].isTeamLeader) {
                        resolve(users[i])
                    }
                }
            }
        })
    })
}

export let getTeamSpaceByUserID = async function(userID) {
    let params = {
        TableName: TABLENAME
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let teamSpaces = data.Items
                for (let i = 0; i < teamSpaces.length; i++) {
                    let users = teamSpaces[i].users
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userID === userID) {
                            resolve(teamSpaces[i])
                        }
                    }
                }
            }
        })
    })
}

export let getTransactionsByUserID = async function(userID) {
    let params = {
        TableName: TABLENAME
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let teamSpaces = data.Items
                let transactions = []
                for (let i = 0; i < teamSpaces.length; i++) {
                    let users = teamSpaces[i].users
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userID === userID) {
                            for (let k = 0; k < teamSpaces[i].spendingCategories.length; k++) {
                                transactions = transactions.concat(teamSpaces[i].spendingCategories[k].transactions)
                            }
                        }
                    }
                }
                resolve(transactions)
            }
        })
    })
}

export let createNewTeamSpace = async function (teamSpaceName, teamSpaceLeaderUserID, teamSpaceUserName) {
    let input = {
        "teamSpaceID": "T" + crypto.randomBytes(4).toString('hex'),
        "teamSpaceName": teamSpaceName,
        "teamSpaceLeaderUserID": teamSpaceLeaderUserID,
        "teamSpaceJoinCode": crypto.randomBytes(5).toString('hex'),
        "users": [
            {
                "userID": teamSpaceLeaderUserID,
                "userName": teamSpaceUserName,
                "isTeamLeader": true
            }
        ],
        "spendingCategories": []
    }
    let params = {
        TableName: TABLENAME,
        Item: input
    }
    return new Promise((resolve, reject) => {
        dynamoDB.put(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(input)
            }
        })
    })
}

export let createNewSpendingCategory = async function (teamSpaceID, categoryName, budgetLimit) {
    let input = {
        "categoryID": "C" + crypto.randomBytes(4).toString('hex'),
        "categoryName": categoryName,
        "amountUsed": 0,
        "budgetLimit": budgetLimit,
        "transactions": []
    }
    let params = {
        TableName: TABLENAME,
        Key: {
            "teamSpaceID": teamSpaceID
        },
        UpdateExpression: "SET spendingCategories = list_append(spendingCategories, :category)",
        ExpressionAttributeValues: {
            ":category": [input]
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.update(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(input)
            }
        })
    })
}