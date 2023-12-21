import { main } from "./../../js/main.mjs";
import { chart_box } from "../chart-box/chart-box.mjs";

async function elementConnected(element) {
    populateData(element);
}

async function populateData(element){
    let pageData = await chart_box._getContent(element.getAttribute('api'), element.getAttribute('params'));
    pageData.selectedItem=0; //start with 0
    try {
        await slider_b.bindData(pageData, element.id);
    } catch (error) {
        await slider_b.bindData(pageData, element.id);
    }
    selectItemHandler(main.querySelector(element, '[ix="0"].flex-child'));
}

function scrollFlex(path, flag){
    const flexContainer = main.querySelector(path, '.flex-container');
    let width = flexContainer.offsetWidth;
    width = (-0.9)*width;
    flexContainer.scrollBy({
        left: flag*width,
        behavior: "smooth"
    })
}

function scrollEndHandler(cont){
    const prev = main.querySelector(cont, '.bg #prev').parentElement;
    const next = main.querySelector(cont, '.bg #next').parentElement;
    if(cont.scrollLeft == 0)
        prev.setAttribute('opacity', '0.6');
    else if(cont.scrollLeft >=  cont.scrollWidth - cont.clientWidth - 2)
        next.setAttribute('opacity', '0.6');
    else{
        prev.setAttribute('opacity', '1');
        next.setAttribute('opacity', '1');
    }
}

function selectItemHandler(el){
    let pageData = slider_b.getData(slider_b.getHostElementID(el));
    const prevSelection = main.querySelector(el, `[ix="${pageData.selectedItem}"].flex-child`);
    prevSelection?.classList.remove('selected');
    prevSelection?.querySelector('g').setAttribute('opacity', '0.6');
    el.classList.add('selected');
    el.querySelector('g').setAttribute('opacity', '1');
    pageData.selectedItem = el.getAttribute('ix');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    slider_b.setDataByContainedElement(el, pageData);
}

function _refresh() { 
	for (const element of slider_b.getAllElementInstances()) populateData(element);
}

export const slider_b = { trueWebComponentMode:true, trueJS:false,elementConnected, scrollFlex, scrollEndHandler, selectItemHandler, _refresh}