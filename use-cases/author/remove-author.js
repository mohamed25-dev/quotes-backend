const makeRemoveAuthor = function ( dataAccess ) {
  return async function removeAuthor (authorId) {
    let author = await dataAccess.findById(authorId);
    if (!author) {
      throw new Error('Author not found'); 
    }
    
    return dataAccess.remove(authorId);
  }
}

module.exports = makeRemoveAuthor;
