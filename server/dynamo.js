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

export let getTransactionsBySpendingCategory = async function(teamSpaceID, spendingCategoryID) {
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
                    if (data.Items[0].spendingCategories[i].spendingCategoryID === spendingCategoryID) {
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
                    if (spendingCategories[i].spendingCategoryID === spendingCategoryID) {
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
                resolve(data.Items[0].userList)
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
                let userList = data.Items[0].userList
                for (let i = 0; i < userList.length; i++) {
                    if (userList[i].isTeamLeader) {
                        resolve(userList[i])
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
                    let userList = teamSpaces[i].userList
                    for (let j = 0; j < userList.length; j++) {
                        if (userList[j].userID === userID) {
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
                    let userList = teamSpaces[i].userList
                    for (let j = 0; j < userList.length; j++) {
                        if (userList[j].userID === userID) {
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
        "userList": [
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

export let createNewSpendingCategory = async function (teamSpaceID, spendingCategoryName, budgetLimit) {
    let input = {
        "spendingCategoryID": "C" + crypto.randomBytes(4).toString('hex'),
        "spendingCategoryName": spendingCategoryName,
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

export let createNewTransaction = async function (teamSpaceID, spendingCategoryID, userID, transactionName, transactionAmount) {
    let paramsOne = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    
    let input = {
        "transactionDate": new Date().toDateString(),
        "transactionName": transactionName,
        "userID": userID,
        "spendingCategoryID": spendingCategoryID,
        "transactionID": "T" + crypto.randomBytes(4).toString('hex'),
        "transactionAmount": transactionAmount,
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(paramsOne, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let spendingCategories = data.Items[0].spendingCategories
                for (let i = 0; i < spendingCategories.length; i++) {
                    if (spendingCategories[i].spendingCategoryID === spendingCategoryID) {
                        let paramsTwo = {
                            TableName: TABLENAME,
                            Key: {
                                "teamSpaceID": teamSpaceID
                            },
                            UpdateExpression: "SET spendingCategories[" + i + "].transactions = list_append(spendingCategories[" + i + "].transactions, :transaction)",
                            ExpressionAttributeValues: {
                                ":transaction": [input]
                            }
                        }
                        dynamoDB.update(paramsTwo, (err, data) => {
                            if (err) {
                                reject(err)
                            } else {
                                let paramsThree = {
                                    TableName: TABLENAME,
                                    Key: {
                                        "teamSpaceID": teamSpaceID
                                    },
                                    UpdateExpression: "SET spendingCategories[" + i + "].amountUsed = spendingCategories[" + i + "].amountUsed + :transactionAmount",
                                    ExpressionAttributeValues: {
                                        ":transactionAmount": transactionAmount
                                    }
                                }
                                console.log("here")
                                dynamoDB.update(paramsThree, (err, data) => {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        resolve(input)
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    })
}

export let addUserToTeamSpace = async function (teamSpaceJoinCode, userID, userName) {
    let input = {
        "userID": userID,
        "userName": userName,
        "isTeamLeader": false
    }
    let params = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceJoinCode = :teamSpaceJoinCode",
        ExpressionAttributeValues: {
            ":teamSpaceJoinCode": teamSpaceJoinCode
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let paramsTwo = {
                    TableName: TABLENAME,
                    Key: {
                        "teamSpaceID": data.Items[0].teamSpaceID
                    },
                    UpdateExpression: "SET userList = list_append(userList, :userList)",
                    ExpressionAttributeValues: {
                        ":userList": [input]
                    }
                }
                dynamoDB.update(paramsTwo, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(input)
                    }
                })
            }
        })
    })
}

export let getJoinCode = async function (teamSpaceID) {
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
                resolve(data.Items[0].teamSpaceJoinCode)
            }
        })
    })
}

export let getTeamSpaceByID = async function (teamSpaceID) {
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
                resolve(data.Items[0])
            }
        })
    })
}

export let deleteTransaction = async function (teamSpaceID, transactionID) {
    let paramsOne = {
        TableName: TABLENAME,
        FilterExpression: "teamSpaceID = :teamSpaceID",
        ExpressionAttributeValues: {
            ":teamSpaceID": teamSpaceID
        }
    }
    return new Promise((resolve, reject) => {
        dynamoDB.scan(paramsOne, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let spendingCategories = data.Items[0].spendingCategories
                for (let i = 0; i < spendingCategories.length; i++) {
                    let transactions = spendingCategories[i].transactions
                    for (let j = 0; j < transactions.length; j++) {
                        if (transactions[j].transactionID === transactionID) {
                            let paramsTwo = {
                                TableName: TABLENAME,
                                Key: {
                                    "teamSpaceID": teamSpaceID
                                },
                                UpdateExpression: "REMOVE spendingCategories[" + i + "].transactions[" + j + "]"
                            }
                            dynamoDB.update(paramsTwo, (err, data) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    let paramsThree = {
                                        TableName: TABLENAME,
                                        Key: {
                                            "teamSpaceID": teamSpaceID
                                        },
                                        UpdateExpression: "SET spendingCategories[" + i + "].amountUsed = spendingCategories[" + i + "].amountUsed - :transactionAmount",
                                        ExpressionAttributeValues: {
                                            ":transactionAmount": transactions[j].transactionAmount
                                        }
                                    }
                                    dynamoDB.update(paramsThree, (err, data) => {
                                        if (err) {
                                            reject(err)
                                        } else {
                                            resolve(transactions[j])
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        })
    })
}