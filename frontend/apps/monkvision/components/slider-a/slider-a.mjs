import { main } from "./../../js/main.mjs";
import { chart_box } from "../chart-box/chart-box.mjs";

async function elementConnected(el) {
    populateClusters(el);
}

async function populateClusters(el){
    let pageData = await chart_box._getContent(el.getAttribute('api'), el.getAttribute('params'));
    pageData.selectedItem=0; //start with 0
    try {
        await slider_a.bindData(pageData, el.id);
    } catch (error) {
        await slider_a.bindData(pageData, el.id);
    }
    selectItemHandler(main.querySelector(el, `#main #sub div[ix='0']`));
}

function showSelectedItem(el){
    el.classList.add('stdItem');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    const cont = main.querySelector(el, '#main #selected');
    const lastDiv = cont.lastElementChild;
    if (!lastDiv.classList.contains('fc-bg')) cont.removeChild(lastDiv);
    cont.insertAdjacentHTML('beforeend' ,el.outerHTML);
    el.style.display = 'none';
}

function getElement(q){
    return slider_a.shadowRoot.querySelector(q);
}

function removeSelection(el){
    const item = main.querySelector(el, `#main #sub div.stdItem`)
    if(item){
        item.style.display = 'flex';
        item.classList.remove('stdItem');
    }
}

function scrollFlex(path, flag){
    const flex = main.querySelector(path, `#main #sub`);
    let width = flex.offsetWidth;
    width = (-0.9)*width;
    flex.scrollBy({
        left: flag*width,
        behavior: "smooth"
    })
}

function scrollEndHandler(box){
    const [prev, next] = ['prev', 'next'].map(q=>main.querySelector(box, `.bg path#${q}`).parentElement);
    const [attr, dim, bright] = ['opacity', '0.6', '1'];
    if(box.scrollLeft == 0)
        prev.setAttribute(attr, dim);
    else if(box.scrollLeft >=  box.scrollWidth - box.clientWidth - 2)
        next.setAttribute(attr, dim);
    else{
        prev.setAttribute(attr, bright);
        next.setAttribute(attr, bright);
    }
}

function selectItemHandler(el){
    if(el.parentElement.getAttribute('id').startsWith('sel')) return;
    removeSelection(el);
    showSelectedItem(el);
    
    let pageData = slider_a.getData(slider_a.getHostElementID(el));
    pageData.selectedItem = el.getAttribute('ix');
    slider_a.setDataByContainedElement(el, pageData);
}

function _refresh() { 
	for (const element of slider_a.getAllElementInstances()) populateClusters(element);
}

export const slider_a = { trueWebComponentMode:true, trueJS:false,elementConnected, scrollFlex, scrollEndHandler, selectItemHandler, _refresh}