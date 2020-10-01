const makeAuthor = function ({
  fullName,
  authorImage,
  isEnabled = true,
  createdAt = Date.now(),
  updatedAt = Date.now()
} = {}) {
  if (!fullName || fullName.length < 3) {
      throw new Error('full name must be valid');
  }

  return Object.freeze ({
      getFullName: () => fullName,
      getAuthorImage: () => authorImage,
      getIsEnabled: () => isEnabled,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
  });
}

module.exports = makeAuthor;