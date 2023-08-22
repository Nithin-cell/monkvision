import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const pageData = {
    name: "Clusters",
    selectedItem: 0,
    items: [
        {
            data: "A",
            innerTitle: "CLUSTER",
            percentage: "80",
            innerSubtitle: "India",
            color: "#169632"
        },
        {
            data: "B",
            innerTitle: "CLUSTER",
            percentage: "50",
            innerSubtitle: "Japan",
            color: "#FF9C07",
            outlineColor: "#FF9C07"
        },
        {
            data: "C",
            innerTitle: "CLUSTER",
            percentage: "20",
            innerSubtitle: "America",
            color: "#FF2002",
            outlineColor: "#FF2002"
        },
        {
            data: "D",
            innerTitle: "CLUSTER",
            percentage: "50",
            innerSubtitle: "Philippines",
            color: "rgba(71, 196, 251, 0.5)"
        },
        {
            data: "E",
            innerTitle: "CLUSTER",
            percentage: "30",
            innerSubtitle: "India",
            color: "rgba(71, 196, 251, 0.5)"
        },
        {
            data: "F",
            innerTitle: "CLUSTER",
            percentage: "80",
            innerSubtitle: "India",
            color: "#169632",
            outlineColor: "#169632"
        },
        {
            data: "G",
            innerTitle: "ATTACKS",
            percentage: "47",
            innerSubtitle: "Gorakhpur",
            color: "turquoise",
        },
        {
            data: "H",
            innerTitle: "ATTACKS",
            percentage: "47",
            innerSubtitle: "Gorakhpur",
            color: "turquoise",
            warningColour: "turquoise"
        },
        {
            data: "I",
            innerTitle: "DEFENDS",
            percentage: "47",
            innerSubtitle: "Basti",
            color: "mediumpurple",
        },
    ]
}
async function elementRendered(element) {
    pageData.items = JSON.parse(element.getAttribute('content'))?? pageData.items;
    populateClusters(element);
}

function populateClusters(){
    getElement('.bg text').innerHTML = pageData.name?? "Clusters";
    if(pageData.items && pageData.items.length){
        const arr = pageData.items;
        const container = getElement('#main #sub');
        for(let i=0, l=arr.length; i<l; i++){
            container.insertAdjacentHTML('beforeend', 
            `
            <div ix="${i}" onclick="monkshu_env.components['all-clusters'].selectItemHandler(this)">
            <glowing-arc parent="clusters" ${Object.keys(arr[i]).map(k=>`${k}="${arr[i][k]}"`).join(' ')}></glowing-arc>
            </div>
            `);
        }
        showSelectedItem();
    }
}

function showSelectedItem(el){
    el = el?? getElement(`#main #sub div[ix='${pageData.selectedItem}']`)
    el.classList.add('stdItem');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    const cont = getElement('#main #selected');
    const lastDiv = cont.lastElementChild;
    if (!lastDiv.classList.contains('fc-bg')) cont.removeChild(lastDiv);
    cont.insertAdjacentHTML('beforeend' ,el.outerHTML);
    el.style.display = 'none';
    // getElement('#selected .stdItem').style.display = 'flex';
}

function getElement(q){
    return all_clusters.shadowRoot.querySelector(q);
}

function removeSelection(){
    const item = getElement(`#main #sub div[ix='${pageData.selectedItem}']`)
    if(item){
        item.style.display = 'flex';
        item.classList.remove('stdItem');
    }
}

function scrollFlex(path, flag){
    const flex = getElement(`#main #sub`);
    let width = flex.offsetWidth;
    width = (-0.9)*width;
    flex.scrollBy({
        left: flag*width,
        behavior: "smooth"
    })
}

function scrollEndHandler(box){
    const prev = all_clusters.shadowRoot.querySelector('.bg path#prev').parentElement;
    const next = all_clusters.shadowRoot.querySelector('.bg path#next').parentElement;
    if(box.scrollLeft == 0)
        prev.setAttribute('opacity', '0.6');
    else if(box.scrollLeft >=  box.scrollWidth - box.clientWidth)
        next.setAttribute('opacity', '0.6');
    else{
        prev.setAttribute('opacity', '1');
        next.setAttribute('opacity', '1');
    }
}

function selectItemHandler(el){
    removeSelection();
    pageData.selectedItem = el.getAttribute('ix');
    showSelectedItem(el);
}

export const all_clusters = { trueWebComponentMode:true,elementRendered, scrollFlex, scrollEndHandler, selectItemHandler}
monkshu_component.register("all-clusters", `${COMPONENT_PATH}/all-clusters.html`, all_clusters);