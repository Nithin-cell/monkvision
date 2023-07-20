import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const pageData = {
    name: "All cards",
    selectedItem: 0,
    items: [
        {
          mainTitle: "Reads/sec",
          data: "89/s",
          innerTitle: "DISK",
          percentage: "88",
          color: "rgba(88, 34, 98, 0.8)",
          warningColour: "rgba(50, 56, 76, 1)"
        },
        {
          mainTitle: "Reads/sec",
          data: "42/s",
          innerTitle: "NETWORK",
          percentage: "65",
          color: "rgba(183, 201, 8, 0.8)"
        },
        {
          mainTitle: "Reads/sec",
          data: "76/s",
          innerTitle: "DATABASE",
          percentage: "92",
          color: "rgba(216, 56, 193, 0.8)",
          warningColour: "rgba(99, 78, 169, 1)"
        },
        {
          mainTitle: "Reads/sec",
          data: "51/s",
          innerTitle: "CACHE",
          percentage: "33",
          color: "rgba(42, 195, 17, 0.8)",
          warningColour: "rgba(241, 87, 67, 1)"
        },
        {
          mainTitle: "Writes/sec",
          data: "67/s",
          innerTitle: "DISK",
          percentage: "42",
          color: "rgba(189, 58, 231, 0.8)"
        },
        {
          mainTitle: "Writes/sec",
          data: "23/s",
          innerTitle: "NETWORK",
          percentage: "74",
          color: "rgba(85, 171, 51, 0.8)"
        },
        {
          mainTitle: "Writes/sec",
          data: "98/s",
          innerTitle: "DATABASE",
          percentage: "60",
          color: "rgba(23, 198, 212, 0.8)",
          warningColour: "rgba(157, 25, 57, 1)"
        },
        {
          mainTitle: "Writes/sec",
          data: "34/s",
          innerTitle: "CACHE",
          percentage: "85",
          color: "rgba(236, 46, 83, 0.8)",
          warningColour: "rgba(58, 134, 205, 1)"
        },
        {
          mainTitle: "Latency",
          data: "52 ms",
          innerTitle: "DISK",
          percentage: "72",
          color: "rgba(172, 107, 228, 0.8)",
          warningColour: "rgba(226, 191, 32, 1)"
        },
        {
          mainTitle: "Latency",
          data: "82 ms",
          innerTitle: "NETWORK",
          percentage: "47",
          color: "rgba(99, 229, 77, 0.8)"
        },
        {
          mainTitle: "Latency",
          data: "37 ms",
          innerTitle: "DATABASE",
          percentage: "55",
          color: "rgba(12, 115, 120, 0.8)",
          warningColour: "rgba(210, 61, 127, 1)"
        },
        {
          mainTitle: "Latency",
          data: "68 ms",
          innerTitle: "CACHE",
          percentage: "90",
          color: "rgba(251, 180, 109, 0.8)"
        },
        {
          mainTitle: "CPU Usage",
          data: "76",
          innerTitle: "DISK",
          percentage: "62",
          color: "rgba(182, 51, 37, 0.8)",
          warningColour: "rgba(123, 192, 81, 1)"
        },
        {
          mainTitle: "CPU Usage",
          data: "41",
          innerTitle: "NETWORK",
          percentage: "80",
          color: "rgba(240, 97, 164, 0.8)"
        },
        {
          mainTitle: "CPU Usage",
          data: "92",
          innerTitle: "DATABASE",
          percentage: "39",
          color: "rgba(109, 191, 189, 0.8)",
          warningColour: "rgba(33, 87, 228, 1)"
        },
        {
          mainTitle: "CPU Usage",
          data: "58",
          innerTitle: "CACHE",
          percentage: "73",
          color: "rgba(198, 99, 34, 0.8)",
          warningColour: "rgba(65, 161, 187, 1)"
        },
        {
          mainTitle: "Memory Usage",
          data: "33",
          innerTitle: "DISK",
          percentage: "81",
          color: "rgba(116, 41, 168, 0.8)"
        },
        {
          mainTitle: "Memory Usage",
          data: "89",
          innerTitle: "NETWORK",
          percentage: "52",
          color: "rgba(53, 174, 219, 0.8)",
          warningColour: "rgba(181, 60, 59, 1)"
        },
        {
          mainTitle: "Memory Usage",
          data: "45",
          innerTitle: "DATABASE",
          percentage: "68",
          color: "rgba(225, 231, 85, 0.8)"
        },
        {
          mainTitle: "Memory Usage",
          data: "77",
          innerTitle: "CACHE",
          percentage: "95",
          color: "rgba(84, 95, 207, 0.8)",
          warningColour: "rgba(155, 132, 24, 1)"
        },
        {
        mainTitle: "Reads/sec",
        data: "51/s",
        innerTitle: "CACHE",
        percentage: "33",
        color: "rgba(42, 195, 17, 0.8)",
        warningColour: "rgba(241, 87, 67, 1)"
        },
        {
        mainTitle: "Writes/sec",
        data: "67/s",
        innerTitle: "DISK",
        percentage: "42",
        color: "rgba(189, 58, 231, 0.8)"
        },
        {
        mainTitle: "Writes/sec",
        data: "23/s",
        innerTitle: "NETWORK",
        percentage: "74",
        color: "rgba(85, 171, 51, 0.8)"
        },
        {
        mainTitle: "Writes/sec",
        data: "98/s",
        innerTitle: "DATABASE",
        percentage: "60",
        color: "rgba(23, 198, 212, 0.8)",
        warningColour: "rgba(157, 25, 57, 1)"
        },
        {
        mainTitle: "Writes/sec",
        data: "34/s",
        innerTitle: "CACHE",
        percentage: "85",
        color: "rgba(236, 46, 83, 0.8)",
        warningColour: "rgba(58, 134, 205, 1)"
        },
        {
        mainTitle: "Latency",
        data: "52 ms",
        innerTitle: "DISK",
        percentage: "72",
        color: "rgba(172, 107, 228, 0.8)",
        warningColour: "rgba(226, 191, 32, 1)"
        },
        {
        mainTitle: "Latency",
        data: "82 ms",
        innerTitle: "NETWORK",
        percentage: "47",
        color: "rgba(99, 229, 77, 0.8)"
        },
        {
        mainTitle: "Latency",
        data: "37 ms",
        innerTitle: "DATABASE",
        percentage: "55",
        color: "rgba(12, 115, 120, 0.8)",
        warningColour: "rgba(210, 61, 127, 1)"
        },
        {
        mainTitle: "Latency",
        data: "68 ms",
        innerTitle: "CACHE",
        percentage: "90",
        color: "rgba(251, 180, 109, 0.8)"
        },
        {
        mainTitle: "CPU Usage",
        data: "76",
        innerTitle: "DISK",
        percentage: "62",
        color: "rgba(182, 51, 37, 0.8)",
        warningColour: "rgba(123, 192, 81, 1)"
        },
        {
        mainTitle: "CPU Usage",
        data: "41",
        innerTitle: "NETWORK",
        percentage: "80",
        color: "rgba(240, 97, 164, 0.8)"
        },
        {
        mainTitle: "CPU Usage",
        data: "92",
        innerTitle: "DATABASE",
        percentage: "39",
        color: "rgba(109, 191, 189, 0.8)",
        warningColour: "rgba(33, 87, 228, 1)"
        },
        {
        mainTitle: "CPU Usage",
        data: "58",
        innerTitle: "CACHE",
        percentage: "73",
        color: "rgba(198, 99, 34, 0.8)",
        warningColour: "rgba(65, 161, 187, 1)"
        }
    ]
}
async function elementRendered(element) {
    populateCards(element);
}

