const makeUpdatePassword = function (updatePass) {
  return async function updatePassword(httpRequest) {
    
    let userId = httpRequest.params.userId;
    let password = httpRequest.body.password;

    await updatePass(userId, password);

    return {
      statusCode: 200,
      body: {
        
      }
    }
  }
}

module.exports = makeUpdatePassword;