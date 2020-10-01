const makeCategoriesDb = function (CateogryDb) {
  async function findAll(options) {
    return CateogryDb.findAll(options);
  }
  
  async function insert(quote) {
    return CateogryDb.create(quote);
  }

  async function update(categoryId, updatedCategory) {
    return CateogryDb.update(updatedCategory, {
      where: {
        categoryId
      }
    });
  }

  async function remove(categoryId) {
    return CateogryDb.destroy({
      where: {
        categoryId
      }
    });
  }

  async function findById(categoryId) {
    return CateogryDb.findByPk(categoryId);
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
    remove
  });
}

module.exports = makeCategoriesDb;
