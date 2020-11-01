const makeRemoveCategory = function ( dataAccess ) {
  return async function removeCategory (categoryId) {
    let category = await dataAccess.findById(categoryId);
    if (!category) {
      throw new Error('Category not found'); 
    }
    
    return dataAccess.remove(categoryId);
  }
}

module.exports = makeRemoveCategory;
