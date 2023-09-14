/**
 * Main app layout page for Monkvision
 *  
 * (C) 2020 TekMonks. All rights reserved.
 * License: See enclosed license.txt file.
 */
import {utils} from "./utils.mjs";
import {i18n} from "/framework/js/i18n.mjs";
import {router} from "/framework/js/router.mjs";
import {loginmanager} from "./loginmanager.mjs";
import {session} from "/framework/js/session.mjs";
import {chart_box} from "../components/chart-box/chart-box.mjs";

const SELECTED_DATES = "__monkvision_selecteddates", DASHBOARD_TIMER = "__monkvision_dashtimer", REFRESH_INTERVAL = "__monkvision_refresh", SHOW_REFRESH_TIMER = "__monkvision_show_refresh_timer";

const dateAsHTMLDateValue = date => new Date(date.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];

function timeRangeUpdated(stopRefresh, dates) {
    if (!dates) dates = { from: document.querySelector("input#datetimepickerfrom")?.value,
        to: document.querySelector("input#datetimepickerto")?.value };
    else { document.querySelector("input#datetimepickerfrom").value = dates.from;
        document.querySelector("input#datetimepickerto").value = dates.to;
    }

    session.set(SELECTED_DATES, dates);
    chart_box.setTimeRange(dates);
    if (stopRefresh) playPauseCharts(document.querySelector("img#playpause"), "stop"); // user selected a particular time range, stop refresh
}

function playPauseCharts(img, force) {
    if (img.src.endsWith("play.svg") && force!="stop") { img.src = "./img/pause.svg"; _startRefresh(); } 
    else if (img.src.endsWith("pause.svg") && force!="start") { img.src = "./img/play.svg"; _stopRefresh(); }
}

