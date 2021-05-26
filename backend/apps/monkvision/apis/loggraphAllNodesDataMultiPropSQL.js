/** 
 * Returns MonBoss or CyberWarrior log file's contents.
 * 
 * (C) 2020 TekMonks. All rights reserved.
 */
const db = require(`${APP_CONSTANTS.LIB_DIR}/db.js`);
const utils = require(`${APP_CONSTANTS.LIB_DIR}/utils.js`);

/**
 * Returns the log entries from MonBoss, or MonBoss type DBs. Note this API works in UTC unless the local
 * time adjustment flag is specified. 
 * @param {object} jsonReq Incoming request, must have the following
 *                  id - The ID of the log
 *                  timeRange - String in this format -> `{from:"UTC Time", to: "UTC Time"}`
 *                  
 *              Optionally
 *                  statusFalseValue - If status is false, then return it as this value, used only if statusAsBoolean - false
 *                  statusTrueeValue - If status is true, then return it as this value, used only if statusAsBoolean - false
 *                  statusAsBoolean - Return status as a boolean variable, not values
 *                  nullValue - If additonal status is null or empty return it as this value
 *                  notUTC - Return results in server's local time not UTC
 */
exports.doService = async jsonReq => {
    if (!validateRequest(jsonReq)) {
        LOG.error("Validation failure.");
        return CONSTANTS.FALSE_RESULT;
    }

    let propertyToGather = jsonReq.propertyToGather || LOG.error("Type of data to get was not specified");
    let multiplicationFactor = jsonReq.multiplicationFactor || 1;

    const queryParams = _getAdditionalQueryParams(jsonReq); 
    queryParams.$from = timeRange.from; queryParams.$to = timeRange.to;

    const rows = await db.runGetQueryFromID(jsonReq.id, queryParams);
    if (!rows) {LOG.error("DB read issue"); return CONSTANTS.FALSE_RESULT;}

    let x = [],
        yArrays = [],
        infoArrays = [],
        legendArray = [];
    LOG.info(`KEYS: ${JSON.stringify(Object.keys(JSON.parse(rows[0].additional_status)))}`);
    initLength = Object.keys(JSON.parse(rows[0].additional_status)).length;
    if ((Object.keys(JSON.parse(rows[0].additional_status))).includes("total_info")){
        initLength=initLength-1
        LOG.info(`INITLENGTH: ${initLength}, KEYS: ${JSON.stringify(Object.keys(JSON.parse(rows[0].additional_status)))}`);
    }
    for (let i = 0; i < initLength; i++) {
        yArrays.push([]);
        infoArrays.push([]);
    }
    for (let row of rows) {
        let parsedAddStatus;
        try {
            parsedAddStatus = JSON.parse(row.additional_status);
                if (!Object.keys(parsedAddStatus).includes("total_info")) continue;
                x.push(utils.fromSQLiteToUTCOrLocalTime(row.timestamp, jsonReq.notUTC));
                for (let arr in yArrays) {
                    let data = (Object.keys(parsedAddStatus.total_info)[arr]);
                    yArrays[arr].push((parsedAddStatus["total_info"][data][propertyToGather])*multiplicationFactor)
                    infoArrays[arr].push(data + " - " + propertyToGather + " - " + (parsedAddStatus["total_info"][data][propertyToGather])*multiplicationFactor);
                }
        } catch (e) {
            LOG.error(`Error incountered and catched in loggraphAllNodesDataMultiProp.js for property ${propertyToGather} at timestamp ${row.timestamp}: ${e}`);
            for (let arr in yArrays) {
                yArrays[arr].push(0.1);
                infoArrays[arr].push("NA");
            }
        }
    }
    for (let i = 0; i < initLength; i++) legendArray.push(infoArrays[i][infoArrays.length-1].split(' ')[0].trim().toUpperCase());

    const result = {
        result: true,
        type: "linegraph",
        contents: {
            length: x.length,
            x,
            ys: yArrays,
            infos: infoArrays,
            legend: legendArray
        }
    };
    if (jsonReq.title) result.contents.title = jsonReq.title;
    return result;
}

function _getAdditionalQueryParams(jsonReq) {
    const additional_params = {};
    for (const key of Object.keys(jsonReq)) if (key.startsWith("$qp_")) {
        const paramName = key.substring(4);
        additional_params[`$${paramName}`] = jsonReq[key];
    }
    return additional_params;
}

const validateRequest = jsonReq => (jsonReq && jsonReq.id && jsonReq.timeRange);