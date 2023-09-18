import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
import { main } from "./../../js/main.mjs";
import { chart_box } from "../chart-box/chart-box.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

async function elementConnected(element) {
    populateCards(element);
}

async function populateCards(element){
    let pageData = await chart_box._getContent(element.getAttribute('api'), element.getAttribute('params'));
    pageData.selectedItem=0; //start with 0
    try {
        await card_view.bindData(pageData, element.id);
    } catch (error) {
        await card_view.bindData(pageData, element.id);
    }
    selectItemHandler(main.querySelector(element, '[ix="0"].flex-child')); //select 0th child
}

function scrollFlex(path, flag){
    const flexContainer = main.querySelector(path, '.flex-container');
    let width = flexContainer.offsetWidth;
    width = (0.9)*width;
    flexContainer.scrollBy({
        left: flag*width,
        behavior: "smooth"
    })
}

function scrollEndHandler(cont){
    const [prev, next] = ['.bg #prev', '.bg #next'].map(q => main.querySelector(cont, q).parentElement);
    const [attr, dim, bright] = ['opacity', '0.6', '1'];
    if(cont.scrollLeft == 0)
        prev.setAttribute(attr, dim);
    else if(cont.scrollLeft >=  cont.scrollWidth - cont.clientWidth)
        next.setAttribute(attr, dim);
    else{
        prev.setAttribute(attr, bright);
        next.setAttribute(attr, bright);
    }
}

function selectItemHandler(el, fromModal){
  let pageData = card_view.getData(el.getRootNode().host.id);
  const newSelection = el.getAttribute('ix');
  if(fromModal){
    const mainViewHost = el.getRootNode().host.getRootNode().host;
    const prevSelection = main.querySelector(el, `.selected.flex-item`);
    prevSelection?.classList.remove('selected');
    const prevSelection_ = main.querySelector(mainViewHost, `.selected.flex-child`);
    prevSelection_?.classList.remove('selected');
    el = main.querySelector(mainViewHost, `[ix="${newSelection}"].flex-child`);
    el?.classList.add('selected');
  }else{
    const prevSelection_ = main.querySelector(el, `.selected.flex-child`);
    prevSelection_?.classList.remove('selected');
  }
  el.classList.add('selected');
  pageData.selectedItem = newSelection;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  card_view.setDataByContainedElement(el, pageData);
}


function openModal(el) {
  const modal = main.querySelector(el, '.modal');
  const modalContent = main.querySelector(el, '.modal-content')
  const closeBtn = main.querySelector(el, '#closeModal')
  const backdrop = main.querySelector(el, '.backdrop');
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  modalContent.innerHTML = `<all-cards id='${card_view.getHostElementID(el)}'></all-cards>`;
  setTimeout(() => {
    modal.style.cssText = modal.style.cssText + 'width: 70%; height: 80%; opacity: 1;';
  }, 50);
  setTimeout(()=>{
    main.querySelector(el, '#closeModal').style.display = 'flex';
    main.querySelector(el, '.header').style.display = 'flex'
  }, 500);
  closeBtn.onclick = closeModal;
  backdrop.onclick = closeModal;
}

function closeModal() {
  const el = this;
  const modal = main.querySelector(el, '.modal');
  main.querySelector(el, '#closeModal').style.display = 'none';
  main.querySelector(el, '.header').style.display = 'none'
  modal.style.cssText = modal.style.cssText + 'width: 0%; height: 0%; opacity: 0';
  setTimeout(() => {
    modal.style.display = 'none';
    main.querySelector(el, '.backdrop').style.display = 'none';
  }, 500);
}

export const card_view = { trueWebComponentMode:true,elementConnected, scrollFlex, scrollEndHandler, selectItemHandler, openModal}
monkshu_component.register("card-view", `${COMPONENT_PATH}/card-view.html`, card_view);