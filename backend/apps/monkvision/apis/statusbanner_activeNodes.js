/** 
 * Returns status as banner text based on query.
 * 
 * Incoming params
 *  id - The query ID, which is used then to pickup the query from monkvision.json in conf. This
 *       query must return percent column with calculated percentage.
 *  timeRange - The time range for the query
 *  $qa_<something> - The query parameters
 *  percent<number>[Title, Colors, Icon, Explanation] - Title, colors, icons etc. to send back
 *                                                      based on the calculated percentage
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

    const queryParams = _getAdditionalQueryParams(jsonReq);
    const rows = await db.runGetQueryFromID(jsonReq.id, queryParams);
    if (!rows) {
        LOG.error("DB read issue");
        return CONSTANTS.FALSE_RESULT;
    }
    // Calculation
    // Standard deviation
    // const mean = (data_array.reduce((a, b) => a + b)) / data_array.length
    // const stand_dev=Math.sqrt(data_array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data_array.length)
    const currentData = JSON.parse(rows[0].raw_data)
    const truePercent = currentData.total_active_ports;
    // calculate issue percentage
    const threshold = currentData.total_ports;

    // calculate issue percentage
    // const ok_colorCode = `percent${truePercent}Colors`, 
    //     ok_iconCode = `percent${truePercent}Icon`, 
    //     ok_explanationCode = `percent${truePercent}Explanation`, 
    //     ok_titleCode = `percent${truePercent}Title`;

    const ok_colorCode = `percentthresholdColors`,
        ok_iconCode = `percentthresholdIcon`,
        ok_explanationCode = `percentthresholdExplanation`,
        ok_titleCode = `percentthresholdTitle`;


    // set title
    let title = "Status";
    if (threshold == truePercent) title = jsonReq[ok_titleCode];
    else if (jsonReq["elseTitle"]) title = jsonReq["elseTitle"];

    // set icon
    let icon = null;
    if (threshold == truePercent) icon = jsonReq[ok_iconCode];
    else icon = jsonReq["elseIcon"];

    // set color codes based on success percentage
    let fgcolor = "rgb(72,72,72)",
        bgcolor = "white";
    if (threshold == truePercent) {
        fgcolor = jsonReq[ok_colorCode].split(",")[0], bgcolor = jsonReq[ok_colorCode].split(",")[1]
    } else {
        fgcolor = jsonReq["elseColors"].split(",")[0], bgcolor = jsonReq["elseColors"].split(",")[1]
    };

    // set explanation text based on success percentage
    let textexplanation = "Node performance OK";
    if (threshold == truePercent) textexplanation = jsonReq["percentthresholdExplanation"];
    else textexplanation = jsonReq["elseExplanation"];

    let add_symbol;
    if (!jsonReq.add_symbol) {
        add_symbol = "%"
    } else {
        add_symbol = jsonReq.add_symbol
    }
    const result = {
        result: true,
        type: "metrictext",
        contents: {
            textmain: `${truePercent}`,
            fgcolor,
            bgcolor,
            textexplanation
        }
    };
    if (title) result.contents.title = title;
    if (icon) result.contents.icon = icon;
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

const validateRequest = jsonReq => (jsonReq && jsonReq.id && jsonReq.timeRange);
