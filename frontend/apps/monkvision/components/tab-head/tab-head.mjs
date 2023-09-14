import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);
import {i18n} from "/framework/js/i18n.mjs";
import {session} from "/framework/js/session.mjs";

const pageData = {
    selectedItem: 0,
    st: 0,
    tabs: [
      {
        title: "DB and OS LEVEL METRICS",
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "44",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "SECURITY LEVEL METRICS",
        outlineColor: "rgba(255, 32, 2, 1)",
        outerColor: "rgba(255, 32, 2, 0.8)",
        outerCircle: "rgba(255, 32, 2, 1)",
        percentage: "20",
        color: "rgba(255, 32, 2, 0.9)",
      },
      {
        title: "NODE LEVEL METRICS",
        outlineColor: "rgba(255, 32, 2, 1)",
        outerColor: "rgba(255, 32, 2, 0.8)",
        outerCircle: "rgba(255, 32, 2, 1)",
        percentage: "20",
        color: "rgba(255, 32, 2, 0.9)",
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "20",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "35",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        outlineColor: "rgba(255, 156, 7, 1)",
        outerColor: "rgba(255, 156, 7, 0.8)",
        outerCircle: "rgba(255, 156, 7, 1)",
        percentage: "25",
        color: "rgba(255, 156, 7, 0.9)",
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "30",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "20",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        outlineColor: "rgba(255, 156, 7, 1)",
        outerColor: "rgba(255, 156, 7, 0.8)",
        outerCircle: "rgba(255, 156, 7, 1)",
        percentage: "25",
        color: "rgba(255, 156, 7, 0.9)",
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "30",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "30",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "35",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        outlineColor: "rgba(255, 32, 2, 1)",
        outerColor: "rgba(255, 32, 2, 0.8)",
        outerCircle: "rgba(255, 32, 2, 1)",
        percentage: "20",
        color: "rgba(255, 32, 2, 0.9)",
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "20",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        
        outerColor: "rgba(217, 217, 217, 0.8)",
        outerCircle: "white",
        percentage: "35",
        color: "rgba(71, 196, 251, 0.5)"
      },
      {
        title: "DB and OS LEVEL METRICS",
        outlineColor: "rgba(255, 32, 2, 1)",
        outerColor: "rgba(255, 32, 2, 0.8)",
        outerCircle: "rgba(255, 32, 2, 1)",
        percentage: "20",
        color: "rgba(255, 32, 2, 0.9)",
      },
    ]
  }

