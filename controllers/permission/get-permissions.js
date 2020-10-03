const makeGetPermissions = function (listPermissions) {
  return async function getPermissions(httpRequest) {
    let permissionId = httpRequest.params.permissionId;
    let permissions = await listPermissions(permissionId);

    return {
      headers,
      statusCode: 200,
      body: { permissions }
    }
  }
}

module.exports = makeGetPermissions;