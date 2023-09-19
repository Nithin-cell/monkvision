import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
import { chart_box } from "../chart-box/chart-box.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

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


export const log_space = { trueWebComponentMode:true,elementConnected}
monkshu_component.register("log-space", `${COMPONENT_PATH}/log-space.html`, log_space);
