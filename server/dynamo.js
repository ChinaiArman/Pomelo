import dotenv from "dotenv"

import crypto from "crypto"
import pkg from 'aws-sdk'
const { config, DynamoDB } = pkg


let awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": "",
    "secretAccessKey": ""
}
config.update(awsConfig)
const TABLENAME = "TeamSpaces"
let dynamoDB = new DynamoDB.DocumentClient();


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
