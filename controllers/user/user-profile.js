const makeGetUserProfile = function (getUserUsecase) {
  return async function getUserProfile(httpRequest) {
    let userId = httpRequest.user.userId;
    console.log(httpRequest.user, 'req user >>>>>>>>')
    let users = await getUserUsecase(userId);

    return {
      statusCode: 200,
      body: users
    }
  }
}

module.exports = makeGetUserProfile;