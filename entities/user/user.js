const buildMakeUser = function (hash) { 
return async function makeUser ({
    username,
    phoneNumber,
    password,
    type,
    fullName,
    isEnabled = true,
    createdAt = Date.now(),
    updatedAt = Date.now()
  } = {}) {
    if (!fullName || fullName.length < 3) {
        throw new Error('full name must be valid');
    }

    //TODO: More validation
    if (password) {
      password = await hash(password);
    }
  
    return Object.freeze ({
        getUsername: () => username,
        getPhoneNumber: () => phoneNumber,
        getPassword: () => password,
        getType: () => type,
        getFullName: () => fullName,
        getIsEnabled: () => isEnabled,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt
    });
  }
}
  module.exports = buildMakeUser;