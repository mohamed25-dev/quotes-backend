const makePatchCategory = function(editCategory) {
  return async function patchCategory(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
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

module.exports = makePatchCategory;