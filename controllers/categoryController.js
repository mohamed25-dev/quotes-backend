require('express-async-errors');
const { setResponse } = require('../common/response');
const { createValidate, updateValidate } = require('../validate/categoryValidator');
const { ErrorHandler } = require('../helper/ErrorHandler');
const db = require('../models/index');
const Category  = db.categories;


//Create category
exports.create = async (req, res) => {
    const { error } = createValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }
    
    category = await Category.create({
        ...req.body
    });

    category = await Category.findByPk(category.categoryId);

    setResponse(res, 201, 'category Created', { category });
};

//Get all categories
exports.list = async (req, res) => {
    const categories = await Category.findAll();

    setResponse(res, 200, 'Categories', { categories });
};


//Get category 
exports.get = async (req, res) => {
    let category = await Category.findByPk(req.params.categoryId);

    //Not Found Return 404
    if (!category) {
        throw new ErrorHandler(404, 'category Not Found');
    }

    setResponse(res, 200, 'OK', { category });
}

//Update category
exports.update = async (req, res) => {
    const { error } = updateValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let category = await Category.findByPk(req.params.categoryId);

    if (!category) {
        throw new ErrorHandler(404, 'Category Not Found');
    }


    await Category.update({
      categoryName: req.body.categoryName,
      }, {
        where: {
            categoryId: req.params.categoryId
        }
    });

    category = await Category.findByPk(req.params.categoryId);

    setResponse(res, 200, 'OK', { category });
}

//Delete category
exports.delete = async (req, res) => {
    const result = await Category.destroy({
        where: {
            categoryId: req.params.categoryId
        }
    });

    if (result == 0) {
        throw new ErrorHandler(404, 'Category Not Found');
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}
