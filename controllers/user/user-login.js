const makeUserLogin = function (login) {
  return async function userLogin(httpRequest) {
    let username = httpRequest.body.username;
    let password = httpRequest.body.password;

    let result = await login(username, password);

    return {
      statusCode: 200,
      body: result
    }

  }
}

module.exports = makeUserLogin;