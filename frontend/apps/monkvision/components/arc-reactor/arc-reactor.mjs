import {util} from "/framework/js/util.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";
// import { glowing_arc } from "../glowing-arc/glowing-arc.mjs"
const COMPONENT_PATH = util.getModulePath(import.meta);
const origin = {x: 399, y:399};
const pageData = {
    reactor: {
        lastTimeStamp: "19:15:47",
        boxText: "139.17.16.151:22",
        arcs: [
            {
                color: "#FF2002",
                percent: 10,
            },
            {
                color: "#FF9C07",
                percent: 15,
            },
            {
                color: "#47C4FB",
                percent: 50,
            }
        ],
        bottomHead: "Theshold at:",
        bottomVal: 88,
        leftArc: {
            color: "#FF9C07",
            percent: 50
        },
        mainText: "100.00%",
        mainTextType: "Status",
        blocksCount: 9,
        blocksColor: "#62FF02",
        graph: [14, 24, 32, -80, 50, 60, -40, 27, -20, -70, 50, 21, 77]
    }
}
async function elementRendered(element) {
    pageData.reactor = JSON.parse(element.getAttribute('content'))?? pageData.reactor;
    populateSvg(element);
}


function populateSvg(element){
    if(pageData.reactor){
        let {paths, points} = getArcPoints(pageData.reactor.arcs);
        let lastPt = points[points.length-1];
        element.shadowRoot.querySelector('body').innerHTML = `
        <svg viewBox="50 150 700 515" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="399" cy="399" r="194" stroke="white"/>
        
        ${paths.join('')}
        ${getLastDot(lastPt, pageData.reactor.lastTimeStamp)}

        <path d="M417.558 160.55L415.669 187.505L416.343 187.552L418.232 160.598L417.558 160.55Z" fill="white"/>
        <path d="M385.912 612.039L384.023 638.994L384.697 639.041L386.586 612.087L385.912 612.039Z" fill="white"/>
        <path d="M609.676 359.205L636.201 354.053L636.33 354.716L609.805 359.868L609.676 359.205Z" fill="white"/>
        <path d="M191.905 440.34L165.38 445.491L165.509 446.154L192.034 441.003L191.905 440.34Z" fill="white"/>
        <path d="M592.058 306.523L616.346 294.682L616.642 295.289L592.354 307.131L592.058 306.523Z" fill="white"/>
        <path d="M209.523 493.021L185.235 504.862L185.531 505.469L209.819 493.628L209.523 493.021Z" fill="white"/>
        <path d="M601.974 469.082L627.522 477.883L627.302 478.522L601.754 469.721L601.974 469.082Z" fill="white"/>
        <path d="M199.607 330.462L174.06 321.661L173.84 322.3L199.387 331.101L199.607 330.462Z" fill="white"/>
        <path d="M577.18 518.791L599.579 533.904L599.201 534.464L576.803 519.351L577.18 518.791Z" fill="white"/>
        <path d="M224.401 280.754L202.002 265.64L201.624 266.2L224.023 281.314L224.401 280.754Z" fill="white"/>
        <path d="M519.809 223.382L534.922 200.984L535.482 201.362L520.369 223.76L519.809 223.382Z" fill="white"/>
        <path d="M281.772 576.162L266.659 598.561L267.219 598.939L282.332 576.54L281.772 576.162Z" fill="white"/>
        <path d="M470.101 198.588L478.902 173.041L479.541 173.261L470.739 198.809L470.101 198.588Z" fill="white"/>
        <path d="M331.481 600.956L322.679 626.503L323.318 626.723L332.119 601.176L331.481 600.956Z" fill="white"/>
        <path d="M307.542 208.504L295.701 184.216L296.308 183.92L308.149 208.208L307.542 208.504Z" fill="white"/>
        <path d="M494.039 591.04L505.88 615.328L506.488 615.032L494.647 590.744L494.039 591.04Z" fill="white"/>
        <path d="M360.223 190.887L355.071 164.362L355.735 164.233L360.886 190.758L360.223 190.887Z" fill="white"/>
        <path d="M441.358 608.657L446.51 635.182L447.173 635.054L442.021 608.529L441.358 608.657Z" fill="white"/>
        <path d="M240.174 539.347L219.779 557.071L219.336 556.561L239.731 538.838L240.174 539.347Z" fill="white"/>
        <path d="M561.407 260.197L581.802 242.473L581.359 241.963L560.963 259.687L561.407 260.197Z" fill="white"/>
        <path d="M261.215 239.156L243.491 218.76L244.001 218.317L261.725 238.713L261.215 239.156Z" fill="white"/>
        <path d="M540.366 560.388L558.09 580.784L558.599 580.341L540.876 559.945L540.366 560.388Z" fill="white"/>
        <path d="M188.523 384.894L161.569 383.005L161.616 382.331L188.571 384.22L188.523 384.894Z" fill="white"/>
        <path d="M613.058 414.65L640.012 416.54L640.06 415.866L613.105 413.976L613.058 414.65Z" fill="white"/>
        <path d="M387.537 187.397L385.854 160.429L386.528 160.387L388.211 187.355L387.537 187.397Z" fill="white"/>
        <path d="M414.044 612.147L415.727 639.115L416.402 639.073L414.719 612.105L414.044 612.147Z" fill="white"/>
        <path d="M602.499 332.003L628.112 323.398L628.328 324.038L602.714 332.644L602.499 332.003Z" fill="white"/>
        <path d="M199.083 467.541L173.469 476.147L173.684 476.787L199.298 468.181L199.083 467.541Z" fill="white"/>
        <path d="M578.086 282.107L600.599 267.165L600.973 267.728L578.459 282.669L578.086 282.107Z" fill="white"/>
        <path d="M223.495 517.438L200.982 532.379L201.355 532.942L223.869 518.001L223.495 517.438Z" fill="white"/>
        <path d="M609.359 441.937L635.844 447.291L635.71 447.953L609.226 442.599L609.359 441.937Z" fill="white"/>
        <path d="M192.222 357.608L165.737 352.254L165.603 352.916L192.088 358.27L192.222 357.608Z" fill="white"/>
        <path d="M591.339 494.481L615.536 506.508L615.236 507.113L591.039 495.086L591.339 494.481Z" fill="white"/>
        <path d="M210.242 305.063L186.045 293.036L185.744 293.641L209.941 305.668L210.242 305.063Z" fill="white"/>
        <path d="M495.5 209.223L507.526 185.027L508.131 185.327L496.105 209.524L495.5 209.223Z" fill="white"/>
        <path d="M306.081 590.321L294.055 614.518L294.66 614.819L306.686 590.622L306.081 590.321Z" fill="white"/>
        <path d="M442.955 191.203L448.309 164.719L448.971 164.852L443.617 191.337L442.955 191.203Z" fill="white"/>
        <path d="M358.626 608.341L353.272 634.826L353.934 634.96L359.288 608.475L358.626 608.341Z" fill="white"/>
        <path d="M283.125 222.477L268.183 199.963L268.746 199.59L283.688 222.104L283.125 222.477Z" fill="white"/>
        <path d="M518.456 577.067L533.398 599.581L533.961 599.207L519.019 576.694L518.456 577.067Z" fill="white"/>
        <path d="M333.022 198.064L324.416 172.45L325.056 172.235L333.662 197.849L333.022 198.064Z" fill="white"/>
        <path d="M468.559 601.48L477.165 627.094L477.805 626.879L469.2 601.265L468.559 601.48Z" fill="white"/>
        <path d="M259.991 559.316L242.111 579.575L241.605 579.128L259.484 558.869L259.991 559.316Z" fill="white"/>
        <path d="M541.59 240.229L559.47 219.969L558.963 219.522L541.084 239.782L541.59 240.229Z" fill="white"/>
        <path d="M241.247 258.972L220.987 241.093L221.434 240.586L241.694 258.466L241.247 258.972Z" fill="white"/>
        <path d="M560.334 540.572L580.594 558.451L581.041 557.945L560.781 540.066L560.334 540.572Z" fill="white"/>
        <path d="M188.416 413.026L161.447 414.709L161.405 414.035L188.374 412.352L188.416 413.026Z" fill="white"/>
        <path d="M613.165 386.518L640.134 384.835L640.092 384.161L613.123 385.844L613.165 386.518Z" fill="white"/>
        <path d="M373.954 188.683L370.546 161.878L371.216 161.793L374.624 188.598L373.954 188.683Z" fill="white"/>
        <path d="M427.628 610.861L431.036 637.666L431.706 637.581L428.298 610.776L427.628 610.861Z" fill="white"/>
        <path d="M597.741 319.216L622.751 308.986L623.006 309.612L597.997 319.841L597.741 319.216Z" fill="white"/>
        <path d="M203.84 480.329L178.831 490.558L179.087 491.183L204.096 480.954L203.84 480.329Z" fill="white"/>
        <path d="M570.18 270.986L591.69 254.632L592.099 255.17L570.589 271.524L570.18 270.986Z" fill="white"/>
        <path d="M231.401 528.558L209.891 544.912L210.3 545.45L231.81 529.096L231.401 528.558Z" fill="white"/>
        <path d="M611.633 428.483L638.407 432.129L638.315 432.799L611.542 429.153L611.633 428.483Z" fill="white"/>
        <path d="M189.949 371.061L163.175 367.415L163.084 368.084L189.857 371.73L189.949 371.061Z" fill="white"/>
        <path d="M597.018 482.075L621.935 492.526L621.674 493.149L596.756 482.698L597.018 482.075Z" fill="white"/>
        <path d="M204.564 317.469L179.646 307.018L179.385 307.641L204.302 318.092L204.564 317.469Z" fill="white"/>
        <path d="M483.094 203.545L493.545 178.628L494.168 178.889L483.716 203.807L483.094 203.545Z" fill="white"/>
        <path d="M318.488 595.999L308.037 620.917L308.66 621.178L319.111 596.26L318.488 595.999Z" fill="white"/>
        <path d="M429.502 188.93L433.148 162.156L433.817 162.248L430.171 189.021L429.502 188.93Z" fill="white"/>
        <path d="M372.079 610.614L368.434 637.388L369.103 637.479L372.749 610.705L372.079 610.614Z" fill="white"/>
        <path d="M272.005 230.382L255.651 208.873L256.189 208.464L272.542 229.974L272.005 230.382Z" fill="white"/>
        <path d="M529.577 569.162L545.93 590.672L546.468 590.263L530.114 568.753L529.577 569.162Z" fill="white"/>
        <path d="M320.234 202.822L310.005 177.812L310.63 177.557L320.859 202.566L320.234 202.822Z" fill="white"/>
        <path d="M481.347 596.723L491.576 621.732L492.202 621.476L481.972 596.467L481.347 596.723Z" fill="white"/>
        <path d="M270.505 568.011L253.961 589.375L253.427 588.961L269.971 567.598L270.505 568.011Z" fill="white"/>
        <path d="M531.076 231.533L547.621 210.17L547.086 209.756L530.542 231.12L531.076 231.533Z" fill="white"/>
        <path d="M232.552 269.486L211.188 252.942L211.601 252.408L232.965 268.952L232.552 269.486Z" fill="white"/>
        <path d="M569.03 530.058L590.393 546.602L590.807 546.068L569.443 529.524L569.03 530.058Z" fill="white"/>
        <path d="M189.702 426.609L162.897 430.017L162.812 429.347L189.617 425.939L189.702 426.609Z" fill="white"/>
        <path d="M611.88 372.935L638.684 369.527L638.599 368.857L611.794 372.265L611.88 372.935Z" fill="white"/>
        <path d="M346.322 194.074L339.406 167.953L340.059 167.78L346.975 193.901L346.322 194.074Z" fill="white"/>
        <path d="M455.259 605.471L462.176 631.591L462.829 631.419L455.912 605.298L455.259 605.471Z" fill="white"/>
        <path d="M585.383 293.921L608.823 280.48L609.159 281.066L585.719 294.507L585.383 293.921Z" fill="white"/>
        <path d="M216.199 505.623L192.758 519.065L193.094 519.651L216.535 506.209L216.199 505.623Z" fill="white"/>
        <path d="M551.697 249.752L570.859 230.702L571.336 231.181L552.173 250.231L551.697 249.752Z" fill="white"/>
        <path d="M249.885 549.793L230.722 568.843L231.198 569.322L250.361 550.272L249.885 549.793Z" fill="white"/>
        <path d="M613.578 400.399L640.599 400.478L640.596 401.154L613.576 401.074L613.578 400.399Z" fill="white"/>
        <path d="M188.004 399.146L160.983 399.066L160.981 399.742L188.002 399.821L188.004 399.146Z" fill="white"/>
        <path d="M606.165 455.451L632.244 462.521L632.068 463.173L605.988 456.103L606.165 455.451Z" fill="white"/>
        <path d="M195.416 344.094L169.337 337.024L169.16 337.676L195.239 344.746L195.416 344.094Z" fill="white"/>
        <path d="M456.469 194.398L463.539 168.319L464.191 168.495L457.121 194.575L456.469 194.398Z" fill="white"/>
        <path d="M345.112 605.147L338.042 631.226L338.694 631.403L345.764 605.324L345.112 605.147Z" fill="white"/>
        <path d="M401.417 186.985L401.497 159.965L402.172 159.966L402.093 186.987L401.417 186.985Z" fill="white"/>
        <path d="M400.164 612.559L400.085 639.58L400.76 639.582L400.84 612.561L400.164 612.559Z" fill="white"/>
        <path d="M250.77 248.866L231.72 229.703L232.199 229.227L251.249 248.39L250.77 248.866Z" fill="white"/>
        <path d="M550.811 550.678L569.861 569.841L570.34 569.365L551.29 550.202L550.811 550.678Z" fill="white"/>
        <path d="M294.94 215.18L281.498 191.74L282.084 191.404L295.526 214.844L294.94 215.18Z" fill="white"/>
        <path d="M506.642 584.364L520.083 607.805L520.669 607.469L507.228 584.028L506.642 584.364Z" fill="white"/>
        <path d="M293.855 583.738L280.275 607.099L279.691 606.759L293.271 583.399L293.855 583.738Z" fill="white"/>
        <path d="M507.727 215.806L521.306 192.446L520.722 192.106L507.143 215.467L507.727 215.806Z" fill="white"/>
        <path d="M216.825 292.836L193.464 279.257L193.804 278.673L217.164 292.252L216.825 292.836Z" fill="white"/>
        <path d="M584.757 506.708L608.117 520.287L608.457 519.703L585.096 506.124L584.757 506.708Z" fill="white"/>
        <path d="M195.092 454.241L168.972 461.157L168.799 460.504L194.919 453.588L195.092 454.241Z" fill="white"/>
        <path d="M606.489 345.304L632.61 338.387L632.437 337.734L606.316 344.651L606.489 345.304Z" fill="white"/>
        <path d="M530.688 191.536C531.374 190.44 532.821 190.108 533.91 190.804C586.014 224.101 623.905 275.6 640.169 335.315C656.638 395.783 649.722 460.237 620.797 515.834C591.872 571.431 543.063 614.09 484.094 635.311C425.861 656.268 361.941 654.8 304.768 631.245C303.573 630.753 303.015 629.378 303.519 628.187V628.187C304.022 626.996 305.397 626.441 306.592 626.933C362.68 650.029 425.383 651.464 482.509 630.906C540.37 610.083 588.262 568.226 616.644 513.673C645.025 459.12 651.812 395.877 635.652 336.545C619.697 277.966 582.532 227.445 531.426 194.772C530.337 194.076 530.003 192.632 530.688 191.536V191.536Z" fill="url(#paint0_angular_128_21)" fill-opacity="0.8"/>
        <mask id="mask0_128_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="271" y="271" width="257" height="257">
        <circle cx="399.417" cy="399.847" r="127.941" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_128_21)">
        <g opacity="0.4">
        <rect x="319.511" y="251.632" width="1" height="297" fill="white" fill-opacity="0.4"/>
        <rect x="478.111" y="251.632" width="1" height="297" fill="white" fill-opacity="0.4"/>
        <rect x="2.31116" y="325.632" width="794" height="1" fill="white" fill-opacity="0.4"/>
        <rect x="2.31116" y="399.632" width="794" height="1" fill="white" fill-opacity="0.4"/>
        <rect x="2.31116" y="473.632" width="794" height="1" fill="white" fill-opacity="0.4"/>
        </g>
        ${getGraphPath()}
        <g id="crossHair">
        <line x1="399.781" y1="256.035" x2="399.781" y2="557.233" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="248.089" y1="402.139" x2="549.473" y2="402.139" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
        <rect x="302" y="327" width="90" height="26" rx="4" fill="#169632"/>
        <text x="345.703" y="341" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11px">${pageData.reactor.boxText}</text>
        </g>
        <g filter="url(#filter4_d_128_21)">
        <circle cx="399.663" cy="400" r="8" fill="white"/>
        <circle cx="399.663" cy="400" r="6.5" stroke="#245F15" stroke-width="3"/>
        </g>
        <line x1="376.445" y1="350.772" x2="397.445" y2="391.772" stroke="#169632"/>
        </g>
        <circle cx="399.766" cy="399.498" r="126.091" stroke="white" stroke-width="3"/>
        <text x="204.8" y="655.88" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="orange" font-size="31px">${pageData.reactor.bottomVal}</text>
        <g filter="url(#filter5_d_128_21)">
        <text x="190.44" y="631" dominant-baseline="middle" fill="snow" font-size="11">${pageData.reactor.bottomHead}</text>
        </g>
        <line x1="188.589" y1="615.326" x2="211.274" y2="592" stroke="white" stroke-width="3"/>
        <line x1="140.545" y1="552.07" x2="168.328" y2="536.029" stroke="white" stroke-width="3"/>
        <line x1="110.51" y1="478.536" x2="140.299" y2="470.232" stroke="white" stroke-width="3"/>
        <line x1="100.531" y1="399" x2="130.612" y2="399" stroke="white" stroke-width="3"/>
        <line x1="111.287" y1="321.034" x2="138.275" y2="329" stroke="white" stroke-width="3"/>
        <line x1="142.045" y1="247.8" x2="165.828" y2="261.84" stroke="white" stroke-width="3"/>
        <line x1="190.71" y1="185.021" x2="212.395" y2="206.06" stroke="white" stroke-width="3"/>
        ${getLeftArc(pageData.reactor.leftArc)}
        <text x="218.805" y="592.762" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11">0</text>
        <text x="143.481" y="401.592" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11">50</text>
        <text x="223.011" y="213.877" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11">100</text>
        <text x="588.162" y="199.5" dominant-baseline="middle" fill="snow" font-size="33">${pageData.reactor.mainText}</text>
        <g filter="url(#filter6_d_128_21)">
        <text x="592.5" y="219.08" dominant-baseline="middle" fill="#ddd" font-size="11">${pageData.reactor.mainTextType}</text>
        </g>
        <line x1="623.641" y1="272.556" x2="649.822" y2="257.44" stroke="white" stroke-width="2"/>
        <line x1="649.506" y1="334.317" x2="678.707" y2="326.493" stroke="white" stroke-width="2"/>
        <line x1="658.505" y1="400.668" x2="688.736" y2="400.668" stroke="white" stroke-width="2"/>
        <line x1="650.023" y1="467.087" x2="679.224" y2="474.911" stroke="white" stroke-width="2"/>
        <line x1="624.641" y1="529.048" x2="650.822" y2="544.164" stroke="white" stroke-width="2"/>
        <line x1="605.365" y1="245.344" x2="629.405" y2="227.013" stroke="white" stroke-width="2"/>
        <line x1="638.896" y1="303.303" x2="666.86" y2="291.818" stroke="white" stroke-width="2"/>
        <line x1="656.283" y1="367.964" x2="686.267" y2="364.108" stroke="white" stroke-width="2"/>
        <line x1="656.342" y1="434.922" x2="686.302" y2="438.958" stroke="white" stroke-width="2"/>
        <line x1="639.07" y1="499.614" x2="666.964" y2="511.267" stroke="white" stroke-width="2"/>
        ${[
            `<path opacity="0.61" d="M643.986 537.139C648.734 539.959 654.887 538.404 657.533 533.556C659.147 530.601 660.707 527.616 662.211 524.604C664.679 519.663 662.442 513.724 657.416 511.436L646.814 506.611C641.787 504.323 635.877 506.554 633.386 511.483C632.384 513.465 631.356 515.432 630.301 517.386C627.678 522.245 629.222 528.372 633.97 531.192L643.986 537.139Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M660.542 504.292C665.633 506.432 671.513 504.045 673.468 498.88C674.66 495.731 675.794 492.56 676.87 489.369C678.635 484.136 675.602 478.561 670.309 476.986L659.144 473.665C653.85 472.091 648.303 475.114 646.513 480.339C645.794 482.439 645.046 484.529 644.27 486.609C642.34 491.783 644.712 497.639 649.804 499.779L660.542 504.292Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M672.24 470.16C677.574 471.594 683.078 468.435 684.318 463.053C685.074 459.772 685.769 456.477 686.405 453.17C687.448 447.746 683.69 442.632 678.233 441.786L666.722 440.002C661.265 439.156 656.175 442.9 655.108 448.319C654.678 450.497 654.22 452.669 653.731 454.835C652.517 460.222 655.658 465.704 660.991 467.137L672.24 470.16Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M679.262 434.484C684.741 435.179 689.765 431.301 690.261 425.801C690.564 422.447 690.805 419.088 690.985 415.726C691.28 410.211 686.863 405.655 681.341 405.559L669.694 405.357C664.172 405.261 659.639 409.662 659.318 415.175C659.189 417.392 659.03 419.606 658.841 421.818C658.37 427.321 662.228 432.324 667.707 433.019L679.262 434.484Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M681.361 397.735C686.883 397.669 691.326 393.137 691.06 387.621C690.898 384.257 690.675 380.897 690.39 377.541C689.923 372.038 684.921 368.134 679.438 368.799L667.875 370.202C662.392 370.867 658.508 375.85 658.949 381.356C659.127 383.568 659.274 385.784 659.391 388C659.682 393.516 664.191 397.941 669.714 397.875L681.361 397.735Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M678.415 361.264C683.877 360.443 687.657 355.345 686.639 349.917C686.018 346.607 685.337 343.309 684.596 340.024C683.38 334.637 677.891 331.454 672.55 332.863L661.288 335.835C655.948 337.244 652.783 342.712 653.973 348.105C654.451 350.273 654.9 352.447 655.319 354.627C656.363 360.05 661.435 363.817 666.897 362.996L678.415 361.264Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M670.547 325.68C675.845 324.122 678.896 318.557 677.147 313.318C676.081 310.124 674.957 306.949 673.775 303.796C671.837 298.625 665.964 296.22 660.866 298.343L650.114 302.823C645.016 304.947 642.625 310.795 644.539 315.975C645.309 318.058 646.05 320.15 646.762 322.253C648.535 327.483 654.073 330.524 659.372 328.966L670.547 325.68Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M657.551 290.721C662.58 288.439 664.824 282.503 662.362 277.559C660.861 274.545 659.305 271.558 657.695 268.601C655.055 263.75 648.904 262.187 644.152 265.002L634.129 270.937C629.377 273.751 627.826 279.875 630.444 284.738C631.496 286.693 632.522 288.662 633.52 290.644C636.005 295.577 641.914 297.815 646.943 295.533L657.551 290.721Z" fill="${pageData.reactor.blocksColor}"/>`,
            `<path opacity="0.61" d="M640.721 259.369C645.402 256.438 646.837 250.256 643.739 245.684C641.85 242.896 639.91 240.143 637.921 237.426C634.658 232.97 628.354 232.24 624.019 235.662L614.876 242.878C610.54 246.3 609.817 252.576 613.059 257.047C614.362 258.844 615.641 260.659 616.895 262.491C620.014 267.049 626.168 268.481 630.849 265.55L640.721 259.369Z" fill="${pageData.reactor.blocksColor}"/>`,
        ].splice(0, pageData.reactor.blocksCount).join('')}
        
        <defs>
        <filter id="airbrush-effect" x="0" y="0" width="802" height="802" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" />
            <feComposite in2="hardAlpha" operator="out"/>
        </filter>

        <filter id="filter0_d_128_21" x="157.222" y="357.172" width="484.191" height="283.409" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="19.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.14691 0 0 0 0 0.717094 0 0 0 0 0.965983 0 0 0 0.64 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter1_d_128_21" x="362.023" y="156.239" width="189.279" height="126.863" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="19.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.1255 0 0 0 0 0.00625002 0 0 0 0.7 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter2_d_128_21" x="471.072" y="197.832" width="170.097" height="236.625" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="19.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.999398 0 0 0 0 0.610466 0 0 0 0 0.027067 0 0 0 0.6 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter3_d_128_21" x="0" y="0" width="802" height="802" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_128_21"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.672883 0 0 0 0 0.845036 0 0 0 0 0.920182 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter4_d_128_21" x="388.663" y="389" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_128_21"/>
        <feOffset/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.407843 0 0 0 0 0.717647 0 0 0 0 0.4 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter5_d_128_21" x="147.04" y="623.58" width="153.119" height="125.48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="74"/>
        <feGaussianBlur stdDeviation="22"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <filter id="filter6_d_128_21" x="548.41" y="213.92" width="119.546" height="125.16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="74"/>
        <feGaussianBlur stdDeviation="22"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_128_21"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_128_21" result="shape"/>
        </filter>
        <radialGradient id="paint0_angular_128_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(399.702 400.808) rotate(114.045) scale(259.685 265.51)">
        <stop offset="0.00133629" stop-color="white"/>
        <stop offset="0.506713" stop-color="#25B7F6" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="paint1_linear_128_21" x1="0" y1="0" x2="806" y2="802" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FCFCFC" stop-opacity="0.43"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
        </linearGradient>
        </defs>
    </svg>
        `;
    }
}

