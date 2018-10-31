var output = document.querySelector('.modal__value');
var rangeSLider = document.querySelector('.adjust-bar.adjust-bar_theme_temp');

rangeSLider.oninput = function() {
  output.innerHTML = this.value > 0 ? '+' + this.value : this.value;
}

var arrowLeftDevs = document.querySelector('.devices__paginator .paginator__arrow_left');
var arrowRightDevs = document.querySelector('.devices__paginator .paginator__arrow_right');
var panelCountDevs = document.querySelectorAll('.devices__panel').length;
var devices = document.querySelector('.devices');
var pagiantorDevs = document.querySelector('.devices__paginator');
var currentPageDevs = 1;

pagiantorDevs.classList.toggle('paginator_hide', panelCountDevs < 7);

arrowRightDevs.addEventListener('click', function () {
    currentPageDevs += 1;
    arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
    devices.scroll({
      top: 0,
      left: 1366,
      behavior: 'smooth'
    });
});

arrowLeftDevs.addEventListener('click', function () {
  if (currentPageDevs > 1) {
    currentPageDevs -= 1;
    arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
    devices.scroll({
      top: 0,
      left: -1366,
      behavior: 'smooth'
    });
  }
});

var curValue;
var curRotate;
var maxRotate = 0.42; // 150 градусов
var minRotate = -0.42; // -150 градусов

var MIN_VALUE = 26;
var MAX_VALUE = 35;
var INDICATOR_OFFSET = 265;

var rotateToValue = function(rotate) {
  return Math.floor((Math.abs(rotate * 360 * 1.73 + INDICATOR_OFFSET) / 53) + MIN_VALUE);
}


/**
 * @param {Number} rotate Количество оборотов от нейтриального положения.
 */
function setRotate(rotate) {
  if (rotate > maxRotate) {
    rotate = maxRotate;
  } else if (rotate < minRotate) {
    rotate = minRotate;
  }

  curRotate = rotate;
  curValue = rotateToValue(rotate);

  document.querySelector('.modal_knob .modal__value').innerHTML = '+' + curValue;
  document.querySelector('.knob__value').innerHTML = '+' + curValue;
  document.querySelector('.knob__indicator').style.strokeDasharray = curRotate * 360 * 1.73 + INDICATOR_OFFSET + ' 629';
  document.querySelector('.knob__arrow').style.transform = 'rotate(' + (curRotate * 360) + 'deg)';
}

function getPosition(elem) {
  var rect = elem.getBoundingClientRect();

  return [
    rect.left + (rect.right - rect.left) / 2,
    rect.top + (rect.bottom - rect.top) / 2
  ];
}

function getMouseAngle(event, centerElem) {
  var pos = getPosition(centerElem);
  var cursor = [event.clientX, event.clientY];
  var rad;

  if (event.targetTouches && event.targetTouches[0]) {
    cursor = [event.targetTouches[0].clientX, event.targetTouches[0].clientY];
  }

  rad = Math.atan2(cursor[1] - pos[1], cursor[0] - pos[0]);
  rad += Math.PI / 2;

  return rad;
}

var knobDragged;
var prevAngleRad = null;
var prevRotate = null;

function startDragging(e) {
  e.preventDefault();
  e.stopPropagation();
  var rad = getMouseAngle(e, document.querySelector('.knob_center'));

  knobDragged = true;
  prevAngleRad = rad;
  prevRotate = curRotate;
}

function stopDragging(e) {
  knobDragged = false;
}

function dragRotate(e) {
  if (!knobDragged) {
    return;
  }

  var old = prevAngleRad;
  var rad = getMouseAngle(e, document.querySelector('.knob_center'));
  var delta = rad - old;

  prevAngleRad = rad;

  if (delta < 0) {
    delta += Math.PI * 2;
  }
  if (delta > Math.PI) {
    delta -= Math.PI * 2;
  }

  var deltaRotate = delta / Math.PI / 2;
  var rotate = prevRotate + deltaRotate;

  prevRotate = rotate;
  setRotate(rotate);
}

