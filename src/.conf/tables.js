const TABLES = {
    USER: {
        TABLE: "users",
        COLUMN: [
            "USERNAME",
            "EMAIL",
            "PASSWORD",
            "LEVEL",
            "COMPANY_ID"
        ]
    },
    COMPANY: {
        TABLE: "company",
        COLUMN: [
            "NAME"
        ]
    },
    WAREHOUSE: {
        TABLE: "company_warehouse",
        COLUMN: [
            "COMPANY_ID",
            "NAME",
            "INFORMATION",
        ]
    },
    ASSETS: {
        TABLE: "equipment_assets",
        COLUMN: [            
            "INVENTORY_NO", 
            "NAME", 
            "BRAND", 
            "YEAR", 
            "MODEL", 
            "MADE_IN", 
            "COMPANY_ID", 
            "QTY", 
            "INPUT_BY", 
            "INPUT_DATE"
        ]
    },
    ASSETS_INFO: {
        TABLE: "equipment_assets_more_info",
        COLUMN: [
            "ASSETS_ID",
            "LINE_AREA_ID",
            "ASSETS_CONDITION",
            "STATUS",
            "INFORMATION",
        ]
    },
    ASSETS_IMAGES: {
        TABLE: "equipment_assets_images",
        COLUMN: [

        ]
    },
    TRANSACTION: {
        TABLE: "equipment_assets_transaction",
        COLUMN: [
            "ASSETS_ID",
            "INPUT_BY",
            "ISSUED_BY",
            "ISSUED_DATE",
            "RETURN_DATE",
            "STATUS",
        ]
    },
}

module.exports = TABLES ;