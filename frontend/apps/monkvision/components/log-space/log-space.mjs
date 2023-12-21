import { chart_box } from "../chart-box/chart-box.mjs";

async function elementConnected(el) {
    populateLogs(el);
}

async function populateLogs(el){
    let pageData = await chart_box._getContent(el.getAttribute('api'), el.getAttribute('params'));    
    try {
        await log_space.bindData(pageData, el.id);
    } catch (error) {
        await log_space.bindData(pageData, el.id);
    }
}

function _refresh() { 
	for (const element of log_space.getAllElementInstances()) populateLogs(element);
}

export const log_space = { trueWebComponentMode:true, trueJS:false,elementConnected,_refresh}