function populateCards(element){
    const $$ = element? element.shadowRoot : card_view.shadowRoot;
    $$.querySelector('.bg text').innerHTML = pageData.name?? "Servers"
    if(pageData.items && pageData.items.length){
        const arr = pageData.items;
        const container = $$.querySelector('.flex-container');
        container.innerHTML = '';
        let l=arr.length;
        for(let i=0; i<l; i++){
            container.insertAdjacentHTML('beforeend', 
            `
            <div class="flex-child${i==pageData.selectedItem? ' selected':''}" ix="${i}" onclick="monkshu_env.components['card-view'].selectItemHandler(this)">${getGlowingArc(arr[i], i==pageData.selectedItem? 1: 0.6)}</div>
            `);
        }
        if(l>6){
            $$.querySelector('.bg #next').parentElement.setAttribute('opacity', 1);
        }
    }
}

function scrollFlex(path, flag){
    console.log("hre")
    const flexContainer = card_view.shadowRoot.querySelector('.flex-container');
    let width = flexContainer.offsetWidth;
    width = (0.9)*width;
    flexContainer.scrollBy({
        left: flag*width,
        behavior: "smooth"
    })
}


function getGlowingArc(card){
    return `
    <glowing-arc ${Object.keys(card).map(k=>`${k}="${card[k]}"`).join(' ')}></glowing-arc>
    `
}

