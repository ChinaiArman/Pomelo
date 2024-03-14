require('dotenv').config()

var crypto = require("crypto");
const pkg = require('aws-sdk')
const { config, DynamoDB } = pkg


let awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": "AKIAYS2NQCN5SZ6GXDHH",
    "secretAccessKey": "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"
}
config.update(awsConfig)
const TABLENAME = "TeamSpaces"
let dynamoDB = new DynamoDB.DocumentClient();


let createNewTeamSpace = async function (teamSpaceName, teamSpaceLeaderUserID, teamSpaceUserName) {
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

module.exports = { createNewTeamSpace } 