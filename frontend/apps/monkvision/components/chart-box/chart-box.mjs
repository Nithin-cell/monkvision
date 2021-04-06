/**
 * Chart-Box - Can draw charts, tables and text dashboard components.
 *  
 * (C) 2020 TekMonks. All rights reserved.
 * License: See enclosed license.txt file.
 */

import {chart} from "./lib/chart.mjs";
import {apimanager as apiman} from "/framework/js/apimanager.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
//added
import {i18n} from "/framework/js/i18n.mjs";
import {session} from "/framework/js/session.mjs";

async function elementRendered(element) {
	await $$.require(`${APP_CONSTANTS.COMPONENTS_PATH}/chart-box/3p/xregexp-4.3.0-all-min.js`);	// load xregexp which is needed
	
	if (!element.__skip_refresh) _refreshData(element, true); else return;
}

function getTimeRange() {
	if (!chart_box.timeRange) {
		const dateToday = new Date(), dateWeekAgo = new Date(); dateWeekAgo.setDate(dateToday.getDate() - 2);
		const dateTimeNow = new Date(dateToday.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0],
			dateTimeWeekAgo = new Date(dateWeekAgo.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];

		setTimeRange({from: dateTimeWeekAgo, to: dateTimeNow});
	}

	return chart_box.timeRange;
} 

function setTimeRange(timeRange) {
	chart_box.timeRange = timeRange; 
	for (const element of chart_box.getAllElementInstances()) _refreshData(element);
}

function _escapeHTML(text) {
	const textNode = document.createTextNode(text);
	const p = document.createElement("p");
	p.appendChild(textNode);
	return p.innerHTML;
}


const _isNullOrUndefined = object => object == null || object == undefined;

