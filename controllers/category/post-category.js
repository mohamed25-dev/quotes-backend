const makePostCategory = function (addCategory) {
  return async function postCategory(httpRequest) {

    let categoryInfo = httpRequest.body.category;
    let category = await addCategory(categoryInfo);

    return {
      headers,
      statusCode: 201,
      body: { category }
    }

  }
}

module.exports = makePostCategory;