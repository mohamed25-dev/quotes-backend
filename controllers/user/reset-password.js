const makeResetPassword = function (resetPass) {
  return async function resetPassword(httpRequest) {
    
    let userId = httpRequest.params.userId;

    await resetPass(userId);

    return {
      statusCode: 200,
      body: {
        
      }
    }
  }
}

module.exports = makeResetPassword;