import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const pageData = {
    name: "Servers",
    shift: 0,
    items: [
        {
            ip: "139.24.26.247:23",
            type: "SERVER"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER",
            warningColor: "red"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER",
            warningColor: "yellow"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER",
            warningColor: "green"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER",
            warningColor: "yellow"
        },
        {
            ip: "133.25.26.24:22",
            type: "SERVER"
        },
    ]
}
async function elementRendered(element) {
    populateServers(element);
}

function populateServers(element){
    const $$ = element? element.shadowRoot : all_servers.shadowRoot;
    $$.querySelector('.bg text').innerHTML = pageData.name?? "Servers"
    if(pageData.items && pageData.items.length){
        const arr = pageData.items;
        const container = $$.querySelector('.flex-container');
        container.innerHTML = '';
        let l=arr.length;
        for(let i=0; i<l; i++){
            container.insertAdjacentHTML('beforeend', 
            `
            <div class="flex-child">${getServer(arr[i], i!=0? 0.6: 1)}</div>
            `);
        }
        if(l>5){
            $$.querySelector('#next').parentElement.setAttribute('opacity', 1);
        }
    }
}

function scrollFlex(path, flag){
    if(flag < 0){
        if(Math.abs(pageData.shift) + 5 >= pageData.items.length) return;
    }
    else{
        if(pageData.shift>=0) return;
    }
    const $$ = all_servers.shadowRoot;
    const flexContainer = $$.querySelector('.flex-container');
    if(flag<0){
        pageData.shift = pageData.shift - 1;
        let parent = flexContainer.querySelector('.large-child');
        let nextSib = parent.nextElementSibling;
        while(nextSib){
            try{
                parent.removeChild(parent.querySelector('glowing-arc'));
            } catch(e){

            }
            parent.appendChild(nextSib.querySelector('glowing-arc'));
            parent = nextSib;
            nextSib = nextSib.nextElementSibling;
        }
        let nextArc = pageData.items[Math.abs(pageData.shift)+4];
        try {
            parent.removeChild(parent.querySelector('glowing-arc'));
        } catch (e) {
            
        }
        parent.insertAdjacentHTML('beforeend', `<glowing-arc parent="clusters" ${Object.keys(nextArc).map(k=>`${k}="${nextArc[k]}"`).join(' ')}></glowing-arc>`);
    }
    else{
        pageData.shift = pageData.shift + 1;
        let parent = flexContainer.querySelector('.flex-child:nth-child(5)');
        let prevSib = parent.previousElementSibling;
        while(prevSib){
            try {
                parent.removeChild(parent.querySelector('glowing-arc'));
            } catch (e) {
                
            }
            parent.appendChild(prevSib.querySelector('glowing-arc'));
            parent = prevSib;
            prevSib = parent.previousElementSibling;
        }
        let prevArc = pageData.items[Math.abs(pageData.shift)];
        parent.insertAdjacentHTML('beforeend', `<glowing-arc parent="clusters" ${Object.keys(prevArc).map(k=>`${k}="${prevArc[k]}"`).join(' ')}></glowing-arc>`);
    }
    let prevPossible = Math.abs(pageData.shift) + 5 < pageData.items.length;
    let nextPossible = pageData.shift<0;
    $$.querySelector('#prev').parentElement.setAttribute('opacity', prevPossible? 1 : 0.6);
    $$.querySelector('#next').parentElement.setAttribute('opacity', nextPossible? 1 : 0.6);
}


function getServer(obj, op){
    return `
    <svg viewBox="150 13 85 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="${op?? 1}">
    <path fill="snow" d="M194.094 46H199.938C205.888 46 207.375 44.5125 207.375 38.5625V29.6375C207.375 23.6875 205.888 22.2 199.938 22.2H195.475C193.987 22.2 193.669 21.7537 193.095 21.01L190.864 18.035C190.014 16.9087 189.525 16.25 187.294 16.25H185.062C179.113 16.25 177.625 17.7375 177.625 23.6875V38.5625C177.625 44.5125 179.113 46 185.062 46H190.906V52.375C190.906 52.4813 190.949 52.5662 190.97 52.6725C189.865 53.0975 188.973 53.99 188.548 55.095C188.441 55.0738 188.356 55.0312 188.25 55.0312H179.75C178.879 55.0312 178.156 55.7537 178.156 56.625C178.156 57.4963 178.879 58.2188 179.75 58.2188H188.25C188.356 58.2188 188.441 58.1762 188.548 58.155C189.164 59.7487 190.694 60.875 192.5 60.875C194.306 60.875 195.836 59.7487 196.452 58.155C196.559 58.1762 196.644 58.2188 196.75 58.2188H205.25C206.121 58.2188 206.844 57.4963 206.844 56.625C206.844 55.7537 206.121 55.0312 205.25 55.0312H196.75C196.644 55.0312 196.559 55.0738 196.452 55.095C196.028 53.99 195.135 53.0975 194.03 52.6725C194.051 52.5662 194.094 52.4813 194.094 52.375V46Z"/>
    <text class="type" x="193" y="76" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="12">${obj.type}</text>
    <text x="193" y="90" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11">${obj.ip}</text>
    <path fill="${obj.warningColor?? 'none'}" fill-rule="evenodd" clip-rule="evenodd" d="M215.38 24.9196L210.68 16.2196C210.092 15.1585 208.975 14.5 207.763 14.5C206.55 14.5 205.433 15.1585 204.846 16.2196L200.071 24.9113C199.51 25.9435 199.534 27.1949 200.134 28.2051C200.734 29.2152 201.821 29.8349 202.996 29.8363H212.446C213.62 29.8363 214.707 29.2189 215.309 28.2108C215.91 27.2027 215.937 25.9526 215.38 24.9196ZM207.046 20.1196C207.046 19.7744 207.326 19.4946 207.671 19.4946C208.016 19.4946 208.296 19.7744 208.296 20.1196V22.6946C208.296 23.0398 208.016 23.3196 207.671 23.3196C207.326 23.3196 207.046 23.0398 207.046 22.6946V20.1196ZM207.68 25.7446C208.025 25.7446 208.305 25.4648 208.305 25.1196L208.296 25.1113C208.296 24.7707 208.02 24.4946 207.68 24.4946C207.336 24.4991 207.059 24.7763 207.055 25.1196C207.055 25.4648 207.334 25.7446 207.68 25.7446Z"/>
    </g>
    </svg>
    `
}

export const all_servers = { trueWebComponentMode:true,elementRendered, scrollFlex}
monkshu_component.register("all-servers", `${COMPONENT_PATH}/all-servers.html`, all_servers);