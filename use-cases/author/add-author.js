const makeAuthor = require('../../entities/author/index');
const makeAddAuthor = function ( authorsDb ) {
  return async function addAuthor (authorInfo) {
    let author = makeAuthor(authorInfo);
    
    return authorsDb.insert({
      fullName: author.getFullName(),
      image: author.getAuthorImage(),
      isEnabled: author.getIsEnabled(),
      createdAt: author.getCreatedAt(),
      updatedAt: author.getUpdatedAt()
    });
  }
}

module.exports = makeAddAuthor;
