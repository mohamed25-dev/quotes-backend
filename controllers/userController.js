require('express-async-errors');
const { setResponse } = require('../common/response');
const { createValidate, updateValidate, loginValidate, resetPasswordValidate} = require('../validate/userValidator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const {ErrorHandler} = require('../helper/ErrorHandler'); 
const User = db.users;
const Role = db.roles;
const Permission = db.permissions;
const include = [{
  model: Role,
  as: 'roles',
  attributes: ['roleId', 'roleName'],
  through: {
    attributes: []
  },
  include: [{
    model: Permission,
    as: 'permissions',
    attributes: ['permissionId', 'permissionName'],
    through: {
        attributes: []
    }
  }]
}];

//Create User 
exports.create = async (req, res) => {
    const roles = [];
    const { error } = createValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    //find an existing user
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      throw new ErrorHandler(400, 'User already Existed');
    }

    //Check the sent roles
    if (req.body.rolesIds) { 
      let roleIds = req.body.rolesIds;
      
      for (let i = 0; i < roleIds.length; i++) {
        let role = await Role.findByPk(roleIds[i]);
        if (!role) {
          throw new ErrorHandler(400, 'Some Roles Not Found');
        }
        roles[i] = role;
      }
    }

    user = await User.create({
      ...req.body
    });

    //Add Roles to the user 
    if (req.body.rolesIds) {
      await user.setRoles(roles);
    }

    user = await User.findByPk(user.dataValues.userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: include
    });

    //Generate Authentication Token for this user 
    const token = await user.generateAuthToken();

    setResponse(res, 201, 'User Created', { user, token });
};

//Get all Users
exports.list = async (req, res) => {
    const users = await User.findAll({
      attributes: { exclude: ['password']},
      include: include
    });

    setResponse(res, 200, 'OK', { users });
}

//Update User
exports.update = async (req, res) => {
    const roles = [];
    const { error } = updateValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    let user = await User.findByPk(req.params.userId);
    //Not Found Return 404
    if (!user) {
      throw new ErrorHandler(404, 'User Not Found');
    }

    //Check the sent roles
    if (req.body.rolesIds) { 
      let roleIds = req.body.rolesIds;
      
      for (let i = 0; i < roleIds.length; i++) {
        let role = await Role.findByPk(roleIds[i]);
        if (!role) {
          throw new ErrorHandler(400, 'Some Roles Not Found');
        }
        roles[i] = role;
      }
    }

    await User.update({
      ...req.body
    }, {
        where: { userId: req.params.userId },
        individualHooks: true
    });

    //Update Roles to the user 
    if (req.body.rolesIds) {
      //Remove Old Roles;
      await user.removeRoles(await user.getRoles());
      await user.setRoles(roles);
    }

    user = await User.findByPk(req.params.userId, {
      attributes: { exclude: ['password'] },
      include: include
    });

    setResponse(res, 200, 'User Updated', { user });
}

//Get User 
exports.get = async (req, res) => {
  let user = await User.findByPk(req.params.userId, {
    attributes: { exclude: ['password'] },
    include: include
  });

  //Not Found Return 404
  if (!user) {
    throw new ErrorHandler(404, 'User Not Found');
  }

  setResponse(res, 200, 'User Found', { user });
}

//Delete User
exports.delete = async (req, res) => {
    const result = await User.destroy({
      where: {
        userId: req.params.userId
      }
    });

    //IF Not Found Return 404
    if (result == 0) {
      throw new ErrorHandler(404, 'User Not Found');  
    }

    setResponse(res, 200, 'Deleted Successfully', {});
}

//Login User
exports.login = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    let user = await User.findByCredentials(req.body.username, req.body.password);
    if (!user) {
      throw new ErrorHandler(401, 'Wrong username or password');
    }

    //Update users last login
    await User.update({ LastLoginTime: new Date().toString() }, {
      where: { userId: user.dataValues.userId },
      include: include
    });

    user = await User.findByPk(user.dataValues.userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt']}
    });

    if(!user.isEnabled) {
      throw new ErrorHandler(401, 'User is Disabled');
    }
    //Generate Authentication Token for this user 
    const token = await user.generateAuthToken();
    setResponse(res, 200, 'Loggedin Successfully', { user, token });
}

//Get User Profile 
exports.profile = async (req, res) => {
    let user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] },
      include: include
    });
  
    setResponse(res, 200, 'OK', { user});
}

//Reset User password 
exports.resetpassword = async (req, res) => {
    const { error } = resetPasswordValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    let user = await User.findByPk(req.params.userId);
    if(!user) {
      throw new ErrorHandler(404, 'User Not Found');
    }
  
    await User.update({ password: req.body.password }, {
      where: {
        userId: req.params.userId
      },
      individualHooks: true
    });

    setResponse(res, 200, 'password Updated', { });
}

//Update User Password
exports.updatePassword = async (req, res) => {
    const { error } = resetPasswordValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    let user = await User.findByPk(req.user.userId);
    if(!user) {
      throw new ErrorHandler(404, 'User Not Found');
    }
  
    await User.update({ password: req.body.password }, {
      where: {
        userId: req.user.userId
      },
      individualHooks: true
    });

    setResponse(res, 200, 'Password Updated', { });
}

exports.checkUsername = async (req, res) => {
    const result = await User.findAll({
      where: {
        username: req.params.username
      }
    });

    //IF Not Found Return available
    if (result.length > 0) {
      throw new ErrorHandler(400, 'Username already existed');
    }

    setResponse(res, 200, 'Username is available', {});
}

exports.generateAuthToken = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    let user = await User.findByCredentials(req.body.username, req.body.password);
    if (!user) {
      throw new ErrorHandler(401, 'Wrong username or password');
    }

    user = await User.findByPk(user.dataValues.userId, { dattributes: { exclude: ['password'] }});

    if(!user.isEnabled) {
      throw new ErrorHandler(401, 'User is Disabled');
    }

    user = await User.findByPk(user.dataValues.userId, { dattributes: { exclude: ['password'] }});
    setResponse(res, 200, 'Loggedin Successfully', {token : user.AuthToken} );
}

//Encrypt user password before create or update
User.beforeSave(async function (user) {
  if (user.dataValues.password.length < 25) {
    user.password = await bcrypt.hash(user.dataValues.password, 8);
  }
});

User.prototype.generateAuthToken = async function () {
  let remaningHours = 24 - new Date().getHours(); // Remaingin Hours to the end of the day
  
  const user = await User.findByPk(this.userId, {
    include: include
  });

  let permissions = [];

  let userRoles = user.roles;

  for(let i = 0; i < userRoles.length; i++) {
    for(let j = 0; j < userRoles[i].permissions.length; j++) {
      permissions.push(userRoles[i].permissions[j].permissionName);
    }
  }
  
  let token = await jwt.sign({ userId: user.userId, username: user.username, permissions: permissions},
      'strongKey', 
      {expiresIn: `${remaningHours}h`}
  );

  return token;
}

User.findByCredentials = async function (userName, password) {
  const user = await User.findOne({
    where: {
      username: userName
    }
  });

  if (!user) {
    return;
  }

  const isMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isMatch) {
    return;
  }

  return user;
}