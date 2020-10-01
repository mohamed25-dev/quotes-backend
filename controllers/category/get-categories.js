const makeGetCategories = function(listCategories) {
  return async function getCategories(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const categories = await listCategories();
      return {
        headers,
        statusCode: 200,
        body: categories
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

module.exports = makeGetCategories;