const makeListCategories = function ( categoriesDb ) {
  return async function lisCategories () {
    return categoriesDb.findAll();
  }
}

module.exports = makeListCategories;
