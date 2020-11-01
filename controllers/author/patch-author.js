const makePatchAuthor = function (editAuthor) {
  return async function patchAuthor(httpRequest) {

    let updatedAuthorInfo = httpRequest.body;
    let authorId = httpRequest.params.authorId;

    let author = await editAuthor(authorId, updatedAuthorInfo);

    return {
      code: 200,
      body: { author }
    }
  }
}

module.exports = makePatchAuthor;