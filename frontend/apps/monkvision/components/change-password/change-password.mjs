/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {router} from "/framework/js/router.mjs";
import {APP_CONSTANTS} from "../../js/constants.mjs";

var pageData = {}

async function elementRendered(element) {
    change_password.bindData(pageData)
}
function changePassword(){
    router.loadPage(APP_CONSTANTS.CHANGE_PASSWORD)
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const change_password = {trueWebComponentMode, trueJS:false, elementRendered,changePassword}