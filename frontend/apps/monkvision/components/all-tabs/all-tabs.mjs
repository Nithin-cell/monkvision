import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const pageData = {
  tabs: [
    {
      title: "DB and OS level metrics and some long text",
      arcColor: "red",
      outlineColor: "red",
      outlineColor: "red",
      outerColor: "snow",
      percentage: "44",
      color: "red"
    },
    {
      title: "Node level metrics",
      arcColor: "blue",
      outerColor: "silver",
      percentage: "44",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "red",
      percentage: "7",
      color: "red"
    },
    {
      title: "short",
      arcColor: "green",
      outerColor: "yellow",
      percentage: "91",
      color: "rgba(12, 0, 79, 0.8)"
    },
    {
      title: "o",
      arcColor: "blue",
      outerColor: "blue",
      percentage: "44",
      color: "rgba(44, 34, 98, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "grey",
      percentage: "17",
      color: "red"
    },
    {
      title: "Node level metrics",
      arcColor: "blue",
      outerColor: "tomato",
      percentage: "34",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "red",
      percentage: "10",
      color: "red"
    },
    {
      title: "OS level metrics",
      arcColor: "green",
      outerColor: "yellow",
      percentage: "44",
      color: "rgba(88, 34, 98, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "blue",
      outerColor: "blue",
      percentage: "50",
      color: "rgba(12, 0, 79, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "thistle",
      percentage: "44",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "Node level metrics",
      arcColor: "blue",
      outerColor: "cadetblue",
      percentage: "44",
      color: "rgba(59, 20, 0, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "red",
      percentage: "55",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "OS level metrics",
      arcColor: "green",
      outerColor: "yellow",
      percentage: "25",
      color: "rgba(44, 34, 98, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "blue",
      outerColor: "blue",
      percentage: "44",
      color: "rgba(12, 0, 79, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "red",
      percentage: "60",
      color: "rgba(59, 20, 0, 0.8)"
    },
    {
      title: "OS level metrics",
      arcColor: "green",
      outerColor: "yellow",
      percentage: "26",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "blue",
      outerColor: "blue",
      percentage: "67",
      color: "rgba(88, 34, 98, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "snow",
      percentage: "90",
      color: "red"
    },
    {
      title: "Node level metrics",
      arcColor: "blue",
      outerColor: "silver",
      percentage: "100",
      color: "rgba(12, 0, 79, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "crimson",
      percentage: "26",
      color: "rgba(0, 68, 9, 0.8)"
    },
    {
      title: "Node level metrics",
      arcColor: "blue",
      outerColor: "crimson",
      percentage: "68",
      color: "rgba(88, 34, 98, 0.8)"
    },
    {
      title: "OS level metrics",
      arcColor: "green",
      outerColor: "yellow",
      percentage: "68",
      color: "rgba(88, 34, 98, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "blue",
      outerColor: "blue",
      percentage: "23",
      color: "rgba(59, 20, 0, 0.8)"
    },
    {
      title: "DB and OS level metrics",
      arcColor: "red",
      outlineColor: "red",
      outerColor: "grey",
      percentage: "10",
      color: "rgba(0, 68, 9, 0.8)"
    },
  ]
}

async function elementRendered() {
  updateFragment();
}

function updateFragment(){
  all_tabs.shadowRoot.querySelector('.cardsContainer').innerHTML = pageData.tabs.map((tab) =>
      `<div class='flex-item'><div>
        <svg class="container-svg" width="192" height="188" viewBox="0 0 192 188" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.8" d="M190.294 95.5002C190.846 95.5002 191.294 95.0521 191.288 94.4998C191.072 73.9838 184.204 54.081 171.703 37.7893C158.999 21.233 141.187 9.33121 121.029 3.92996C100.871 -1.4713 79.4947 -0.0701926 60.2145 7.91597C41.2424 15.7745 25.3436 29.577 14.8981 47.2362C14.617 47.7116 14.7811 48.3238 15.2594 48.6L23.7014 53.4739C24.1796 53.7501 24.7909 53.5856 25.0728 53.1106C34.2246 37.6908 48.1274 25.6385 64.7102 18.7696C81.6012 11.7731 100.329 10.5457 117.989 15.2776C135.648 20.0095 151.253 30.4364 162.383 44.941C173.31 59.181 179.324 76.57 179.54 94.4999C179.546 95.0521 179.993 95.5002 180.546 95.5002H190.294Z" fill="${tab.outerColor}"/>
          <path opacity="0.8" d="M1.69953 95.5001C1.14724 95.5001 0.698977 95.9482 0.704802 96.5005C0.921187 117.017 7.7887 136.919 20.2898 153.211C32.7908 169.503 50.2379 181.287 69.999 186.806C70.5309 186.955 71.0798 186.638 71.2227 186.104L73.7457 176.689C73.8886 176.155 73.5715 175.607 73.0398 175.458C55.7767 170.609 40.5367 160.299 29.61 146.059C18.6833 131.819 12.6693 114.43 12.4535 96.5004C12.4468 95.9482 11.9997 95.5001 11.4475 95.5001L1.69953 95.5001Z" fill="${tab.outerColor}"/>
          <path opacity="0.8" d="M119.777 187.104C119.92 187.638 120.47 187.954 121.001 187.806C144.549 181.229 164.648 165.807 177.095 144.764C177.376 144.289 177.212 143.676 176.734 143.4L168.292 138.526C167.813 138.25 167.202 138.415 166.92 138.89C156.032 157.235 138.499 170.688 117.961 176.458C117.429 176.607 117.112 177.155 117.254 177.688L119.777 187.104Z" fill="${tab.outerColor}"/>
        </svg>
      <glowing-arc parent="tab" ${tab.title? `innerTitle="${tab.title}"` : ``} ${tab.percentage? `percentage="${tab.percentage}"` : ``} ${tab.color? `color="${tab.color}"` : ``} ${tab.outlineColor? `outlineColor="${tab.outlineColor}"` : ``}></glowing-arc></div>
      </div>
      `
  ).join('');
}


function search(inp){
    let val = inp.value.toLowerCase();
    let $$ = all_tabs.shadowRoot;
    if(val.length){
      $$.querySelectorAll('.flex-item glowing-arc').forEach(el => el.getAttribute('innerTitle').toLowerCase().startsWith(val)? el.closest(".flex-item").style.order=1 : el.closest(".flex-item").style.order=2)
    } else{
      $$.querySelectorAll('.flex-item').forEach(el => el.style.order = 'initial');
    }
}

export const all_tabs = { trueWebComponentMode:true,elementRendered, search}
monkshu_component.register("all-tabs", `${COMPONENT_PATH}/all-tabs.html`, all_tabs);