async function getDashboardData(){
  const dashboardsRaw = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/dashboards.json`);
  const dashboards = []; pageData.tabs = dashboards;
  for (const key of Object.keys(dashboardsRaw)) {
    const file = dashboardsRaw[key].split(",")[0], refresh = parseInt(dashboardsRaw[key].split(",")[1].split(":")[1]), nodelist = JSON.parse(dashboardsRaw[key].split(",")[2].split(":")[1]),
    name = await i18n.get(`name_${key}`, session.get($$.MONKSHU_CONSTANTS.LANG_ID)), title = await i18n.get(`title_${key}`, session.get($$.MONKSHU_CONSTANTS.LANG_ID));
    const dataForModal = {
      outerColor: `rgba(${Math.random()*300 % 256}, ${Math.random()*300 % 256}, ${Math.random()*300 % 256}, 0.8)`,
      outerCircle: "white",
      percentage: `${Math.random()*200 % 100}`,
      color: `rgba(${Math.random()*300 % 256}, ${Math.random()*300 % 256}, ${Math.random()*300 % 256}, 0.5)`
    }
    dashboards.push({ name, file, refresh, title, id: key, nodelist , ...dataForModal});
  }
}

async function elementRendered(element) {
    await getDashboardData();
    populateTabs(element);
}

function populateTabs(element){
    const $$ = element? element.shadowRoot : tab_head.shadowRoot;
    if(pageData.tabs && pageData.tabs.length){
        const arr = pageData.tabs;
        const content = $$.querySelectorAll('foreignObject div.fc');
        let j = 0;
        for(let i=0; i<6; i++) content[i].innerHTML = '';
        for(let i=pageData.st, l=arr.length; i<l && i<pageData.st + 6; i++){
            content[j].innerHTML = getTabSvg(content[j], arr[i], i);
            j++;
        }
        setTitle();
        setLineHead();
        setNavButtons();
    }
}

function shift(shift){
    shift = +shift;
    if(pageData.st == 0 && shift<0 || pageData.st >= (pageData.tabs.length - 6) && shift>0) return;
    else {
      pageData.st = pageData.st + shift;
      populateTabs();
    }
}

function setNavButtons(){
    const $$ = tab_head.shadowRoot;
    const p = $$.getElementById('prev'); const n = $$.getElementById('next');
    let a = pageData.st==0;
    let b = pageData.st + 6>= pageData.tabs.length;
    if(a) p.style.opacity = '0.4';
    if(b) n.style.opacity = '0.4';
    if(a || b) return;
    p.style.opacity = '1';
    n.style.opacity = '1';
}

function getTabSvg(div, tab, i){
    div.setAttribute('ix', i);
    div.setAttribute('title', tab.title);
    return `<svg viewBox="129.06 59.49 57.879 34.51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-opacity="${i==pageData.selectedItem? 1 : 0.3}" stroke="${tab.outlineColor?? 'white'}" d="M169.111 69.818C168.267 68.9741 167.122 68.5 165.929 68.5H134.071C130.062 68.5 128.054 73.3471 130.889 76.182L146.889 92.182C147.733 93.0259 148.878 93.5 150.071 93.5H181.929C185.938 93.5 187.946 88.6529 185.111 85.818L169.111 69.818Z" fill="#D9D9D9"/>
    ${tab.outlineColor? `<path fill="${tab.outlineColor}" fill-rule="evenodd" clip-rule="evenodd" d="M175.38 69.9196L170.68 61.2196C170.093 60.1585 168.976 59.5 167.763 59.5C166.55 59.5 165.433 60.1585 164.846 61.2196L160.071 69.9113C159.51 70.9435 159.534 72.1949 160.134 73.2051C160.734 74.2152 161.821 74.8349 162.996 74.8363H172.446C173.62 74.8363 174.708 74.2189 175.309 73.2108C175.91 72.2027 175.937 70.9526 175.38 69.9196ZM167.046 65.1196C167.046 64.7744 167.326 64.4946 167.671 64.4946C168.016 64.4946 168.296 64.7744 168.296 65.1196V67.6946C168.296 68.0398 168.016 68.3196 167.671 68.3196C167.326 68.3196 167.046 68.0398 167.046 67.6946V65.1196ZM167.68 70.7446C168.025 70.7446 168.305 70.4648 168.305 70.1196L168.296 70.1113C168.296 69.7707 168.02 69.4946 167.68 69.4946C167.336 69.4991 167.059 69.7763 167.055 70.1196C167.055 70.4648 167.334 70.7446 167.68 70.7446Z"/>` : ''}
    </svg>`
}

function selectItemHandler(el){
  if(typeof el == "string"){
    if(pageData.selectedItem - 5 >=0) pageData.st = pageData.selectedItem - 5;
    else pageData.st = Math.max(pageData.selectedItem - 5, 0);
    populateTabs();
  }
  else{
    el = el.target.closest('div.fc');
    const $$ = tab_head.shadowRoot;
    const prevSelection = $$.querySelector(`div[ix='${pageData.selectedItem}']`);
    prevSelection?.querySelector('path').setAttribute('fill-opacity', '0.3');
    el.querySelector('path').setAttribute('fill-opacity', '1');
    pageData.selectedItem = el.getAttribute('ix');
    setLineHead();
  }
  setTitle();
  document.getElementById("maincontent").innerHTML = `<page-generator file="./dashboards/${pageData.tabs[pageData.selectedItem].file}"></page-generator>`
}

function setTitle(){
  const title = tab_head.shadowRoot.querySelector('text#title');
  title.innerHTML = pageData.tabs[pageData.selectedItem].title;
}

function setLineHead(){
  const $$ = tab_head.shadowRoot;
  const head = $$.querySelector('path#pHead');
  const line = $$.querySelector('path#pLine');
  let dev = pageData.selectedItem - pageData.st;
  if(dev<0 || dev>5){
      M('fill', 'none', 1);
      M('d', `M45 41 H${dev<0? 759 : 1066.5}`, 0);
  }
  else{
      dev = 61.5*dev;
      M('fill', 'white', 1);
      M('transform', `translate(${dev})`, 1);
      M('d', `M45 41 H${759+dev}`, 0);
  }
  function M(a, b, c){
    (c? head : line).setAttribute(a, b);
  }
}

function openModal() {
  const $$ = tab_head.shadowRoot;
  const modal = $$.querySelector('.modal');
  const modalContent = $$.querySelector('.modal-content')
  const closeBtn = $$.querySelector('#closeModal')
  const backdrop = $$.querySelector('.backdrop');
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  modalContent.innerHTML = '<all-tabs></all-tabs>';
  setTimeout(() => {
    modal.style.cssText = modal.style.cssText + 'width: 70%; height: 80%; opacity: 1';
  }, 50);
  setTimeout(()=>{
    $$.querySelector('#closeModal').style.display = 'flex';
    $$.querySelector('.header').style.display = 'flex'
  }, 500);
  closeBtn.onclick = closeModal;
  backdrop.onclick = closeModal;
}

function closeModal() {
  const $$ = tab_head.shadowRoot;
  const modal = $$.querySelector('.modal');
  $$.querySelector('#closeModal').style.display = 'none';
  $$.querySelector('.header').style.display = 'none'
  modal.style.cssText = modal.style.cssText + 'width: 3.5%; height: 4%; opacity: 0.1';
  setTimeout(() => {
    modal.style.display = 'none';
    $$.querySelector('.backdrop').style.display = 'none';
  }, 500);
}


export const tab_head = { trueWebComponentMode:true,elementRendered, selectItemHandler, shift, openModal, pageData}
monkshu_component.register("tab-head", `${COMPONENT_PATH}/tab-head.html`, tab_head);
