const makeGetRoles = function (listRoles) {
  return async function getRoles(httpRequest) {
    let authorId = httpRequest.params.authorId;
    let roles = await listRoles(authorId);

    return {
      statusCode: 200,
      body: { roles }
    }
  }
}

module.exports = makeGetRoles;