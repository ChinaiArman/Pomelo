import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "", // ! info to be included from AWS
  ClientId: "", // ! info
  region: "",
};
const userPool = new CognitoUserPool(poolData);

function authenticateUserLogin(username, password) {
  const authenticateData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticateData);

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();
        resolve(accessToken);
        // TODO: redirect to logged-in pages
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
}
