const ENDPOINTS = require('../../../.conf/endpoints');
const AssetsList = require('../../../MODULES/AssetsList/AssetsList');

const express = require('express');
const router = express.Router();

const assetsList = new AssetsList();

router.post(ENDPOINTS.POST.ASSETS.DELETE, async (req, res) => {
    const { ID } = req.body;
    
    try {
        await assetsList.delete(ID)
        
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
