const makeGetCategories = function (listCategories) {
  return async function getCategories(httpRequest) {

    const categories = await listCategories();
    return {
      headers,
      statusCode: 200,
      body: categories
    }
  }
}

module.exports = makeGetCategories;