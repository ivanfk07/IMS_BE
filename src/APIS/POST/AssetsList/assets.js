const ENDPOINTS = require('../../../.conf/endpoints');
const AssetsList = require('../../../MODULES/AssetsList/AssetsList');

const express = require('express');
const router = express.Router();

const assetsList = new AssetsList();

router.post(ENDPOINTS.POST.ASSETS_ADD, async (req, res) => {
    const { INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE } = req.body;
    
    try {
        await assetsList.add(INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE)
        
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