function getArcPoints(arcs){
    let sP = {x:399, y:205};
    let p=0;
    let points = [];
    let paths = [];
    for(let i=0,l=arcs.length; i<l; i++){
        p+= arcs[i].percent;
        let lastEp = points[points.length-1]?? sP;
        const eP = {};
        eP.x = sP.x; eP.y = sP.y;
        if(isNaN(p)){
            points.push(sP);
        }
        else{
            const rad = (2*p*Math.PI)/100;
            const dx = sP.x - origin.x; const dy = sP.y -origin.y;
            eP.x = Math.floor((origin.x + dx * (Math.cos(rad)) - dy * (Math.sin(rad)))*100)/100;
            eP.y = Math.floor((origin.y + dx * (Math.sin(rad)) + dy * (Math.cos(rad)))*100)/100;
            points.push(eP);
        }
        let path = `<path stroke-width="25" d="M ${lastEp.x} ${lastEp.y} A 194 194 0 ${arcs[i].percent>50? 1 : 0} 1 ${eP.x} ${eP.y}" stroke="${arcs[i].color}" stroke-linecap="round" filter="url(#airbrush-effect)"/>
        <path opacity="0.8" stroke-width="15" d="M ${lastEp.x} ${lastEp.y} A 194 194 0 ${arcs[i].percent>50? 1 : 0} 1 ${eP.x} ${eP.y}" stroke="${arcs[i].color}" stroke-linecap="round"/>`;
        paths.push(path);
    }
    return {paths, points};
}

