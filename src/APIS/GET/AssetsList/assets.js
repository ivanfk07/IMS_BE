const ENDPOINTS = require('../../../.conf/endpoints');
const AssetsList = require('../../../MODULES/AssetsList/AssetsList');

const express = require('express');
const router = express.Router();

const assetsList = new AssetsList();

router.get(ENDPOINTS.GET.ASSETS_LIST, async (req, res) => {
    
    try {
        const DATA = await assetsList.get() ;
        
        res.status(200).json(DATA[0])
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            info: error
        })
    }
})

module.exports = router ;