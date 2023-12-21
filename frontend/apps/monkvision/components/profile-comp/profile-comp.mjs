/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {router} from "/framework/js/router.mjs";
import {APP_CONSTANTS} from "../../js/constants.mjs";

var pageData = {}

async function elementRendered(element) {
    profile_comp.bindData(pageData)
}
function loadProfile(){
    router.loadPage(APP_CONSTANTS.PROFILE_HTML)
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const profile_comp = {trueWebComponentMode, trueJS:false, elementRendered,loadProfile}