const makeDeleteUser = function(removeUser) {
  return async function deleteUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let userId = httpRequest.params.userId;
      await removeUser(userId);
      return {
        headers,
        statusCode: 200,
        body: {}
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

module.exports = makeDeleteUser;