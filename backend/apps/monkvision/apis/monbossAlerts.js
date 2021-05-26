/** 
 * Returns MonBoss or CyberWarrior alert file's contents.
 * 
 * (C) 2020 TekMonks. All rights reserved.
 */

const db = require(`${APP_CONSTANTS.LIB_DIR}/db.js`);
const utils = require(`${APP_CONSTANTS.LIB_DIR}/utils.js`);

exports.doService = async jsonReq => {
    if (!validateRequest(jsonReq)) {
        LOG.error("Validation failure.");
        return CONSTANTS.FALSE_RESULT;
    }
    const rows = await db.getAlerts(utils.getTimeRangeForSQLite(JSON.parse(jsonReq.timeRange)));
    if (!rows) {
        LOG.error(`DB read issue.`);
        return CONSTANTS.FALSE_RESULT;
    }

    let contents = [];
    if (rows.length == 0){
        contents.push(`No issues were detected in the system. All OK.`)
    }
    else {
        for (const row of rows) contents.push(`TIME: ${utils.fromSQLiteToUTCOrLocalTime(row.timestamp, jsonReq.notUTC)}\nERROR: ${row.error}\nADDITIONAL INFORMATION: ${(row.additional_err).replace(/(<br>)|(<ul>)|(<\/li>)/g, '\n').replace(/(<\/ul>)|(<li>)/g, '').replace( /(<([^>]+)>)/ig, '').replace( /(\&nbsp;)/ig, ' ')||""}\nSystem: ${row.system||""}\n\n`);
    }

    const result = {
        result: true,
        type: "text",
        contents
    };
    if (jsonReq.title) result.contents.title = jsonReq.title;
    return result;
}

const validateRequest = jsonReq => (jsonReq && jsonReq.timeRange);