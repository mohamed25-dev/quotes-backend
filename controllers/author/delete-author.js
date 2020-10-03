const makeDeleteAuthor = function (removeAuthor) {
  return async function deleteAuthor(httpRequest) {

    let authorId = httpRequest.params.authorId;
    await removeAuthor(authorId);
    return {
      code: 200,
      body: {}
    }
  }
}

module.exports = makeDeleteAuthor;