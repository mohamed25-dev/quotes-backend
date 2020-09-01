require('express-async-errors');
const { setResponse } = require('../common/response');
const { createValidate, updateValidate } = require('../validate/roleValidator');
const { ErrorHandler } = require('../helper/ErrorHandler');
const db = require('../models/index');
const Role = db.roles;
const Permission = db.permissions;
const include = [{
    model: Permission,
    as: 'permissions',
    attributes: ['permissionId', 'permissionName'],
    through: {
        attributes: []
    }
}];
const permissions = [];

//Create Role
exports.create = async (req, res) => {
    const { error } = createValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let role = await Role.findOne({
        where: {
            roleName: req.body.roleName
        }
    });

    if (role) {
        throw new ErrorHandler(400, 'Role Already Exist');
    }

    //Check the sent permissions
    if (req.body.permissionsIds) {
        let permissionsIds = req.body.permissionsIds;

        for (let i = 0; i < permissionsIds.length; i++) {
            let permission = await Permission.findByPk(permissionsIds[i]);
            if (!permission) {
                throw new ErrorHandler(400, 'Some Permissions Not Found');
            }
            permissions[i] = permission;
        }
    }

    role = await Role.create({
        ...req.body
    });

    //Add Permissions to the role
    if (req.body.permissionsIds) {
        await role.setPermissions(permissions);
    }

    role = await Role.findByPk(role.dataValues.roleId, {
        include: include
    });

    setResponse(res, 201, 'Role Created', { role });
};

//Get all Roles
exports.list = async (req, res) => {
    const roles = await Role.findAll({
        include: include
    });

    setResponse(res, 200, 'Roles', { roles });
};

//Get Role 
exports.get = async (req, res) => {
    let role = await Role.findByPk(req.params.roleId, {
        include: include
    });

    //Not Found Return 404
    if (!role) {
        throw new ErrorHandler(404, 'Role Not Found');
    }

    setResponse(res, 200, 'OK', { role });
}

//Update Role
exports.update = async (req, res) => {
    const { error } = updateValidate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    let role = await Role.findByPk(req.params.roleId, {
        include: include
    });

    if (!role) {
        throw new ErrorHandler(404, 'Role Not Found');
    }

    //Check the sent permissions
    if (req.body.permissionsIds) {
        let permissionsIds = req.body.permissionsIds;

        for (let i = 0; i < permissionsIds.length; i++) {
            let permission = await Permission.findByPk(permissionsIds[i]);
            if (!permission) {
                throw new ErrorHandler(404, 'Some Permissions Not Found');
            }
            permissions[i] = permission;
        }
    }

    await Role.update({
        roleName: req.body.roleName,
    }, {
        where: {
            roleId: req.params.roleId
        },
        include: include
    });

    //Update Permissions is there 
    if (req.body.permissionsIds) {
        //Remove Old Permissions;
        await role.removePermissions(await role.getPermissions());
        await role.setPermissions(permissions);
    }

    role = await Role.findByPk(req.params.roleId);

    setResponse(res, 200, 'OK', { role });
}

//Delete Role
exports.delete = async (req, res) => {
    const result = await Role.destroy({
        where: {
            roleId: req.params.roleId
        }
    });

    if (result == 0) {
        throw new ErrorHandler(404, 'Role Not Found');
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}
