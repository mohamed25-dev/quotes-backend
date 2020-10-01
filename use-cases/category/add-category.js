const makeCategory = require('../../entities/category/index');
const makeAddCategory = function ( dataAccess ) {
  return async function addCategory (categoryInfo) {
    let category = makeCategory(categoryInfo);
    
    return dataAccess.insert({
      categoryName: category.getCategoryName(),
      categoryImage: category.getCategoryImage(),
      isEnabled: category.getIsEnabled(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt()
    });
  }
}

module.exports = makeAddCategory;
