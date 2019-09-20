import config from './config';

const optionsDefault = {
  animationName: config.name,
  animationDuration: config.duration,
  animationDelay: config.delay,
  offset: config.offset,
  animationFillMode: config.mode,
};

/**
 * @property {Array|String} elements       List of element or id|class string includes #|.
 */
export default class JsScrollEffect {
  constructor(elements = []) {
    this.elements = elements.length>0?elements:Array.from(document.querySelectorAll(config.attribute));
    if (this.elements.length<=0) return;
  }

  init() {
    this.elements.forEach((el) => {
      el.classList.add(config.className.hidden);

      const options = Object.assign({}, optionsDefault, JSON.parse(JSON.stringify(el.dataset)));
      delete options.animation;

      const checkClientRect = this.debounce(() => {
        const {top} = el.getBoundingClientRect();
        const isActive = el.classList.contains(config.className.active);

        if (top < window.innerHeight - options.offset && top >= 0 && !isActive) {
          const time = this.getDuration(options.animationDelay, options.animationDuration);

          Array.from(Object.keys(options)).forEach((key) => el.style[key] = options[key]);

          el.classList.add(config.className.active);
          setTimeout(() => {
            el.classList.remove(config.className.hidden);
          }, time);
        }
      }, 20);

      checkClientRect();
      window.addEventListener('scroll', () => checkClientRect());
    });
  }
  /**
   *
   * @param {String} delay - delay
   * @param {String} duration
   * @return {Number} The timeout number
   */
  getDuration(delay, duration) {
    return [delay, duration].map((s) => {
      let num = 0;
      s.replace(/s|ms/g, function(a, b, c) {
        num = a==='s'?parseInt(c.replace('s', '')*1000):parseInt(c.replace('ms', ''));
      });
      return num;
    }).reduce((a, b)=> a + b);
  }

  /**
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Boolean} immediate
   * @return {Function}
   */
  debounce(func, wait, immediate) {
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
  }
}
