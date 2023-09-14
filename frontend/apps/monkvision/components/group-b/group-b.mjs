import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
import { page_generator } from "../page-generator/page-generator.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

async function elementRendered(element) {
    populateItems(element);
}
function getShadowRoot(ctx){
    if(ctx.tagName == 'GROUP-B') return ctx.shadowRoot;
    else return ctx.getRootNode();
}
function querySelector(ctx, q , all=false){
    return all? getShadowRoot(ctx).querySelectorAll(q) : getShadowRoot(ctx).querySelector(q);
}
async function populateItems(element){
    querySelector(element, '#content').innerHTML = await getContent(element);
    querySelector(element, 'foreignObject .flex-container').innerHTML = await getTabs(element);
}

async function getFile(el){
    try {
        let items  = await $$.requireJSON(el.getAttribute("file"), false);
        return items;
    } catch (er) {
        console.log(er);
        return ({});
    }
}

async function getTabs(el){
    let items  = await getFile(el);
    let htmlParts = [];
    let staticPt = `onclick="monkshu_env.components['group-b'].select(this)"  class="flex-item`;
    for(let [ix, i] of Object.keys(items).entries()){
        htmlParts.push(`<div id="bt${ix}" title="${items[i]["title"]}" subtitle="${items[i]["subtitle"]}" ${staticPt}${ix===0? ' selected"' : '"'}><p>${i}</p></div>`);
    }
    console.log(Object.keys(items));
    setTitle(el, items[Object.keys(items)[0]]["title"], items[Object.keys(items)[0]]["subtitle"]);
    return htmlParts.join('');
}
async function getContent(el){
    let items = await getFile(el);
    let htmlParts = [];
    for(let [ix, i] of Object.keys(items).entries()){
        let child = items[i].html; delete items[i].html;
        htmlParts.push(`<div id="it${ix}" class="flex-item${ix===0? ' selected' : ''}"><${child} ${await Promise.all(Object.keys(items[i]).map(async attr=> `${attr}="${await page_generator.evalAttrValue(items[i][attr])}"`)).then(_=> _.join(" "))}></${child}></div>`);
    }
    return htmlParts.join("");
}

function select(el){
    alert("select clicked")
    let [id, title, subtitle] = ['id', 'title', 'subtitle'].map(attr => el.getAttribute(attr));
    id = id.substr(2);

    const [c, p1, p2]=['selected','foreignObject','#content'];
    querySelector(el, `${p1} .${c}`).classList.remove(c);
    querySelector(el, `${p1} div#bt${id}`).classList.add(c);
    querySelector(el, `${p2} .${c}`).classList.remove(c);
    querySelector(el, `${p2} div#it${id}`).classList.add(c);
    setTitle(el, title, subtitle);
}

function setTitle(el, title, subtitle){
    let textBoxes = querySelector(el, `text`, 1);
    textBoxes[0].innerHTML = title; textBoxes[1].innerHTML = subtitle;
}


export const group_b = {trueWebComponentMode:true, elementRendered, select};
monkshu_component.register("group-b", `${COMPONENT_PATH}/group-b.html`, group_b);