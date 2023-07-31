import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);
import {tab_head} from '../tab-head/tab-head.mjs'


async function elementRendered() {
  updateFragment();
}

function updateFragment(){
  const container = all_tabs.shadowRoot.querySelector('.cardsContainer');
  tab_head.pageData.tabs.forEach((tab, i)=>{
    container.insertAdjacentHTML('beforeend', `<div class='flex-item${i==tab_head.pageData.selectedItem? ' selected': ''}' ix='${i}' onclick="monkshu_env.components['all-tabs'].selectItemHandler(this)"><div>
    <svg class="container-svg" width="192" height="188" viewBox="0 0 192 188" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.8" d="M190.294 95.5002C190.846 95.5002 191.294 95.0521 191.288 94.4998C191.072 73.9838 184.204 54.081 171.703 37.7893C158.999 21.233 141.187 9.33121 121.029 3.92996C100.871 -1.4713 79.4947 -0.0701926 60.2145 7.91597C41.2424 15.7745 25.3436 29.577 14.8981 47.2362C14.617 47.7116 14.7811 48.3238 15.2594 48.6L23.7014 53.4739C24.1796 53.7501 24.7909 53.5856 25.0728 53.1106C34.2246 37.6908 48.1274 25.6385 64.7102 18.7696C81.6012 11.7731 100.329 10.5457 117.989 15.2776C135.648 20.0095 151.253 30.4364 162.383 44.941C173.31 59.181 179.324 76.57 179.54 94.4999C179.546 95.0521 179.993 95.5002 180.546 95.5002H190.294Z" fill="${tab.outerColor}"/>
      <path opacity="0.8" d="M1.69953 95.5001C1.14724 95.5001 0.698977 95.9482 0.704802 96.5005C0.921187 117.017 7.7887 136.919 20.2898 153.211C32.7908 169.503 50.2379 181.287 69.999 186.806C70.5309 186.955 71.0798 186.638 71.2227 186.104L73.7457 176.689C73.8886 176.155 73.5715 175.607 73.0398 175.458C55.7767 170.609 40.5367 160.299 29.61 146.059C18.6833 131.819 12.6693 114.43 12.4535 96.5004C12.4468 95.9482 11.9997 95.5001 11.4475 95.5001L1.69953 95.5001Z" fill="${tab.outerColor}"/>
      <path opacity="0.8" d="M119.777 187.104C119.92 187.638 120.47 187.954 121.001 187.806C144.549 181.229 164.648 165.807 177.095 144.764C177.376 144.289 177.212 143.676 176.734 143.4L168.292 138.526C167.813 138.25 167.202 138.415 166.92 138.89C156.032 157.235 138.499 170.688 117.961 176.458C117.429 176.607 117.112 177.155 117.254 177.688L119.777 187.104Z" fill="${tab.outerColor}"/>
      <path transform="translate(11.8, 11.35)" d="M165.707 101.972C163.412 112.637 159.04 122.746 152.838 131.721C146.637 140.696 138.729 148.362 129.565 154.281C120.402 160.2 110.162 164.256 99.4306 166.217C88.6994 168.179 77.6869 168.007 67.0219 165.713C56.3569 163.418 46.2483 159.046 37.2732 152.845C28.298 146.643 20.6322 138.735 14.7133 129.571C8.79447 120.408 4.7385 110.168 2.77698 99.4367C0.815471 88.7055 0.986838 77.693 3.2813 67.028C5.57576 56.363 9.94838 46.2544 16.1495 37.2793C22.3506 28.3041 30.2588 20.6383 39.4225 14.7194C48.5863 8.80058 58.8261 4.7446 69.5573 2.78309C80.2885 0.821575 91.301 0.992942 101.966 3.2874C112.631 5.58187 122.74 9.95449 131.715 16.1556C140.69 22.3567 148.356 30.2649 154.275 39.4286C160.193 48.5924 164.249 58.8322 166.211 69.5634C168.172 80.2946 168.001 91.3071 165.707 101.972L165.707 101.972Z" stroke="${tab.outerCircle?? 'white'}"/>
    </svg>
  <glowing-arc animate="1" parent="tab" ${tab.title? `innerTitle="${tab.title}"` : ``} ${tab.percentage? `percentage="${tab.percentage}"` : ``} ${tab.color? `color="${tab.color}"` : ``} ${tab.outlineColor? `outlineColor="${tab.outlineColor}" warningcolour="${tab.outlineColor}"` : ``}></glowing-arc></div>
  </div>
  `);
  });
}


function search(inp){
    let val = inp.value.toLowerCase();
    let $$ = all_tabs.shadowRoot;
    if(val.length){
      $$.querySelectorAll('.flex-item glowing-arc').forEach(el => el.getAttribute('innerTitle').toLowerCase().startsWith(val)? el.closest(".flex-item").style.order=1 : el.closest(".flex-item").style.order=2)
    } else{
      $$.querySelectorAll('.flex-item').forEach(el => el.style.order = 'initial');
    }
}

function selectItemHandler(el){
  const $$ = monkshu_env.components['all-tabs'].shadowRoot;
  const prevSelection = $$.querySelector(`.selected.flex-item`);
  prevSelection?.classList.remove('selected');
  el.classList.add('selected');
  tab_head.pageData.selectedItem = el.getAttribute('ix');
  tab_head.selectItemHandler("all-tabs");
}

export const all_tabs = { trueWebComponentMode:true,elementRendered, search, selectItemHandler}
monkshu_component.register("all-tabs", `${COMPONENT_PATH}/all-tabs.html`, all_tabs);