import dotenv from "dotenv"
dotenv.config()

import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import crypto from "crypto"


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
                    "id": result.idToken.payload.sub,
                    "username": result.accessToken.payload.username,
                    "code": 200,
                }
                resolve(response)
            },
            onFailure: function(err) {
                let response = {
                    "id": null,
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
