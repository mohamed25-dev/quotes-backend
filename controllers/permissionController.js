const { setResponse } = require('../common/response');
const { createValidate, updateValidate } = require('../validate/permissionValidator');
const { ErrorHandler } = require('../helper/ErrorHandler');
const db = require('../models/index');
const Permission = db.permissions;

//Create Permission
exports.create = async (req, res) => {
    const { error } = createValidate(req.body);
    if (error) {
        console.log(error);
        throw new ErrorHandler(400, error.details[0].message);
    }

    let permission = await Permission.findOne({
        where: {
            permissionName: req.body.permissionName
        }
    });

    if (permission) {
        throw new ErrorHandler(400, 'Permission Already Exist', 1012);
    }

    permission = await Permission.create({
        ...req.body
    });

    permission = await Permission.findByPk(permission.dataValues.permissionId);

    setResponse(res, 201, 'Permission Created', { permission });
};

//Get all Permissions
exports.list = async (req, res) => {
    const permissions = await Permission.findAll();
    throw new Error('Some thing didn\'t went wrong ...');
    setResponse(res, 200, 'Permissions', { permissions });
};

//Get Permission 
exports.get = async (req, res) => {
    let permission = await Permission.findByPk(req.params.permissionId);
    //Not Found Return 404
    if (!permission) {
        throw new ErrorHandler(404, 'Permission Not Found');
    }

    setResponse(res, 200, 'OK', { permission });
}

//Update Permission
exports.update = async (req, res) => {
    //Validate Request
    const { error } = updateValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let permission = await Permission.findByPk(req.params.permissionId);

    //Not Found Return 404
    if (!permission) {
        throw new ErrorHandler(404, 'Permission Not Found');
    }

    let result = await Permission.findOne({
        where: {
            permissionName: req.body.permissionName
        }        
    });

    if(result) {
        throw new ErrorHandler(400, 'Permission with the same name already exist');
    }
    
    await Permission.update({
        permissionName: req.body.permissionName,
    }, {
        where: {
            permissionId: req.params.permissionId
        }
    });

    //Fetch the Updated Row
    permission = await Permission.findByPk(req.params.permissionId);

    setResponse(res, 200, 'OK', { permission });
}

//Delete Permission
exports.delete = async (req, res) => {
    const result = await Permission.destroy({
        where: {
            permissionId: req.params.permissionId
        }
    });

    //IF Not Found Return 404
    if (result == 0) {
        throw new ErrorHandler(404, 'Permission Not Found');
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}
