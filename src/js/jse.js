import config from './config';

const optionsDefault = {
  animationName: config.name,
  animationDuration: config.duration,
  animationDelay: config.delay,
  offset: config.offset,
  animationFillMode: config.mode,
};
let elements = [];

/**
 * Init JsScrollEffect
 * @param {Array|String} element       List of element or id|class|attribute string include #|.|[]
 */
const init = function(element) {
  elements = element?(element instanceof Array && element.length> 0)?element:Array.from(document.querySelectorAll(element)):Array.from(document.querySelectorAll(config.attribute));
  if (elements.length<=0) return;

  for (let index = 0; index < elements.length; index++) {
    const el = elements[index];
    el.classList.add(config.className.hidden);

    const options = Object.assign({}, optionsDefault, JSON.parse(JSON.stringify(el.dataset)));
    delete options.animation;

    const checkClientRect = debounce(function() {
      const {top} = el.getBoundingClientRect();
      const isActive = el.classList.contains(config.className.active);

      if (top < window.innerHeight - options.offset && top >= 0 && !isActive) {
        const time = getDuration(options.animationDelay, options.animationDuration);

        Array.from(Object.keys(options)).forEach((key) => el.style[key] = options[key]);

        el.classList.add(config.className.active);
        setTimeout(() => {
          el.classList.remove(config.className.hidden);
        }, time);
      }
    }, 20);

    checkClientRect();
    window.addEventListener('scroll', () => checkClientRect());
  }
};
/**
 * Get total time to remove hidden class
 * @param {String} delay - delay
 * @param {String} duration
 * @return {Number} The timeout number
 */
const getDuration = function(delay, duration) {
  return [delay, duration].map((s) => {
    let num = 0;
    s.replace(/s|ms/g, function(a, b, c) {
      num = a==='s'?parseInt(c.replace('s', '')*1000):parseInt(c.replace('ms', ''));
    });
    return num;
  }).reduce((a, b)=> a + b);
};

/**
 * Prevent performs func after await time
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return {Function}
 */
const debounce = function(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default {
  init,
};
