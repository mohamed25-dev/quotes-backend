require('express-async-errors');
const { setResponse } = require('../common/response');
const { createValidate, updateValidate } = require('../validate/quoteValidator');
const { ErrorHandler } = require('../helper/ErrorHandler');
const db = require('../models/index');
const Quote  = db.quotes;
const Author = db.authors;
const Category = db.categories;
const include = [{
    model: Author,
    as: 'author',
  }, {
    model: Category,
    as: 'category'
}];

//Create quote
exports.create = async (req, res) => {
    const { error } = createValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }
    
    quote = await Quote.create({
        ...req.body
    });

    //Add Permissions to the quote
    if (req.body.permissionsIds) {
        await quote.setPermissions(permissions);
    }

    quote = await Quote.findByPk(quote.quoteId, {
        include: include
    });

    setResponse(res, 201, 'quote Created', { quote });
};

//Get all quotes
exports.list = async (req, res) => {
    const quotes = await Quote.findAll({
        include: include
    });

    setTimeout( () => {
      console.log('Waiting for nothing');
    }, 2000)
    setResponse(res, 200, 'quotes', { quotes });
};

//Get Quotes for an author 
exports.listByAuthor = async (req, res) => {
  const quotes = await Quote.findAll({
      where: {
        authorId: req.params.authorId
      },
      include: include
  });

  setResponse(res, 200, 'quotes', { quotes });
};

//Get Quotes By a Category 
exports.listByCategory = async (req, res) => {
  const quotes = await Quote.findAll({
      where: {
        categoryId: req.params.categoryId
      },
      include: include
  });

  setResponse(res, 200, 'quotes', { quotes });
};

//Get quote 
exports.get = async (req, res) => {
    let quote = await Quote.findByPk(req.params.quoteId, {
        include: include
    });

    //Not Found Return 404
    if (!quote) {
        throw new ErrorHandler(404, 'quote Not Found');
    }

    setResponse(res, 200, 'OK', { quote });
}

//Update quote
exports.update = async (req, res) => {
    const { error } = updateValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let quote = await Quote.findByPk(req.params.quoteId, {
        include: include
    });

    if (!quote) {
        throw new ErrorHandler(404, 'Quote Not Found');
    }


    await Quote.update({
      quote: req.body.quote,
    }, {
        where: {
            quoteId: req.params.quoteId
        },
        include: include
    });

    quote = await Quote.findByPk(req.params.quoteId);

    setResponse(res, 200, 'OK', { quote });
}

//Delete quote
exports.delete = async (req, res) => {
    const result = await Quote.destroy({
        where: {
            quoteId: req.params.quoteId
        }
    });

    if (result == 0) {
        throw new ErrorHandler(404, 'quote Not Found');
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}
