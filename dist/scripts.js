const output=document.querySelector(".modal__value"),rangeSLider=document.querySelector(".adjust-bar.adjust-bar_theme_temp");rangeSLider.oninput=function(){output.innerHTML=0<this.value?"+"+this.value:this.value};const arrowLeftDevs=document.querySelector(".devices__paginator .paginator__arrow_left"),arrowRightDevs=document.querySelector(".devices__paginator .paginator__arrow_right"),panelCountDevs=document.querySelectorAll(".devices__panel").length,devices=document.querySelector(".devices"),pagiantorDevs=document.querySelector(".devices__paginator");let currentPageDevs=1;pagiantorDevs.classList.toggle("paginator_hide",7>panelCountDevs),arrowRightDevs.addEventListener("click",function(){currentPageDevs+=1,arrowLeftDevs.classList.toggle("paginator__arrow_disabled",1==currentPageDevs),devices.scroll({top:0,left:1366,behavior:"smooth"})}),arrowLeftDevs.addEventListener("click",function(){1<currentPageDevs&&(currentPageDevs-=1,arrowLeftDevs.classList.toggle("paginator__arrow_disabled",1==currentPageDevs),devices.scroll({top:0,left:-1366,behavior:"smooth"}))});let curValue,curRotate,maxRotate=.42,minRotate=-.42;const MIN_VALUE=26,MAX_VALUE=35,INDICATOR_OFFSET=265,rotateToValue=function(a){return Math.floor(Math.abs(1.73*(360*a)+INDICATOR_OFFSET)/53+MIN_VALUE)};function setRotate(a){a>maxRotate?a=maxRotate:a<minRotate&&(a=minRotate),curRotate=a,curValue=rotateToValue(a),document.querySelector(".modal_knob .modal__value").innerHTML="+"+curValue,document.querySelector(".knob__value").innerHTML="+"+curValue,document.querySelector(".knob__indicator").style.strokeDasharray=1.73*(360*curRotate)+INDICATOR_OFFSET+" 629",document.querySelector(".knob__arrow").style.transform="rotate("+360*curRotate+"deg)"}function getPosition(a){const b=a.getBoundingClientRect();return[b.left+(b.right-b.left)/2,b.top+(b.bottom-b.top)/2]}function getMouseAngle(a,b){var c=Math.PI,d=Math.atan2;const e=getPosition(b);let f,g=[a.clientX,a.clientY];return a.targetTouches&&a.targetTouches[0]&&(g=[a.targetTouches[0].clientX,a.targetTouches[0].clientY]),f=d(g[1]-e[1],g[0]-e[0]),f+=c/2,f}let knobDragged,prevAngleRad=null,prevRotate=null;function startDragging(a){a.preventDefault(),a.stopPropagation();const b=getMouseAngle(a,document.querySelector(".knob_center"));knobDragged=!0,prevAngleRad=b,prevRotate=curRotate}function stopDragging(){knobDragged=!1}function dragRotate(a){var b=Math.PI;if(!knobDragged)return;const c=prevAngleRad;let d=getMouseAngle(a,document.querySelector(".knob_center")),e=d-c;prevAngleRad=d,0>e&&(e+=2*b),e>b&&(e-=2*b);const f=e/b/2,g=prevRotate+f;prevRotate=g,setRotate(g)}function setEvtListeners(){const a=document.querySelector(".knob-container");a.addEventListener("mousedown",startDragging),document.addEventListener("mouseup",stopDragging),document.addEventListener("mousemove",dragRotate),a.addEventListener("touchstart",startDragging),document.addEventListener("touchend",stopDragging),document.addEventListener("touchmove",dragRotate)}setEvtListeners(),setRotate(0),document.querySelectorAll(".modal_close").forEach(a=>{a.onclick=function(){document.querySelectorAll(".modal").forEach(a=>{a.classList.toggle("modal_open",!1),document.querySelector("body").style.overflow="auto"})}});const TEMPS={manual:-10,cold:0,warm:23,hot:30};document.querySelectorAll(".modal__filter-item_temp").forEach(a=>{a.onclick=function(){document.querySelector(".adjust-bar_theme_temp").value=TEMPS[this.id],document.querySelector(".modal_temp .modal__value").innerHTML=0<TEMPS[this.id]?"+"+TEMPS[this.id]:TEMPS[this.id]}});const showModal=function(a){document.querySelector(a).classList.toggle("modal_open",!0),document.querySelector("body").style.overflow="hidden"};document.querySelectorAll(".panel_temp").forEach(a=>{a.onclick=function(){showModal(".modal_temp")}}),document.querySelectorAll(".panel_lamp").forEach(a=>{a.onclick=function(){showModal(".modal_light")}}),document.querySelectorAll(".panel_floor").forEach(a=>{a.onclick=function(){showModal(".modal_knob")}});const arrowLeftScens=document.querySelector(".scenarios__paginator .paginator__arrow_left"),arrowRightScens=document.querySelector(".scenarios__paginator .paginator__arrow_right"),panelCountScens=document.querySelectorAll(".scenarios__panel").length,pageCountScens=document.querySelectorAll(".scenarios__page").length,scenarios=document.querySelector(".scenarios"),pagiantorScens=document.querySelector(".scenarios__paginator");let currentPage=1;pagiantorScens.classList.toggle("paginator_hide",9>=panelCountScens),arrowRightScens.addEventListener("click",function(){currentPage<pageCountScens&&(currentPage+=1,arrowRightScens.classList.toggle("paginator__arrow_disabled",currentPage===pageCountScens),arrowLeftScens.classList.toggle("paginator__arrow_disabled",1==currentPage),scenarios.scroll({top:0,left:645,behavior:"smooth"}))}),arrowLeftScens.addEventListener("click",function(){1<currentPage&&(currentPage-=1,arrowRightScens.classList.toggle("paginator__arrow_disabled",currentPage===pageCountScens),arrowLeftScens.classList.toggle("paginator__arrow_disabled",1==currentPage),scenarios.scroll({top:0,left:-645,behavior:"smooth"}))});const selectButton=document.querySelector(".filter__select-button"),selectButtonText=document.querySelector(".filter__select-button .button__text"),selectOptions=document.querySelectorAll(".filter__select-item"),popup=document.querySelector(".filter__select-popup");selectButton.addEventListener("click",function(){popup.classList.toggle("filter__select-popup_open")});let widths="";window.addEventListener("scroll",function(){widths+=document.querySelectorAll("body")[0].offsetWidth,document.querySelector(".stats").innerHTML=widths}),selectOptions.forEach(a=>{a.addEventListener("click",function(a){document.querySelector("#"+a.target.dataset.group).checked=!0,selectOptions.forEach(a=>a.classList.toggle("filter__select-item_checked",!1)),a.target.classList.toggle("filter__select-item_checked",!0),popup.classList.toggle("filter__select-popup_open",!1),selectButtonText.innerText=a.target.innerText})}),document.querySelector(".menu__icon").addEventListener("click",function(){document.querySelector(".menu").classList.toggle("menu_open")});