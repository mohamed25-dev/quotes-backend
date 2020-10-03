const makeRemoveAuthor = function ( DataAccess, AppExceptions ) {
  return async function removeAuthor (authorId) {
    let author = await DataAccess.findById(authorId);
    if (!author) {
      throw new AppExceptions.NotFoundException('Author not found'); 
    }
    
    return DataAccess.remove(authorId);
  }
}

module.exports = makeRemoveAuthor;
