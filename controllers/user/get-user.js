const makeGetUser = function (getUserUseCase) {
  return async function getUser(httpRequest) {
    let userId = httpRequest.params.userId;
    let users = await getUserUseCase(userId);

    return {
      statusCode: 200,
      body: users
    }
  }
}

module.exports = makeGetUser;