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
    
    setArc(arcElement, percentage, color);
    element.shadowRoot.querySelector('.mainTitle').innerText = mainTitle;
    element.shadowRoot.querySelector('.data').innerText = data;
    element.shadowRoot.querySelector('.innerTitle').innerText = innerTitle;
    element.shadowRoot.querySelector('.innerSubtitle').innerText = innerSubtitle;


    if (warningColour) {
        const triangle = element.shadowRoot.querySelector('.warning-triangle svg');
        triangle.parentNode.style.display = 'flex';
        triangle.insertAdjacentHTML('beforeend', `
        <path d='M 3 20 A 1 1 0 1 1 1 17 L9,1 A 1 1 0 1 1 11 1 L18,17 A 1 1 0 1 1 16 20 Z' stroke-width="4px" stroke-linecap="round" stroke stroke='${warningColour}' fill='${warningColour}' />
        `);
    }
}
/**
 * 
 * @param {HTMLOrSVGElement} svg svg element to embed arc graphics
 * @param {Number | String} p percentage of circumference that arc should cover
 * @param {String} c arc color can be hex/name/rgb..
*/
function setArc(svg, p, c){
    p = Number(p);
    p = p>100? 100 : p;
    let endPoints = getEndPoints(p);
    if(p!=0){
        const d = `M ${initialPoints.x} ${initialPoints.y} A ${radius} ${radius} 0 ${p>50? 1 : 0} 1 ${endPoints.x} ${endPoints.y}`;
        svg.querySelector('g').insertAdjacentHTML("beforeend", `
        <path class="arc" d="${d}" stroke="${c}" stroke-width="18px" stroke-linecap="round">
        <animate id="a1" attributeType="XML" attributeName="stroke-dasharray" from="0" to="1000" dur="${2}s" fill="freeze" />
        </path>
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