function getLastDot(lastPt, text){
    let a,b,c,d,e,f,g;

    if(lastPt.x<399){
        a = lastPt.x + 21;
        c = lastPt.x + 19.5;
        e = c+ 37;
        if(lastPt.y<399){ //4th
            b = lastPt.y + 27;
            d = lastPt.y + 16.5;
        }
        else{ //3rd
            b = lastPt.y - 17;
            d = lastPt.y - 14.5;
        }
    }
    else{
        a= lastPt.x - 55;
        c = lastPt.x - 19.5;
        e = c - 37;
        if(lastPt.y<399){ //1st
            b = lastPt.y + 27;
            d = lastPt.y + 16.5;
        }
        else{ //2nd
            b = lastPt.y - 17;
            d = lastPt.y - 14.5;
        }
    }
   

    return `
    <text x="${a}" y="${b}" fill="snow" font-size="10">${text}</text>
    <line x1="${c}" y1="${d}" x2="${lastPt.x}" y2="${lastPt.y}" stroke="snow"/>
    <line x1="${c}" y1="${d}" x2="${e}" y2="${d}" stroke="snow"/>
    <circle cx="${e}" cy="${d}" r="3px" fill="snow"/>
    <g filter="url(#filter3_d_128_21)">
    <circle cx="${lastPt.x}" cy="${lastPt.y}" r="5.59304" fill="white"/>
    </g>`;
}

