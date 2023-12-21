import { page_generator } from "../page-generator/page-generator.mjs";
import { main } from "../../js/main.mjs";

async function elementRendered(element) {
    populateItems(element);
}

async function populateItems(element){
    main.querySelector(element, '#content').innerHTML = await getContent(element);
    main.querySelector(element, 'foreignObject .flex-container').innerHTML = await getTabs(element);
}

async function getTabs(el){
    let items  = await main.getFile(el);
    let htmlParts = [];
    let staticPt = `onclick="monkshu_env.components['group-b'].select(this)"  class="flex-item`;
    for(let [ix, i] of Object.keys(items).entries()){
        htmlParts.push(`<div id="bt${ix}" title="${items[i]["title"]}" subtitle="${items[i]["subtitle"]}" ${staticPt}${ix===0? ' selected"' : '"'}><p>${i}</p></div>`);
    }
    setTitle(el, items[Object.keys(items)[0]]["title"], items[Object.keys(items)[0]]["subtitle"]);
    return htmlParts.join('');
}
async function getContent(el){
    let items = await main.getFile(el);
    let htmlParts = [];
    for(let [ix, i] of Object.keys(items).entries()){
        let child = items[i].html;
        htmlParts.push(`<div id="it${ix}" class="flex-item${ix===0? ' selected' : ''}"><${child} ${await Promise.all(Object.keys(items[i]).map(async attr=> `${attr}="${await page_generator.evalAttrValue(items[i][attr])}"`)).then(_=> _.join(" "))}></${child}></div>`);
    }
    return htmlParts.join("");
}

function select(el){
    const [c, p1, p2]=['selected','foreignObject','#content'];
    const prevSelection = main.querySelector(el, `${p1} .${c}`);
    if(el.tagName==="path"){
        let curr = Number(prevSelection.id.substr(2));
        el.getAttribute('id')==='prev'? curr-=1 : curr+=1;
        curr = main.querySelector(el, `${p1} div#bt${curr}`);
        if(curr) el = curr; else return;
    }
    let [id, title, subtitle] = ['id', 'title', 'subtitle'].map(attr => el.getAttribute(attr));
    id = id.substr(2);

    prevSelection.classList.remove(c);
    main.querySelector(el, `${p1} div#bt${id}`).classList.add(c);
    main.querySelector(el, `${p2} .${c}`).classList.remove(c);
    main.querySelector(el, `${p2} div#it${id}`).classList.add(c);
    setTitle(el, title, subtitle);
    changeOpacityOfPaths(el,+id);
}

function setTitle(el, title, subtitle){
    let textBoxes = main.querySelector(el, `text`, 1);
    textBoxes[0].innerHTML = title; textBoxes[1].innerHTML = subtitle;
}

async function changeOpacityOfPaths(el, id){
    let prev=main.querySelector(el, 'path#prev'), next=main.querySelector(el, 'path#next');
    const setOpc = (path, dim=false) => path.setAttribute('opacity', dim? '0.6': '1');
    const len = Object.keys(await main.getFile(group_b.getHostElement(el))).length;
    if(!len) return [prev, next].forEach(p => setOpc(p, true));
    switch(id){
        case 0: setOpc(prev, true); break;
        case len-1: setOpc(next, true); break;
        default: [prev, next].forEach(p => setOpc(p));
    }
}

export const group_b = {trueWebComponentMode:true, trueJS:false, elementRendered, select};