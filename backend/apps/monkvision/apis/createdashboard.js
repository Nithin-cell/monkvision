/** 
 * Returns MonBoss or CyberWarrior create dashbaord file's contents.
 * 
 * (C) 2022 TekMonks. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

const FRONTEND_APP_ROOT = `${path.resolve(`${__dirname}/../../../../frontend`)}`;
const DASHBOARD_DIR = `${FRONTEND_APP_ROOT}/apps/monkvision/dashboards`;
const DASHBOARDS_PATH = `${FRONTEND_APP_ROOT}/apps/monkvision/conf/dashboards.json`;
const ROLES_PATH = `${FRONTEND_APP_ROOT}/apps/monkvision/conf/dashboard_roles.json`;

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
    let dashboardParams = {}, contents = {};
    if (jsonReq.duration && jsonReq.metric) dashboardParams = { duration: jsonReq.duration, metric: jsonReq.metric, title: jsonReq.title };
    
    const source = `${DASHBOARD_DIR}/dashboard_nlp_search_preview.page`,
            destination = `${DASHBOARD_DIR}/dashboard_${jsonReq["filename"]}.page`;
    
    if (fs.existsSync(destination)){
        updateDashboard(source, destination, dashboardParams, (err) => { if (err) LOG.error("Error while updating dashboard file"); });
    }else{
        createDashboard(source, destination, dashboardParams, (err) => { if (err) LOG.error("Error while creating dashboard file"); });
        const dashboards = await require(DASHBOARDS_PATH);
        const key = `dash${Object.keys(dashboards).length+1}`;
        dashboards[key] = `dashboard_${jsonReq["filename"]}.page,refresh:5000,name:${jsonReq["filename"]},title:NLP Queries`;
        writeJSON(DASHBOARDS_PATH, dashboards);

        const roles = await require(ROLES_PATH);
        roles[jsonReq["role"]].push(key);
        writeJSON(ROLES_PATH, roles);

        contents.dashkey = key;
    }

    const result = {result: true, type: "text", contents};
    if (jsonReq.title) result.title = jsonReq.title; 
    return result;
}

function createDashboard(source, destination, dashboardParams, callback) {
    const done = err => { callback(err); }

    const readable = fs.createReadStream(source);
    const writable = fs.createWriteStream(destination);
    
    readable.on("error", err => done(err));
    readable.on("data", (chunk) => { 
        writable.write(chunk.toString().replace("{{duration}}", dashboardParams.duration)
                                       .replace("{{metric}}", dashboardParams.metric)
                                       .replace("{{title}}", dashboardParams.title) ); 
        });
    readable.on("end", _ => { writable.end(); });
    
    writable.on("error", err => done(err));
    writable.on("close", _ => done());
}

function updateDashboard(source, destination, dashboardParams={}, callback) {
    const done = err => { callback(err); }

    const readable = fs.createReadStream(source);

    const content = getFileContent(destination);
    const content1 = getFileContent(`${DASHBOARD_DIR}/dashboard_template.page`);
    
    const writable = fs.createWriteStream(destination);
    
    readable.on("error", err => done(err));
    readable.on("data", (chunk) => { 
        const pageContent = chunk.toString().replace("{{duration}}", dashboardParams.duration)
                                            .replace("{{metric}}", dashboardParams.metric)
                                            .replace("{{title}}", dashboardParams.title);
        
        const parsedSchema = getSchema(pageContent);
        const parsedSchema1 = getSchema(content);

        const length = Object.keys(parsedSchema1).length;
        const schemaKey = Object.keys(parsedSchema)[0];
        parsedSchema[`${schemaKey}${length+1}`] = parsedSchema[schemaKey];
        delete parsedSchema[`${schemaKey}`];
        
        const schemaData = { ...parsedSchema1, ...parsedSchema };

        let layout = "";
        layout += getLayout(content)+"\n";
        layout += getLayout(pageContent).replace(new RegExp(/-*\n/, "s"), "").replace("nlpSearchMetric ", `${schemaKey}${length+1}`);

        let rowHeights = "";
        rowHeights += Array(Object.keys(schemaData).length).fill("calc(45vh - 50px)").join();
        writable.write(content1.replace("{{schema}}", JSON.stringify(schemaData).replace(/\$/g, '$$$$'))
                                .replace("{{layout}}", layout)
                                .replace("{{rowHeights}}", rowHeights));
        });
    readable.on("end", _ => { writable.end(); });
    
    writable.on("error", err => done(err));
    writable.on("close", _ => done());
}

const writeJSON = (filepath, data) => { fs.writeFile(filepath, JSON.stringify(data, null, 4), (err) => { if (err) LOG.error("Error while writing JSON"); }); }

const getFileContent = (srcPath) => { return fs.readFileSync(srcPath, 'utf8') }

function getSchema(pageContent) {
    const schemaArray = pageContent.match(/SCHEMA\s*\r?\n=+\r?\n(.+?)\r?\n=+[\r?\n]*/sm);
    const parsedSchema = JSON.parse(schemaArray[1]);
    return parsedSchema;
}

function getLayout(pageContent) {
    const layoutArray = pageContent.match(/LAYOUT\s*\r?\n=+\r?\n(.+?)\r?\n=+[\r?\n]*/sm);
    return layoutArray[1];
}

const validateRequest = jsonReq => (jsonReq && jsonReq.filename);