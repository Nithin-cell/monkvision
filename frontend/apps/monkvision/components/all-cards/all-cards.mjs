import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);
import {card_view} from '../card-view/card-view.mjs';


async function elementRendered(el) {
    updateFragment();
}

function updateFragment(){
  all_cards.shadowRoot.querySelector('.cardsContainer').innerHTML = card_view.pageData.items.map((card, i) =>
    `<div class='flex-item${i==card_view.pageData.selectedItem? ' selected': ''}' ix="${i}" onclick="monkshu_env.components['card-view'].selectItemHandler(this, 'all-cards')"><glowing-arc animate="1" ${Object.keys(card).map(k=>`${k}="${card[k]}"`).join(' ')}></glowing-arc></div>`
  ).join('');
}

function search(inp){
    let val = inp.value.toLowerCase();
    let $$ = all_cards.shadowRoot;
    if(val.length){
      $$.querySelectorAll('.flex-item glowing-arc').forEach(el => el.getAttribute('innerTitle').toLowerCase().startsWith(val)? el.closest(".flex-item").style.order=1 : el.closest(".flex-item").style.order=2)
    } else{
      $$.querySelectorAll('.flex-item').forEach(el => el.style.order = 'initial');
    }
}

export const all_cards = { trueWebComponentMode:true,elementRendered, search}
monkshu_component.register("all-cards", `${COMPONENT_PATH}/all-cards.html`, all_cards);