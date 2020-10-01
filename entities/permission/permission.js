const makePermission = function ({
    permissionName,
    createdAt = Date.now(),
    updatedAt = Date.now()
} = {}) {
  
    return Object.freeze ({
        getPermissionName: () => permissionName,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt
    });
}

module.exports = makePermission;