const makeListCategories = function ( makeRemoveCategory ) {
  return async function lisCategories () {
    return makeRemoveCategory.findAll();
  }
}

module.exports = makeListCategories;
