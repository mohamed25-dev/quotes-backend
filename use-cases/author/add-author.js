const makeAuthor = require('../../entities/author/index');

const makeAddAuthor = function ( DataAccess, AppExceptions ) {
  return async function addAuthor (authorInfo) {

    let user = await DataAccess.findByFullName(author.getFullName());
    if (user) {
      throw new AppExceptions.InvalidInputException('User with the same name already exist');
    }

    user = makeAuthor(authorInfo);

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
