const makePostAuthor = function (addAuthor) {
  return async function postAuthor(httpRequest) {
    
    let authorInfo = httpRequest.body;
    let author = await addAuthor(authorInfo);

    return {
      code: 201,
      body: { author }
    }
  }
}

module.exports = makePostAuthor;