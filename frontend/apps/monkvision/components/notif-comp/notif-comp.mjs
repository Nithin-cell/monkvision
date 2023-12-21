/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

async function elementRendered(element) {
    // const mainTitle = element.getAttribute('mainTitle');
    // const data = element.getAttribute('data');
    // const innerTitle = element.getAttribute('innerTitle');
    // const innerSubtitle = element.getAttribute('innerSubtitle');
    // const percentage = element.getAttribute('percentage');
    // const color = element.getAttribute('color');
    // const warningColour = element.getAttribute('warningcolour');
    // element.shadowRoot.querySelector('')
    console.log("working inside notif-comp")
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const notif_comp = {trueWebComponentMode, trueJS:false, elementRendered}