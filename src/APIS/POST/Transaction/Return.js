const Transaction = require('../../../MODULES/Transaction/Transaction');
const ENDPOINTS = require('../../../.conf/endpoints');
const express = require('express');

const router = express.Router();

const transaction = new Transaction();

router.post(ENDPOINTS.POST.TRANSACTION.RETURN, async (req, res) => {
    const { ID, ASSETS_ID, RETURN_DATE, STATUS } = req.body;
    
    try {
        await transaction.return(ID, ASSETS_ID, RETURN_DATE, STATUS)
        
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
 