function scrollEndHandler(cont){
    const prev = card_view.shadowRoot.querySelector('.bg #prev').parentElement;
    const next = card_view.shadowRoot.querySelector('.bg #next').parentElement;
    if(cont.scrollLeft == 0)
        prev.setAttribute('opacity', '0.6');
    else if(cont.scrollLeft >=  cont.scrollWidth - cont.clientWidth)
        next.setAttribute('opacity', '0.6');
    else{
        prev.setAttribute('opacity', '1');
        next.setAttribute('opacity', '1');
    }
}

function selectItemHandler(el, parent){
  const newSelection = el.getAttribute('ix');
  if(parent){
    const prevSelection = monkshu_env.components[parent].shadowRoot.querySelector(`.selected.flex-item`);
    prevSelection?.classList.remove('selected');
    const prevSelection_ = card_view.shadowRoot.querySelector(`.selected.flex-child`);
    prevSelection_?.classList.remove('selected');
    card_view.shadowRoot.querySelector(`[ix="${newSelection}"].flex-child`)?.classList.add('selected');
  }else{
    const prevSelection_ = card_view.shadowRoot.querySelector(`.selected.flex-child`);
    prevSelection_?.classList.remove('selected');
  }
  el.classList.add('selected');
  pageData.selectedItem = newSelection;
}


function openModal() {
  const document = card_view.shadowRoot;
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content')
  const closeBtn = document.querySelector('#closeModal')
  const backdrop = document.querySelector('.backdrop');
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  modalContent.innerHTML = '<all-cards></all-cards>';
  setTimeout(() => {
    modal.style.cssText = modal.style.cssText + 'width: 70%; height: 80%;';
  }, 50);
  setTimeout(()=>{
    document.querySelector('#closeModal').style.display = 'flex';
    document.querySelector('.header').style.display = 'flex'
  }, 500);
  closeBtn.onclick = closeModal;
  backdrop.onclick = closeModal;
}

function closeModal() {
  const document = card_view.shadowRoot;
  const modal = document.querySelector('.modal');
  document.querySelector('#closeModal').style.display = 'none';
  document.querySelector('.header').style.display = 'none'
  modal.style.cssText = modal.style.cssText + 'width: 0%; height: 0%;';
  setTimeout(() => {
    modal.style.display = 'none';
    document.querySelector('.backdrop').style.display = 'none';
  }, 500);
}

export const card_view = { trueWebComponentMode:true,elementRendered, scrollFlex, scrollEndHandler, selectItemHandler, pageData, openModal}
monkshu_component.register("card-view", `${COMPONENT_PATH}/card-view.html`, card_view);