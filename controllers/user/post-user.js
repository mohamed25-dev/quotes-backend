const makePostUser = function(addUser) {
  return async function postUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let userInfo = httpRequest.body.user;
      const user = await addUser(userInfo);

      return {
        headers,
        statusCode: 201,
        body: user
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

module.exports = makePostUser;