const buildMakeAuthor = (AppExceptions) => {
return function makeAuthor ({
  fullName,
  authorImage,
  isEnabled = true,
  createdAt = Date.now(),
  updatedAt = Date.now()
} = {}) {
  if (!fullName || fullName.length < 3) {
    throw new AppExceptions.InvalidInputException('fullName should be more than three characters');
  }

  if (!authorImage) {
    throw new AppExceptions.InvalidInputException('authorImage is required');
  }
  
  return Object.freeze({
    getFullName: () => fullName,
    getAuthorImage: () => authorImage,
    getIsEnabled: () => isEnabled,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt
  });
}
}

module.exports = buildMakeAuthor;