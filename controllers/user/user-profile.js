const makeGetUserProfile = function (listUsers) {
  return async function getUserProfile(httpRequest) {
    let userId = httpRequest.user.userId;
    let users = await listUsers(userId);

    return {
      statusCode: 200,
      body: users
    }
  }
}

module.exports = makeGetUserProfile;