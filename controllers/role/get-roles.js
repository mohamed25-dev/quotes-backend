const makeGetRoles = function(listRoles) {
  return async function getRoles(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let authorId = httpRequest.params.authorId;
      let roles = await listRoles(authorId);

      return {
        headers,
        statusCode: 200,
        body: roles
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

module.exports = makeGetRoles;