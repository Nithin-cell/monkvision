/**
 * Login page handler
 *  
 * (C) 2020 TekMonks. All rights reserved.
 * License: See enclosed license.txt file.
 */
import {utils} from "./utils.mjs";

async function interceptPageLoadData() {
    window.monkshu_env.pagedata_funcs[`${APP_CONSTANTS.APP_PATH}/login.html`] = async data =>
         // add in css, theme and html data to the page data object
         await utils.addThemeDataAndCSS(data, "login");
}

export const main = {interceptPageLoadData};