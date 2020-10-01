const makeGetUsers = function(listUsers) {
  return async function getUsers(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let userId = httpRequest.params.userId;
      let users = await listUsers(userId);

      return {
        headers,
        statusCode: 200,
        body: users
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

module.exports = makeGetUsers;