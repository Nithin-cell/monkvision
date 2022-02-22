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
         y4 = [],
         y5 = [],
         y6 = [],
         y7 = [],
         y8 = [],
         y9 = [],
         y10 = [],
         y11 = [],
         y12 = [],
         y13 = []
         
     let serial_count=1;
 
     for (let row of rows) {
         let data_array;
         try {
             data_array = JSON.parse(row.additional_status);
         } catch (e) {}
         for (let index = 0; index < data_array.length; index++) {
             let ip_addr = data_array[index].ip_addr || "null";
             let port = data_array[index].port || "null";
             let type = data_array[index].type || "null";
             let timestamp = data_array[index].timestamp || "null";
             let max_memory_gb = data_array[index].max_memory_gb || "null";
             let memory_used_gb = data_array[index].memory_used_gb || "null";
             let max_table_memory_gb = data_array[index].max_table_memory_gb || "null";
             let table_memory_used_gb = data_array[index].table_memory_used_gb || "null";
             let total_disk_gb = data_array[index].total_disk_gb || "null";
             let available_disk_gb = data_array[index].available_disk_gb || "null";
             let perc_used_mem = data_array[index].perc_used_mem || "null";
             let perc_used_tab_mem = data_array[index].perc_used_tab_mem || "null";
             let perc_used_disc = data_array[index].perc_used_disc || "null";
             
             y1.unshift(ip_addr);
             y2.unshift(port);
             y3.unshift(type);
             y4.unshift(timestamp);
             y5.unshift(max_memory_gb);
             y6.unshift(memory_used_gb);
             y7.unshift(max_table_memory_gb);
             y8.unshift(table_memory_used_gb);
             y9.unshift(total_disk_gb);
             y10.unshift(available_disk_gb);
             y11.unshift(perc_used_mem);
             y12.unshift(perc_used_tab_mem);
             y13.unshift(perc_used_disc);
             
             x.push(serial_count++);
         }
     }
 
     const result = {
         result: true,
         type: "table",
         contents: {
             length: x.length,
             x,
             ys: [y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11, y12, y13],
             infos: [
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
                 [],
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