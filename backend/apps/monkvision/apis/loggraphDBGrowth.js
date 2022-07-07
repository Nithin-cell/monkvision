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

    const queryParams = _getAdditionalQueryParams(jsonReq);
    const rows = await db.runGetQueryFromID(jsonReq.id, queryParams);
    if (!rows) {
        LOG.error("DB read issue");
        return CONSTANTS.FALSE_RESULT;
    }
    let x = [],
        yArrays = [],
        infoArrays = [],
        legendArray = [];
    let initLength = JSON.parse(rows[rows.length - 1].additional_status).length;

    for (let i = 0; i < initLength; i++) {
        yArrays.push([]);
        infoArrays.push([]);
    }

    legendArray = JSON.parse(rows[initLength - 1].additional_status).map(item => item.database_name);

    for (let row of rows) {
        x.push(utils.fromSQLiteToUTCOrLocalTime(row.timestamp, jsonReq.notUTC));

        if (Array.isArray(row.additional_status)) {
            let record = row.reduce((obj, item) => Object.assign(obj, { [item.database_name]: item.rowstore_in_gb }), {});
            for (let arr in yArrays) {
                let data = record[legendArray[arr]];
                yArrays[arr].push(data);
                infoArrays[arr].push(legendArray[arr] + " - " + data);
            }
        } else {
            LOG.error(`Error incountered and catched in loggraphDBGrowth.js for rowstore_in_gb property at timestamp ${row.timestamp}`);
            for (let arr in yArrays) {
                yArrays[arr].push(0.1);
                infoArrays[arr].push("NA");
            }
        }
    }

    const result = {
        result: true,
        type: "linegraph",
        contents: {
            length: x.length,
            x,
            ys: yArrays,
            infos: infoArrays,
            legends: legendArray.map(item => item.toUpperCase())
        }
    };
    if (jsonReq.title) result.contents.title = jsonReq.title;
    return result;
}

function _getAdditionalQueryParams(jsonReq) {
    const additional_params = {};
    for (const key of Object.keys(jsonReq))
        if (key.startsWith("$qp_")) {
            const paramName = key.substring(4);
            additional_params[`$${paramName}`] = jsonReq[key];
        }
    return additional_params;
}

const validateRequest = jsonReq => (jsonReq && jsonReq.id);