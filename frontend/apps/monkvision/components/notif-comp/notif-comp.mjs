/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {router} from "/framework/js/router.mjs";
import {loginmanager} from "../../js/loginmanager.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";

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
export const notif_comp = {trueWebComponentMode, elementRendered}


monkshu_component.register("notif-comp", `${APP_CONSTANTS.APP_PATH}/components/notif-comp/notif-comp.html`, notif_comp);