function getLeftArc(arc){
    try {
        const eP = {};
        eP.x = 203; eP.y = 598;
        const rad = (2*(arc.percent/4)*Math.PI)/100;
        const dx = eP.x - origin.x; const dy = eP.y -origin.y;
        const r = Math.sqrt(Math.pow(399-eP.x, 2) + Math.pow(399-eP.y, 2));  279.31;
        eP.x = Math.floor((origin.x + dx * (Math.cos(rad)) - dy * (Math.sin(rad)))*100)/100;
        eP.y = Math.floor((origin.y + dx * (Math.sin(rad)) + dy * (Math.cos(rad)))*100)/100;
        return `
        <path opacity="0.8" d="M211.274 592.641 A 269.699 269.699 0 0 1 211.274 205.359" stroke="#D9D9D9" stroke-width="4"/>
        <path stroke-width="15" opacity="0.7" d="M 199 594 A ${r} ${r} 0 0 1 ${eP.x} ${eP.y}" stroke="${arc.color}" stroke-linecap="round"/>
        `;
    } catch (e) {
        console.log(e);
        return '';
    }
}

function getGraphPath() {
    const rf = pageData.reactor.graph;
    let width = 254;
    let _x= 254/(rf.length - 1), _y=-1.27;
    const xi = 399-width/2, yi = 400;
    const pts = [];
    for (let i = 0, l = rf.length; i < l; i++) pts.push([_x * i + xi, yi + _y * rf[i]]);
    const scatter = getGraphPoints(pts);
    return (svgPath(pts, 399-width/2, 399+width/2));
}

