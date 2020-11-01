const makeEditCategory = function ( dataAccess ) {
  return async function editCategory (categoryId, updatedCategory) {

    //Check if category exist
    let category = await dataAccess.findById(categoryId);
    if (!category) {
      throw new Error('Category not found'); 
    }

    //Validate the input
    if (updatedCategory.categoryName) {
      if (updatedCategory.categoryName.length < 3) {
        throw new Error('categoryName must be valid');
      }
    }

    //Update it
    await dataAccess.update(categoryId, updatedCategory);
    return dataAccess.findById(categoryId);
  }
}

module.exports = makeEditCategory;
