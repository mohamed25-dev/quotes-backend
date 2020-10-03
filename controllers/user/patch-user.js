const makePatchUser = function (editUser) {
  return async function patchUser(httpRequest) {
    
    let updatedUserInfo = httpRequest.body;
    let userId = httpRequest.params.userId;

    let user = await editUser(userId, updatedUserInfo);

    return {
      statusCode: 200,
      body: {
        user
      }
    }
  }
}

module.exports = makePatchUser;