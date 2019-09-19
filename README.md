# Js Scroll Effect

## Why JS scroll effect?

- Native javascript
- Ease to use, ease to custom.
- Lightweight and powerful.
- Support all web browsers in pc, mobile, tablet.

## Install

```
  $ npm install js-scroll-effect --save
```

## Basic Usage

### Native Js

```html
<html>
  <head>
    <link rel="stylesheet" href="/dist/js-scroll-effect.css" />
  </head>

  <body>
    <h1 data-animation>Js scroll effect</h1>

    <script src="/dist/js-scroll-effect.js"></script>
    <script>
      JsScrollEffect.init();
    </script>
    <body></body>
  </body>
</html>
```

### ES6

#### Javascript

```javascript
import JsScrollEffect from 'js-scroll-effect';

window.addEventListener('DOMContentLoaded', () => {
  // init scroll effect to all page
  const jse = new JsScrollEffect();
  jse.init();
});
```

#### Css

```Css
  @import '~/node_modules/js-scroll-effect/dist/js-scroll-effect.css';
```

- Then you make css by yourself in your project.

```Css
  @keyframes myCustomEffect {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
```

- Then put your `keyframes name` to `data-animation-name` in your html element attribute.

- Some default keyframes already in css file:

  - `fadeIn`
  - `fadeInUp`
  - `fadeInDown`
  - `fadeInLeft`
  - `fadeInRight`

#### Html

```Html
  <div class="container">
    <div data-animation>Default scroll effect is fadeInUp</div>
    <div data-animation data-animation-name="myCustomEffect">Use your custom effect</div>
  </div>
```

### Custom

#### Javascript options

```javascript
import JsScrollEffect from 'js-scroll-effect';

window.addEventListener('DOMContentLoaded', () => {
  // init scroll effect to all page
  const myElements = document.querySelectorAll('.my-element');
  const jse = new JsScrollEffect(myElements);
  jse.init();
});
```

#### Html data attributes

- If you are using javascript options above so `data-animation` is unnecessary in your html element.

| Attribute                  |  Default   |   Required |
| :------------------------- | :--------: | ---------: |
| `data-animation`           |            | `required` |
| `data-animation-name`      | `fadeInUp` | `optional` |
| `data-animation-duration`  |  `500ms`   | `optional` |
| `data-animation-delay`     |  `300ms`   | `optional` |
| `data-animation-fill-mode` | `forwards` | `optional` |

- Examples

```Html
  <div class="container">
    <h1 data-animation data-animation-name="myCustomEffect" data-animation-duration="1000ms" data-animation-delay="500ms">Use data attributes to control your effect</h1>
  </div>
```
