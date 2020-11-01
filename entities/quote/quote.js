const makeQuote = function ({
    quote,
    categoryId,
    authorId,
    createdAt = Date.now(),
    updatedAt = Date.now()
} = {}) {
    if (!quote || quote.length < 10) {
        throw new Error('Quote must have a valid text');
    }
    if (!categoryId) {
        throw new Error('Quote must have a valid category');
    }
    if (!authorId) {
        throw new Error('Quote must have a valid author');
    }

    return Object.freeze ({
        getQuote: () => quote,
        getCategoryId: () => categoryId,
        getAuthorId: () => authorId,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt
    });
}

module.exports = makeQuote;