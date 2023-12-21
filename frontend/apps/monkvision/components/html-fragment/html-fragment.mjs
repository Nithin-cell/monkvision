/** 
 * Just embeds the given HTML as a Web component.
 * (C) 2021 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
 import {router} from "/framework/js/router.mjs";

 const elementConnected = async element => {
     const htmlContent = element.getAttribute("htmlcontent") ? decodeURIComponent(element.getAttribute("htmlcontent")) : 
         element.getAttribute("htmlfile") ? await $$.requireText(element.getAttribute("htmlfile")) : "";

     html_fragment.setTemplateHTML(element, await router.expandPageData(htmlContent, undefined, 
         element.getAttribute("data")?JSON.parse(decodeURIComponent(element.getAttribute("data"))):{})); 
 }

 // convert this all into a WebComponent so we can use it
 export const html_fragment = {trueWebComponentMode: true, trueJS:true, elementConnected}