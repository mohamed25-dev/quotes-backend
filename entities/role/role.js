const makeRole = function ({
    roleName,
    createdAt = Date.now(),
    updatedAt = Date.now()
} = {}) {
  
    return Object.freeze ({
        getRoleName: () => roleName,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt
    });
}

module.exports = makeRole;