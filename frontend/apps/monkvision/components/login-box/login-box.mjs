/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {router} from "/framework/js/router.mjs";
import {loginmanager} from "../../js/loginmanager.mjs";

async function elementConnected(element) {
	let data = {};

	if (element.getAttribute("styleBody")) data.styleBody = `<style>${element.getAttribute("styleBody")}</style>`;
	
	if (element.id) {
		if (!login_box.datas) login_box.datas = {}; login_box.datas[element.id] = data;
	} else login_box.data = data;
}

async function signin(signInButton) {	
	const shadowRoot = login_box.getShadowRootByContainedElement(signInButton);
	const userid = shadowRoot.getElementById("userid").value;
	const pass = shadowRoot.getElementById("pass").value;
	const code = shadowRoot.getElementById("code").value;
	const routeOnSuccess = login_box.getHostElement(signInButton).getAttribute("routeOnSuccess");
		
	_handleLoginResult(await loginmanager.signin(userid, pass, code), shadowRoot, routeOnSuccess);
}

function _handleLoginResult(result, shadowRoot, routeOnSuccess) {
	if (result) router.loadPage(routeOnSuccess);
	else shadowRoot.getElementById("notifier").style.display = "inline";
}

function handleEmailInputChange(el){
	let image = el.nextElementSibling;
	if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)){
		image.style.opacity = 1;
	} 
	else {
		image.style.opacity = 0.2;
	}
}

function previewPassword(el){
	let _ = el.previousElementSibling;
	if(_.getAttribute('type')=='text'){
		el.style.opacity=0.2;
		_.setAttribute('type', 'password');
	}
	else{
		el.style.opacity=1;
		_.setAttribute('type', 'text');		
	}
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM
export const login_box = {signin, trueWebComponentMode, trueJS:false, elementConnected, handleEmailInputChange, previewPassword}