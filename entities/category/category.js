const makeCategory = function ({
  categoryName,
  categoryImage,
  isEnabled = true,
  createdAt = Date.now(),
  updatedAt = Date.now()
} = {}) {
  if (!categoryName || categoryName.length < 3) {
      throw new Error('categoryName must be valid');
  }

  return Object.freeze ({
      getCategoryName: () => categoryName,
      getCategoryImage: () => categoryImage,
      getIsEnabled: () => isEnabled,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
  });
}

module.exports = makeCategory;