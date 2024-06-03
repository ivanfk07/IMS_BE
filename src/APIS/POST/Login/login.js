const { Users } = require('../../../MODULES/User/users');
const ENDPOINTS = require('../../../.conf/endpoints')

const express = require('express');
const router = express.Router();

const users = new Users() ;

router.post(ENDPOINTS.POST.LOGIN, async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await users.authentication(email, password) ;

        console.log(user)
        
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(200).json({
            success: false,
        })
    }
})

module.exports = router ;
