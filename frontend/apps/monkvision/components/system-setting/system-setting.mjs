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
function systemSetting(){
    router.loadPage(APP_CONSTANTS.SYSTEM_SETTING)
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const system_setting = {trueWebComponentMode, trueJS:false, elementRendered,systemSetting}


