const makeDeleteCategory = function(removeCategory) {
  return async function deleteCategory(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      await removeCategory();
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

module.exports = makeDeleteCategory;