async function _refreshData(element, force) {
	const id = element.id, api = element.getAttribute("api"), params = element.getAttribute("params"), type = element.getAttribute("type");
	const content =  await _getContent(api, params); 
	const memory = chart_box.getMemory(id);
	const bindData = async (data, id) => { element.__skip_refresh = true; await chart_box.bindData(data, id); 
		delete element.__skip_refresh; }
	const clearChart = shadowRoot => { if (memory.chart) {memory.chart.destroy(); delete memory.chart;}
		const canvasNode = shadowRoot.querySelector("canvas#canvas"), canvasParent = canvasNode.parentNode, canvasClone = canvasNode.cloneNode();
		canvasNode.remove(); canvasParent.appendChild(canvasClone); }
	const createData = _ => {return {title: content&&content.contents? content.contents.title || element.getAttribute("title"):element.getAttribute("title"), 
		styleBody: element.getAttribute("styleBody")?`<style>${element.getAttribute("styleBody")}</style>`:null}};
	const clone = object => object?JSON.parse(JSON.stringify(object)):null;

	if (!force && content && !content.contents) {	// clear everything if data is empty and changed
		if (memory.contents) {await bindData(createData(), id); clearChart(); delete memory.contents;}	// destroy any table etc.
		return;
	} else if (!force && content && JSON.stringify(memory.contents) == JSON.stringify(content.contents)) return;	// return if data didn't change
	else if (content) memory.contents = clone(content.contents); else delete memory.contents;	// we will now render new data
	
	const data = createData(); if (content && content.contents) delete content.contents.title;	// title, if it exists, is only for rendering

	const shadowRoot = chart_box.getShadowRootByHostId(id), contentDiv = shadowRoot.querySelector("div#content"); 

	if (type == "text") {
		contentDiv.innerHTML = "";	// clear it so scrollHeight below is always accurate
		data.textcontent = content?content.contents||"":"";
		await bindData(data, id);
		contentDiv.scrollTop = contentDiv.scrollHeight; // scroll to bottom
		return;
	}	

	if (type == "metrictext") {
		contentDiv.innerHTML = "";	// clear it 
		if (!content || !content.contents) return;
		const metrictext = {}; data.metrictext = metrictext;

		const clusterName=content.contents.clusterName;
		if(clusterName){
			const dashboardsRaw = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/dashboards.json`);
			for (const key of Object.keys(dashboardsRaw)) {
				const dashboardName = dashboardsRaw[key].split(",")[0];
				if(dashboardName.includes(clusterName)){
					metrictext.dashboardName=dashboardName;
					metrictext.clusterName=clusterName;
					metrictext.refresh = parseInt(dashboardsRaw[key].split(",")[1].split(":")[1]),
					metrictext.nodelist = JSON.parse(dashboardsRaw[key].split(",")[2].split(":")[1]),
					metrictext.pageTitle = await i18n.get(`title_${key}`, session.get($$.MONKSHU_CONSTANTS.LANG_ID));
				}
			}
		}

		metrictext.nodeName = content.contents.textexplanation ? (((content.contents.textexplanation).indexOf("-") != -1) ? content.contents.textexplanation.split("-")[0].trim() : null): null;
		metrictext.textmain = content.contents.textmain; metrictext.textexplanation = content.contents.textexplanation;
		
		if (content.contents.icon) metrictext.icon = content.contents.icon;
		metrictext.styleMetric = `<style>body{background-color: ${content.contents.bgcolor}; color: ${content.contents.fgcolor}; margin: 0px !important;} div#container{padding-top: 10px;}</style>`;
		await bindData(data, id);
		return;
	}	
	
	if (type == "table") {	// content: x, ys and infos
		const contentIn = content && content.contents?content.contents:null, labelHash = {}; 
		for (const label of element.getAttribute("labels").split(",")){
			const tuple = label.split(":");
			labelHash[tuple[0].trim()] = tuple[1].trim();
		}
		if (contentIn) {
			const headers = [labelHash["x"]]; for (let i = 0; i < contentIn.ys.length; i++) {headers.push(labelHash[`ys${i}`]);}
			const rows = []; for (let i = 0; i < contentIn.length; i++) {
				const rowContent = [{notooltip: contentIn.x[i]}]; for (let j = 0; j < contentIn.ys.length; j++) {
					const contentY = _isNullOrUndefined(contentIn.ys[j][i])?"":contentIn.ys[j][i];
					if (contentIn.infos[j][i]) rowContent.push({tooltip: {tip: contentIn.infos[j][i], val: contentY}}); 
					else rowContent.push({notooltip: contentY}); 
				}
				rows.push(rowContent);
			}
			data.table = {headers, rows};
		}
		await bindData(data, id);
		contentDiv.scrollTop = contentDiv.scrollHeight; 
		return;
	}

	clearChart(shadowRoot);	// destroy the old chart if it exists as we will now refresh charts.

	if (type == "bargraph" || type == "linegraph") {

		await bindData(data, id); if (!content || !content.contents) return;
		const labels = _getLabels(_makeArray(element.getAttribute("ylabels")));
		const labelColor = element.getAttribute("labelColor") || "black";
		const gridColor = element.getAttribute("gridColor") || "darkgrey";
		const threshold	= element.getAttribute("threshold") || false;
		const thresholdColor = element.getAttribute("thresholdColor") || "rgba(227,16,16,10)";
		const thresholdLineWidth = element.getAttribute("thresholdLineWidth") || 1;
		const annotation = threshold ? {
			annotations: [{
				type: 'line', id:"hdline", mode: 'horizontal', scaleID: 'yaxis0', value: threshold, borderColor: thresholdColor, borderWidth: thresholdLineWidth,
				label: { enabled: true } }] } : false;
		const legendFontColor = element.getAttribute("legendFontColor") || "rgba(255, 255, 255,10)";
		const position = _makeArray(element.getAttribute("legendPosition"));
		const legendPosition = position ? position[0] : "bottom";
		const legend = content.contents.legend ? { display: true, position: legendPosition, labels: {fontColor: legendFontColor} } : {display: false};
		const animation = threshold ? {
			duration: 1, onComplete: function () { 
				let ctx = this.chart.ctx; ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);    
				let line = this.chart.annotation.elements.hdline, x = line._model.x2 + 5, y = line._model.y2; 
				ctx.fillStyle = gridColor; ctx.fillText("threshold",x,y); }} : {animateScale:true}
		
		if (type == "bargraph") {
			const colorHash = _getColorHash(_makeArray(element.getAttribute("ycolors")));
			const bgColors = [], brColors = []; for (const [i,ys] of content.contents.ys.entries()) {
				const bgColorsThis = []; const brColorsThis = [];
				for (const y of ys) if (colorHash[i][y]) {bgColorsThis.push(colorHash[i][y][0]); brColorsThis.push(colorHash[i][y][1]);}
					else {bgColorsThis.push(colorHash[i]["else"][0]); brColorsThis.push(colorHash[i]["else"][1]);}
				bgColors.push(bgColorsThis); brColors.push(brColorsThis);
			}

			memory.chart = await chart.drawBargraph(contentDiv.querySelector("canvas#canvas"), content.contents, 
				element.getAttribute("maxticks"), _isTrue(element.getAttribute("gridLines")), 
				element.getAttribute("xAtZero"), _makeArray(element.getAttribute("yAtZeros")), 
				_makeArray(element.getAttribute("ysteps")), labels, _makeArray(element.getAttribute("ymaxs")), 
				bgColors, brColors, labelColor, gridColor, 
				(element.getAttribute("singleAxis") && element.getAttribute("singleAxis").toLowerCase() == "true"), annotation, legend, animation);
		}

		if (type == "linegraph") {			
			memory.chart = await chart.drawLinegraph(contentDiv.querySelector("canvas#canvas"), 
			content.contents, element.getAttribute("maxticks"), _isTrue(element.getAttribute("gridLines")), 
			element.getAttribute("xAtZero"), _makeArray(element.getAttribute("yAtZeros")), 
			_makeArray(element.getAttribute("ysteps")), labels, _makeArray(element.getAttribute("ymaxs")), 
			_makeArray(element.getAttribute("fillColors")),_makeArray(element.getAttribute("borderColors")), 
			labelColor, gridColor, (element.getAttribute("singleAxis") && element.getAttribute("singleAxis").toLowerCase() == "true"), annotation, legend, animation);
		}
		return;
	}

	if (type == "piegraph" || type == "donutgraph" || type == "polargraph") {
		await bindData(data, id); if (!content || !content.contents) return;

		const infos = clone(content.contents.infos); delete content.contents.infos;

		const colorHash = {}, colors = element.getAttribute("colors").split(","); for (const color of colors) {
			const tuples = color.split(":");
			colorHash[tuples[0].trim()] = [tuples[1].trim(), tuples[2].trim()];
		}

		let contentTotal = 0; for (const key of Object.keys(content.contents)) contentTotal += parseInt(content.contents[key]);

		const labelHash = {}, labels = element.getAttribute("labels").split(","); for (const label of labels) {
			const tuple = label.split(":");
			labelHash[tuple[0].trim()] = tuple[1].trim();
			if (element.getAttribute("labelsShowPercentage").toLowerCase() == "true") labelHash[tuple[0].trim()] +=
				` - ${parseFloat(parseInt(content.contents[tuple[0].trim()])/contentTotal*100).toFixed(2)}%`;
		}

		const labelColor = element.getAttribute("labelColor") || "black"; 
		
		let kind = "pie"; if (type == "donutgraph") kind = "doughnut"; if (type == "polargraph") kind = "polarArea";
		memory.chart = await chart.drawPiegraph(contentDiv.querySelector("canvas#canvas"), {data:content.contents, 
			labels: labelHash, colors: colorHash, infos}, labelColor, _isTrue(element.getAttribute("gridLines")), 
			element.getAttribute("gridColor") || "darkgrey", kind);

		return;
	}
}


