import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

const allCards =
    [
        {
          mainTitle: "Reads/sec",
          data: "89/s",
          innerTitle: "DISK",
          percentage: "88",
          color: "rgba(88, 34, 98, 0.8)",
          warningColour: "rgba(50, 56, 76, 1)"
        },
        {
          mainTitle: "Reads/sec",
          data: "42/s",
          innerTitle: "NETWORK",
          percentage: "65",
          color: "rgba(183, 201, 8, 0.8)"
        },
        {
          mainTitle: "Reads/sec",
          data: "76/s",
          innerTitle: "DATABASE",
          percentage: "92",
          color: "rgba(216, 56, 193, 0.8)",
          warningColour: "rgba(99, 78, 169, 1)"
        },
        {
          mainTitle: "Reads/sec",
          data: "51/s",
          innerTitle: "CACHE",
          percentage: "33",
          color: "rgba(42, 195, 17, 0.8)",
          warningColour: "rgba(241, 87, 67, 1)"
        },
        {
          mainTitle: "Writes/sec",
          data: "67/s",
          innerTitle: "DISK",
          percentage: "42",
          color: "rgba(189, 58, 231, 0.8)"
        },
        {
          mainTitle: "Writes/sec",
          data: "23/s",
          innerTitle: "NETWORK",
          percentage: "74",
          color: "rgba(85, 171, 51, 0.8)"
        },
        {
          mainTitle: "Writes/sec",
          data: "98/s",
          innerTitle: "DATABASE",
          percentage: "60",
          color: "rgba(23, 198, 212, 0.8)",
          warningColour: "rgba(157, 25, 57, 1)"
        },
        {
          mainTitle: "Writes/sec",
          data: "34/s",
          innerTitle: "CACHE",
          percentage: "85",
          color: "rgba(236, 46, 83, 0.8)",
          warningColour: "rgba(58, 134, 205, 1)"
        },
        {
          mainTitle: "Latency",
          data: "52 ms",
          innerTitle: "DISK",
          percentage: "72",
          color: "rgba(172, 107, 228, 0.8)",
          warningColour: "rgba(226, 191, 32, 1)"
        },
        {
          mainTitle: "Latency",
          data: "82 ms",
          innerTitle: "NETWORK",
          percentage: "47",
          color: "rgba(99, 229, 77, 0.8)"
        },
        {
          mainTitle: "Latency",
          data: "37 ms",
          innerTitle: "DATABASE",
          percentage: "55",
          color: "rgba(12, 115, 120, 0.8)",
          warningColour: "rgba(210, 61, 127, 1)"
        },
        {
          mainTitle: "Latency",
          data: "68 ms",
          innerTitle: "CACHE",
          percentage: "90",
          color: "rgba(251, 180, 109, 0.8)"
        },
        {
          mainTitle: "CPU Usage",
          data: "76",
          innerTitle: "DISK",
          percentage: "62",
          color: "rgba(182, 51, 37, 0.8)",
          warningColour: "rgba(123, 192, 81, 1)"
        },
        {
          mainTitle: "CPU Usage",
          data: "41",
          innerTitle: "NETWORK",
          percentage: "80",
          color: "rgba(240, 97, 164, 0.8)"
        },
        {
          mainTitle: "CPU Usage",
          data: "92",
          innerTitle: "DATABASE",
          percentage: "39",
          color: "rgba(109, 191, 189, 0.8)",
          warningColour: "rgba(33, 87, 228, 1)"
        },
        {
          mainTitle: "CPU Usage",
          data: "58",
          innerTitle: "CACHE",
          percentage: "73",
          color: "rgba(198, 99, 34, 0.8)",
          warningColour: "rgba(65, 161, 187, 1)"
        },
        {
          mainTitle: "Memory Usage",
          data: "33",
          innerTitle: "DISK",
          percentage: "81",
          color: "rgba(116, 41, 168, 0.8)"
        },
        {
          mainTitle: "Memory Usage",
          data: "89",
          innerTitle: "NETWORK",
          percentage: "52",
          color: "rgba(53, 174, 219, 0.8)",
          warningColour: "rgba(181, 60, 59, 1)"
        },
        {
          mainTitle: "Memory Usage",
          data: "45",
          innerTitle: "DATABASE",
          percentage: "68",
          color: "rgba(225, 231, 85, 0.8)"
        },
        {
          mainTitle: "Memory Usage",
          data: "77",
          innerTitle: "CACHE",
          percentage: "95",
          color: "rgba(84, 95, 207, 0.8)",
          warningColour: "rgba(155, 132, 24, 1)"
        },
        {
        mainTitle: "Reads/sec",
        data: "51/s",
        innerTitle: "CACHE",
        percentage: "33",
        color: "rgba(42, 195, 17, 0.8)",
        warningColour: "rgba(241, 87, 67, 1)"
        },
        {
        mainTitle: "Writes/sec",
        data: "67/s",
        innerTitle: "DISK",
        percentage: "42",
        color: "rgba(189, 58, 231, 0.8)"
        },
        {
        mainTitle: "Writes/sec",
        data: "23/s",
        innerTitle: "NETWORK",
        percentage: "74",
        color: "rgba(85, 171, 51, 0.8)"
        },
        {
        mainTitle: "Writes/sec",
        data: "98/s",
        innerTitle: "DATABASE",
        percentage: "60",
        color: "rgba(23, 198, 212, 0.8)",
        warningColour: "rgba(157, 25, 57, 1)"
        },
        {
        mainTitle: "Writes/sec",
        data: "34/s",
        innerTitle: "CACHE",
        percentage: "85",
        color: "rgba(236, 46, 83, 0.8)",
        warningColour: "rgba(58, 134, 205, 1)"
        },
        {
        mainTitle: "Latency",
        data: "52 ms",
        innerTitle: "DISK",
        percentage: "72",
        color: "rgba(172, 107, 228, 0.8)",
        warningColour: "rgba(226, 191, 32, 1)"
        },
        {
        mainTitle: "Latency",
        data: "82 ms",
        innerTitle: "NETWORK",
        percentage: "47",
        color: "rgba(99, 229, 77, 0.8)"
        },
        {
        mainTitle: "Latency",
        data: "37 ms",
        innerTitle: "DATABASE",
        percentage: "55",
        color: "rgba(12, 115, 120, 0.8)",
        warningColour: "rgba(210, 61, 127, 1)"
        },
        {
        mainTitle: "Latency",
        data: "68 ms",
        innerTitle: "CACHE",
        percentage: "90",
        color: "rgba(251, 180, 109, 0.8)"
        },
        {
        mainTitle: "CPU Usage",
        data: "76",
        innerTitle: "DISK",
        percentage: "62",
        color: "rgba(182, 51, 37, 0.8)",
        warningColour: "rgba(123, 192, 81, 1)"
        },
        {
        mainTitle: "CPU Usage",
        data: "41",
        innerTitle: "NETWORK",
        percentage: "80",
        color: "rgba(240, 97, 164, 0.8)"
        },
        {
        mainTitle: "CPU Usage",
        data: "92",
        innerTitle: "DATABASE",
        percentage: "39",
        color: "rgba(109, 191, 189, 0.8)",
        warningColour: "rgba(33, 87, 228, 1)"
        },
        {
        mainTitle: "CPU Usage",
        data: "58",
        innerTitle: "CACHE",
        percentage: "73",
        color: "rgba(198, 99, 34, 0.8)",
        warningColour: "rgba(65, 161, 187, 1)"
        }
    ];

async function elementRendered(el) {
    updateFragment();
}

function updateFragment(){
  all_cards.shadowRoot.querySelector('.cardsContainer').innerHTML = allCards.map((card) =>
    `<div class='flex-item'><glowing-arc ${Object.keys(card).map(k=>`${k}="${card[k]}"`).join(' ')}></glowing-arc></div>`
  ).join('');
}

function search(inp){
    let val = inp.value.toLowerCase();
    let $$ = all_cards.shadowRoot;
    if(val.length){
      $$.querySelectorAll('.flex-item glowing-arc').forEach(el => el.getAttribute('innerTitle').toLowerCase().startsWith(val)? el.closest(".flex-item").style.order=1 : el.closest(".flex-item").style.order=2)
    } else{
      $$.querySelectorAll('.flex-item').forEach(el => el.style.order = 'initial');
    }
}

export const all_cards = { trueWebComponentMode:true,elementRendered, search}
monkshu_component.register("all-cards", `${COMPONENT_PATH}/all-cards.html`, all_cards);