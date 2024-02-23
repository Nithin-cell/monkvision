/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {router} from "/framework/js/router.mjs";
import {APP_CONSTANTS} from "../../js/constants.mjs";

async function elementConnected(el) {
    loadProfile(el);
}
async function loadProfile(el, toggle=false){
    let data = await getProfileData();
    data.toggle = toggle;
    try {
        await profile_comp.bindData(data, el.id);
    } catch (error) {
        await profile_comp.bindData(data, el.id);
    }
}

/**
 * 
 * Api call to get profile data
 */
async function getProfileData(){
    return ({
        name: "John",
        dp: "./img/man1.jpg",
        start: "",
        end: ""
    })
}

function toggle(c){
    c = c.closest('#container');
    // Toggle the position of the container div
    if (c.style.right === '0px') {
        c.style.right = '-30vw';
    } else {
        c.style.right = '0px';
        c.closest('body').onclick = toggle;
    }
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const profile_comp = {trueWebComponentMode, trueJS:false, elementConnected,loadProfile}