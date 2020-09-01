require('express-async-errors');
const {setErrorResponse}  = require('../common/response');
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
            throw new ErrorHandler(401, 'Invalid Token ', 1014);
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
            throw new ErrorHandler(401, 'Invalid Token ', 1014);
        }
        
        req.token = token;
        req.user = user;
        req.permissions = decoded.permissions;

        next();
}

module.exports = auth