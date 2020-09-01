const { setErrorResponse } = require('../common/response');

function checkPermission(permission) {
  return (req, res, next) => {
    const permissions = req.permissions;
    if(permissions) {
      if (permissions.includes(permission)) {
        return next();
      }
    }
    return setErrorResponse(res, 403, 'Forbidden');
  }
}

exports.checkPermission = checkPermission;