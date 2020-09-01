require('express-async-errors');
const express = require('express');
const {setResponse, setErrorResponse} = require('../common/response');
const auth = require('../middleware/auth');
const { ErrorHandler } = require('../helper/ErrorHandler');
const { validate } = require('../validate/authValidator');
const router = new express.Router();

router.get('/authenticate', auth, async(req, res) => {
    return setResponse(res, 200, 'Authenticated', {user: req.user});
});

router.post('/checkPermission', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        throw new ErrorHandler(400, error.details[0].message);
    }

    if(req.permissions.includes(req.body.permission)) {
        return setResponse(res, 200, 'Authorized', {user: req.user});
    }

    throw new ErrorHandler(403, 'Unauthorized')
    
});

module.exports = router;
