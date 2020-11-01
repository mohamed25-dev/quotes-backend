require('express-async-errors');
const {setErrorResponse}  = require('../common/response');
const AppExceptions = require('../common/errors/exceptions')
const {ErrorHandler} = require('../helper/ErrorHandler');
const jwt  = require('jsonwebtoken');
const db   = require('../models');
const User = db.users;

const auth = async (req, res, next) => {
        let token = req.header('Authorization');
        if (!token) {
            throw new ErrorHandler(401, 'Access denied, no token provided', 1014);
        }

        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'strongKey');
        
        if(!decoded.userId) {
            throw new AppExceptions.UnauthorizedException();
        }
        
        const user = await User.findOne({
            where: {
                userId: decoded.userId
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']   
            }
        });

        if (!user) {
            throw new AppExceptions.UnauthorizedException();
        }
        
        req.token = token;
        req.user = user;
        req.permissions = decoded.permissions;

        next();
}

module.exports = auth