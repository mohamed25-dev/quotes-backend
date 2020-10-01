const makeAuthorsDb = function (AuthorDb) {
  async function findAll(options) {
    return AuthorDb.findAll(options);
  }
  
  async function insert(author) {
    return AuthorDb.create(author);
  }

  async function update(authorId, updatedAuthor) {
    return AuthorDb.update(updatedAuthor, {
      where: {
        authorId
      }
    });
  }

  async function remove(authorId) {
    return AuthorDb.destroy({
      where: {
        authorId
      }
    });
  }

  async function findById(authorId) {
    return AuthorDb.findByPk(authorId);
  }
  
  return Object.freeze({
    findAll,
    insert,
    update,
    remove,
    findById
  });
}

module.exports = makeAuthorsDb;
