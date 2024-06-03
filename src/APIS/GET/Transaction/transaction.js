const Transaction = require('../../../MODULES/Transaction/Transaction');
const security = require('../../../MIDDLEWARE/security');
const ENDPOINTS = require('../../../.conf/endpoints');
const express = require('express');

const router = express.Router();

const transaction = new Transaction();

router.get(`${ENDPOINTS.GET.TRANSACTION}/:user_id/:company_id`, security.first, async (req, res) => {
    const company_id = req.params.company_id    
    
    try {
        const DATA = await transaction.get(company_id) ;
        
        res.status(200).json(DATA[0])
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            info: error
        })
    }
})

module.exports = router ;