const makeAuthor = require('../../entities/author/index');

const makeAddAuthor = function ( DataAccess, AppExceptions ) {
  return async function addAuthor (authorInfo) {
    let author = makeAuthor(authorInfo);
    
    let result = await DataAccess.findByFullName(author.getFullName());
    if (result) {
      throw new AppExceptions.InvalidInputException('Author with the same name already exist');
    }

    return DataAccess.insert({
      fullName: author.getFullName(),
      authorImage: author.getAuthorImage(),
      isEnabled: author.getIsEnabled(),
      createdAt: author.getCreatedAt(),
      updatedAt: author.getUpdatedAt()
    });
  }
}

module.exports = makeAddAuthor;
