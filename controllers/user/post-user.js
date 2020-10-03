const makePostUser = function (addUser) {
  return async function postUser(httpRequest) {
    let userInfo = httpRequest.body;
    const user = await addUser(userInfo);

    return {
      statusCode: 201,
      body: user
    }
  }
}

module.exports = makePostUser;