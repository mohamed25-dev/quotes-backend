const makePostAuthor = function(addAuthor) {
  return async function postAuthor(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let authorInfo = httpRequest.body;
      let author = await addAuthor(authorInfo);

      return {
        headers,
        statusCode: 201,
        body: author
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

module.exports = makePostAuthor;