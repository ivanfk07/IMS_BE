const ENDPOINTS = require('../../../.conf/endpoints');
const AssetsList = require('../../../MODULES/AssetsList/AssetsList');

const express = require('express');
const router = express.Router();

const assetsList = new AssetsList();

router.post(ENDPOINTS.POST.ASSETS.EDIT, async (req, res) => {
    const { ID, INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, ASSETS_CONDITION, STATUS } = req.body;
    
    try {
        await assetsList.edit(ID, INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, ASSETS_CONDITION, STATUS)
        
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
