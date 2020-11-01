const makeDeleteUser = function (removeUser) {
  return async function deleteUser(httpRequest) {
    let userId = httpRequest.params.userId;
    await removeUser(userId);
    
    return {
      statusCode: 200,
      body: {}
    }
  }
}

module.exports = makeDeleteUser;