/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

import { main } from "./../../js/main.mjs";

async function elementConnected(el) {
    configureElement(el);
}

async function configureElement(el){
    try {
        await notif_comp.bindData(el.dataset, el.id);
    } catch (error) {
        await notif_comp.bindData(el.dataset, el.id);
    }
}

function scrollHandler(c) {
    const totalChildren = c.children.length;
    if(totalChildren<2) return setButtons(c, 0, 0);
    const { scrollLeft, clientWidth } = c;
    const currentChild = Math.floor(scrollLeft / clientWidth);
    if (scrollLeft === 0) setButtons(c, 0, 1);
    else if (currentChild === totalChildren - 1) setButtons(c, 1, 0) 
    else setButtons(c, 1, 1);
  }

function scrollContent(el){
    const carouselContainer = main.querySelector(el, '.content');
    carouselContainer.scrollLeft += (el.id=='prev'? (-1) : 1)*carouselContainer.offsetWidth; // Scroll one slide width
}

function setButtons(el, ...vis){
    const btns = ['#prev', '#next'].map(q => main.querySelector(el, q));
    btns.forEach((btn, i) => btn.style.display = vis[i]? 'flex' : 'none'); 
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const notif_comp = {trueWebComponentMode, trueJS:false, elementConnected, scrollHandler,scrollContent}