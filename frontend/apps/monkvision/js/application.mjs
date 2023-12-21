/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
 
import {router} from "/framework/js/router.mjs";
import {session} from "/framework/js/session.mjs";
import {securityguard} from "/framework/js/securityguard.mjs";
import {apimanager as apiman} from "/framework/js/apimanager.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";

const init = async _ => {
	window.APP_CONSTANTS = (await import ("./constants.mjs")).APP_CONSTANTS;
	window.LOG = (await import ("/framework/js/log.mjs")).LOG;
	window.APP_THEME = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/theme.json`);
	if (!session.get($$.MONKSHU_CONSTANTS.LANG_ID)) session.set($$.MONKSHU_CONSTANTS.LANG_ID, "en");
	securityguard.setPermissionsMap(APP_CONSTANTS.PERMISSIONS_MAP);
	securityguard.setCurrentRole(securityguard.getCurrentRole() || APP_CONSTANTS.GUEST_ROLE);
}

async function main() {
	apiman.registerAPIKeys(APP_CONSTANTS.API_KEYS, APP_CONSTANTS.KEY_HEADER);
	await _addPageDataInterceptors();
	await registerComponents();
	
	const decodedURL = new URL(router.decodeURL(window.location.href));

	const baseURL = decodedURL.search?decodedURL.href.substring(0, decodedURL.href.length-decodedURL.search.length):decodedURL.href;
	if (securityguard.isAllowed(baseURL)) router.loadPage(decodedURL.href);
	else router.loadPage(APP_CONSTANTS.LOGIN_HTML);
}

async function _addPageDataInterceptors() {
	const interceptors = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/pageDataInterceptors.json`);
	for (const interceptor of interceptors) {
		const modulePath = interceptor.module, functionName = interceptor.function;
		let module = await import(`${APP_CONSTANTS.APP_PATH}/${modulePath}`); module = module[Object.keys(module)[0]];
		(module[functionName])();
	}
}

async function registerComponents() {
	const appConfig = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/app.json`);
	
	appConfig["components"].forEach(async (component) => {
	  try {
		let componentPath = `${APP_CONSTANTS.COMPONENTS_PATH}/${component}/${component}`;
		let module = await import(componentPath+'.mjs');
		module = module[Object.keys(module)[0]];
		monkshu_component.register(component, module.trueJS? null : componentPath+'.html', module);
	  } catch (e) {
		console.log(e);
	  }
	});
}
  

export const application = {init, main};