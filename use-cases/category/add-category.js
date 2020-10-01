const makeCategory = require('../../entities/category/index');
const makeAddCategory = function ( categoriesDb ) {
  return async function addCategory (categoryInfo) {
    let category = makeCategory(categoryInfo);
    
    return categoriesDb.insert({
      categoryName: category.getCategoryName(),
      categoryImage: category.getCategoryImage(),
      isEnabled: category.getIsEnabled(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt()
    });
  }
}

module.exports = makeAddCategory;
