const makeDeleteCategory = function (removeCategory) {
  return async function deleteCategory(httpRequest) {

    let categoryId = httpRequest.params.categoryId;
    await removeCategory(categoryId);
    
    return {
      headers,
      statusCode: 200,
      body: {}
    }
  }
}

module.exports = makeDeleteCategory;