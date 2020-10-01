const makeEditAuthor = function ( dataAccess ) {
  return async function editAuthor (authorId, updatedAuthor) {

    //Check if author exist
    let author = await dataAccess.findById(authorId);
    if (!author) {
      throw new Error('Author not found'); 
    }

    //Validate the input
    if (updatedAuthor.fullName) {
      if (updatedAuthor.fullName.length < 3) {
        throw new Error('fullName must be valid');
      }
    }

    //Update it
    await dataAccess.update(authorId, updatedAuthor);
    return dataAccess.findById(authorId);
  }
}

module.exports = makeEditAuthor;
