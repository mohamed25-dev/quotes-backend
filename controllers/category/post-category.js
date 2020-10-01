const makePostCategory = function(addCategory) {
  return async function postCategory(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let categoryInfo = httpRequest.body.category;
      console.log('info ', categoryInfo)
      let category = await addCategory(categoryInfo);

      return {
        headers,
        statusCode: 201,
        body: category
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

module.exports = makePostCategory;