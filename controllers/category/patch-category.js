const makePatchCategory = function (editCategory) {
  return async function patchCategory(httpRequest) {
    let updatedCategoryInfo = httpRequest.body;
    let categoryId = httpRequest.params.categoryId;

    let category = await editCategory(categoryId, updatedCategoryInfo);

    return {
      headers,
      statusCode: 200,
      body: {
        category
      }
    }
  }
}

module.exports = makePatchCategory;