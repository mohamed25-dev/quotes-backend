const makePatchUser = function(editUser) {
  return async function patchUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let updatedUserInfo = httpRequest.body;
      let userId = httpRequest.params.userId;

      let user = await editUser(userId, updatedUserInfo);

      return {
        headers,
        statusCode: 200,
        body: {
          user
        }
      }
    } catch (e) {
      return {
        headers,
        statusCode: 500,
        body: {
          error: e.message
        }
      }
    }
  }
}

module.exports = makePatchUser;