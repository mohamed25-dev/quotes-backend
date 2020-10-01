const makeUser = function ({
    username,
    phoneNumber,
    password,
    type,
    fullName,
    authorImage,
    isEnabled = true,
    createdAt = Date.now(),
    updatedAt = Date.now()
  } = {}) {
    if (!fullName || fullName.length < 3) {
        throw new Error('full name must be valid');
    }

    //TODO: More validation
    //TODO: Hash the password
  
    return Object.freeze ({
        getUsername: () => username,
        getPhoneNumber: () => phoneNumber,
        getPassword: () => password,
        getType: () => type,
        getFullName: () => fullName,
        getAuthorImage: () => authorImage,
        getIsEnabled: () => isEnabled,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt
    });
  }
  
  module.exports = makeUser;