const Transaction = require('../../../MODULES/Transaction/Transaction');
const ENDPOINTS = require('../../../.conf/endpoints');
const express = require('express');

const router = express.Router();

const transaction = new Transaction();

router.post(ENDPOINTS.POST.TRANSACTION.ISSUED, async (req, res) => {
    const { ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, ASSETS_CONDITION } = req.body;
    
    try {
        await transaction.issued(ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, ASSETS_CONDITION)
        
        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            info: error
        })
    }
})

module.exports = router ;
