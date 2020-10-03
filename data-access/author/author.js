const authorsDb = require(".");

const makeAuthorsDb = function (AuthorDb, Op) {
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

  async function findByFullName(fullName) {
    return AuthorDb.findOne({
      where: {
        fullName
      }
    });
  }

  async function findByFullNameExceptId(fullName, authorId) {
    return AuthorDb.findOne({
      where: {
        fullName,
        authorId: {
          [Op.ne]: authorId
        }
      }
    });
  }
  
  return Object.freeze({
    findAll,
    insert,
    update,
    remove,
    findById,
    findByAuthorName: findByFullName,
    findByFullNameExceptId
  });
}

module.exports = makeAuthorsDb;