function setEvtListeners() {
  var elem = document.querySelector('.knob-container');

  elem.addEventListener('mousedown', startDragging);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('mousemove', dragRotate);
  elem.addEventListener('touchstart', startDragging);
  document.addEventListener('touchend', stopDragging);
  document.addEventListener('touchmove', dragRotate);
}

setEvtListeners();
setRotate(0);

document.querySelectorAll('.modal_close').forEach(b => {
  b.onclick = function() {
    document.querySelectorAll('.modal').forEach(m => {
      m.classList.toggle('modal_open', false);
      document.querySelector('body').style.overflow = 'auto';
    });
  }
});

var TEMPS = {
  'manual': -10,
  'cold': 0,
  'warm': 23,
  'hot': 30
}

document.querySelectorAll('.modal__filter-item_temp').forEach(l => {
  l.onclick = function() {
    document.querySelector('.adjust-bar_theme_temp').value = TEMPS[this.id];
    document.querySelector('.modal_temp .modal__value').innerHTML = TEMPS[this.id] > 0 ? '+' + TEMPS[this.id] : TEMPS[this.id];
  }
});

var showModal = function(selector) {
  document.querySelector(selector).classList.toggle('modal_open', true);
  document.querySelector('body').style.overflow = 'hidden';
}

document.querySelectorAll('.panel_temp').forEach(p => {
  p.onclick = function() {
    showModal('.modal_temp');
  }
});

document.querySelectorAll('.panel_lamp').forEach(p => {
  p.onclick = function() {
    showModal('.modal_light');
  }
});

document.querySelectorAll('.panel_floor').forEach(p => {
  p.onclick = function() {
    showModal('.modal_knob');
  }
});

var arrowLeftScens = document.querySelector('.scenarios__paginator .paginator__arrow_left');
var arrowRightScens = document.querySelector('.scenarios__paginator .paginator__arrow_right');
var panelCountScens = document.querySelectorAll('.scenarios__panel').length;
var pageCountScens = document.querySelectorAll('.scenarios__page').length;
var scenarios = document.querySelector('.scenarios');
var pagiantorScens = document.querySelector('.scenarios__paginator');
var currentPage = 1;

pagiantorScens.classList.toggle('paginator_hide', panelCountScens <= 9);

arrowRightScens.addEventListener('click', function () {
  if (currentPage < pageCountScens) {
    currentPage += 1;
    arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
    arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
    scenarios.scroll({
      top: 0,
      left: 645,
      behavior: 'smooth'
    });
  }
});

arrowLeftScens.addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage -= 1;
    arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
    arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
    scenarios.scroll({
      top: 0,
      left: -645,
      behavior: 'smooth'
    });
  }
});

var selectButton = document.querySelector('.filter__select-button');
var selectButtonText = document.querySelector('.filter__select-button .button__text');
var selectOptions = document.querySelectorAll('.filter__select-item');
var popup = document.querySelector('.filter__select-popup');

selectButton.addEventListener('click', function() {
  popup.classList.toggle('filter__select-popup_open');
});

var widths = '';
window.addEventListener('scroll', function() {
    widths += document.querySelectorAll('body')[0].offsetWidth;
    document.querySelector('.stats').innerHTML = widths;
});

selectOptions.forEach(o => {
  o.addEventListener('click', function(e) {
    document.querySelector('#' + e.target.dataset.group).checked = true;

    selectOptions.forEach(opt => opt.classList.toggle('filter__select-item_checked', false));
    e.target.classList.toggle('filter__select-item_checked', true);
    popup.classList.toggle('filter__select-popup_open', false);
    selectButtonText.innerText = e.target.innerText;
  })
});

document.querySelector('.menu__icon').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('menu_open');
});
