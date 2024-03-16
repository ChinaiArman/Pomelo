import dotenv from "dotenv"
dotenv.config()

import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';


const poolData = {    
    UserPoolId : "us-west-2_oiLAxsJnS",
    ClientId : "449e43nk3p7f9rqr9gklf5ahdj"
    }; 
const pool_region = 'us-west-2'
const userPool = new CognitoUserPool(poolData);


export let login = async function (username, password) {
    const authenticationData = {
        Username : username,
        Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
        Username : username,
        Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let response = {
                    "userID": result.idToken.payload.sub,
                    "username": result.accessToken.payload.username,
                    "code": 200,
                }
                resolve(response)
            },
            onFailure: function(err) {
                let response = {
                    "userID": null,
                    "username": null,
                    "code": 401
                }
                resolve(response)
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                cognitoUser.completeNewPasswordChallenge(password, {}, this);
            }
        });
    })
}

export let signup = async function (username, email, password) {
    var attributeList = [];
    attributeList.push(new CognitoUserAttribute(
        {
            Name: "email",
            Value: email
        }, 
        {
            Name: "email_verified",
            Value: "true"
        }
    ));
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, null, function(err, result){
            if (err) {
                let response = {
                    "code": 400,
                    "message": err.message
                }
                resolve(response)
                
            } else {
                let response = {
                    "code": 200,
                    "message": result.message
                }
                resolve(response)
            }
        });
    })
}

export let verify = async function (username, code) {
    const userData = {
        Username : username,
        Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result){
            if (err) {
                let response = {
                    "code": 400,
                    "message": err.message
                }
                resolve(response)
            } else {
                let response = {
                    "code": 200,
                    "message": result.message
                }
                resolve(response)
            }
        });
    })
}