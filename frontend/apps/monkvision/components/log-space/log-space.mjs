import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const pageData = {
    logs: [
        {
            time: "00:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "01:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
          {
            time: "02:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        },
        {
            time: "03:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "04:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "05:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "06:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        },
        {
            time: "07:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "08:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 8",
        },{
            time: "09:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "10:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        },
        {
            time: "11:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "12:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "13:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        },
        {
            time: "14:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "15:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 8",
        },
        {
            time: "16:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 8",
        },
        {
            time: "17:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 4",
        },
        {
            time: "18:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "19:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        },
        {
            time: "20:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 5",
        },
        {
            time: "21:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 8",
        },
        {
            time: "22:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 3",
        },
        {
            time: "23:00",
            status: "DEV SERVER 139.59.3.40, device - centos-swap, Threshold at: 6",
        }
    ]
}
async function elementRendered(element) {
    populateLogs(element);
}

function populateLogs(element){
    const $$ = element? element.shadowRoot : log_space.shadowRoot;
    $$.querySelector('.bg text').innerHTML = pageData.name?? "Cycle Logs"
    if(pageData.logs && pageData.logs.length){
        const arr = pageData.logs;
        const content = $$.querySelector('.content');
        content.innerHTML = '';
        for(let i=0, l=arr.length; i<l; i++){
            content.insertAdjacentHTML('beforeend', `
            <div>
                <span class="time">${arr[i].time}</span>
                <svg class="lines" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="16.666" x2="100" y2="16.666" stroke="white"></line>
                <circle cx="94" cy="16.666" r="6" fill="white"></circle>
                <line x1="35" y1="54" x2="95" y2="54" stroke="white"></line>
                <line x1="35" y1="90.333" x2="95" y2="90.333" stroke="white"></line>
                <line x1="94" y1="0" x2="94" y2="100" stroke="white"></line>
                </svg>
                <p class="status">${arr[i].status}</p>
            </div>
            `)
        }
    }
}


export const log_space = { trueWebComponentMode:true,elementRendered}
monkshu_component.register("log-space", `${COMPONENT_PATH}/log-space.html`, log_space);