function svgPath(points, xs, xe) {
    if(points.length<2) return '';
    const d = points.reduce((acc, point, i, a) => i === 0
        // if first point
        ? `M ${point[0]},${point[1]}`
        // else
        : `${acc} ${bezierCommand(point, i, a)}`
        , '')
    return (
    `
    <g id="graph">
    <path opacity="0.5" d="${d} L${xe},527 H${xs} Z" fill="url(#paint1_linear_128_21)"/>
    <path stroke-width="2" stroke="green" d="${d}"/>
    </g>
    `)
}

function bezierCommand(point, i, a) {
    // start control point
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
    // end control point
    const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
    let seg = `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    return seg;
}

function controlPoint(current, previous, next, reverse) {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current
    const n = next || current
    // The smoothing ratio
    const smoothing = 0.2;
    // Properties of the opposed-line
    const o = line(p, n)
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

function line(pointA, pointB) {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

function getGraphPoints(pts) {
    let c = '';
    pts.forEach(a => {
        c += `<circle cx="${a[0]}" cy="${a[1]}" r="2" fill="rgba(0,255,0,0.3)"/>`;
    });
    return c;
}

function setCrossHair(){
    getElement('g#crossHair').innerHTML = 
    `<line x1="399.781" y1="256.035" x2="399.781" y2="557.233" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
    <line x1="248.089" y1="402.139" x2="549.473" y2="402.139" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
    <rect x="302" y="327" width="90" height="26" rx="4" fill="#169632"/>
    <text x="345.703" y="341" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="snow" font-size="11px">${pageData.reactor.boxText}</text>
    `
}

export const arc_reactor = { trueWebComponentMode:true,elementRendered}
monkshu_component.register("arc-reactor", `${COMPONENT_PATH}/arc-reactor.html`, arc_reactor);