const _makeArray = string => {
	if (!string) return null; const raw = string.trim(); if (!raw.startsWith("[")) raw = `[${raw}]`;
	const arrayVals = XRegExp.matchRecursive(raw, '\\[', '\\]', "g");
	return arrayVals;
}

function _getColorHash(ycolors) {
	const colorHash = []; for ( const ycolorSet of ycolors ) {
		const colorHashThis = {}; 
		for (const ycolor of ycolorSet.split(",")) {const tuples = ycolor.split(":"); colorHashThis[tuples[0].trim()] = [tuples[1].trim(), tuples[2].trim()]; }
		colorHash.push(colorHashThis);
	}
	return colorHash;
}

function _getLabels(labelsRAW) {
	const labels = []; for (const labelRAW of labelsRAW) {
		const labelsThis = {};
		for (const label of labelRAW.split(",")) {const splits = label.split(":"); labelsThis[splits[0]] = splits[1]};
		labels.push(labelsThis);
	}
	return labels;
}

async function _getContent(api, params) {
	const API_TO_CALL = `${APP_CONSTANTS.API_PATH}/${api}`;

	const paramObj = {timeRange: getTimeRange()}; if (params) for (const param of params.split("&")) paramObj[param.split("=")[0]] = param.split("=")[1];
	const resp = await apiman.rest(API_TO_CALL, "GET", paramObj, true, false);

	if (resp && resp.type=="text" && resp.contents && resp.contents.length) for (const [i,line] of resp.contents.entries())
		resp.contents[i] = _escapeHTML(line).replace(/(?:\r\n|\r|\n)/g, '<br>');

	return resp;
}

const _isTrue = string => string?string.toLowerCase() == "true":false;
export const chart_box = {trueWebComponentMode: true, elementRendered, setTimeRange, getTimeRange,_getContent}
monkshu_component.register("chart-box", `${APP_CONSTANTS.APP_PATH}/components/chart-box/chart-box.html`, chart_box);