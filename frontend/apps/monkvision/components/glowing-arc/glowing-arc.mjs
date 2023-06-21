import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
const COMPONENT_PATH = util.getModulePath(import.meta);

//elementRendered
//elementConnected
const radius = 100; //hit-n-trial to achieve result
const initialPoints = {x: 100, y: 10};
const origin = {x: 100, y: 110};
async function elementRendered(element) {
    const mainTitle = element.getAttribute('mainTitle');
    const data = element.getAttribute('data');
    const innerTitle = element.getAttribute('innerTitle');
    const innerSubtitle = element.getAttribute('innerSubtitle');
    const percentage = element.getAttribute('percentage');
    const color = element.getAttribute('color');
    const warningColour = element.getAttribute('warningcolour');
    const arcElement = element.shadowRoot.querySelector('.color-arc');
    
    setArc(arcElement, percentage, color, mainTitle, data, innerTitle, innerSubtitle);
    // element.shadowRoot.querySelector('.mainTitle').innerText = mainTitle;
    // element.shadowRoot.querySelector('.data').innerText = data;
    // element.shadowRoot.querySelector('.innerTitle').innerText = innerTitle;
    // element.shadowRoot.querySelector('.innerSubtitle').innerText = innerSubtitle;


    if (warningColour) {
        const triangle = element.shadowRoot.querySelector('.warning-triangle svg');
        triangle.parentNode.style.display = 'flex';
        triangle.insertAdjacentHTML('beforeend', `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.8564 20.2819L21.0645 4.00748C19.9663 2.02265 17.8769 0.790771 15.6085 0.790771C13.3401 0.790771 11.2507 2.02265 10.1525 4.00748L1.22029 20.2663C0.170864 22.1973 0.215487 24.5382 1.33774 26.4278C2.45999 28.3174 4.49412 29.4767 6.69186 29.4791H24.3693C26.5651 29.4792 28.5991 28.3242 29.7242 26.4385C30.8492 24.5527 30.8994 22.2142 29.8564 20.2819ZM14.2679 11.3029C14.2679 10.6572 14.7913 10.1338 15.437 10.1338C16.0827 10.1338 16.6062 10.6572 16.6062 11.3029V16.1198C16.6062 16.7655 16.0827 17.2889 15.437 17.2889C14.7913 17.2889 14.2679 16.7655 14.2679 16.1198V11.3029ZM15.4526 21.8252C16.0983 21.8252 16.6218 21.3017 16.6218 20.656L16.6062 20.6404C16.6062 20.0034 16.0897 19.4869 15.4526 19.4869C14.8104 19.4953 14.2919 20.0138 14.2835 20.656C14.2835 21.3017 14.8069 21.8252 15.4526 21.8252Z" fill='${warningColour}' />
        `);
    }
}
/**
 * 
 * @param {HTMLOrSVGElement} svg svg element to embed arc graphics
 * @param {Number | String} p percentage of circumference that arc should cover
 * @param {String} c arc color can be hex/name/rgb..
 * @param {*} data text
 * @param {*} innerSubtitle text  
 * @param {*} innerTitle text
 * @param {*} mainTitle text
*/
function setArc(svg, p, c, mainTitle, data, innerTitle, innerSubtitle){
    p = Number(p);
    p = p>100? 100 : p;
    let endPoints = getEndPoints(p);
    if(p!=0){
        const circle = `M ${initialPoints.x} ${initialPoints.y} A ${radius} ${radius} 0 1 1 ${initialPoints.x-0.01} ${initialPoints.y}`;
        const d = `M ${initialPoints.x} ${initialPoints.y} A ${radius} ${radius} 0 ${p>50? 1 : 0} 1 ${endPoints.x} ${endPoints.y}`;
        svg.querySelector('g').insertAdjacentHTML("beforeend", `
        <path class="arc" d="${d}" stroke="${c}" stroke-width="18px" stroke-linecap="round">
        <animate id="a1" attributeType="XML" attributeName="stroke-dasharray" from="0" to="1000" dur="${2}s" fill="freeze" />
        </path>
        <path d="${circle}" stroke="white" stroke-width="2px" stroke-linecap="round" opacity="0.9"/>
        `)
        svg.insertAdjacentHTML('beforeend', `
        <g>
            <style>
                .small, .heavy{
                    text-anchor: middle;
                    fill: white;
                    dominant-baseline: middle;
                    transform: translate(-10%, -1%)
                }
                .small {
                    font: reguar 13px sans-serif;
                }
                .heavy {
                    font: bold 30px sans-serif;
                }
            </style>
            <text x="50%" y="40%" class="small">${innerTitle?? ''}</text>
            <text x="50%" y="50%" class="heavy">${data?? ''}</text>
            <text x="50%" y="60%" class="small">${innerSubtitle?? ''}</text>
            <text x="50%" y="96%" class="small">${mainTitle?? ''}</text>
        </g>
        `)
    }
}
/**
 * 
 * @param {Number} percentage percentage of circle arc should cover
 * @returns {Object} returns x and y coordinate where arc ends on circle
 */
function getEndPoints(percentage){
    const points = {};
    points.x = initialPoints.x; points.y = initialPoints.y;
    if(isNaN(percentage)) return points;
    const rad = (2*percentage*Math.PI)/100;
    const dx = initialPoints.x - origin.x; const dy = initialPoints.y -origin.y;
    points.x = Math.floor((origin.x + dx * (Math.cos(rad)) - dy * (Math.sin(rad)))*100)/100;
    points.y = Math.floor((origin.y + dx * (Math.sin(rad)) + dy * (Math.cos(rad)))*100)/100;
    return points;
}

function startAnimation(element){
    element.setAttribute('onmouseover', '');
    const a1 = element.querySelector('#a1');
    a1?.beginElement();
    setTimeout(()=> {
        if(element.getAttribute('onmouseover') == ''){
            element.setAttribute('onmouseover', "monkshu_env.components['glowing-arc'].startAnimation(this)");
        }
    }, 4500);
}
function addAnimation(element){
    if(element.getAttribute('onmouseover') == ''){
        element.setAttribute('onmouseover', "monkshu_env.components['glowing-arc'].startAnimation(this)");
    }
}

export const glowing_arc = { trueWebComponentMode:true,elementRendered, startAnimation, addAnimation}
monkshu_component.register("glowing-arc", `${COMPONENT_PATH}/glowing-arc.html`, glowing_arc);