const makeGetAuthors = function(listAuthors) {
  return async function getComments(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const authors = await listAuthors();

      return {
        headers,
        statusCode: 200,
        body: authors
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

module.exports = makeGetAuthors;