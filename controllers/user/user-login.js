const makeUserLogin = function(login) {
  return async function userLogin(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let username = httpRequest.body.username;
      let password = httpRequest.body.password;

      let result = await login(username, password);

      return {
        headers,
        statusCode: 200,
        body: result
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

module.exports = makeUserLogin;