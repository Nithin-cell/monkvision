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
 
     // const rows = await db.getLogs(jsonReq.id, utils.getTimeRangeForSQLite(JSON.parse(jsonReq.timeRange)));
     // if (!rows) {LOG.error("DB read issue"); return CONSTANTS.FALSE_RESULT;}
 
     const queryParams = _getAdditionalQueryParams(jsonReq);
     const rows = await db.runGetQueryFromID(jsonReq.id, queryParams);
     if (!rows) {
         LOG.error("DB read issue");
         return CONSTANTS.FALSE_RESULT;
     }
 
     const x = [],
         y1 = [],
         y2 = [],
         y3 = [],
         y4 = []
         
     let serial_count=1;
 
     for (let row of rows) {
         let data_array;
         try {
             data_array = JSON.parse(row.additional_status);
         } catch (e) {}
         for (let index = 0; index < data_array.length; index++) {
             let database_name = data_array[index].database_name || "null";
             let timestamp = data_array[index].timestamp || "null";
             let rowstore_in_gb = data_array[index].rowstore_in_gb || "null";
             let columnstore_in_gb = data_array[index].columnstore_in_gb || "null";
             
             y1.unshift(database_name);
             y2.unshift(timestamp);
             y3.unshift(rowstore_in_gb);
             y4.unshift(columnstore_in_gb);
             
             x.push(serial_count++);
         }
     }
 
     const result = {
         result: true,
         type: "table",
         contents: {
             length: x.length,
             x,
             ys: [y1, y2, y3, y4],
             infos: [
                 [],
                 [],
                 [],
                 []
             ]
         }
     };
     if (jsonReq.title) result.contents.title = jsonReq.title;
     return result;
 }
 
 const validateRequest = jsonReq => (jsonReq && jsonReq.id && jsonReq.timeRange);
 
 function _getAdditionalQueryParams(jsonReq) {
     const additional_params = {};
     for (const key of Object.keys(jsonReq))
         if (key.startsWith("$qp_")) {
             const paramName = key.substring(4);
             additional_params[`$${paramName}`] = jsonReq[key];
         }
     return additional_params;
 }