async function interceptPageLoadData() {

    const pagedata_func = async data => {
        // add in css, theme and html data to the page data object
        await utils.addThemeDataAndCSS(data, "main");

        // load dashboards config and build the data object
        const dashboardsRaw = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/dashboards.json`);
        data.dashboards = [];
        for (const key of Object.keys(dashboardsRaw)) {
            const file = dashboardsRaw[key].split(",")[0], refresh = parseInt(dashboardsRaw[key].split(",")[1].split(":")[1]), nodelist = JSON.parse(dashboardsRaw[key].split(",")[2].split(":")[1]),
                name = await i18n.get(`name_${key}`, session.get($$.MONKSHU_CONSTANTS.LANG_ID)), title = await i18n.get(`title_${key}`, session.get($$.MONKSHU_CONSTANTS.LANG_ID));
            data.dashboards.push({ name, file, refresh, title, id: key, nodelist });
        }

        // add in dashboard path, and page title to the page data object
        const currentURL = new URL(router.getCurrentURL());
        if (!currentURL.searchParams.get("dash")) { // load first dashboard if none was provided in the incoming URL
            data.title = data.dashboards[0].title;
            data.name = data.dashboards[0].name;
            data.dash = `./dashboards/${data.dashboards[0].file}`;
            data.refresh = data.dashboards[0].refresh;
            data.nodelist = data.dashboards[0].nodelist;
            data.showTimer = showTimerFormat(data.refresh/1000);
            data.pageTitle = `${await i18n.get("title", session.get($$.MONKSHU_CONSTANTS.LANG_ID))} - ${data.dashboards[0].name}`;
        } else {                                                // else get dashboard path and title from the URL
            data.title = currentURL.searchParams.get("title");
            data.dash = currentURL.searchParams.get("dash");
            data.name = currentURL.searchParams.get("name");
            data.refresh = currentURL.searchParams.get("refresh");
            data.nodelist = JSON.parse(currentURL.searchParams.get("nodelist"));
            data.showTimer = showTimerFormat(data.refresh/1000);
            data.pageTitle = `${await i18n.get("title", session.get($$.MONKSHU_CONSTANTS.LANG_ID))} - ${currentURL.searchParams.get("name")}`;
        }

        // set the dates data
        if (!session.get(SELECTED_DATES)) {
            const dateToday = new Date(), dateWeekAgo = new Date(); dateWeekAgo.setDate(dateToday.getDate() - 2);
            data.dateTimeNow = dateAsHTMLDateValue(dateToday); data.dateTimeWeekAgo = dateAsHTMLDateValue(dateWeekAgo);
        } else {
            data.dateTimeNow = session.get(SELECTED_DATES).to;
            data.dateTimeWeekAgo = session.get(SELECTED_DATES).from;
        }
    }

    const pageload_func = async data => {
        // select current dashboard icon on page load

        // load initial charts and set the refresh interval
        timeRangeUpdated(false);    // load initial charts they will get the dates from HTML
        if (data.refresh) {session.set(REFRESH_INTERVAL, data.refresh); _startRefresh()};
    }

    router.addOnLoadPageData(`${APP_CONSTANTS.APP_PATH}/main.html`, pagedata_func);
    router.addOnLoadPage(`${APP_CONSTANTS.APP_PATH}/main.html`, pageload_func);
}

const loadPDFReport = async _ => window.open(await router.encodeURL("pdf_report.html?dash=./dashboards/dashboard_pdf_report.page&name=PDF Report"), "_blank");

async function changePassword(_element) {
    monkshu_env.components['dialog-box'].showDialog(`${APP_CONSTANTS.DIALOGS_PATH}/changepass.html`, true, true, {}, "dialog", ["p1","p2"], async result=>{
        const done = await loginmanager.changepassword(session.get(APP_CONSTANTS.USERID), result.p1);
        if (!done) monkshu_env.components['dialog-box'].error("dialog", 
            await i18n.get("PWCHANGEFAILED", session.get($$.MONKSHU_CONSTANTS.LANG_ID)));
        else monkshu_env.components['dialog-box'].hideDialog("dialog");
    });
}

const _stopRefresh = _ => {if (session.get(DASHBOARD_TIMER) || session.get(SHOW_REFRESH_TIMER)) { clearInterval(session.get(DASHBOARD_TIMER)); clearInterval(session.get(SHOW_REFRESH_TIMER));}}

function _startRefresh() {
    _stopRefresh(); if (!session.get(REFRESH_INTERVAL)) return;
    let totalSeconds = (session.get(REFRESH_INTERVAL)/1000) - 1;
    session.set(SHOW_REFRESH_TIMER, setInterval(_=>{
        // document.getElementById('showtimer').innerText = showTimerFormat(totalSeconds);
        totalSeconds--; if (totalSeconds == 0) { totalSeconds = session.get(REFRESH_INTERVAL)/1000 }
    }, 1000));
    session.set(DASHBOARD_TIMER, setInterval(_=>{timeRangeUpdated(false, 
        {from: document.querySelector("input#datetimepickerfrom").value, to: dateAsHTMLDateValue(new Date())});
    }, session.get(REFRESH_INTERVAL)));
    loginmanager.addLogoutListener(_=>{clearInterval(session.get(DASHBOARD_TIMER)); clearInterval(session.get(SHOW_REFRESH_TIMER));});
}

    // Timer format minutes : seconds
    function showTimerFormat(totalSeconds) {
        let minutes = parseInt(totalSeconds / 60, 10);
        let seconds = parseInt(totalSeconds % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return(minutes + ":" + seconds);
}

export const main = {changePassword, interceptPageLoadData, timeRangeUpdated, playPauseCharts, loadPDFReport, openModal,loadMain};

function openModal(id){
    closeAllModals();
    const modal = document.getElementById(id);
    const backdrop = document.getElementById("backdrop");
    modal.style.display = "block";
    backdrop.style.display = "block";
    
    const closeModalBtn = document.querySelector(`#${id} #closeModal`);
    function closeModal() {
        modal.style.display = "none";
        backdrop.style.display = "none";
    }
    closeModalBtn.onclick = closeModal; 
    backdrop.onclick = closeModal;
}

function closeAllModals(){
    document.querySelectorAll('.modal').forEach(m => m.style.display = "none");
}

function loadMain(){
    router.loadPage(APP_CONSTANTS.MAIN_HTML)
}