const makeGetPermissions = function(listPermissions) {
  return async function getPermissions(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let permissionId = httpRequest.params.permissionId;
      let permissions = await listPermissions(permissionId);

      return {
        headers,
        statusCode: 200,
        body: permissions
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

module.exports = makeGetPermissions;