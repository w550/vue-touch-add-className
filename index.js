;
(function () {
  var AlloyTouch = typeof require === 'function' ? require('./lib/alloytouch/alloy_touch') : window.AlloyTouch

  function addClass(element, className) {

    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }

  }

  function removeClass(element, className) {

    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

  }


  AlloyTouch.Button = function (selector, tap, active) {

    var element = typeof selector === "string" ? document.querySelector(selector) : selector;

    var option = {
      touch: selector,
      tap: tap,
      preventDefault: false
    };
    
    if (active !== undefined) {
      option.touchStart = function () {
        addClass(element, active);
      };
      option.touchMove = function () {
        removeClass(element, active);
      };
      option.touchEnd = function () {
        removeClass(element, active);
      };
      option.touchCancel = function () {
        removeClass(element, active);
      };
    }

    new AlloyTouch(option)
  }

  let vueAlloyTouch = {};

  vueAlloyTouch.install = function (Vue) {

    var isVue2 = !!(Vue.version.substr(0, 1) == 2);



    if (!AlloyTouch) {
      throw new Error('you need include alloy_touch.js')
    }


    var directiveBinding = null;

    if (isVue2) {
      directiveBinding = {
        bind: function (el, binding) {
          //注册时的赋值 value, el已经挂载   
          let classNmae = binding.expression ? binding.expression : 'active'
          new AlloyTouch.Button(el, function () {}, classNmae);
        },
        update: function (el, binding) {},

        unbind: function (el) {}
      };
    } else {
      directiveBinding = {
        bind: function () {
          console.log("vue 1 没有测试");
          new AlloyTouch.Button(el, function () {

          }, "active");
        },
        update: function (binding) {

        },
        unbind: function () {}
      }
    }

    Vue.directive('vtac', directiveBinding)

  }
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = vueAlloyTouch;
  } else {
    window.vueAlloyTouch = vueAlloyTouch;
  }



})();
