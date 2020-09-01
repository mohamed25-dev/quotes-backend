require('express-async-errors');
const { setResponse } = require('../common/response');
const { createValidate, updateValidate } = require('../validate/authorValidator');
const { ErrorHandler } = require('../helper/ErrorHandler');
const db = require('../models/index');
const Author  = db.authors;

//Create author
exports.create = async (req, res) => {
    const { error } = createValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }
    
    author = await Author.create({
        ...req.body
    });

    //Add Permissions to the author
    if (req.body.permissionsIds) {
        await author.setPermissions(permissions);
    }

    author = await Author.findByPk(author.authorId, {
        include: include
    });

    setResponse(res, 201, 'author Created', { author });
};

//Get all authors
exports.list = async (req, res) => {
    const authors = await Author.findAll();

    setResponse(res, 200, 'authors', { authors });
};

//Get author 
exports.get = async (req, res) => {
    let author = await Author.findByPk(req.params.authorId);

    //Not Found Return 404
    if (!author) {
        throw new ErrorHandler(404, 'author Not Found');
    }

    setResponse(res, 200, 'OK', { author });
}

//Update author
exports.update = async (req, res) => {
    const { error } = updateValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let author = await Author.findByPk(req.params.authorId);

    if (!author) {
        throw new ErrorHandler(404, 'Author Not Found');
    }


    await Author.update({
      author: req.body.author,
    }, {
        where: {
            authorId: req.params.authorId
        }
    });

    author = await Author.findByPk(req.params.authorId);

    setResponse(res, 200, 'OK', { author });
}

//Delete author
exports.delete = async (req, res) => {
    const result = await Author.destroy({
        where: {
            authorId: req.params.authorId
        }
    });

    if (result == 0) {
        throw new ErrorHandler(404, 'author Not Found');
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}
