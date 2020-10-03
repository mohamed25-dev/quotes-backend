const makePostUser = function (addUser) {
  return async function postUser(httpRequest) {
    let userInfo = httpRequest.body.user;
    const user = await addUser(userInfo);

    return {
      headers,
      statusCode: 201,
      body: user
    }
  }
}

module.exports = makePostUser;