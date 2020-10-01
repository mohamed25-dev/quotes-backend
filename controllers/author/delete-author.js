const makeDeleteAuthor = function(removeAuthor) {
  return async function deleteAuthor(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let authorId = httpRequest.params.authorId;
      await removeAuthor(authorId);
      return {
        headers,
        statusCode: 200,
        body: {}
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

module.exports = makeDeleteAuthor;