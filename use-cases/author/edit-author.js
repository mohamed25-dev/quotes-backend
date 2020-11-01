const makeEditAuthor = function ( DataAccess, AppExceptions ) {
  return async function editAuthor (authorId, updatedAuthor) {

    let author = await DataAccess.findById(authorId);
    if (!author) {
      throw new AppExceptions.NotFoundException('Author not found'); 
    }

    if (updatedAuthor.fullName) {
      if (updatedAuthor.fullName.length < 3) {
        throw new AppExceptions.InvalidInputException('fullName should be more than three characters');
      }

      let result = await DataAccess.findByFullNameExceptId(authorId, updatedAuthor.fullName);
      if (result) {
        throw new AppExceptions.InvalidInputException('Author with the same name already exist');
      }
    }

    //Update it
    await DataAccess.update(authorId, updatedAuthor);

    return DataAccess.findById(authorId);
  }
}

module.exports = makeEditAuthor;
