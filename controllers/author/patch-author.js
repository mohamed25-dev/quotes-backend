const makePatchAuthor = function(editAuthor) {
  return async function patchAuthor(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let updatedAuthorInfo = httpRequest.body;
      let authorId = httpRequest.params.authorId;

      let author = await editAuthor(authorId, updatedAuthorInfo);

      return {
        headers,
        statusCode: 200,
        body: {
          author
        }
      }
    } catch (e) {
      return {
        headers,
        statusCode: 500,
        body: {
          error: e.message
        }
      }
    }
  }
}

module.exports = makePatchAuthor;