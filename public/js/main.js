/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	// var $ = require('jquery');
	var Vue = __webpack_require__(3);
	var fb = __webpack_require__(5).database();
	var hideOverlay = __webpack_require__(8).hideOverlay;
	var hideDetailPane = __webpack_require__(8).hideDetailPane;
	var routeUser = __webpack_require__(9).routeUser;

	//var showOverlay = require('./globals').showOverlay;
	//var showDetailPane = require('./globals').showDetailPane;
	//require("./styles/core.scss");

	var loadingMessages = [
	  "Farming spiderlings...",
	  "Brewing ale...",
	  "Whittling wands...",
	];


	// Initialize on every page load
	function init(){

	  Vue.config.debug = true;  // TODO
	  if (Vue.config.debug == true) console.log('!vue debug is on');

	  // TODO offline content
	  // if (navigator.serviceWorker) {
	  //   navigator.serviceWorker.register('/offline.js');
	  // }
	  // https://www.youtube.com/watch?v=qDJAz3IIq18

	  // When app is loaded, route user
	  routeUser(); // Get the user to the right page depending on their state
	  setGlobals();
	  initHandlers();
	}; init();

	function setGlobals(){
	  window.revealed = false;
	  $("#loading-text").text(loadingMessages[Math.floor(Math.random()*loadingMessages.length)]);
	};


	function initHandlers(){
	  // # Sticky section header on characters + campaigns
	  var $head = $(".header-sticky");
	  var nav_height = $(".nav").height();

	  $( window ).scroll(function() {
	    var scroll_pos = $(window).scrollTop();

	    if (scroll_pos > nav_height) {
	      $head.removeClass("u-opacity0");
	    } else {
	      $head.addClass("u-opacity0");
	    }
	  });


	  // # Global handlers
	  // These maybe should live in Vue?
	  $(document).keypress(function(e) { // Prevent enter from doing anything
	    if(e.which == 13) return false;
	  });

	  // Overlay clickity clicker
	  $(".overlay").on("click", function(){
	    hideOverlay();
	    hideDetailPane();
	  });

	  // Bottom fixed nav bar thing
	  $(".nav-button").on("click", function(ee){
	    hideOverlay();
	    hideDetailPane();
	    var selector = $(ee.currentTarget).data('show');
	    var $slidableForms = $(".slidable-form");

	    $slidableForms.addClass("off-screen");
	    $slidableForms.show();

	    setTimeout(function(){
	      $(window).scrollTop(0);
	      $("#" + selector).removeClass("off-screen");
	    }, 200)

	    // After animation (0.3) hide non-visible screens to prevent excess scroll areas
	    setTimeout(function(){
	      $("form").each(function(ii, form){
	        $form = $(form);
	        if($form.hasClass('off-screen')) $form.hide();
	      })
	    }, 200)
	  });

	  // Mobile nav square icon
	  $("#mobile-nav-toggle").on('click', function(){
	    if (window.currentUser) { $('#mobile-nav-icons').toggleClass('show') };
	  });

	  // Social explanation on login page
	  $("#social").on('click', function(){
	    $("#social-explanation").toggle();
	  });

	};



	// #Notice
	// var console_style = "font-size: 14px; color:#7AA790; font-family:'Lato', monospace;"
	// console.log("%cmagehand.xyz ✋", "color: black; font-family: 'Doris', monospace; font-size: 2rem; font-weight: 800;");
	// console.log('%cHey hombre! Feel free to poke around for any bugs and report them to', console_style);
	// console.log('%chttps://github.com/bananatron/mage-hand/issues', console_style + 'font-size: 18px; color: #A77A7A; font-family:monospace;');
	// console.log("%c\n\nLive adventurously.", console_style);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.21
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }

	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // save raw constructor data before merge
	    // so that we know which properties are provided at
	    // instantiation.
	    this._runtimeData = options.data;

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = Object.create(null);
	  this.newDepIds = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDepIds = Object.create(null);
	  this.newDeps.length = 0;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds[id]) {
	    this.newDepIds[id] = true;
	    this.newDeps.push(dep);
	    if (!this.depIds[id]) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds[dep.id]) {
	      dep.removeSub(this);
	    }
	  }
	  this.depIds = this.newDepIds;
	  var tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : getPath(value, trackByKey) : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : getPath(value, trackByKey) : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : getPath(value, trackByKey) : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	  if (camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    this.prevKeys = Object.keys(value);
	    setObjectClasses(this.el, value);
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val && isPlainObject(val)) {
	        setObjectClasses(this.el, val);
	      } else if (val && typeof val === 'string') {
	        addClass(this.el, val);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (!this.prevKeys) return;

	    var i = this.prevKeys.length;
	    while (i--) {
	      var key = this.prevKeys[i];
	      if (!key) continue;

	      var keys = isPlainObject(key) ? Object.keys(key) : [key];
	      for (var j = 0, l = keys.length; j < l; j++) {
	        toggleClasses(this.el, keys[j], removeClass);
	      }
	    }
	  }
	};

	function setObjectClasses(el, obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    if (!obj[key]) continue;
	    toggleClasses(el, key, addClass);
	  }
	}

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function toggleClasses(el, key, fn) {
	  key = key.trim();

	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }

	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    modifiers = parseModifiers(attr.name);
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.trim().split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    var runtimeData = this._runtimeData ? typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData : null;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key) || runtimeData && hasOwn(runtimeData, key) && props[key].raw === null) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. Use prop default value instead.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        if (typeof handler === 'function') {
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        } else if (process.env.NODE_ENV !== 'production') {
	          warn('v-on:' + name + '="' + attrs[i].value + '" ' + 'expects a function value, got ' + handler, vm);
	        }
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.21';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(6);

	var config = {
	  apiKey: "AIzaSyAUsSroV5NV89p9H-Qm9_LazNxCtrw374c",
	  authDomain: "magicmissile.firebaseapp.com",
	  databaseURL: "https://magicmissile.firebaseio.com",
	  storageBucket: "project-7942438947355521096.appspot.com",
	};
	firebase.initializeApp(config);

	module.exports = firebase;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Firebase libraries for browser - npm package.
	 *
	 * Usage:
	 *
	 *   firebase = require('firebase');
	 */
	__webpack_require__(7);
	module.exports = firebase;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v3.0.2
	    Build: 3.0.2-rc.1
	    Terms: https://developers.google.com/terms */
	(function() { var h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this,l=function(){h.Symbol||(h.Symbol=aa);l=function(){}},ba=0,aa=function(a){return"jscomp_symbol_"+a+ba++},m=function(){l();h.Symbol.iterator||(h.Symbol.iterator=h.Symbol("iterator"));m=function(){}},ca=function(){var a=["next","error","complete"];m();if(a[h.Symbol.iterator])return a[h.Symbol.iterator]();var b=0;return{next:function(){return b==a.length?{done:!0}:{done:!1,value:a[b++]}}}},p=this,q=function(){},
	r=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b},t=function(a){return"function"==r(a)},da=function(a,b,c){return a.call.apply(a.bind,arguments)},ea=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},u=function(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
	da:ea;return u.apply(null,arguments)},v=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},w=function(a,b){function c(){}c.prototype=b.prototype;a.ba=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.aa=function(a,c,g){for(var k=Array(arguments.length-2),f=2;f<arguments.length;f++)k[f-2]=arguments[f];return b.prototype[c].apply(a,k)}};function __extends(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}
	function __decorate(a,b,c,d){var e=arguments.length,g=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,k;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var f=a.length-1;0<=f;f--)if(k=a[f])g=(3>e?k(g):3<e?k(b,c,g):k(b,c))||g;return 3<e&&g&&Object.defineProperty(b,c,g),g}function __metadata(a,b){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(a,b)}
	var __param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,g){function k(a){try{n(d.next(a))}catch(b){g(b)}}function f(a){try{n(d.throw(a))}catch(b){g(b)}}function n(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(k,f)}n((d=d.apply(a,b)).next())})};var x=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,x);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};w(x,Error);x.prototype.name="CustomError";var fa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var y=function(a,b){b.unshift(a);x.call(this,fa.apply(null,b));b.shift()};w(y,x);y.prototype.name="AssertionError";var z=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),g=d;else a&&(e+=": "+a,g=b);throw new y(""+e,g||[]);},A=function(a,b,c){a||z("",null,b,Array.prototype.slice.call(arguments,2))},B=function(a,b,c){t(a)||z("Expected function but got %s: %s.",[r(a),a],b,Array.prototype.slice.call(arguments,2))};var C=function(a,b,c){this.S=c;this.L=a;this.U=b;this.s=0;this.o=null};C.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.L();return a};C.prototype.put=function(a){this.U(a);this.s<this.S&&(this.s++,a.next=this.o,this.o=a)};var D;a:{var E=p.navigator;if(E){var F=E.userAgent;if(F){D=F;break a}}D=""};var G=function(a){p.setTimeout(function(){throw a;},0)},I,ga=function(){var a=p.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==D.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+
	b.location.host,a=u(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==D.indexOf("Trident")&&-1==D.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.F;c.F=null;a()}};return function(a){d.next={F:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){p.setTimeout(a,0)}};var J=function(){this.v=this.f=null},ha=new C(function(){return new K},function(a){a.reset()},100);J.prototype.add=function(a,b){var c=ha.get();c.set(a,b);this.v?this.v.next=c:(A(!this.f),this.f=c);this.v=c};J.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.v=null),a.next=null);return a};var K=function(){this.next=this.scope=this.B=null};K.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
	K.prototype.reset=function(){this.next=this.scope=this.B=null};var N=function(a,b){L||ia();M||(L(),M=!0);ja.add(a,b)},L,ia=function(){if(p.Promise&&p.Promise.resolve){var a=p.Promise.resolve(void 0);L=function(){a.then(ka)}}else L=function(){var a=ka,c;!(c=!t(p.setImmediate))&&(c=p.Window&&p.Window.prototype)&&(c=-1==D.indexOf("Edge")&&p.Window.prototype.setImmediate==p.setImmediate);c?(I||(I=ga()),I(a)):p.setImmediate(a)}},M=!1,ja=new J,ka=function(){for(var a=null;a=ja.remove();){try{a.B.call(a.scope)}catch(b){G(b)}ha.put(a)}M=!1};var P=function(a,b){this.b=0;this.K=void 0;this.j=this.g=this.u=null;this.m=this.A=!1;if(a!=q)try{var c=this;a.call(b,function(a){O(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}O(c,3,a)})}catch(d){O(this,3,d)}},la=function(){this.next=this.context=this.h=this.c=this.child=null;this.w=!1};la.prototype.reset=function(){this.context=this.h=this.c=this.child=null;this.w=!1};
	var ma=new C(function(){return new la},function(a){a.reset()},100),na=function(a,b,c){var d=ma.get();d.c=a;d.h=b;d.context=c;return d},pa=function(a,b,c){oa(a,b,c,null)||N(v(b,a))};P.prototype.then=function(a,b,c){null!=a&&B(a,"opt_onFulfilled should be a function.");null!=b&&B(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return qa(this,t(a)?a:null,t(b)?b:null,c)};P.prototype.then=P.prototype.then;P.prototype.$goog_Thenable=!0;
	P.prototype.X=function(a,b){return qa(this,null,a,b)};var sa=function(a,b){a.g||2!=a.b&&3!=a.b||ra(a);A(null!=b.c);a.j?a.j.next=b:a.g=b;a.j=b},qa=function(a,b,c,d){var e=na(null,null,null);e.child=new P(function(a,k){e.c=b?function(c){try{var e=b.call(d,c);a(e)}catch(H){k(H)}}:a;e.h=c?function(b){try{var e=c.call(d,b);a(e)}catch(H){k(H)}}:k});e.child.u=a;sa(a,e);return e.child};P.prototype.Y=function(a){A(1==this.b);this.b=0;O(this,2,a)};P.prototype.Z=function(a){A(1==this.b);this.b=0;O(this,3,a)};
	var O=function(a,b,c){0==a.b&&(a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,oa(c,a.Y,a.Z,a)||(a.K=c,a.b=b,a.u=null,ra(a),3!=b||ta(a,c)))},oa=function(a,b,c,d){if(a instanceof P)return null!=b&&B(b,"opt_onFulfilled should be a function."),null!=c&&B(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),sa(a,na(b||q,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(k){e=!1}else e=!1;if(e)return a.then(b,c,d),!0;
	e=typeof a;if("object"==e&&null!=a||"function"==e)try{var g=a.then;if(t(g))return ua(a,g,b,c,d),!0}catch(k){return c.call(d,k),!0}return!1},ua=function(a,b,c,d,e){var g=!1,k=function(a){g||(g=!0,c.call(e,a))},f=function(a){g||(g=!0,d.call(e,a))};try{b.call(a,k,f)}catch(n){f(n)}},ra=function(a){a.A||(a.A=!0,N(a.N,a))},va=function(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.j=null);null!=b&&A(null!=b.c);return b};
	P.prototype.N=function(){for(var a=null;a=va(this);){var b=this.b,c=this.K;if(3==b&&a.h&&!a.w)for(var d=void 0,d=this;d&&d.m;d=d.u)d.m=!1;if(a.child)a.child.u=null,wa(a,b,c);else try{a.w?a.c.call(a.context):wa(a,b,c)}catch(e){xa.call(null,e)}ma.put(a)}this.A=!1};var wa=function(a,b,c){2==b?a.c.call(a.context,c):a.h&&a.h.call(a.context,c)},ta=function(a,b){a.m=!0;N(function(){a.m&&xa.call(null,b)})},xa=G;var Q=function(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=Q(a[c],b[c]));return a};var S=function(a,b){this.code=a;this.message=b;if(Error.captureStackTrace)(0,Error.captureStackTrace)(this,R.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};S.prototype=Object.create(Error.prototype);S.prototype.constructor=S;S.prototype.name="FirebaseError";var R=function(a,b,c){this.V=a;this.W=b;this.M=c;this.pattern=/\{\$([^}]+)}/g};
	R.prototype.create=function(a,b){void 0===b&&(b={});var c=this.M[a],c=void 0===c?"Error":c.replace(this.pattern,function(a,c){return void 0!==b[c]?b[c].toString():"<"+c+"?>"}),c=this.W+": "+c+" ("+this.V+"/"+a+").",c=new S(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};P.all=function(a){return new P(function(b,c){var d=a.length,e=[];if(d)for(var g=function(a,c){d--;e[a]=c;0==d&&b(e)},k=function(a){c(a)},f=0,n;f<a.length;f++)n=a[f],pa(n,v(g,f),k);else b(e)})};P.resolve=function(a){if(a instanceof P)return a;var b=new P(q);O(b,2,a);return b};P.reject=function(a){return new P(function(b,c){c(a)})};P.prototype["catch"]=P.prototype.X;var T=P;"undefined"!==typeof Promise&&(T=Promise);var U=function(){},ya=function(a){if("object"!==typeof a||null===a)return!1;for(var b=ca(),c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1},za=function(a,b){var c=new V(a,b);return c.subscribe.bind(c)},V=function(a,b){var c=this;this.a=[];this.J=0;this.task=T.resolve();this.l=!1;this.D=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};V.prototype.next=function(a){W(this,function(b){b.next(a)})};
	V.prototype.error=function(a){W(this,function(b){b.error(a)});this.close(a)};V.prototype.complete=function(){W(this,function(a){a.complete()});this.close()};
	V.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=ya(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=U);void 0===e.error&&(e.error=U);void 0===e.complete&&(e.complete=U);a=this.$.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.G?e.error(d.G):e.complete()}catch(a){}});this.a.push(e);return a};
	V.prototype.$=function(a){void 0!==this.a&&void 0!==this.a[a]&&(this.a[a]=void 0,--this.J,0===this.J&&void 0!==this.D&&this.D(this))};var W=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Aa(a,c,b)},Aa=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){}})};V.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.G=a),this.task.then(function(){b.a=void 0;b.D=void 0}))};var Ba=function(a,b){b=b||{};var c={noApp:"No Firebase App '"+b.name+"' has been created - call Firebase App.initializeApp().","bad-app-name":"Illegal App name: '"+b.name+"'.",dupApp:"Firebase App named '"+b.name+"' already exists.",deleted:"Firebase App named '"+b.name+"' already deleted.",dupService:"Firebase Service named '"+b.name+"' already registered."}[a];return void 0===c?"Application Error: ("+a+")":c},X=function(a,b){throw Error(Ba(a,b));},Ca=function(){function a(a){a=a||"[DEFAULT]";var c=
	b[a];void 0===c&&X("noApp",{name:a});return c}var b={},c={},d=[],e={initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||X("bad-app-name",{name:c+""});void 0!==b[c]&&X("dupApp",{name:c});var f=new Y(a,c,e);b[c]=f;d.forEach(function(a){return a("create",f)});void 0!=f.INTERNAL&&void 0!=f.INTERNAL.getToken||Q(f,{INTERNAL:{getToken:function(){return T.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return f},app:a,apps:null,Promise:T,
	SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,d,f){c[b]&&X("dupService",{name:b});c[b]=d;d=function(c){void 0===c&&(c=a());return c[b]()};void 0!==f&&Q(d,f);return e[b]=d},createFirebaseNamespace:Ca,extendNamespace:function(a){Q(e,a)},createSubscribe:za,ErrorFactory:R,registerAppHook:function(a){d.push(a)},removeApp:function(a){d.forEach(function(c){return c("delete",b[a])});delete b[a]},factories:c,Promise:P,deepExtend:Q}};Object.defineProperty(e,"apps",{get:function(){return Object.keys(b).map(function(a){return b[a]})}});
	a.App=Y;return e},Y=function(a,b,c){var d=this;this.H=c;this.I=!1;this.i={};this.P={};this.C=b;this.T=Q(void 0,a);Object.keys(c.INTERNAL.factories).forEach(function(a){d[a]=d.R.bind(d,a)})};Y.prototype.delete=function(){var a=this;return(new T(function(b){Z(a);b()})).then(function(){a.H.INTERNAL.removeApp(a.C);return T.all(Object.keys(a.i).map(function(b){return a.i[b].INTERNAL.delete()}))}).then(function(){a.I=!0;a.i=null;a.P=null})};
	Y.prototype.R=function(a){Z(this);void 0===this.i[a]&&(this.i[a]=this.H.INTERNAL.factories[a](this,this.O.bind(this)));return this.i[a]};Y.prototype.O=function(a){Q(this,a)};var Z=function(a){a.I&&X(Ba("deleted",{name:a.C}))};Object.defineProperties(Y.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Z(this);return this.C}},options:{configurable:!0,enumerable:!0,get:function(){Z(this);return this.T}}});Y.prototype.name&&Y.prototype.options||Y.prototype.delete||console.log("dc");"undefined"!==typeof window&&(window.firebase=Ca()); })();
	firebase.SDK_VERSION = "3.0.2";
	(function(){var h,aa=aa||{},m=this,ba=function(a){return void 0!==a},ca=function(){},da=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=
	typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ea=function(a){return null===a},fa=function(a){return"array"==da(a)},ga=function(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},ha=function(a){return"number"==typeof a},p=function(a){return"function"==da(a)},ia=function(a){var b=typeof a;return"object"==b&&null!=
	a||"function"==b},ja="closure_uid_"+(1E9*Math.random()>>>0),ka=0,la=function(a,b,c){return a.call.apply(a.bind,arguments)},ma=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
	la:ma;return r.apply(null,arguments)},na=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},oa=Date.now||function(){return+new Date},t=function(a,b){function c(){}c.prototype=b.prototype;a.Hc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.jf=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var pa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},qa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ra=/&/g,sa=/</g,ta=/>/g,ua=/"/g,va=/'/g,wa=/\x00/g,xa=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},ya=function(a,b){return a<b?-1:a>b?1:0};var za=function(a,b){b.unshift(a);u.call(this,pa.apply(null,b));b.shift()};t(za,u);za.prototype.name="AssertionError";
	var Aa=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new za(""+e,f||[]);},w=function(a,b,c){a||Aa("",null,b,Array.prototype.slice.call(arguments,2))},Ba=function(a,b){throw new za("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Ca=function(a,b,c){ha(a)||Aa("Expected number but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,2));return a},Da=function(a,b,c){n(a)||Aa("Expected string but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,
	2));return a},Ea=function(a,b,c){p(a)||Aa("Expected function but got %s: %s.",[da(a),a],b,Array.prototype.slice.call(arguments,2))};var Fa=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ga=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ha=function(a,b){for(var c=n(a)?
	a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Ia=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=n(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ja=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
	Ka=Array.prototype.every?function(a,b,c){w(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0},Ma=function(a){var b;a:{b=La;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]},Na=function(a,b){return 0<=Fa(a,b)},Pa=function(a,b){var c=Fa(a,b),d;(d=0<=c)&&Oa(a,c);return d},Oa=function(a,
	b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Qa=function(a,b){var c=0;Ha(a,function(d,e){b.call(void 0,d,e,a)&&Oa(a,e)&&c++})},Ra=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Sa=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)},Ta=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},Ua=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(ga(d)){var e=a.length||
	0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};var Va=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},Wa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Xa=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ya=function(a){return null!==a&&"withCredentials"in a},Za=function(a){for(var b in a)return!1;return!0},$a=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},ab=function(a){var b={},c;for(c in a)b[c]=a[c];return b},bb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	cb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<bb.length;f++)c=bb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var db;a:{var eb=m.navigator;if(eb){var fb=eb.userAgent;if(fb){db=fb;break a}}db=""}var x=function(a){return v(db,a)};var gb=x("Opera"),y=x("Trident")||x("MSIE"),hb=x("Edge"),ib=hb||y,jb=x("Gecko")&&!(v(db.toLowerCase(),"webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),kb=v(db.toLowerCase(),"webkit")&&!x("Edge"),lb=function(){var a=m.document;return a?a.documentMode:void 0},mb;
	a:{var nb="",ob=function(){var a=db;if(jb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(hb)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(kb)return/WebKit\/(\S+)/.exec(a);if(gb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();ob&&(nb=ob?ob[1]:"");if(y){var pb=lb();if(null!=pb&&pb>parseFloat(nb)){mb=String(pb);break a}}mb=nb}
	var qb=mb,rb={},sb=function(a){var b;if(!(b=rb[a])){b=0;for(var c=qa(String(qb)).split("."),d=qa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),q=RegExp("(\\d*)(\\D*)","g");do{var S=l.exec(g)||["","",""],H=q.exec(k)||["","",""];if(0==S[0].length&&0==H[0].length)break;b=ya(0==S[1].length?0:parseInt(S[1],10),0==H[1].length?0:parseInt(H[1],10))||ya(0==S[2].length,0==H[2].length)||ya(S[2],H[2])}while(0==b)}b=rb[a]=0<=b}return b},
	tb=m.document,ub=tb&&y?lb()||("CSS1Compat"==tb.compatMode?parseInt(qb,10):5):void 0;var vb=null,wb=null,yb=function(a){var b="";xb(a,function(a){b+=String.fromCharCode(a)});return b},xb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=wb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}zb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},zb=function(){if(!vb){vb={};wb={};for(var a=0;65>a;a++)vb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
	wb[vb[a]]=a,62<=a&&(wb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var Bb=function(){this.Zd="";this.yg=Ab};Bb.prototype.De=!0;Bb.prototype.ze=function(){return this.Zd};Bb.prototype.toString=function(){return"Const{"+this.Zd+"}"};var Cb=function(a){if(a instanceof Bb&&a.constructor===Bb&&a.yg===Ab)return a.Zd;Ba("expected object of type Const, got '"+a+"'");return"type_error:Const"},Ab={};var Eb=function(){this.rb="";this.xg=Db};Eb.prototype.De=!0;Eb.prototype.ze=function(){return this.rb};Eb.prototype.toString=function(){return"SafeUrl{"+this.rb+"}"};
	var Fb=function(a){if(a instanceof Eb&&a.constructor===Eb&&a.xg===Db)return a.rb;Ba("expected object of type SafeUrl, got '"+a+"' of type "+da(a));return"type_error:SafeUrl"},Gb=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,Ib=function(a){if(a instanceof Eb)return a;a=a.De?a.ze():String(a);Gb.test(a)||(a="about:invalid#zClosurez");return Hb(a)},Db={},Hb=function(a){var b=new Eb;b.rb=a;return b};Hb("about:blank");var Kb=function(){this.rb="";this.wg=Jb};Kb.prototype.De=!0;Kb.prototype.ze=function(){return this.rb};Kb.prototype.toString=function(){return"SafeHtml{"+this.rb+"}"};var Lb=function(a){if(a instanceof Kb&&a.constructor===Kb&&a.wg===Jb)return a.rb;Ba("expected object of type SafeHtml, got '"+a+"' of type "+da(a));return"type_error:SafeHtml"},Jb={};Kb.prototype.sh=function(a){this.rb=a;return this};var Mb=function(a,b){var c;c=b instanceof Eb?b:Ib(b);a.href=Fb(c)};var Nb=function(a){Nb[" "](a);return a};Nb[" "]=ca;var Ob=!y||9<=Number(ub),Pb=y&&!sb("9");!kb||sb("528");jb&&sb("1.9b")||y&&sb("8")||gb&&sb("9.5")||kb&&sb("528");jb&&!sb("8")||y&&sb("9");var Qb=function(){this.La=this.La;this.Md=this.Md};Qb.prototype.La=!1;Qb.prototype.wa=function(){return this.La};Qb.prototype.Sa=function(){this.La||(this.La=!0,this.Ka())};Qb.prototype.Ka=function(){if(this.Md)for(;this.Md.length;)this.Md.shift()()};var Rb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.yc=!1;this.fg=!0};Rb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.fg=!1};var Sb=function(a,b){Rb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.yd=this.state=null;if(a){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;var e=a.relatedTarget;if(e){if(jb){var f;a:{try{Nb(e.nodeName);f=!0;break a}catch(g){}f=
	!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;null===d?(this.offsetX=kb||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=kb||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||
	0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.yd=a;a.defaultPrevented&&this.preventDefault()}};t(Sb,Rb);
	Sb.prototype.preventDefault=function(){Sb.Hc.preventDefault.call(this);var a=this.yd;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Pb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Tb="closure_listenable_"+(1E6*Math.random()|0),Ub=function(a){return!(!a||!a[Tb])},Vb=0;var Wb=function(a,b,c,d,e){this.listener=a;this.Rd=null;this.src=b;this.type=c;this.vd=!!d;this.Vc=e;this.key=++Vb;this.Cc=this.ud=!1},Xb=function(a){a.Cc=!0;a.listener=null;a.Rd=null;a.src=null;a.Vc=null};var Yb=function(a){this.src=a;this.qa={};this.td=0};Yb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.qa[f];a||(a=this.qa[f]=[],this.td++);var g=Zb(a,b,d,e);-1<g?(b=a[g],c||(b.ud=!1)):(b=new Wb(b,this.src,f,!!d,e),b.ud=c,a.push(b));return b};Yb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.qa))return!1;var e=this.qa[a];b=Zb(e,b,c,d);return-1<b?(Xb(e[b]),Oa(e,b),0==e.length&&(delete this.qa[a],this.td--),!0):!1};
	var $b=function(a,b){var c=b.type;c in a.qa&&Pa(a.qa[c],b)&&(Xb(b),0==a.qa[c].length&&(delete a.qa[c],a.td--))};Yb.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.qa)if(!a||c==a){for(var d=this.qa[c],e=0;e<d.length;e++)++b,Xb(d[e]);delete this.qa[c];this.td--}return b};Yb.prototype.Rc=function(a,b,c,d){a=this.qa[a.toString()];var e=-1;a&&(e=Zb(a,b,c,d));return-1<e?a[e]:null};
	var Zb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Cc&&f.listener==b&&f.vd==!!c&&f.Vc==d)return e}return-1};var ac="closure_lm_"+(1E6*Math.random()|0),bc={},cc=0,dc=function(a,b,c,d,e){if(fa(b)){for(var f=0;f<b.length;f++)dc(a,b[f],c,d,e);return null}c=ec(c);return Ub(a)?a.Va(b,c,d,e):fc(a,b,c,!1,d,e)},fc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=gc(a);k||(a[ac]=k=new Yb(a));c=k.add(b,c,d,e,f);if(c.Rd)return c;d=hc();c.Rd=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(ic(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
	cc++;return c},hc=function(){var a=jc,b=Ob?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},kc=function(a,b,c,d,e){if(fa(b)){for(var f=0;f<b.length;f++)kc(a,b[f],c,d,e);return null}c=ec(c);return Ub(a)?a.Id(b,c,d,e):fc(a,b,c,!0,d,e)},lc=function(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)lc(a,b[f],c,d,e);else c=ec(c),Ub(a)?a.cf(b,c,d,e):a&&(a=gc(a))&&(b=a.Rc(b,c,!!d,e))&&mc(b)},mc=function(a){if(!ha(a)&&a&&!a.Cc){var b=a.src;if(Ub(b))$b(b.Ua,
	a);else{var c=a.type,d=a.Rd;b.removeEventListener?b.removeEventListener(c,d,a.vd):b.detachEvent&&b.detachEvent(ic(c),d);cc--;(c=gc(b))?($b(c,a),0==c.td&&(c.src=null,b[ac]=null)):Xb(a)}}},ic=function(a){return a in bc?bc[a]:bc[a]="on"+a},oc=function(a,b,c,d){var e=!0;if(a=gc(a))if(b=a.qa[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.vd==c&&!f.Cc&&(f=nc(f,d),e=e&&!1!==f)}return e},nc=function(a,b){var c=a.listener,d=a.Vc||a.src;a.ud&&mc(a);return c.call(d,b)},jc=function(a,b){if(a.Cc)return!0;
	if(!Ob){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new Sb(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(l){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;!c.yc&&0<=g;g--){c.currentTarget=e[g];var k=oc(e[g],f,!0,c),d=d&&k}for(g=0;!c.yc&&g<e.length;g++)c.currentTarget=e[g],
	k=oc(e[g],f,!1,c),d=d&&k}return d}return nc(a,new Sb(b,this))},gc=function(a){a=a[ac];return a instanceof Yb?a:null},pc="__closure_events_fn_"+(1E9*Math.random()>>>0),ec=function(a){w(a,"Listener can not be null.");if(p(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[pc]||(a[pc]=function(b){return a.handleEvent(b)});return a[pc]};var qc=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var rc=function(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))},sc=function(a){a=String(a);if(rc(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},vc=function(a){var b=[];tc(new uc,a,b);return b.join("")},uc=function(){this.Ud=void 0},
	tc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(fa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],tc(a,a.Ud?a.Ud.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),wc(d,c),c.push(":"),tc(a,a.Ud?a.Ud.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":wc(b,
	c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},xc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},yc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,wc=function(a,b){b.push('"',a.replace(yc,function(a){var b=xc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),
	xc[a]=b);return b}),'"')};var zc=function(){};zc.prototype.lf=null;zc.prototype.getOptions=function(){return this.lf||(this.lf=this.If())};var Ac,Bc=function(){};t(Bc,zc);Bc.prototype.se=function(){var a=Cc(this);return a?new ActiveXObject(a):new XMLHttpRequest};Bc.prototype.If=function(){var a={};Cc(this)&&(a[0]=!0,a[1]=!0);return a};
	var Cc=function(a){if(!a.Ef&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Ef=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Ef};Ac=new Bc;var Dc=function(){};t(Dc,zc);Dc.prototype.se=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Ec;throw Error("Unsupported browser");};Dc.prototype.If=function(){return{}};
	var Ec=function(){this.yb=new XDomainRequest;this.readyState=0;this.responseText=this.onreadystatechange=null;this.status=-1;this.statusText=this.responseXML=null;this.yb.onload=r(this.dh,this);this.yb.onerror=r(this.Cf,this);this.yb.onprogress=r(this.fh,this);this.yb.ontimeout=r(this.hh,this)};h=Ec.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.yb.open(a,b)};
	h.send=function(a){if(a)if("string"==typeof a)this.yb.send(a);else throw Error("Only string data is supported");else this.yb.send()};h.abort=function(){this.yb.abort()};h.setRequestHeader=function(){};h.dh=function(){this.status=200;this.responseText=this.yb.responseText;Fc(this,4)};h.Cf=function(){this.status=500;this.responseText=null;Fc(this,4)};h.hh=function(){this.Cf()};h.fh=function(){this.status=200;Fc(this,1)};var Fc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};var z=function(a,b){this.R=[];this.w=b;for(var c=!0,d=a.length-1;0<=d;d--){var e=a[d]|0;c&&e==b||(this.R[d]=e,c=!1)}},Gc={},Hc=function(a){if(-128<=a&&128>a){var b=Gc[a];if(b)return b}b=new z([a|0],0>a?-1:0);-128<=a&&128>a&&(Gc[a]=b);return b},Jc=function(a){if(isNaN(a)||!isFinite(a))return Ic;if(0>a)return A(Jc(-a));for(var b=[],c=1,d=0;a>=c;d++)b[d]=a/c|0,c*=4294967296;return new z(b,0)},Kc=function(a,b){if(0==a.length)throw Error("number format error: empty string");var c=b||10;if(2>c||36<c)throw Error("radix out of range: "+
	c);if("-"==a.charAt(0))return A(Kc(a.substring(1),c));if(0<=a.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=Jc(Math.pow(c,8)),e=Ic,f=0;f<a.length;f+=8){var g=Math.min(8,a.length-f),k=parseInt(a.substring(f,f+g),c);8>g?(g=Jc(Math.pow(c,g)),e=e.multiply(g).add(Jc(k))):(e=e.multiply(d),e=e.add(Jc(k)))}return e},Ic=Hc(0),Lc=Hc(1),Mc=Hc(16777216),Nc=function(a){if(-1==a.w)return-Nc(A(a));for(var b=0,c=1,d=0;d<a.R.length;d++)b+=Oc(a,d)*c,c*=4294967296;return b};
	z.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(Pc(this))return"0";if(-1==this.w)return"-"+A(this).toString(a);for(var b=Jc(Math.pow(a,6)),c=this,d="";;){var e=Qc(c,b),c=Rc(c,e.multiply(b)),f=((0<c.R.length?c.R[0]:c.w)>>>0).toString(a),c=e;if(Pc(c))return f+d;for(;6>f.length;)f="0"+f;d=""+f+d}};
	var B=function(a,b){return 0>b?0:b<a.R.length?a.R[b]:a.w},Oc=function(a,b){var c=B(a,b);return 0<=c?c:4294967296+c},Pc=function(a){if(0!=a.w)return!1;for(var b=0;b<a.R.length;b++)if(0!=a.R[b])return!1;return!0};z.prototype.equals=function(a){if(this.w!=a.w)return!1;for(var b=Math.max(this.R.length,a.R.length),c=0;c<b;c++)if(B(this,c)!=B(a,c))return!1;return!0};z.prototype.compare=function(a){a=Rc(this,a);return-1==a.w?-1:Pc(a)?0:1};
	var A=function(a){for(var b=a.R.length,c=[],d=0;d<b;d++)c[d]=~a.R[d];return(new z(c,~a.w)).add(Lc)};z.prototype.add=function(a){for(var b=Math.max(this.R.length,a.R.length),c=[],d=0,e=0;e<=b;e++){var f=d+(B(this,e)&65535)+(B(a,e)&65535),g=(f>>>16)+(B(this,e)>>>16)+(B(a,e)>>>16),d=g>>>16,f=f&65535,g=g&65535;c[e]=g<<16|f}return new z(c,c[c.length-1]&-2147483648?-1:0)};var Rc=function(a,b){return a.add(A(b))};
	z.prototype.multiply=function(a){if(Pc(this)||Pc(a))return Ic;if(-1==this.w)return-1==a.w?A(this).multiply(A(a)):A(A(this).multiply(a));if(-1==a.w)return A(this.multiply(A(a)));if(0>this.compare(Mc)&&0>a.compare(Mc))return Jc(Nc(this)*Nc(a));for(var b=this.R.length+a.R.length,c=[],d=0;d<2*b;d++)c[d]=0;for(d=0;d<this.R.length;d++)for(var e=0;e<a.R.length;e++){var f=B(this,d)>>>16,g=B(this,d)&65535,k=B(a,e)>>>16,l=B(a,e)&65535;c[2*d+2*e]+=g*l;Sc(c,2*d+2*e);c[2*d+2*e+1]+=f*l;Sc(c,2*d+2*e+1);c[2*d+2*
	e+1]+=g*k;Sc(c,2*d+2*e+1);c[2*d+2*e+2]+=f*k;Sc(c,2*d+2*e+2)}for(d=0;d<b;d++)c[d]=c[2*d+1]<<16|c[2*d];for(d=b;d<2*b;d++)c[d]=0;return new z(c,0)};
	var Sc=function(a,b){for(;(a[b]&65535)!=a[b];)a[b+1]+=a[b]>>>16,a[b]&=65535},Qc=function(a,b){if(Pc(b))throw Error("division by zero");if(Pc(a))return Ic;if(-1==a.w)return-1==b.w?Qc(A(a),A(b)):A(Qc(A(a),b));if(-1==b.w)return A(Qc(a,A(b)));if(30<a.R.length){if(-1==a.w||-1==b.w)throw Error("slowDivide_ only works with positive integers.");for(var c=Lc,d=b;0>=d.compare(a);)c=c.shiftLeft(1),d=d.shiftLeft(1);for(var e=Tc(c,1),f=Tc(d,1),g,d=Tc(d,2),c=Tc(c,2);!Pc(d);)g=f.add(d),0>=g.compare(a)&&(e=e.add(c),
	f=g),d=Tc(d,1),c=Tc(c,1);return e}c=Ic;for(d=a;0<=d.compare(b);){e=Math.max(1,Math.floor(Nc(d)/Nc(b)));f=Math.ceil(Math.log(e)/Math.LN2);f=48>=f?1:Math.pow(2,f-48);g=Jc(e);for(var k=g.multiply(b);-1==k.w||0<k.compare(d);)e-=f,g=Jc(e),k=g.multiply(b);Pc(g)&&(g=Lc);c=c.add(g);d=Rc(d,k)}return c},Uc=function(a,b){for(var c=Math.max(a.R.length,b.R.length),d=[],e=0;e<c;e++)d[e]=B(a,e)|B(b,e);return new z(d,a.w|b.w)};
	z.prototype.shiftLeft=function(a){var b=a>>5;a%=32;for(var c=this.R.length+b+(0<a?1:0),d=[],e=0;e<c;e++)d[e]=0<a?B(this,e-b)<<a|B(this,e-b-1)>>>32-a:B(this,e-b);return new z(d,this.w)};var Tc=function(a,b){for(var c=b>>5,d=b%32,e=a.R.length-c,f=[],g=0;g<e;g++)f[g]=0<d?B(a,g+c)>>>d|B(a,g+c+1)<<32-d:B(a,g+c);return new z(f,a.w)};var Vc=function(a,b){this.Xc=a;this.wb=b};Vc.prototype.Af=function(){return this.wb};Vc.prototype.equals=function(a){return this.wb==a.Af()&&this.Xc.equals(ab(a.Xc))};
	var Yc=function(a){try{var b;if(b=0==a.lastIndexOf("[",0)){var c=a.length-1;b=0<=c&&a.indexOf("]",c)==c}return b?new Wc(a.substring(1,a.length-1)):new Xc(a)}catch(d){return null}},Xc=function(a){var b=Ic;if(a instanceof z){if(0!=a.w||0>a.compare(Ic)||0<a.compare(Zc))throw Error("The address does not look like an IPv4.");b=ab(a)}else{if(!$c.test(a))throw Error(a+" does not look like an IPv4 address.");var c=a.split(".");if(4!=c.length)throw Error(a+" does not look like an IPv4 address.");for(var d=
	0;d<c.length;d++){var e;e=c[d];var f=Number(e);e=0==f&&/^[\s\xa0]*$/.test(e)?NaN:f;if(isNaN(e)||0>e||255<e||1!=c[d].length&&0==c[d].lastIndexOf("0",0))throw Error("In "+a+", octet "+d+" is not valid");e=Jc(e);b=Uc(b.shiftLeft(8),e)}}Vc.call(this,b,4)};t(Xc,Vc);var $c=/^[0-9.]*$/,Zc=Rc(Lc.shiftLeft(32),Lc);Xc.prototype.toString=function(){if(this.Tb)return this.Tb;for(var a=Oc(this.Xc,0),b=[],c=3;0<=c;c--)b[c]=String(a&255),a>>>=8;return this.Tb=b.join(".")};
	var Wc=function(a){var b=Ic;if(a instanceof z){if(0!=a.w||0>a.compare(Ic)||0<a.compare(ad))throw Error("The address does not look like a valid IPv6.");b=ab(a)}else{if(!bd.test(a))throw Error(a+" is not a valid IPv6 address.");var c=a.split(":");if(-1!=c[c.length-1].indexOf(".")){a=Oc(ab((new Xc(c[c.length-1])).Xc),0);var d=[];d.push((a>>>16&65535).toString(16));d.push((a&65535).toString(16));Oa(c,c.length-1);Ua(c,d);a=c.join(":")}d=a.split("::");if(2<d.length||1==d.length&&8!=c.length)throw Error(a+
	" is not a valid IPv6 address.");if(1<d.length){c=d[0].split(":");d=d[1].split(":");1==c.length&&""==c[0]&&(c=[]);1==d.length&&""==d[0]&&(d=[]);var e=8-(c.length+d.length);if(1>e)c=[];else{for(var f=[],g=0;g<e;g++)f[g]="0";c=Sa(c,f,d)}}if(8!=c.length)throw Error(a+" is not a valid IPv6 address");for(d=0;d<c.length;d++){e=Kc(c[d],16);if(0>e.compare(Ic)||0<e.compare(cd))throw Error(c[d]+" in "+a+" is not a valid hextet.");b=Uc(b.shiftLeft(16),e)}}Vc.call(this,b,6)};t(Wc,Vc);
	var bd=/^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/,cd=Hc(65535),ad=Rc(Lc.shiftLeft(128),Lc);Wc.prototype.toString=function(){if(this.Tb)return this.Tb;for(var a=[],b=3;0<=b;b--){var c=Oc(this.Xc,b),d=c&65535;a.push((c>>>16).toString(16));a.push(d.toString(16))}for(var c=b=-1,e=d=0,f=0;f<a.length;f++)"0"==a[f]?(e++,-1==c&&(c=f),e>d&&(d=e,b=c)):(c=-1,e=0);0<d&&(b+d==a.length&&a.push(""),a.splice(b,d,""),0==b&&(a=[""].concat(a)));return this.Tb=a.join(":")};!jb&&!y||y&&9<=Number(ub)||jb&&sb("1.9.1");y&&sb("9");var ed=function(a,b){Va(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:dd.hasOwnProperty(d)?a.setAttribute(dd[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},dd={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var fd=function(a,b,c){this.uh=c;this.Kg=a;this.Lh=b;this.Ld=0;this.Ed=null};fd.prototype.get=function(){var a;0<this.Ld?(this.Ld--,a=this.Ed,this.Ed=a.next,a.next=null):a=this.Kg();return a};fd.prototype.put=function(a){this.Lh(a);this.Ld<this.uh&&(this.Ld++,a.next=this.Ed,this.Ed=a)};var gd=function(a){m.setTimeout(function(){throw a;},0)},hd,id=function(){var a=m.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=r(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(ba(c.next)){c=c.next;var a=c.cb;c.cb=null;a()}};return function(a){d.next={cb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){m.setTimeout(a,0)}};var jd=function(){this.he=this.bc=null},ld=new fd(function(){return new kd},function(a){a.reset()},100);jd.prototype.add=function(a,b){var c=ld.get();c.set(a,b);this.he?this.he.next=c:(w(!this.bc),this.bc=c);this.he=c};jd.prototype.remove=function(){var a=null;this.bc&&(a=this.bc,this.bc=this.bc.next,this.bc||(this.he=null),a.next=null);return a};var kd=function(){this.next=this.scope=this.Oc=null};kd.prototype.set=function(a,b){this.Oc=a;this.scope=b;this.next=null};
	kd.prototype.reset=function(){this.next=this.scope=this.Oc=null};var sd=function(a,b){md||nd();od||(md(),od=!0);rd.add(a,b)},md,nd=function(){if(m.Promise&&m.Promise.resolve){var a=m.Promise.resolve(void 0);md=function(){a.then(td)}}else md=function(){var a=td;!p(m.setImmediate)||m.Window&&m.Window.prototype&&!x("Edge")&&m.Window.prototype.setImmediate==m.setImmediate?(hd||(hd=id()),hd(a)):m.setImmediate(a)}},od=!1,rd=new jd,td=function(){for(var a=null;a=rd.remove();){try{a.Oc.call(a.scope)}catch(b){gd(b)}ld.put(a)}od=!1};var ud=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},vd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var C=function(a,b){this.Aa=0;this.ub=void 0;this.jc=this.kb=this.T=null;this.Dd=this.we=!1;if(a!=ca)try{var c=this;a.call(b,function(a){wd(c,2,a)},function(a){if(!(a instanceof xd))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}wd(c,3,a)})}catch(d){wd(this,3,d)}},yd=function(){this.next=this.context=this.wc=this.Ub=this.child=null;this.Lc=!1};yd.prototype.reset=function(){this.context=this.wc=this.Ub=this.child=null;this.Lc=!1};
	var zd=new fd(function(){return new yd},function(a){a.reset()},100),Ad=function(a,b,c){var d=zd.get();d.Ub=a;d.wc=b;d.context=c;return d},D=function(a){if(a instanceof C)return a;var b=new C(ca);wd(b,2,a);return b},Bd=function(a){return new C(function(b,c){c(a)})},Dd=function(a,b,c){Cd(a,b,c,null)||sd(na(b,a))},Ed=function(a){return new C(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},k=0,l;k<a.length;k++)l=a[k],Dd(l,na(f,k),g);else b(e)})},
	Fd=function(a){return new C(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Xg:!0,value:f}:{Xg:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],Dd(g,na(e,f,!0),na(e,f,!1));else b(d)})},Gd=function(){new C(function(){})};
	C.prototype.then=function(a,b,c){null!=a&&Ea(a,"opt_onFulfilled should be a function.");null!=b&&Ea(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Hd(this,p(a)?a:null,p(b)?b:null,c)};ud(C);var Jd=function(a,b){var c=Ad(b,b,void 0);c.Lc=!0;Id(a,c);return a};C.prototype.Ha=function(a,b){return Hd(this,null,a,b)};C.prototype.cancel=function(a){0==this.Aa&&sd(function(){var b=new xd(a);Kd(this,b)},this)};
	var Kd=function(a,b){if(0==a.Aa)if(a.T){var c=a.T;if(c.kb){for(var d=0,e=null,f=null,g=c.kb;g&&(g.Lc||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.Aa&&1==d?Kd(c,b):(f?(d=f,w(c.kb),w(null!=d),d.next==c.jc&&(c.jc=d),d.next=d.next.next):Ld(c),Md(c,e,3,b)))}a.T=null}else wd(a,3,b)},Id=function(a,b){a.kb||2!=a.Aa&&3!=a.Aa||Nd(a);w(null!=b.Ub);a.jc?a.jc.next=b:a.kb=b;a.jc=b},Hd=function(a,b,c,d){var e=Ad(null,null,null);e.child=new C(function(a,g){e.Ub=b?function(c){try{var e=b.call(d,
	c);a(e)}catch(q){g(q)}}:a;e.wc=c?function(b){try{var e=c.call(d,b);!ba(e)&&b instanceof xd?g(b):a(e)}catch(q){g(q)}}:g});e.child.T=a;Id(a,e);return e.child};C.prototype.ei=function(a){w(1==this.Aa);this.Aa=0;wd(this,2,a)};C.prototype.fi=function(a){w(1==this.Aa);this.Aa=0;wd(this,3,a)};
	var wd=function(a,b,c){0==a.Aa&&(a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.Aa=1,Cd(c,a.ei,a.fi,a)||(a.ub=c,a.Aa=b,a.T=null,Nd(a),3!=b||c instanceof xd||Od(a,c)))},Cd=function(a,b,c,d){if(a instanceof C)return null!=b&&Ea(b,"opt_onFulfilled should be a function."),null!=c&&Ea(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Id(a,Ad(b||ca,c||null,d)),!0;if(vd(a))return a.then(b,c,d),!0;if(ia(a))try{var e=a.then;if(p(e))return Pd(a,
	e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Pd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(l){k(l)}},Nd=function(a){a.we||(a.we=!0,sd(a.Rg,a))},Ld=function(a){var b=null;a.kb&&(b=a.kb,a.kb=b.next,b.next=null);a.kb||(a.jc=null);null!=b&&w(null!=b.Ub);return b};C.prototype.Rg=function(){for(var a=null;a=Ld(this);)Md(this,a,this.Aa,this.ub);this.we=!1};
	var Md=function(a,b,c,d){if(3==c&&b.wc&&!b.Lc)for(;a&&a.Dd;a=a.T)a.Dd=!1;if(b.child)b.child.T=null,Qd(b,c,d);else try{b.Lc?b.Ub.call(b.context):Qd(b,c,d)}catch(e){Rd.call(null,e)}zd.put(b)},Qd=function(a,b,c){2==b?a.Ub.call(a.context,c):a.wc&&a.wc.call(a.context,c)},Od=function(a,b){a.Dd=!0;sd(function(){a.Dd&&Rd.call(null,b)})},Rd=gd,xd=function(a){u.call(this,a)};t(xd,u);xd.prototype.name="cancel";/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var E=function(a,b){this.Wd=[];this.Of=a;this.sf=b||null;this.Uc=this.mc=!1;this.ub=void 0;this.$e=this.kf=this.ne=!1;this.ee=0;this.T=null;this.oe=0};E.prototype.cancel=function(a){if(this.mc)this.ub instanceof E&&this.ub.cancel();else{if(this.T){var b=this.T;delete this.T;a?b.cancel(a):(b.oe--,0>=b.oe&&b.cancel())}this.Of?this.Of.call(this.sf,this):this.$e=!0;this.mc||F(this,new Sd)}};E.prototype.rf=function(a,b){this.ne=!1;Td(this,a,b)};
	var Td=function(a,b,c){a.mc=!0;a.ub=c;a.Uc=!b;Ud(a)},Wd=function(a){if(a.mc){if(!a.$e)throw new Vd;a.$e=!1}};E.prototype.Cb=function(a){Wd(this);Xd(a);Td(this,!0,a)};var F=function(a,b){Wd(a);Xd(b);Td(a,!1,b)},Xd=function(a){w(!(a instanceof E),"An execution sequence may not be initiated with a blocking Deferred.")},$d=function(a){var b=Yd();Zd(b,null,a,void 0)},Zd=function(a,b,c,d){w(!a.kf,"Blocking Deferreds can not be re-used");a.Wd.push([b,c,d]);a.mc&&Ud(a)};
	E.prototype.then=function(a,b,c){var d,e,f=new C(function(a,b){d=a;e=b});Zd(this,d,function(a){a instanceof Sd?f.cancel():e(a)});return f.then(a,b,c)};ud(E);
	var ae=function(a){return Ja(a.Wd,function(a){return p(a[1])})},Ud=function(a){if(a.ee&&a.mc&&ae(a)){var b=a.ee,c=be[b];c&&(m.clearTimeout(c.mb),delete be[b]);a.ee=0}a.T&&(a.T.oe--,delete a.T);for(var b=a.ub,d=c=!1;a.Wd.length&&!a.ne;){var e=a.Wd.shift(),f=e[0],g=e[1],e=e[2];if(f=a.Uc?g:f)try{var k=f.call(e||a.sf,b);ba(k)&&(a.Uc=a.Uc&&(k==b||k instanceof Error),a.ub=b=k);if(vd(b)||"function"===typeof m.Promise&&b instanceof m.Promise)d=!0,a.ne=!0}catch(l){b=l,a.Uc=!0,ae(a)||(c=!0)}}a.ub=b;d&&(k=r(a.rf,
	a,!0),d=r(a.rf,a,!1),b instanceof E?(Zd(b,k,d),b.kf=!0):b.then(k,d));c&&(b=new ce(b),be[b.mb]=b,a.ee=b.mb)},Vd=function(){u.call(this)};t(Vd,u);Vd.prototype.message="Deferred has already fired";Vd.prototype.name="AlreadyCalledError";var Sd=function(){u.call(this)};t(Sd,u);Sd.prototype.message="Deferred was canceled";Sd.prototype.name="CanceledError";var ce=function(a){this.mb=m.setTimeout(r(this.di,this),0);this.ta=a};
	ce.prototype.di=function(){w(be[this.mb],"Cannot throw an error that is not scheduled.");delete be[this.mb];throw this.ta;};var be={};var Yd=function(){var a="//apis.google.com/js/client.js?onload="+de,b={},c=b.document||document,d=document.createElement("SCRIPT"),e={hg:d,qd:void 0},f=new E(ee,e),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){fe(d,!0);F(f,new ge(1,"Timeout reached for loading script "+a))},k),e.qd=g);d.onload=d.onreadystatechange=function(){d.readyState&&"loaded"!=d.readyState&&"complete"!=d.readyState||(fe(d,b.ni||!1,g),f.Cb(null))};d.onerror=function(){fe(d,!0,g);F(f,new ge(0,"Error while loading script "+
	a))};e=b.attributes||{};cb(e,{type:"text/javascript",charset:"UTF-8",src:a});ed(d,e);he(c).appendChild(d);return f},he=function(a){var b=a.getElementsByTagName("HEAD");return b&&0!=b.length?b[0]:a.documentElement},ee=function(){if(this&&this.hg){var a=this.hg;a&&"SCRIPT"==a.tagName&&fe(a,!0,this.qd)}},fe=function(a,b,c){null!=c&&m.clearTimeout(c);a.onload=ca;a.onerror=ca;a.onreadystatechange=ca;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},ge=function(a,b){var c=
	"Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};t(ge,u);var G=function(){Qb.call(this);this.Ua=new Yb(this);this.Bg=this;this.Ie=null};t(G,Qb);G.prototype[Tb]=!0;h=G.prototype;h.addEventListener=function(a,b,c,d){dc(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){lc(this,a,b,c,d)};
	h.dispatchEvent=function(a){ie(this);var b,c=this.Ie;if(c){b=[];for(var d=1;c;c=c.Ie)b.push(c),w(1E3>++d,"infinite loop")}c=this.Bg;d=a.type||a;if(n(a))a=new Rb(a,c);else if(a instanceof Rb)a.target=a.target||c;else{var e=a;a=new Rb(d,c);cb(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.yc&&0<=g;g--)f=a.currentTarget=b[g],e=je(f,d,!0,a)&&e;a.yc||(f=a.currentTarget=c,e=je(f,d,!0,a)&&e,a.yc||(e=je(f,d,!1,a)&&e));if(b)for(g=0;!a.yc&&g<b.length;g++)f=a.currentTarget=b[g],e=je(f,d,!1,a)&&e;return e};
	h.Ka=function(){G.Hc.Ka.call(this);this.Ua&&this.Ua.removeAll(void 0);this.Ie=null};h.Va=function(a,b,c,d){ie(this);return this.Ua.add(String(a),b,!1,c,d)};h.Id=function(a,b,c,d){return this.Ua.add(String(a),b,!0,c,d)};h.cf=function(a,b,c,d){return this.Ua.remove(String(a),b,c,d)};
	var je=function(a,b,c,d){b=a.Ua.qa[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Cc&&g.vd==c){var k=g.listener,l=g.Vc||g.src;g.ud&&$b(a.Ua,g);e=!1!==k.call(l,d)&&e}}return e&&0!=d.fg};G.prototype.Rc=function(a,b,c,d){return this.Ua.Rc(String(a),b,c,d)};var ie=function(a){w(a.Ua,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var ke="StopIteration"in m?m.StopIteration:{message:"StopIteration",stack:""},le=function(){};le.prototype.next=function(){throw ke;};le.prototype.Mb=function(){return this};
	var me=function(a){if(a instanceof le)return a;if("function"==typeof a.Mb)return a.Mb(!1);if(ga(a)){var b=0,c=new le;c.next=function(){for(;;){if(b>=a.length)throw ke;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");},ne=function(a,b){if(ga(a))try{Ga(a,b,void 0)}catch(c){if(c!==ke)throw c;}else{a=me(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==ke)throw c;}}};var oe=function(a,b){this.W={};this.u=[];this.wb=this.S=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=oe.prototype;h.Ma=function(){return this.S};h.ua=function(){pe(this);for(var a=[],b=0;b<this.u.length;b++)a.push(this.W[this.u[b]]);return a};h.lb=function(){pe(this);return this.u.concat()};h.kc=function(a){return qe(this.W,a)};
	h.wd=function(a){for(var b=0;b<this.u.length;b++){var c=this.u[b];if(qe(this.W,c)&&this.W[c]==a)return!0}return!1};h.equals=function(a,b){if(this===a)return!0;if(this.S!=a.Ma())return!1;var c=b||re;pe(this);for(var d,e=0;d=this.u[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};var re=function(a,b){return a===b};oe.prototype.remove=function(a){return qe(this.W,a)?(delete this.W[a],this.S--,this.wb++,this.u.length>2*this.S&&pe(this),!0):!1};
	var pe=function(a){if(a.S!=a.u.length){for(var b=0,c=0;b<a.u.length;){var d=a.u[b];qe(a.W,d)&&(a.u[c++]=d);b++}a.u.length=c}if(a.S!=a.u.length){for(var e={},c=b=0;b<a.u.length;)d=a.u[b],qe(e,d)||(a.u[c++]=d,e[d]=1),b++;a.u.length=c}};h=oe.prototype;h.get=function(a,b){return qe(this.W,a)?this.W[a]:b};h.set=function(a,b){qe(this.W,a)||(this.S++,this.u.push(a),this.wb++);this.W[a]=b};
	h.addAll=function(a){var b;a instanceof oe?(b=a.lb(),a=a.ua()):(b=Xa(a),a=Wa(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.lb(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new oe(this)};h.Mb=function(a){pe(this);var b=0,c=this.wb,d=this,e=new le;e.next=function(){if(c!=d.wb)throw Error("The map has changed since the iterator was created");if(b>=d.u.length)throw ke;var e=d.u[b++];return a?e:d.W[e]};return e};
	var qe=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var se=function(a){if(a.Ma&&"function"==typeof a.Ma)a=a.Ma();else if(ga(a)||n(a))a=a.length;else{var b=0,c;for(c in a)b++;a=b}return a},te=function(a){if(a.ua&&"function"==typeof a.ua)return a.ua();if(n(a))return a.split("");if(ga(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Wa(a)},ue=function(a){if(a.lb&&"function"==typeof a.lb)return a.lb();if(!a.ua||"function"!=typeof a.ua){if(ga(a)||n(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Xa(a)}},ve=function(a,
	b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ga(a)||n(a))Ga(a,b,void 0);else for(var c=ue(a),d=te(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)},we=function(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(ga(a)||n(a))return Ka(a,b,void 0);for(var c=ue(a),d=te(a),e=d.length,f=0;f<e;f++)if(!b.call(void 0,d[f],c&&c[f],a))return!1;return!0};var xe=function(a){this.W=new oe;a&&this.addAll(a)},ye=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[ja]||(a[ja]=++ka)):b.substr(0,1)+a};h=xe.prototype;h.Ma=function(){return this.W.Ma()};h.add=function(a){this.W.set(ye(a),a)};h.addAll=function(a){a=te(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};h.removeAll=function(a){a=te(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};h.remove=function(a){return this.W.remove(ye(a))};h.contains=function(a){return this.W.kc(ye(a))};
	h.ua=function(){return this.W.ua()};h.clone=function(){return new xe(this)};h.equals=function(a){return this.Ma()==se(a)&&ze(this,a)};var ze=function(a,b){var c=se(b);if(a.Ma()>c)return!1;!(b instanceof xe)&&5<c&&(b=new xe(b));return we(a,function(a){var c=b;if(c.contains&&"function"==typeof c.contains)a=c.contains(a);else if(c.wd&&"function"==typeof c.wd)a=c.wd(a);else if(ga(c)||n(c))a=Na(c,a);else a:{for(var f in c)if(c[f]==a){a=!0;break a}a=!1}return a})};xe.prototype.Mb=function(){return this.W.Mb(!1)};var Ae=function(a){var b=[],c=function(a,e,f){var g=e+"  ";f=new xe(f);try{if(ba(a))if(null===a)b.push("NULL");else if(n(a))b.push('"'+a.replace(/\n/g,"\n"+e)+'"');else if(p(a))b.push(String(a).replace(/\n/g,"\n"+e));else if(ia(a))if(f.contains(a))b.push("*** reference loop detected ***");else{f.add(a);b.push("{");for(var k in a)p(a[k])||(b.push("\n"),b.push(g),b.push(k+" = "),c(a[k],g,f));b.push("\n"+e+"}")}else b.push(a);else b.push("undefined")}catch(l){b.push("*** "+l+" ***")}};c(a,"",new xe);
	return b.join("")};var Be=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Be.prototype.uf=null;var Ce=0;Be.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ce++;d||oa();this.ad=a;this.zh=b;delete this.uf};Be.prototype.jg=function(a){this.ad=a};var De=function(a){this.Nf=a;this.Df=this.qe=this.ad=this.T=null},Ee=function(a,b){this.name=a;this.value=b};Ee.prototype.toString=function(){return this.name};var Fe=new Ee("SEVERE",1E3),Ge=new Ee("CONFIG",700),He=new Ee("FINE",500);De.prototype.getName=function(){return this.Nf};De.prototype.getParent=function(){return this.T};De.prototype.jg=function(a){this.ad=a};var Ie=function(a){if(a.ad)return a.ad;if(a.T)return Ie(a.T);Ba("Root logger has no level set.");return null};
	De.prototype.log=function(a,b,c){if(a.value>=Ie(this).value)for(p(b)&&(b=b()),a=new Be(a,String(b),this.Nf),c&&(a.uf=c),c="log:"+a.zh,m.console&&(m.console.timeStamp?m.console.timeStamp(c):m.console.markTimeline&&m.console.markTimeline(c)),m.msWriteProfilerMark&&m.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.Df)for(var e=0,f=void 0;f=b.Df[e];e++)f(d);c=c.getParent()}};
	var Je={},Ke=null,Le=function(a){Ke||(Ke=new De(""),Je[""]=Ke,Ke.jg(Ge));var b;if(!(b=Je[a])){b=new De(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Le(a.substr(0,c));c.qe||(c.qe={});c.qe[d]=b;b.T=c;Je[a]=b}return b};var Me=function(a,b){a&&a.log(He,b,void 0)};var Ne=function(a,b,c){if(p(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:m.setTimeout(a,b||0)},Oe=function(a){var b=null;return(new C(function(c,d){b=Ne(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).Ha(function(a){m.clearTimeout(b);throw a;})};var Pe=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,Qe=function(a,b){if(a)for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f=null,g=null;0<=e?(f=c[d].substring(0,e),g=c[d].substring(e+1)):f=c[d];b(f,g?decodeURIComponent(g.replace(/\+/g," ")):"")}};var I=function(a){G.call(this);this.headers=new oe;this.je=a||null;this.Ab=!1;this.ie=this.i=null;this.Zc=this.Kf=this.Hd="";this.Sb=this.Ee=this.Gd=this.ve=!1;this.Ic=0;this.$d=null;this.cg="";this.fe=this.Hh=this.ki=!1};t(I,G);var Re=I.prototype,Se=Le("goog.net.XhrIo");Re.Pa=Se;var Te=/^https?$/i,Ue=["POST","PUT"];
	I.prototype.send=function(a,b,c,d){if(this.i)throw Error("[goog.net.XhrIo] Object is active with another request="+this.Hd+"; newUri="+a);b=b?b.toUpperCase():"GET";this.Hd=a;this.Zc="";this.Kf=b;this.ve=!1;this.Ab=!0;this.i=this.je?this.je.se():Ac.se();this.ie=this.je?this.je.getOptions():Ac.getOptions();this.i.onreadystatechange=r(this.Qf,this);this.Hh&&"onprogress"in this.i&&(this.i.onprogress=r(function(a){this.Pf(a,!0)},this),this.i.upload&&(this.i.upload.onprogress=r(this.Pf,this)));try{Me(this.Pa,
	Ve(this,"Opening Xhr")),this.Ee=!0,this.i.open(b,String(a),!0),this.Ee=!1}catch(f){Me(this.Pa,Ve(this,"Error opening Xhr: "+f.message));this.ta(5,f);return}a=c||"";var e=this.headers.clone();d&&ve(d,function(a,b){e.set(b,a)});d=Ma(e.lb());c=m.FormData&&a instanceof m.FormData;!Na(Ue,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.i.setRequestHeader(b,a)},this);this.cg&&(this.i.responseType=this.cg);Ya(this.i)&&(this.i.withCredentials=
	this.ki);try{We(this),0<this.Ic&&(this.fe=Xe(this.i),Me(this.Pa,Ve(this,"Will abort after "+this.Ic+"ms if incomplete, xhr2 "+this.fe)),this.fe?(this.i.timeout=this.Ic,this.i.ontimeout=r(this.qd,this)):this.$d=Ne(this.qd,this.Ic,this)),Me(this.Pa,Ve(this,"Sending request")),this.Gd=!0,this.i.send(a),this.Gd=!1}catch(f){Me(this.Pa,Ve(this,"Send error: "+f.message)),this.ta(5,f)}};var Xe=function(a){return y&&sb(9)&&ha(a.timeout)&&ba(a.ontimeout)},La=function(a){return"content-type"==a.toLowerCase()};
	I.prototype.qd=function(){"undefined"!=typeof aa&&this.i&&(this.Zc="Timed out after "+this.Ic+"ms, aborting",Me(this.Pa,Ve(this,this.Zc)),this.dispatchEvent("timeout"),this.abort(8))};I.prototype.ta=function(a,b){this.Ab=!1;this.i&&(this.Sb=!0,this.i.abort(),this.Sb=!1);this.Zc=b;Ye(this);Ze(this)};var Ye=function(a){a.ve||(a.ve=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
	I.prototype.abort=function(){this.i&&this.Ab&&(Me(this.Pa,Ve(this,"Aborting")),this.Ab=!1,this.Sb=!0,this.i.abort(),this.Sb=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Ze(this))};I.prototype.Ka=function(){this.i&&(this.Ab&&(this.Ab=!1,this.Sb=!0,this.i.abort(),this.Sb=!1),Ze(this,!0));I.Hc.Ka.call(this)};I.prototype.Qf=function(){this.wa()||(this.Ee||this.Gd||this.Sb?$e(this):this.Dh())};I.prototype.Dh=function(){$e(this)};
	var $e=function(a){if(a.Ab&&"undefined"!=typeof aa)if(a.ie[1]&&4==bf(a)&&2==a.getStatus())Me(a.Pa,Ve(a,"Local request error detected and ignored"));else if(a.Gd&&4==bf(a))Ne(a.Qf,0,a);else if(a.dispatchEvent("readystatechange"),4==bf(a)){Me(a.Pa,Ve(a,"Request complete"));a.Ab=!1;try{var b=a.getStatus(),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.Hd).match(Pe)[1]||null;if(!f&&m.self&&m.self.location)var g=
	m.self.location.protocol,f=g.substr(0,g.length-1);e=!Te.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<bf(a)?a.i.statusText:""}catch(l){Me(a.Pa,"Can not get status: "+l.message),k=""}a.Zc=k+" ["+a.getStatus()+"]";Ye(a)}}finally{Ze(a)}}};
	I.prototype.Pf=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(cf(a,"progress"));this.dispatchEvent(cf(a,b?"downloadprogress":"uploadprogress"))};
	var cf=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Ze=function(a,b){if(a.i){We(a);var c=a.i,d=a.ie[0]?ca:null;a.i=null;a.ie=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(c=a.Pa)&&c.log(Fe,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},We=function(a){a.i&&a.fe&&(a.i.ontimeout=null);ha(a.$d)&&(m.clearTimeout(a.$d),a.$d=null)},bf=function(a){return a.i?a.i.readyState:0};
	I.prototype.getStatus=function(){try{return 2<bf(this)?this.i.status:-1}catch(a){return-1}};var Ve=function(a,b){return b+" ["+a.Kf+" "+a.Hd+" "+a.getStatus()+"]"};var df=function(a,b){this.Db=this.$b=this.Ib="";this.xc=null;this.Qb=this.Pd="";this.Fa=this.th=!1;var c;if(a instanceof df)this.Fa=ba(b)?b:a.Fa,ef(this,a.Ib),c=a.$b,ff(this),this.$b=c,gf(this,a.Db),hf(this,a.xc),this.setPath(a.getPath()),jf(this,a.Ya.clone()),c=a.Qb,ff(this),this.Qb=c;else if(a&&(c=String(a).match(Pe))){this.Fa=!!b;ef(this,c[1]||"",!0);var d=c[2]||"";ff(this);this.$b=kf(d);gf(this,c[3]||"",!0);hf(this,c[4]);this.setPath(c[5]||"",!0);jf(this,c[6]||"",!0);c=c[7]||"";ff(this);this.Qb=
	kf(c)}else this.Fa=!!b,this.Ya=new lf(null,0,this.Fa)};
	df.prototype.toString=function(){var a=[],b=this.Ib;b&&a.push(mf(b,nf,!0),":");var c=this.Db;if(c||"file"==b)a.push("//"),(b=this.$b)&&a.push(mf(b,nf,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.xc,null!=c&&a.push(":",String(c));if(c=this.getPath())this.Db&&"/"!=c.charAt(0)&&a.push("/"),a.push(mf(c,"/"==c.charAt(0)?of:pf,!0));(c=this.Ya.toString())&&a.push("?",c);(c=this.Qb)&&a.push("#",mf(c,qf));return a.join("")};
	df.prototype.resolve=function(a){var b=this.clone(),c=!!a.Ib;c?ef(b,a.Ib):c=!!a.$b;if(c){var d=a.$b;ff(b);b.$b=d}else c=!!a.Db;c?gf(b,a.Db):c=null!=a.xc;d=a.getPath();if(c)hf(b,a.xc);else if(c=!!a.Pd){if("/"!=d.charAt(0))if(this.Db&&!this.Pd)d="/"+d;else{var e=b.getPath().lastIndexOf("/");-1!=e&&(d=b.getPath().substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):
	".."==k?((1<f.length||1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?b.setPath(d):c=""!==a.Ya.toString();c?jf(b,kf(a.Ya.toString())):c=!!a.Qb;c&&(a=a.Qb,ff(b),b.Qb=a);return b};df.prototype.clone=function(){return new df(this)};
	var ef=function(a,b,c){ff(a);a.Ib=c?kf(b,!0):b;a.Ib&&(a.Ib=a.Ib.replace(/:$/,""))},gf=function(a,b,c){ff(a);a.Db=c?kf(b,!0):b},hf=function(a,b){ff(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.xc=b}else a.xc=null};df.prototype.getPath=function(){return this.Pd};df.prototype.setPath=function(a,b){ff(this);this.Pd=b?kf(a,!0):a;return this};
	var jf=function(a,b,c){ff(a);b instanceof lf?(a.Ya=b,a.Ya.We(a.Fa)):(c||(b=mf(b,rf)),a.Ya=new lf(b,0,a.Fa))},sf=function(a,b,c){ff(a);a.Ya.set(b,c)},ff=function(a){if(a.th)throw Error("Tried to modify a read-only Uri");};df.prototype.We=function(a){this.Fa=a;this.Ya&&this.Ya.We(a);return this};
	var tf=function(a,b){var c=new df(null,void 0);ef(c,"https");a&&gf(c,a);b&&c.setPath(b);return c},kf=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},mf=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,uf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},uf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},nf=/[#\/\?@]/g,pf=/[\#\?:]/g,of=/[\#\?]/g,rf=/[\#\?@]/g,qf=/#/g,lf=function(a,b,c){this.S=this.V=null;this.Da=
	a||null;this.Fa=!!c},vf=function(a){a.V||(a.V=new oe,a.S=0,a.Da&&Qe(a.Da,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},wf=function(a){var b=ue(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new lf(null,0,void 0);a=te(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];fa(f)?c.setValues(e,f):c.add(e,f)}return c};h=lf.prototype;h.Ma=function(){vf(this);return this.S};
	h.add=function(a,b){vf(this);this.Da=null;a=this.ka(a);var c=this.V.get(a);c||this.V.set(a,c=[]);c.push(b);this.S=Ca(this.S)+1;return this};h.remove=function(a){vf(this);a=this.ka(a);return this.V.kc(a)?(this.Da=null,this.S=Ca(this.S)-this.V.get(a).length,this.V.remove(a)):!1};h.kc=function(a){vf(this);a=this.ka(a);return this.V.kc(a)};h.wd=function(a){var b=this.ua();return Na(b,a)};
	h.lb=function(){vf(this);for(var a=this.V.ua(),b=this.V.lb(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.ua=function(a){vf(this);var b=[];if(n(a))this.kc(a)&&(b=Ra(b,this.V.get(this.ka(a))));else{a=this.V.ua();for(var c=0;c<a.length;c++)b=Ra(b,a[c])}return b};h.set=function(a,b){vf(this);this.Da=null;a=this.ka(a);this.kc(a)&&(this.S=Ca(this.S)-this.V.get(a).length);this.V.set(a,[b]);this.S=Ca(this.S)+1;return this};
	h.get=function(a,b){var c=a?this.ua(a):[];return 0<c.length?String(c[0]):b};h.setValues=function(a,b){this.remove(a);0<b.length&&(this.Da=null,this.V.set(this.ka(a),Ta(b)),this.S=Ca(this.S)+b.length)};h.toString=function(){if(this.Da)return this.Da;if(!this.V)return"";for(var a=[],b=this.V.lb(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ua(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.Da=a.join("&")};
	h.clone=function(){var a=new lf;a.Da=this.Da;this.V&&(a.V=this.V.clone(),a.S=this.S);return a};h.ka=function(a){a=String(a);this.Fa&&(a=a.toLowerCase());return a};h.We=function(a){a&&!this.Fa&&(vf(this),this.Da=null,this.V.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.setValues(d,a))},this));this.Fa=a};var xf=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):fa(a[d])?$a(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<xf(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},yf=function(a,b){var c=null,d=Math.floor(1E9*Math.random()).toString(),e=a||500,f=b||600,g=(window.screen.availHeight-f)/2,k=(window.screen.availWidth-e)/2,e={width:e,height:f,top:0<g?g:0,left:0<k?k:0,location:!0,resizable:!0,statusbar:!0,
	toolbar:!1};d&&(e.target=d);navigator.userAgent&&-1!=navigator.userAgent.indexOf("Firefox/")&&(c=c||"http://localhost");var l,f=c||"about:blank";(d=e)||(d={});c=window;e=f instanceof Eb?f:Ib("undefined"!=typeof f.href?f.href:String(f));f=d.target||f.target;g=[];for(l in d)switch(l){case "width":case "height":case "top":case "left":g.push(l+"="+d[l]);break;case "target":case "noreferrer":break;default:g.push(l+"="+(d[l]?1:0))}l=g.join(",");(x("iPhone")&&!x("iPod")&&!x("iPad")||x("iPad")||x("iPod"))&&
	c.navigator&&c.navigator.standalone&&f&&"_self"!=f?(l=c.document.createElement("A"),e=e instanceof Eb?e:Ib(e),l.href=Fb(e),l.setAttribute("target",f),d.noreferrer&&l.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,c,1),l.dispatchEvent(d),l={}):d.noreferrer?(l=c.open("",f,l),d=Fb(e),l&&(ib&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),l.opener=null,c=new Bb,c.Zd="b/12014412, meta tag with sanitized URL",xa.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(ra,
	"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(sa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(ta,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(ua,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(va,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(wa,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',Da(Cb(c),"must provide justification"),w(!/^[\s\xa0]*$/.test(Cb(c)),"must provide non-empty justification"),l.document.write(Lb((new Kb).sh(d))),l.document.close())):l=c.open(Fb(e),f,l);if(l)try{l.focus()}catch(q){}return l},
	zf=function(a){return new C(function(b){var c=function(){Oe(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},Af=function(){var a=null;return(new C(function(b){"complete"==m.document.readyState?b():(a=function(){b()},kc(window,"load",a))})).Ha(function(b){lc(window,"load",a);throw b;})},Bf=function(){var a=navigator.userAgent,b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";
	if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"safari/")&&!v(b,"chrome/"))return"Safari";if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";return"Other"},Cf=function(a){return Bf()+"/JsCore/"+a};var Df;try{var Ef={};Object.defineProperty(Ef,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Ef,"abcd",{configurable:!0,enumerable:!0,value:2});Df=2==Ef.abcd}catch(a){Df=!1}
	var J=function(a,b,c){Df?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Ff=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&J(a,c,b[c])},Gf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Hf=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0};var If={sg:{kd:985,jd:735,providerId:"facebook.com"},ug:{kd:1040,jd:620,providerId:"github.com"},vg:{kd:485,jd:640,providerId:"google.com"},zg:{kd:485,jd:705,providerId:"twitter.com"}},Jf=function(a){for(var b in If)if(If[b].providerId==a)return If[b];return null};var K=function(a,b){this.code="auth/"+a;this.message=b||Kf[a]||""};t(K,Error);K.prototype.Ra=function(){return{name:this.code,code:this.code,message:this.message}};
	var Kf={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	"email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.",
	"invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	"invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"This operation is not allowed. You must enable this service in the console.","popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.",
	"provider-already-linked":"User can only be linked to one identity for the given provider.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.",
	"user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported."};var Lf=function(a){this.wh=a.sub;oa();this.xd=a.email||null};var Mf=function(a,b,c,d){var e={};ia(c)?e=c:b&&n(c)&&n(d)?e={oauthToken:c,oauthTokenSecret:d}:!b&&n(c)&&(e={accessToken:c});if(b||!e.idToken&&!e.accessToken)if(b&&e.oauthToken&&e.oauthTokenSecret)J(this,"accessToken",e.oauthToken),J(this,"secret",e.oauthTokenSecret);else{if(b)throw new K("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");throw new K("argument-error","credential failed: expected 1 argument (the OAuth access token).");}else e.idToken&&J(this,
	"idToken",e.idToken),e.accessToken&&J(this,"accessToken",e.accessToken);J(this,"provider",a)};Mf.prototype.Bd=function(a){return Nf(a,Of(this))};Mf.prototype.Lf=function(a,b){var c=Of(this);c.idToken=b;return L(a,Pf,c)};var Of=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:wf(b).toString(),requestUri:window.location.href}};
	Mf.prototype.Ra=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
	var Qf=function(a,b){var c=!!b,d=function(){Ff(this,{providerId:a,isOAuthProvider:!0});this.Te=[]};c||(d.prototype.addScope=function(a){Na(this.Te,a)||this.Te.push(a)});d.prototype.yf=function(){return Ta(this.Te)};d.credential=function(b,d){return new Mf(a,c,b,d)};Ff(d,{PROVIDER_ID:a});return d},Rf=Qf("facebook.com");Rf.prototype.addScope=Rf.prototype.addScope||void 0;var Sf=Qf("github.com");Sf.prototype.addScope=Sf.prototype.addScope||void 0;var Tf=Qf("google.com");
	Tf.prototype.addScope=Tf.prototype.addScope||void 0;Tf.credential=function(a,b){if(!a&&!b)throw new K("argument-error","credential failed: must provide the ID token and/or the access token.");return new Mf("google.com",!1,ia(a)?a:{idToken:a||null,accessToken:b||null})};var Uf=Qf("twitter.com",!0),Vf=function(a,b){this.xd=a;this.Je=b;J(this,"provider","password")};Vf.prototype.Bd=function(a){return L(a,Wf,{email:this.xd,password:this.Je})};
	Vf.prototype.Lf=function(a,b){return L(a,Xf,{idToken:b,email:this.xd,password:this.Je})};Vf.prototype.Ra=function(){return{email:this.xd,password:this.Je}};var Yf=function(){Ff(this,{providerId:"password",isOAuthProvider:!1})};Ff(Yf,{PROVIDER_ID:"password"});
	var Zf={li:Yf,sg:Rf,vg:Tf,ug:Sf,zg:Uf},$f=function(a){var b=a&&a.providerId;if(!b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;for(var e in Zf)if(Zf[e].PROVIDER_ID==b)try{return Zf[e].credential({accessToken:c,idToken:a,oauthToken:c,oauthTokenSecret:d})}catch(f){break}return null};var ag=function(a,b,c){K.call(this,"account-exists-with-different-credential",c);J(this,"email",a);J(this,"credential",b)};t(ag,K);ag.prototype.Ra=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.Ra();b&&(cb(a,b),a.providerId=b.provider,delete a.provider);return a};var bg=function(a,b,c,d,e){this.Kb=a;this.Pb=b||null;this.Kc=c||null;this.Ue=d||null;this.ta=e||null;if(this.Kc||this.ta){if(this.Kc&&this.ta)throw new K("invalid-auth-event");if(this.Kc&&!this.Ue)throw new K("invalid-auth-event");}else throw new K("invalid-auth-event");};bg.prototype.ye=function(){return this.Ue};bg.prototype.getError=function(){return this.ta};bg.prototype.Ra=function(){return{type:this.Kb,eventId:this.Pb,urlResponse:this.Kc,sessionId:this.Ue,error:this.ta&&this.ta.Ra()}};var M=function(a,b,c){this.ma=a;a=b||{};this.Th=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Vh=a.secureTokenTimeout||1E4;this.Uh=ab(a.secureTokenHeaders||cg);this.Ug=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.Vg=a.firebaseTimeout||1E4;this.wf=ab(a.firebaseHeaders||dg);c&&(this.wf["X-Client-Version"]=c);this.Jg=new Dc},eg,cg={"Content-Type":"application/x-www-form-urlencoded"},dg={"Content-Type":"application/json"},gg=function(a,
	b,c,d,e,f,g){!y||!ub||9<ub?a=r(a.Xh,a):(eg||(eg=new C(function(a,b){fg(a,b)})),a=r(a.Wh,a));a(b,c,d,e,f,g)};
	M.prototype.Xh=function(a,b,c,d,e,f){var g=new I(this.Jg),k;f&&(g.Ic=Math.max(0,f),k=setTimeout(function(){g.dispatchEvent("timeout")},f));g.Va("complete",function(){k&&clearTimeout(k);var a=null;try{var c;c=this.i?sc(this.i.responseText):void 0;a=c||null}catch(d){a=null}b&&b(a)});g.Id("ready",function(){k&&clearTimeout(k);this.Sa()});g.Id("timeout",function(){k&&clearTimeout(k);this.Sa();b&&b(null)});g.send(a,c,d,e)};
	var de="__fcb"+Math.floor(1E6*Math.random()).toString(),fg=function(a,b){((window.gapi||{}).client||{}).request?a():(m[de]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},$d(function(){b(Error("CORS_UNSUPPORTED"))}))};
	M.prototype.Wh=function(a,b,c,d,e){var f=this;eg.then(function(){window.gapi.client.setApiKey(f.ma);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).Ha(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
	var hg=function(a,b){return new C(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?gg(a,a.Th+"?key="+encodeURIComponent(a.ma),function(a){a?a.access_token&&a.refresh_token?c(a):d(new K("internal-error")):d(new K("network-request-failed"))},"POST",wf(b).toString(),a.Uh,a.Vh):d(new K("internal-error"))})},ig=function(a){var b={},c;for(c in a)null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return vc(b)},kg=function(a,b,c,d,e){var f=a.Ug+b+"?key="+encodeURIComponent(a.ma);
	e&&(f+="&cb="+oa().toString());return new C(function(b,e){gg(a,f,function(a){a?a.error?e(jg(a)):b(a):e(new K("network-request-failed"))},c,ig(d),a.wf,a.Vg)})},lg=function(a){if(!qc.test(a.email))throw new K("invalid-email");},mg=function(a){"email"in a&&lg(a)},og=function(a,b){return L(a,ng,{identifier:b,continueUri:window.location.href}).then(function(a){return a.allProviders||[]})},qg=function(a){return L(a,pg,{}).then(function(a){return a.authorizedDomains||[]})},rg=function(a){if(!a.idToken)throw new K("internal-error");
	};M.prototype.signInAnonymously=function(){return L(this,sg,{})};M.prototype.updateEmail=function(a,b){return L(this,tg,{idToken:a,email:b})};M.prototype.updatePassword=function(a,b){return L(this,Xf,{idToken:a,password:b})};var ug={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};M.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Va(ug,function(a,f){var g=b[f];null===g?d.push(a):f in b&&(c[f]=g)});d.length&&(c.deleteAttribute=d);return L(this,tg,c)};
	M.prototype.sendPasswordResetEmail=function(a){return L(this,vg,{requestType:"PASSWORD_RESET",email:a})};M.prototype.sendEmailVerification=function(a){return L(this,wg,{requestType:"VERIFY_EMAIL",idToken:a})};
	var yg=function(a,b,c){return L(a,xg,{idToken:b,deleteProvider:c})},zg=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new K("internal-error");},Ag=function(a){if(a.needConfirmation)throw(a&&a.email?new ag(a.email,$f(a),a.message):null)||new K("account-exists-with-different-credential");if(!a.idToken)throw new K("internal-error");},Nf=function(a,b){return L(a,Bg,b)},Cg=function(a){if(!a.oobCode)throw new K("invalid-action-code");};
	M.prototype.confirmPasswordReset=function(a,b){return L(this,Dg,{oobCode:a,newPassword:b})};M.prototype.checkActionCode=function(a){return L(this,Eg,{oobCode:a})};M.prototype.applyActionCode=function(a){return L(this,Fg,{oobCode:a})};
	var Fg={endpoint:"setAccountInfo",ya:Cg,Ec:"email"},Eg={endpoint:"resetPassword",ya:Cg,Gb:function(a){if(!qc.test(a.email))throw new K("internal-error");}},Gg={endpoint:"signupNewUser",ya:function(a){lg(a);if(!a.password)throw new K("weak-password");},Gb:rg,Hb:!0},ng={endpoint:"createAuthUri"},Hg={endpoint:"deleteAccount",Dc:["idToken"]},xg={endpoint:"setAccountInfo",Dc:["idToken","deleteProvider"],ya:function(a){if(!fa(a.deleteProvider))throw new K("internal-error");}},Ig={endpoint:"getAccountInfo"},
	wg={endpoint:"getOobConfirmationCode",Dc:["idToken","requestType"],ya:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new K("internal-error");},Ec:"email"},vg={endpoint:"getOobConfirmationCode",Dc:["requestType"],ya:function(a){if("PASSWORD_RESET"!=a.requestType)throw new K("internal-error");lg(a)},Ec:"email"},pg={Dg:!0,endpoint:"getProjectConfig",lh:"GET"},Dg={endpoint:"resetPassword",ya:Cg,Ec:"email"},tg={endpoint:"setAccountInfo",Dc:["idToken"],ya:mg,Hb:!0},Xf={endpoint:"setAccountInfo",Dc:["idToken"],
	ya:function(a){mg(a);if(!a.password)throw new K("weak-password");},Gb:rg,Hb:!0},sg={endpoint:"signupNewUser",Gb:rg,Hb:!0},Bg={endpoint:"verifyAssertion",ya:zg,Gb:Ag,Hb:!0},Pf={endpoint:"verifyAssertion",ya:function(a){zg(a);if(!a.idToken)throw new K("internal-error");},Gb:Ag,Hb:!0},Jg={endpoint:"verifyCustomToken",ya:function(a){if(!a.token)throw new K("invalid-custom-token");},Gb:rg,Hb:!0},Wf={endpoint:"verifyPassword",ya:function(a){lg(a);if(!a.password)throw new K("wrong-password");},Gb:rg,Hb:!0},
	L=function(a,b,c){if(!Hf(c,b.Dc))return Bd(new K("internal-error"));var d=b.lh||"POST",e;return D(c).then(b.ya).then(function(){b.Hb&&(c.returnSecureToken=!0);return kg(a,b.endpoint,d,c,b.Dg||!1)}).then(function(a){return e=a}).then(b.Gb).then(function(){if(!b.Ec)return e;if(!(b.Ec in e))throw new K("internal-error");return e[b.Ec]})},jg=function(a){var b;b=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var c={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(b=c[b]?
	new K(c[b]):null)return b;a=a.error&&a.error.message||"";b={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported"};if(b[a])return new K(b[a]);b={TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",
	OPERATION_NOT_ALLOWED:"operation-not-allowed"};for(var d in b)if(0===a.indexOf(d))return new K(b[d]);return new K("internal-error")};function _DumpException(a){throw a;}var Kg=function(a,b){return b},N=function(a,b){var c=b=Kg(a,b),d=a.split("."),e=m;d[0]in e||!e.execScript||e.execScript("var "+d[0]);for(var f;d.length&&(f=d.shift());)!d.length&&ba(c)?e[f]=c:e=e[f]?e[f]:e[f]={}};window.osapi=window.osapi||{};window.___jsl=window.___jsl||{};
	(window.___jsl.cd=window.___jsl.cd||[]).push({gwidget:{parsetags:"explicit"},appsapi:{plus_one_service:"/plus/v1"},client:{rms:"migrated"},csi:{rate:.01},poshare:{hangoutContactPickerServer:"https://plus.google.com"},gappsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},appsutil:{required_scopes:["https://www.googleapis.com/auth/plus.me","https://www.googleapis.com/auth/plus.people.recommended"],display_on_page_ready:!1},
	"oauth-flow":{authUrl:"https://accounts.google.com/o/oauth2/auth",proxyUrl:"https://accounts.google.com/o/oauth2/postmessageRelay",redirectUri:"postmessage"},iframes:{sharebox:{params:{json:"&"},url:":socialhost:/:session_prefix:_/sharebox/dialog"},plus:{url:":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"},":socialhost:":"https://apis.google.com",":im_socialhost:":"https://plus.googleapis.com",domains_suggest:{url:"https://domains.google.com/suggest/flow"},card:{params:{s:"#",userid:"&"},
	url:":socialhost:/:session_prefix:_/hovercard/internalcard"},":signuphost:":"https://plus.google.com",":gplus_url:":"https://plus.google.com",plusone:{url:":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1"},plus_share:{url:":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1"},plus_circle:{url:":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1"},plus_followers:{url:":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"},configurator:{url:":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"},
	appcirclepicker:{url:":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},page:{url:":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"},person:{url:":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"},community:{url:":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"},follow:{url:":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"},commentcount:{url:":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"},comments:{url:":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1"},
	blogger:{url:":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1"},youtube:{url:":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1"},reportabuse:{url:":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1"},additnow:{url:":socialhost:/additnow/additnow.html"},udc_webconsentflow:{url:"https://myaccount.google.com/webconsent?usegapi=1"},":source:":"1p"},poclient:{update_session:"google.updateSessionCallback"},"googleapis.config":{methods:{"pos.plusones.list":!0,
	"pos.plusones.get":!0,"pos.plusones.insert":!0,"pos.plusones.delete":!0,"pos.plusones.getSignupState":!0},requestCache:{enabled:!0},versions:{pos:"v1"},rpc:"/rpc",root:"https://content.googleapis.com","root-1p":"https://clients6.google.com",sessionCache:{enabled:!0},transport:{isProxyShared:!0},xd3:"/static/proxy.html",developerKey:"AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",auth:{useInterimAuth:!1}},report:{apis:["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.client\\..*"],rate:1E-4}});var O=window,Lg=document,Mg=/\[native code\]/,Ng=function(a,b,c){return a[b]=a[b]||c},Og=function(a){return!!a&&"object"===typeof a&&Mg.test(a.push)},Pg=function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1},Qg=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},Rg=function(a,b){if(a)if(Og(a)){if(a){P(Og(a),"arrayForEach was called with a non array value");for(var c=0;c<a.length;c++)b.call(void 0,a[c],c)}}else for(c in P("object"===
	typeof a,"objectForEach was called with a non object value"),a)Q(a,c)&&void 0!==a[c]&&b.call(a,a[c],c)},Sg=/&/g,Tg=/</g,Ug=/>/g,Vg=/"/g,Wg=/'/g,Xg=function(a){return String(a).replace(Sg,"&amp;").replace(Tg,"&lt;").replace(Ug,"&gt;").replace(Vg,"&quot;").replace(Wg,"&#39;")},R=function(){var a;if((a=Object.create)&&Mg.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},Q=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},Yg=function(a,b){a=a||{};for(var c in a)Q(a,c)&&(b[c]=
	a[c])},P=function(a,b){if(!a)throw Error(b||"");},Zg=Ng(O,"gapi",{});var $g=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d.exec(a)||b.exec(a)))try{c=decodeURIComponent(a[2])}catch(e){}return c},ah=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,bh=function(a){a=a.match(ah);var b=R();b.jf=a[1];b.query=a[3]?[a[3]]:[];b.zd=a[5]?[a[5]]:[];return b},ch=function(a){return a.jf+(0<a.query.length?"?"+a.query.join("&"):"")+(0<a.zd.length?"#"+a.zd.join("&"):"")},dh=function(a,b){var c=[];if(a)for(var d in a)if(Q(a,
	d)&&null!=a[d]){var e=b?b(a[d]):a[d];c.push(encodeURIComponent(d)+"="+encodeURIComponent(e))}return c},eh=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var fh=function(a,b,c,d,e){if(a[d+"EventListener"])a[d+"EventListener"](b,c,!1);else if(a[e+"tachEvent"])a[e+"tachEvent"]("on"+b,c)},gh=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)};var hh;hh=Ng(O,"___jsl",R());Ng(hh,"I",0);Ng(hh,"hel",10);var ih=function(){var a=[],b=hh.H;b&&Rg(b,function(b){a.push.apply(a,b.L)});return Qg(a)};var jh=function(a){var b=window.___jsl=window.___jsl||{};b[a]=b[a]||[];return b[a]},kh=function(a){var b=window.___jsl=window.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},lh=function(a){return"object"===typeof a&&/\[native code\]/.test(a.push)},mh=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!lh(a[c])&&!lh(b[c])?mh(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=lh(b[c])?[]:{},mh(a[c],b[c])):a[c]=b[c])},nh=function(a){if(a&&!/^\s+$/.test(a)){for(;0==
	a.charCodeAt(a.length-1);)a=a.substring(0,a.length-1);var b;try{b=window.JSON.parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(c){}return"object"===typeof b?b:{}}},oh=function(a){kh(!0);var b=window.___gcfg,c=jh("cu");if(b&&b!==window.___gu){var d={};mh(d,b);c.push(d);window.___gu=b}var b=jh("cu"),e=document.scripts||document.getElementsByTagName("script")||[],
	d=[],f=[];f.push.apply(f,jh("us"));for(var g=0;g<e.length;++g)for(var k=e[g],l=0;l<f.length;++l)k.src&&0==k.src.indexOf(f[l])&&d.push(k);0==d.length&&0<e.length&&e[e.length-1].src&&d.push(e[e.length-1]);for(e=0;e<d.length;++e)d[e].getAttribute("gapi_processed")||(d[e].setAttribute("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=nh(f))&&b.push(f));a&&(d={},mh(d,a),c.push(d));d=jh("cd");a=0;for(b=d.length;a<b;++a)mh(kh(),
	d[a]);d=jh("ci");a=0;for(b=d.length;a<b;++a)mh(kh(),d[a]);a=0;for(b=c.length;a<b;++a)mh(kh(),c[a])},ph=function(a,b){if(!a)return kh();for(var c=a.split("/"),d=kh(),e=0,f=c.length;d&&"object"===typeof d&&e<f;++e)d=d[c[e]];return e===c.length&&void 0!==d?d:b};var qh=function(){var a=window.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),Ng(hh,"ci",[]).push(a),window.__GOOGLEAPIS=void 0)};qh&&qh();oh();var rh=function(a){this.b=a};rh.prototype.value=function(){return this.b};rh.prototype.xf=function(){return this.b.height};rh.prototype.Xe=function(a){this.b.style=a;return this};rh.prototype.Cd=function(){return this.b.style};var sh=function(a,b){a.b.onload=b};var th=function(a){this.b=a||{}};h=th.prototype;h.value=function(){return this.b};h.setUrl=function(a){this.b.url=a;return this};h.getUrl=function(){return this.b.url};h.Xe=function(a){this.b.style=a;return this};h.Cd=function(){return this.b.style};h.qc=function(){return this.b.id};h.Zb=function(a){this.b.rpctoken=a;return this};h.tc=function(){return this.b.rpctoken};var uh=function(a,b){a.b.messageHandlers=b;return a},vh=function(a,b){a.b.messageHandlersFilter=b;return a};
	th.prototype.md=function(a){this.b.apis=a;return this};th.prototype.Pc=function(){return this.b.apis};var wh=function(a,b){a.b.onClose=b};th.prototype.getContext=function(){return this.b.context};var xh=function(a){a.b.attributes=a.b.attributes||{};return new rh(a.b.attributes)},yh=function(a){return(a=a.b.timeout)?a:null};var T=function(a){this.b=a||{}};T.prototype.value=function(){return this.b};T.prototype.getIframe=function(){return this.b.iframe};var zh=function(a,b){a.b.role=b;return a},Ah=function(a,b){a.b.data=b;return a};T.prototype.vb=function(a){this.b.setRpcReady=a;return this};T.prototype.Tc=function(){return this.b.setRpcReady};T.prototype.Zb=function(a){this.b.rpctoken=a;return this};T.prototype.tc=function(){return this.b.rpctoken};var Bh=function(a){a.b.selfConnect=!0;return a};var Ch=function(a){this.b=a||{}};Ch.prototype.value=function(){return this.b};var Dh=function(a){var b=new Ch;b.b.role=a;return b},Eh=function(a,b){a.b.handler=b;return a},Fh=function(a,b){a.b.filter=b;return a};Ch.prototype.md=function(a){this.b.apis=a;return this};Ch.prototype.Pc=function(){return this.b.apis};var Gh=function(a){a.b.runOnce=!0;return a};N("gapi.config.get",ph);N("gapi.config.update",function(a,b){var c=a;if("string"===typeof a){for(var d=c={},e=a.split("/"),f=0,g=e.length;f<g-1;++f)var k={},d=d[e[f]]=k;d[e[f]]=b}oh(c)});var Hh={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Ih=function(a){var b,c,d;b=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return b.test(a)?'"'+a.replace(b,function(a){var b=Hh[a];if(b)return b;b=a.charCodeAt();return"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16)})+'"':'"'+a+'"';case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";b=[];if("number"===
	typeof a.length&&!a.propertyIsEnumerable("length")){d=a.length;for(c=0;c<d;c+=1)b.push(Ih(a[c])||"null");return"["+b.join(",")+"]"}for(c in a)!/___$/.test(c)&&Q(a,c)&&"string"===typeof c&&(d=Ih(a[c]))&&b.push(Ih(c)+":"+d);return"{"+b.join(",")+"}"}return""}},Jh=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}return!1},
	Kh=!1;try{Kh=!!window.JSON&&'["a"]'===window.JSON.stringify(["a"])&&"a"===window.JSON.parse('["a"]')[0]}catch(a){}var Lh=function(a){try{return window.JSON.parse(a)}catch(b){return!1}},Mh=Kh?window.JSON.stringify:Ih,Nh=Kh?Lh:Jh;var Oh,Ph,Qh,Rh,Sh,Th={},Vh=0,Wh=R(),Xh=R(),Yh=function(a){return"number"===typeof a&&a>Math.random()},Zh=function(a){if("undefined"===typeof Oh){var b=ph("report")||{},c=b.rate;Rh=b.timeout||1E3;Ph=b.host||"https://plus.google.com";Qh=b.path||"/_/widget/report";Oh=[];Yh(c)&&(Oh=b.apis||[]);var b=b.apiRate||{},d;for(d in b)Yh(b[d])&&Oh.push(d)}for(d=0;d<Oh.length;++d)if((new RegExp("^"+Oh[d]+"$")).test(a))return!0;return!1},$h=function(a){delete Th[a]},ai=function(){Sh&&(O.clearTimeout(Sh),Sh=0);
	Sh=O.setTimeout(function(){var a;a=document.location;a=a.protocol+"//"+a.host+a.pathname;var b;var c=Xh;if(Mg.test(Object.keys))b=Object.keys(c);else{var d=[];for(b in c)Q(c,b)&&d.push(b);b=d}a=[Ph,Qh,"?api=",encodeURIComponent(b.join(":")),"&url=",encodeURIComponent(a),"&loaded=",encodeURIComponent(ih().join(":"))].join("");Xh=R();b=new Image;c=Vh++;Th[c]=b;b.onload=b.onerror=na($h,c);b.src=a;Sh=0},Rh)},bi=Kg,Kg=function(a,b){var c=bi(a,b);"function"===typeof b&&Zh(a)&&(c=function(c){Wh[a]||(Xh[a]=
	!0,Wh[a]=!0,ai());return b.apply(this,arguments)});return c};N("gadgets.json.stringify",Mh);N("gadgets.json.parse",Nh);var ci=function(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1),b=b.substring(0,d);if("http"===a&&
	"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c};var di=window.console;$g(O.location.href,"rpctoken")&&fh(Lg,"unload",function(){},"add","at");var ei=ei||{};ei=ei||{};
	(function(){var a=null;ei.Ae=function(b){var c="undefined"===typeof b;if(null!==a&&c)return a;var d={};b=b||window.location.href;var e=b.indexOf("?"),f=b.indexOf("#");b=(-1===f?b.substr(e+1):[b.substr(e+1,f-e-1),"&",b.substr(f+1)].join("")).split("&");for(var e=window.decodeURIComponent?decodeURIComponent:unescape,f=0,g=b.length;f<g;++f){var k=b[f].indexOf("=");if(-1!==k){var l=b[f].substring(0,k),k=b[f].substring(k+1),k=k.replace(/\+/g," ");try{d[l]=e(k)}catch(q){}}}c&&(a=d);return d};ei.Ae()})();N("gadgets.util.getUrlParameters",ei.Ae);var gi=function(a){this.sd=a;this.Ba=O;this.Le=this.Ng;this.Wg=/MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent);if(this.sd.bg){this.Ba=this.sd.Bf(this.Ba,this.sd.bg);a=this.Ba.document;var b=a.createElement("script");b.setAttribute("type","text/javascript");b.text="window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};";a.body.appendChild(b);this.Le=this.Ba.doPostMsg}this.Ze={};this.df={};a=r(this.eh,this);fh(this.Ba,"message",a,"add","at");Ng(hh,"RPMQ",[]).push(a);
	if(this.Ba!=this.Ba.parent){a=this.Ba.parent;var b="{h:'"+escape(this.Ba.name)+"'}",c=fi(b)?"":"!_";this.Le(a,c+b,"*")}},hi=function(a){var b=null;0===a.indexOf("{h:'")&&a.indexOf("'}")===a.length-2&&(b=unescape(a.substring(4,a.length-2)));return b},fi=function(a){if(!/^\s*{/.test(a))return!1;a=Nh(a);return null!==a&&"object"===typeof a&&!!a.g};
	gi.prototype.eh=function(a){var b=String(a.data),c=0!==b.indexOf("!_");c||(b=b.substring(2));var d=fi(b);if(!c&&!d){if(!d&&(c=hi(b))){if(this.Ze[c])this.Ze[c]();else this.df[c]=1;return}var e=a.origin,f=this.sd.Og;this.Wg?O.setTimeout(function(){f(b,e)},0):f(b,e)}};gi.prototype.lg=function(a,b){".."===a||this.df[a]?(b(),delete this.df[a]):this.Ze[a]=b};gi.prototype.Ng=function(a,b,c){a.postMessage(b,c)};
	gi.prototype.send=function(a,b,c){if((a=this.sd.Bf(this.Ba,a))&&!a.closed){var d=fi(b)?"":"!_";this.Le(a,d+b,c)}};var ii=0,ji=[],ki={},li={},mi=ei.Ae,ni=mi(),oi=ni.rpctoken,pi=ni.parent||Lg.referrer,qi=ni.rly,ri=qi||(O!==O.top||O.opener)&&O.name||"..",si=null,ti={},ui=function(){},vi={send:ui,lg:ui},wi=function(a,b){"/"==b.charAt(0)&&(b=b.substring(1),a=O.top);for(var c=b.split("/");c.length;){var d;d=c.shift();"{"==d.charAt(0)&&"}"==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(".."===d)a=a==a.parent?a.opener:a.parent;else if(".."!==d&&a.frames[d]){if(a=a.frames[d],!("postMessage"in a))throw"Not a window";
	}else return null}return a},xi=function(a){return(a=ki[a])&&a.ae},yi=function(a){if(a.f in{})return!1;var b=a.t,c=ki[a.r];a=a.origin;return c&&(c.ae===b||!c.ae&&!b)&&(a===c.origin||"*"===c.origin)},zi=function(a){var b=a.id.split("/"),c=b[b.length-1],d=a.origin;return function(a){var b=a.origin;return a.f==c&&(d==b||"*"==d)}},Ci=function(a,b,c){a=Ai(a);li[a.name]={Oc:b,$c:a.$c,Ia:c||yi};Bi()},Di={},Ei=function(a,b){var c=Di["_"+a];c&&c[1](this)&&c[0].call(this,b)},Gi=function(a){var b=a.c;if(!b)return ui;
	var c=a.r,d=a.g?"legacy__":"";return function(){var a=[].slice.call(arguments,0);a.unshift(c,d+"__cb",null,b);Fi.apply(null,a)}},Hi=function(a){si=a},Ji=function(a){ti[a]||(ti[a]=O.setTimeout(function(){ti[a]=!1;Ii(a)},0))},Ii=function(a){var b=ki[a];if(b&&b.ready){var c=b.Oe;for(b.Oe=[];c.length;)vi.send(a,Mh(c.shift()),b.origin)}},Ai=function(a){return 0===a.indexOf("legacy__")?{name:a.substring(8),$c:!0}:{name:a,$c:!1}},Bi=function(){for(var a=ph("rpc/residenceSec")||60,b=(new Date).getTime()/
	1E3,c=0,d;d=ji[c];++c){var e=d.Rh;if(!e||0<a&&b-d.timestamp>a)ji.splice(c,1),--c;else{var f=e.s,g=li[f]||li["*"];if(g&&(ji.splice(c,1),--c,e.origin=d.origin,d=Gi(e),e.callback=d,g.Ia(e))){if("__cb"!==f&&!!g.$c!=!!e.g)break;e=g.Oc.apply(e,e.a);void 0!==e&&d(e)}}}},Ki=function(a,b,c){ji.push({Rh:a,origin:b,timestamp:(new Date).getTime()/1E3});c||Bi()},Li=function(a,b){var c=Nh(a);Ki(c,b,!1)},Mi=function(a){for(;a.length;)Ki(a.shift(),this.origin,!0);Bi()},Ni=function(a){var b=!1;a=a.split("|");var c=
	a[0];0<=c.indexOf("/")&&(b=!0);return{id:c,origin:a[1]||"*",Fe:b}},Oi=function(a,b,c,d){var e=Ni(a);d&&(O.frames[e.id]=O.frames[e.id]||d);a=e.id;if(!ki.hasOwnProperty(a)){c=c||null;d=e.origin;if(".."===a)d=ci(pi),c=c||oi;else if(!e.Fe){var f=Lg.getElementById(a);f&&(f=f.src,d=ci(f),c=c||mi(f).rpctoken)}"*"===e.origin&&d||(d=e.origin);ki[a]={ae:c,Oe:[],origin:d,Qh:b,ag:function(){var b=a;ki[b].ready=1;Ii(b)}};vi.lg(a,ki[a].ag)}return ki[a].ag},Fi=function(a,b,c,d){a=a||"..";Oi(a);a=a.split("|",1)[0];
	var e=b,f=[].slice.call(arguments,3),g=c,k=ri,l=oi,q=ki[a],S=k,H=Ni(a);if(q&&".."!==a){if(H.Fe){if(!(l=ki[a].Qh)){for(var l=null,l=si?si.substring(1).split("/"):[ri],S=l.length-1,pd=O.parent;pd!==O.top;){var af=pd.parent;if(!S--){for(var Uh=null,Bl=af.frames.length,qd=0;qd<Bl;++qd)af.frames[qd]==pd&&(Uh=qd);l.unshift("{"+Uh+"}")}pd=af}l="/"+l.join("/")}S=l}else S=k="..";l=q.ae}g&&H?(q=yi,H.Fe&&(q=zi(H)),Di["_"+ ++ii]=[g,q],H=ii):H=null;f={s:e,f:k,r:S,t:l,c:H,a:f};e=Ai(e);f.s=e.name;f.g=e.$c;ki[a].Oe.push(f);
	Ji(a)};if("function"===typeof O.postMessage||"object"===typeof O.postMessage)vi=new gi({bg:qi?"../"+qi:null,Og:Li,Bf:wi,oi:ri,getToken:xi,ri:Hi}),Ci("__cb",Ei,function(){return!0}),Ci("_processBatch",Mi,function(){return!0}),Oi("..");var Qi=function(a){this.resolve=this.reject=null;this.promise=new C(r(function(a,c){this.resolve=a;this.reject=c},this));a&&(this.promise=Pi(this.promise,a))},Pi=function(a,b){return a.then(function(a){try{b(a)}catch(d){}return a})};var Ri=Ri||{};Ri.ah=function(){var a=0,b=0;self.innerHeight?(a=self.innerWidth,b=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(a=document.documentElement.clientWidth,b=document.documentElement.clientHeight):document.body&&(a=document.body.clientWidth,b=document.body.clientHeight);return{width:a,height:b}};Ri=Ri||{};
	(function(){function a(a,c){window.getComputedStyle(a,"").getPropertyValue(c).match(/^([0-9]+)/);return parseInt(RegExp.$1,10)}Ri.xf=function(){var b=Ri.ah().height,c=document.body,d=document.documentElement;if("CSS1Compat"===document.compatMode&&d.scrollHeight)return d.scrollHeight!==b?d.scrollHeight:d.offsetHeight;if(0<=navigator.userAgent.indexOf("AppleWebKit")){b=0;for(c=[document.body];0<c.length;){var e=c.shift(),d=e.childNodes;if("undefined"!==typeof e.style){var f=e.style.overflowY;f||(f=
	(f=document.defaultView.getComputedStyle(e,null))?f.overflowY:null);if("visible"!=f&&"inherit"!=f&&(f=e.style.height,f||(f=(f=document.defaultView.getComputedStyle(e,null))?f.height:""),0<f.length&&"auto"!=f))continue}for(e=0;e<d.length;e++){f=d[e];if("undefined"!==typeof f.offsetTop&&"undefined"!==typeof f.offsetHeight)var g=f.offsetTop+f.offsetHeight+a(f,"margin-bottom"),b=Math.max(b,g);c.push(f)}}return b+a(document.body,"border-bottom")+a(document.body,"margin-bottom")+a(document.body,"padding-bottom")}if(c&&
	d)return e=d.scrollHeight,f=d.offsetHeight,d.clientHeight!==f&&(e=c.scrollHeight,f=c.offsetHeight),e>b?e>f?e:f:e<f?e:f}})();var Si,Ti,Ui,Vi;var Wi=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,Xi=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,Yi=function(a){var b=ph("googleapis.config/sessionIndex");null==b&&(b=window.__X_GOOG_AUTHUSER);if(null==b){var c=window.google;c&&(b=c.authuser)}null==b&&(a=a||window.location.href,b=$g(a,"authuser")||null,null==b&&(b=(b=a.match(Wi))?b[1]:null));return null==b?null:String(b)},Zi=function(a){var b=ph("googleapis.config/sessionDelegate");
	null==b&&(b=(a=(a||window.location.href).match(Xi))?a[1]:null);return null==b?null:String(b)};var $i=function(){this.hb=-1};var aj=function(){this.hb=-1;this.hb=64;this.U=[];this.pe=[];this.Ag=[];this.Od=[];this.Od[0]=128;for(var a=1;a<this.hb;++a)this.Od[a]=0;this.de=this.vc=0;this.reset()};t(aj,$i);aj.prototype.reset=function(){this.U[0]=1732584193;this.U[1]=4023233417;this.U[2]=2562383102;this.U[3]=271733878;this.U[4]=3285377520;this.de=this.vc=0};
	var bj=function(a,b,c){c||(c=0);var d=a.Ag;if(n(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.U[0];c=a.U[1];for(var g=a.U[2],k=a.U[3],l=a.U[4],q,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),q=1518500249):(f=c^g^k,q=1859775393):60>e?(f=c&g|k&(c|g),q=2400959708):(f=c^g^k,q=3395469782),
	f=(b<<5|b>>>27)+f+l+q+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.U[0]=a.U[0]+b&4294967295;a.U[1]=a.U[1]+c&4294967295;a.U[2]=a.U[2]+g&4294967295;a.U[3]=a.U[3]+k&4294967295;a.U[4]=a.U[4]+l&4294967295};
	aj.prototype.update=function(a,b){if(null!=a){ba(b)||(b=a.length);for(var c=b-this.hb,d=0,e=this.pe,f=this.vc;d<b;){if(0==f)for(;d<=c;)bj(this,a,d),d+=this.hb;if(n(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.hb){bj(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.hb){bj(this,e);f=0;break}}this.vc=f;this.de+=b}};
	aj.prototype.digest=function(){var a=[],b=8*this.de;56>this.vc?this.update(this.Od,56-this.vc):this.update(this.Od,this.hb-(this.vc-56));for(var c=this.hb-1;56<=c;c--)this.pe[c]=b&255,b/=256;bj(this,this.pe);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.U[c]>>d&255,++b;return a};var cj=function(){this.Ye=new aj};cj.prototype.reset=function(){this.Ye.reset()};var dj=O.crypto,ej=!1,fj=0,gj=0,hj=1,ij=0,jj="",kj=function(a){a=a||O.event;var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date).getTime()%1E6*b;hj=hj*b%ij;0<fj&&++gj==fj&&fh(O,"mousemove",kj,"remove","de")},lj=function(a){var b=new cj;a=unescape(encodeURIComponent(a));for(var c=[],d=0,e=a.length;d<e;++d)c.push(a.charCodeAt(d));b.Ye.update(c);b=b.Ye.digest();a="";for(c=0;c<b.length;c++)a+="0123456789ABCDEF".charAt(Math.floor(b[c]/16))+"0123456789ABCDEF".charAt(b[c]%16);return a},ej=
	!!dj&&"function"==typeof dj.getRandomValues;ej||(ij=1E6*(screen.width*screen.width+screen.height),jj=lj(Lg.cookie+"|"+Lg.location+"|"+(new Date).getTime()+"|"+Math.random()),fj=ph("random/maxObserveMousemove")||0,0!=fj&&fh(O,"mousemove",kj,"add","at"));var mj=function(){var a=hj,a=a+parseInt(jj.substr(0,20),16);jj=lj(jj);return a/(ij+Math.pow(16,20))},nj=function(){var a=new O.Uint32Array(1);dj.getRandomValues(a);return Number("0."+a[0])};var oj=function(){var a=hh.onl;if(!a){a=R();hh.onl=a;var b=R();a.e=function(a){var d=b[a];d&&(delete b[a],d())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},pj=function(a,b){var c=b.onload;return"function"===typeof c?(oj().a(a,c),c):null},qj=function(a){P(/^\w+$/.test(a),"Unsupported id - "+a);oj();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},rj=function(a){oj().r(a)};var sj={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},tj={allowtransparency:!0,onload:!0},uj=0,vj=function(a,b){return a?b+"/"+a:""},wj=function(a){P(!a||eh.test(a),"Illegal url for new iframe - "+a)},xj=function(a,b,c,d,e){wj(c.src);var f,g=pj(d,c),k=g?qj(d):"";try{document.all&&(f=a.createElement('<iframe frameborder="'+Xg(String(c.frameborder))+'" scrolling="'+Xg(String(c.scrolling))+'" '+k+' name="'+
	Xg(String(c.name))+'"/>'))}catch(q){}finally{f||(f=a.createElement("iframe"),g&&(f.onload=function(){f.onload=null;g.call(this)},rj(d)))}for(var l in c)a=c[l],"style"===l&&"object"===typeof a?Yg(a,f.style):tj[l]||f.setAttribute(l,String(a));(l=e&&e.beforeNode||null)||e&&e.dontclear||gh(b);b.insertBefore(f,l);f=l?l.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var yj=/^:[\w]+$/,zj=/:([a-zA-Z_]+):/g,Aj=function(a,b){var c=Yi()||"0",d=Zi(),e;e=Yi(void 0)||c;var f=Zi(void 0),g="";e&&(g+="u/"+e+"/");f&&(g+="b/"+f+"/");e=g||null;(g=(f=!1===ph("isLoggedIn"))?"_/im/":"")&&(e="");var k=ph("iframes/:socialhost:"),l=ph("iframes/:im_socialhost:");Si={socialhost:k,ctx_socialhost:f?l:k,session_index:c,session_delegate:d,session_prefix:e,im_prefix:g};return Si[b]||""},Bj=function(a){var b=a;yj.test(a)&&(b=ph("iframes/"+b.substring(1)+"/url"),P(!!b,"Unknown iframe url config for - "+
	a));a=b.replace(zj,Aj);b="";2E3<a.length&&(b=a.substring(2E3),a=a.substring(0,2E3));var c=Lg.createElement("div"),d=Lg.createElement("a");d.href=a;c.appendChild(d);c.innerHTML=c.innerHTML;a=String(c.firstChild.href);c.parentNode&&c.parentNode.removeChild(c);return a+b},Cj=function(a,b,c){var d=c||{};c=d.attributes||{};P(!d.allowPost||!c.onload,"onload is not supported by post iframe");a=Bj(a);c=b.ownerDocument||Lg;var e,f=0;do e=d.id||["I",uj++,"_",(new Date).getTime()].join("");while(c.getElementById(e)&&
	5>++f);P(5>f,"Error creating iframe id");var g=a;a={};f={};c.documentMode&&9>c.documentMode&&(a.hostiemode=c.documentMode);Yg(d.queryParams||{},a);Yg(d.fragmentParams||{},f);var k=d.connectWithQueryParams?a:f,l=d.pfname,q=R();q.id=e;q.parent=c.location.protocol+"//"+c.location.host;var S=$g(c.location.href,"parent"),l=l||"";!l&&S&&(l=vj($g(c.location.href,"id",""),$g(c.location.href,"pfname","")));q.pfname=l;Yg(q,k);(q=$g(g,"rpctoken")||a.rpctoken||f.rpctoken)||(q=k.rpctoken=d.rpctoken||String(Math.round(1E8*
	(ej?nj():mj()))));d.rpctoken=q;q=c.location.href;k=R();(S=$g(q,"_bsh",hh.bsh))&&(k._bsh=S);(q=hh.dpo?hh.h:$g(q,"jsh",hh.h))&&(k.jsh=q);d.hintInFragment?Yg(k,f):Yg(k,a);k=d.paramsSerializer;g=bh(g);g.query.push.apply(g.query,dh(a,k));g.zd.push.apply(g.zd,dh(f,k));a=ch(g);g=R();Yg(sj,g);Yg(d.attributes,g);g.name=g.id=e;g.src=a;d.eurl=a;if((d||{}).allowPost&&2E3<a.length){f=bh(a);g.src="";g["data-postorigin"]=a;a=xj(c,b,g,e);var H;-1!=navigator.userAgent.indexOf("WebKit")&&(H=a.contentWindow.document,
	H.open(),g=H.createElement("div"),k={},q=e+"_inner",k.name=q,k.src="",k.style="display:none",xj(c,g,k,q,d));g=(d=f.query[0])?d.split("&"):[];d=[];for(k=0;k<g.length;k++)q=g[k].split("=",2),d.push([decodeURIComponent(q[0]),decodeURIComponent(q[1])]);f.query=[];g=ch(f);P(eh.test(g),"Invalid URL: "+g);f=c.createElement("form");f.action=g;f.method="POST";f.target=e;f.style.display="none";for(e=0;e<d.length;e++)g=c.createElement("input"),g.type="hidden",g.name=d[e][0],g.value=d[e][1],f.appendChild(g);
	b.appendChild(f);f.submit();f.parentNode.removeChild(f);H&&H.close();b=a}else b=xj(c,b,g,e,d);return b};var U=function(a){this.b=a||{}};t(U,th);var Dj=function(a,b){a.b.frameName=b;return a};U.prototype.ha=function(){return this.b.frameName};var Ej=function(a,b){a.b.rpcAddr=b;return a};U.prototype.sc=function(){return this.b.rpcAddr};var Fj=function(a,b){a.b.retAddr=b;return a},Gj=function(a){return a.b.retAddr},Hj=function(a,b){a.b.origin=b;return a};U.prototype.Na=function(){return this.b.origin};U.prototype.vb=function(a){this.b.setRpcReady=a;return this};U.prototype.Tc=function(){return this.b.setRpcReady};
	var Ij=function(a,b){a.b.context=b},Jj=function(a,b){a.b._rpcReadyFn=b};U.prototype.Eb=function(){return this.b.iframeEl};var Kj=/^[\w\.\-]*$/,Lj=function(a){return a.Wa===a.getContext().Wa},Mj=function(){return!0},Oj=function(a,b,c){return function(d){if(!b.wa()){P(this.origin===b.Wa,"Wrong origin "+this.origin+" != "+b.Wa);var e=this.callback;d=Nj(a,d,b);!c&&0<d.length&&Ed(d).then(e)}}},Nj=function(a,b,c){a=Ti[a];if(!a)return[];for(var d=[],e=0;e<a.length;e++)d.push(D(a[e].call(c,b,c)));return d},Pj=function(a,b,c){P("_default"!=a,"Cannot update default api");Ui[a]={map:b,filter:c}},Qj=function(a,b){Ng(Ui,"_default",
	{map:{},filter:Mj}).map[a]=b;Rg(Vi.ra,function(c){c.register(a,b,Mj)})},V=function(a){a=a||{};this.La=!1;this.Vf=R();this.ra=R();this.Ba=a._window||O;this.Lb=this.Ba.location.href;this.Wf=(this.Xf=$g(this.Lb,"parent",""))?$g(this.Lb,"pfname",""):"";this.mb=this.Xf?$g(this.Lb,"id",""):"";this.Ea=vj(this.mb,this.Wf);this.Wa=ci(this.Lb);if(this.mb){var b=new U;Ej(b,a._parentRpcAddr||"..");Fj(b,a._parentRetAddr||this.mb);Hj(b,ci($g(this.Lb,"parent",this.Lb)));Dj(b,this.Wf);this.T=Rj(this,b.value())}else this.T=
	null};h=V.prototype;h.wa=function(){return this.La};h.Sa=function(){if(!this.wa()){for(var a=0;a<this.ra.length;a++)this.ra[a].Sa();this.La=!0}};h.ha=function(){return this.Ea};h.Rb=function(){return this.Ba};h.Ve=function(a,b){this.Vf[a]=b};h.xe=function(a){return this.Vf[a]};
	var Rj=function(a,b){P(!a.wa(),"Cannot attach iframe in disposed context");var c=new U(b);c.sc()||Ej(c,c.qc());Gj(c)||Fj(c,"..");c.Na()||Hj(c,ci(c.getUrl()));c.ha()||Dj(c,vj(c.qc(),a.Ea));var d=c.ha();if(a.ra[d])return a.ra[d];var e=c.sc(),f=e;c.Na()&&(f=e+"|"+c.Na());var g=Gj(c),k=c.tc();k||(k=(k=c.Eb())&&(k.getAttribute("data-postorigin")||k.src)||c.getUrl(),k=$g(k,"rpctoken"));Jj(c,Oi(f,g,k,c.b._popupWindow));f=((window.gadgets||{}).rpc||{}).setAuthToken;k&&f&&f(e,k);var l=new W(a,e,d,c),q=c.b.messageHandlersFilter;
	Rg(c.b.messageHandlers,function(a,b){l.register(b,a,q)});c.Tc()&&l.vb();X(l,"_g_rpcReady");return l};V.prototype.Se=function(a){Dj(a,null);var b=a.qc();!b||Kj.test(b)&&!this.Rb().document.getElementById(b)||(di&&di.log&&di.log("Ignoring requested iframe ID - "+b),a.b.id=null)};
	V.prototype.Rf=function(a){P(!this.wa(),"Cannot open iframe in disposed context");var b=new U(a);Sj(this,b);var c=b.ha();if(c&&this.ra[c])return this.ra[c];this.Se(b);c=b.getUrl();P(c,"No url for new iframe");var d=b.b.queryParams||{};d.usegapi="1";b.b.queryParams=d;d=this.kh&&this.kh(c,b);d||(d=b.b.where,P(!!d,"No location for new iframe"),c=Cj(c,d,a),b.b.iframeEl=c,d=c.getAttribute("id"));Ej(b,d).b.id=d;Hj(b,ci(b.b.eurl||""));this.yh&&this.yh(b,b.Eb());c=Rj(this,a);c.kg&&c.kg(c,a);(a=b.b.onCreate)&&
	a(c);b.b.disableRelayOpen||c.Mc("_open");return c};
	var Tj=function(a,b,c){var d=b.b.canvasUrl;if(!d)return c;P(!b.b.allowPost,"Post is not supported when using canvas url");var e=b.getUrl();P(e&&ci(e)===a.Wa&&ci(d)===a.Wa,"Wrong origin for canvas or hidden url "+d);b.setUrl(d);b.b.waitForOnload=!0;b.b.canvasUrl=null;return function(a){var b=a.Rb(),d=b.location.hash,d=Bj(e)+(/#/.test(e)?d.replace(/^#/,"&"):d);b.location.replace(d);c&&c(a)}},Vj=function(a,b,c){var d=b.b.relayOpen;if(d){var e=a.Sc();d instanceof W?(e=d,b.b.relayOpen=0):0<Number(d)&&
	(b.b.relayOpen=Number(d)-1);if(e){P(!!e.Sf,"Relaying iframe open is disabled");if(d=b.Cd())if(d=Uj[d])Ij(b,a),d(b.value()),Ij(b,null);b.b.openerIframe=null;c.resolve(e.Sf(b));return!0}}return!1},Zj=function(a,b,c){var d=b.Cd();if(d)if(P(!!Wj,"Defer style is disabled, when requesting style "+d),Xj[d])Sj(a,b);else return Yj(d,function(){P(!!Xj[d],"Fail to load style - "+d);c.resolve(a.open(b.value()))}),!0;return!1};
	V.prototype.open=function(a,b){P(!this.wa(),"Cannot open iframe in disposed context");var c=new U(a),d=Tj(this,c,b),e=new Qi(d);(d=c.getUrl())&&c.setUrl(Bj(d));if(Vj(this,c,e)||Zj(this,c,e)||Vj(this,c,e))return e.promise;var f;if(null!=yh(c)){var g=setTimeout(function(){f.Eb().src="about:blank";e.reject({timeout:"Exceeded time limit of :"+yh(c)+"milliseconds"})},yh(c)),k=e.resolve;e.resolve=function(a){clearTimeout(g);k(a)}}c.b.waitForOnload&&sh(xh(c),function(){e.resolve(f)});f=this.Rf(a);c.b.waitForOnload||
	e.resolve(f);return e.promise};V.prototype.Sc=function(){return this.T};var W=function(a,b,c,d){this.La=!1;this.Ca=a;this.Fc=b;this.Ea=c;this.va=d;this.Vd=Gj(this.va);this.Wa=this.va.Na();this.nh=this.va.Eb();this.mg=this.va.b.where;this.Bc=[];this.Mc("_default");a=this.va.Pc()||[];for(b=0;b<a.length;b++)this.Mc(a[b]);this.Ca.ra[c]=this};h=W.prototype;h.wa=function(){return this.La};
	h.Sa=function(){if(!this.wa()){for(var a=0;a<this.Bc.length;a++)this.unregister(this.Bc[a]);delete Vi.ra[this.ha()];this.La=!0}};h.getContext=function(){return this.Ca};h.sc=function(){return this.Fc};h.ha=function(){return this.Ea};h.Eb=function(){return this.nh};h.$g=function(){return this.mg};h.ai=function(a){this.mg=a};h.vb=function(){(0,this.va.b._rpcReadyFn)()};h.Zh=function(a,b){this.va.value()[a]=b};h.Yg=function(a){return this.va.value()[a]};h.qc=function(){return this.va.qc()};h.Na=function(){return this.Wa};
	h.register=function(a,b,c){P(!this.wa(),"Cannot register handler on disposed iframe "+a);P((c||Lj)(this),"Rejecting untrusted message "+a);c=this.Ea+":"+this.Ca.Ea+":"+a;1==Ng(Ti,c,[]).push(b)&&(this.Bc.push(a),Ci(c,Oj(c,this,"_g_wasClosed"===a)))};h.unregister=function(a,b){var c=this.Ea+":"+this.Ca.Ea+":"+a,d=Ti[c];if(d){if(b){var e=Pg.call(d,b);0<=e&&d.splice(e,1)}else d.splice(0,d.length);0==d.length&&(e=Pg.call(this.Bc,a),0<=e&&this.Bc.splice(e,1),delete li[Ai(c).name])}};h.Zg=function(){return this.Bc};
	h.Mc=function(a){this.ke=this.ke||[];if(!(0<=Pg.call(this.ke,a))){this.ke.push(a);a=Ui[a]||{map:{}};for(var b in a.map)Q(a.map,b)&&this.register(b,a.map[b],a.filter)}};h.send=function(a,b,c,d){P(!this.wa(),"Cannot send message to disposed iframe - "+a);P((d||Lj)(this),"Wrong target for message "+a);c=new Qi(c);Fi(this.Fc,this.Ca.Ea+":"+this.Ea+":"+a,c.resolve,b);return c.promise};var X=function(a,b,c,d){return a.send(b,c,d,Mj)};W.prototype.Gh=function(a){return a};
	W.prototype.ping=function(a,b){return X(this,"_g_ping",b,a)};Ti=R();Ui=R();Vi=new V;Qj("_g_rpcReady",W.prototype.vb);Qj("_g_discover",W.prototype.Zg);Qj("_g_ping",W.prototype.Gh);var Xj=R(),Uj=R(),Wj=function(a){return Xj[a]},Yj=function(a,b){Zg.load("gapi.iframes.style."+a,b)},Sj=function(a,b){var c=b.Cd();if(c){b.Xe(null);var d=Xj[c];P(d,"No such style: "+c);Ij(b,a);d(b.value());Ij(b,null)}};var ak={height:!0,width:!0},bk=/^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i,ck=function(a){"number"===typeof a&&(a=String(a)+"px");return a};W.prototype.Rb=function(){if(!Lj(this))return null;var a=this.va.b._popupWindow;if(a)return a;for(var b=this.Fc.split("/"),a=this.getContext().Rb(),c=0;c<b.length&&a;c++)var d=b[c],a=".."===d?a==a.parent?a.opener:a.parent:a.frames[d];return a};
	var dk=function(a,b){var c=a.Sc(),d=!0;b.filter&&(d=b.filter.call(b.Fd,b.params));return D(d).then(function(d){return d&&c?(b.Uf&&b.Uf.call(a,b.params),d=b.sender?b.sender(b.params):X(c,b.message,b.params),b.ii?d.then(function(){return!0}):!0):!1})};
	V.prototype.qf=function(a,b,c){a=dk(this,{sender:function(a){var b=Vi.Sc();Rg(Vi.ra,function(c){c!==b&&X(c,"_g_wasClosed",a)});return X(b,"_g_closeMe",a)},message:"_g_closeMe",params:a,Fd:c,filter:this.xe("onCloseSelfFilter")});b=new Qi(b);b.resolve(a);return b.promise};V.prototype.eg=function(a,b,c){a=a||{};b=new Qi(b);b.resolve(dk(this,{message:"_g_restyleMe",params:a,Fd:c,filter:this.xe("onRestyleSelfFilter"),ii:!0,Uf:this.hi}));return b.promise};
	V.prototype.hi=function(a){"auto"===a.height&&(a.height=Ri.xf())};var ek=function(a){var b={};if(a)for(var c in a)Q(a,c)&&Q(ak,c)&&bk.test(a[c])&&(b[c]=a[c]);return b};h=W.prototype;h.close=function(a,b){return X(this,"_g_close",a,b)};h.dg=function(a,b){return X(this,"_g_restyle",a,b)};h.Mh=function(a,b){return X(this,"_g_restyleDone",a,b)};h.Fg=function(a){return this.getContext().qf(a,void 0,this)};h.Oh=function(a){if(a&&"object"===typeof a)return this.getContext().eg(a,void 0,this)};
	h.Ph=function(a){var b=this.va.b.onRestyle;b&&b.call(this,a,this);a=a&&"object"===typeof a?ek(a):{};(b=this.Eb())&&a&&"object"===typeof a&&(Q(a,"height")&&(a.height=ck(a.height)),Q(a,"width")&&(a.width=ck(a.width)),Yg(a,b.style))};
	h.Gg=function(a){var b=this.va.b.onClose;b&&b.call(this,a,this);this.Eg&&this.Eg()||(b=this.Eb())&&b.parentNode&&b.parentNode.removeChild(b);if(b=this.va.b.controller){var c={};c.frameName=this.ha();X(b,"_g_disposeControl",c)}Nj(this.Ea+":"+this.Ca.Ea+":_g_wasClosed",a,this)};V.prototype.Yh=function(a){this.Ve("onCloseSelfFilter",a)};V.prototype.$h=function(a){this.Ve("onRestyleSelfFilter",a)};W.prototype.Jh=function(a,b){this.register("_g_wasRestyled",a,b)};
	W.prototype.Ih=function(a,b){this.register("_g_wasClosed",a,b)};W.prototype.ji=function(){delete this.getContext().ra[this.ha()];this.getContext().Rb().setTimeout(r(function(){this.Sa()},this),0)};Qj("_g_close",W.prototype.Fg);Qj("_g_closeMe",W.prototype.Gg);Qj("_g_restyle",W.prototype.Oh);Qj("_g_restyleMe",W.prototype.Ph);Qj("_g_wasClosed",W.prototype.ji);var fk=/^https?:\/\/[^\/%\\?#\s]+$/i,gk={longdesc:!0,name:!0,src:!0,frameborder:!0,marginwidth:!0,marginheight:!0,scrolling:!0,align:!0,height:!0,width:!0,id:!0,"class":!0,title:!0,tabindex:!0,hspace:!0,vspace:!0,allowtransparency:!0},hk=function(a,b,c){var d=a.Fc,e=b.Vd;Fj(Ej(c,a.Vd+"/"+b.Fc),e+"/"+d);Hj(Dj(c,b.ha()),b.Wa)};
	V.prototype.Ig=function(a,b){var c=new T(a),d=new T(b),e=c.Tc(),f=c.getIframe(),g=d.getIframe();if(g){var k=c.tc(),l=new U;hk(f,g,l);Ah(zh((new T(l.value())).Zb(k),c.b.role),c.b.data).vb(e);var q=new U;hk(g,f,q);Ah(zh((new T(q.value())).Zb(k),d.b.role),d.b.data).vb(!0);X(f,"_g_connect",l.value(),function(){e||X(g,"_g_connect",q.value())});e&&X(g,"_g_connect",q.value())}else d={},Ah(zh(Bh(new T(d)),c.b.role),c.b.data),X(f,"_g_connect",d)};h=W.prototype;
	h.Hg=function(a){var b,c=new U(a);a=new T(c.value());a.b.selfConnect?b=this:(P(fk.test(c.Na()),"Illegal origin for connected iframe - "+c.Na()),b=this.Ca.ra[c.ha()],b)?c.Tc()&&(b.vb(),X(b,"_g_rpcReady")):(c=Dj(Hj(Fj(Ej((new U).Zb(c.tc()),c.sc()),Gj(c)),c.Na()),c.ha()).vb(c.Tc()),b=Rj(this.Ca,c.value()));var c=this.Ca,d=a.b.role;a=a.b.data;ik(c);d=d||"";Ng(c.re,d,[]).push({Fd:b.ha(),data:a});jk(b,a,c.He[d])};
	h.kg=function(a,b){if(!(new U(b)).b._relayedDepth){var c={};Bh(zh(new T(c),"_opener"));X(a,"_g_connect",c)}};h.Sf=function(a){var b=this,c=a.b.messageHandlers,d=a.b.messageHandlersFilter,e=a.b.onClose;wh(vh(uh(a,null),null),null);Gd();return X(this,"_g_open",a.value()).then(function(f){var g=new U(f[0]),k=g.ha();f=new U;var l=b.Vd,q=Gj(g);Fj(Ej(f,b.Fc+"/"+g.sc()),q+"/"+l);Dj(f,k);Hj(f,g.Na());f.md(g.Pc());f.Zb(a.tc());uh(f,c);vh(f,d);wh(f,e);(g=b.Ca.ra[k])||(g=Rj(b.Ca,f.value()));return g})};
	h.Se=function(a){var b=a.getUrl();P(!b||eh.test(b),"Illegal url for new iframe - "+b);var c=xh(a).value(),b={},d;for(d in c)Q(c,d)&&Q(gk,d)&&(b[d]=c[d]);Q(c,"style")&&(d=c.style,"object"===typeof d&&(b.style=ek(d)));a.value().attributes=b};
	h.Eh=function(a){a=new U(a);this.Se(a);var b=a.b._relayedDepth||0;a.b._relayedDepth=b+1;a.b.openerIframe=this;Gd();var c=a.tc();a.Zb(null);return this.Ca.open(a.value()).then(r(function(a){var e=(new U(a.va.value())).Pc(),f=new U;hk(a,this,f);0==b&&zh(new T(f.value()),"_opener");f.vb(!0);f.Zb(c);X(a,"_g_connect",f.value());f=new U;Hj(Dj(Fj(Ej(f.md(e),a.sc()),a.Vd),a.ha()),a.Na());return f.value()},this))};var ik=function(a){a.re||(a.re=R(),a.He=R())};
	V.prototype.ff=function(a,b,c,d){ik(this);"object"===typeof a?(b=new Ch(a),c=b.b.role||""):(b=Fh(Eh(Dh(a),b).md(c),d),c=a);d=this.re[c]||[];a=!1;for(var e=0;e<d.length&&!a;e++)jk(this.ra[d[e].Fd],d[e].data,[b]),a=b.b.runOnce;c=Ng(this.He,c,[]);a||b.b.dontWait||c.push(b)};V.prototype.Kh=function(a,b){var c=Ng(this.He,a,[]);if(b)for(var d=0,e=!1;!e&&d<c.length;d++)c[d].Vc===b&&(e=!0,c.splice(d,1));else c.splice(0,c.length)};
	var jk=function(a,b,c){c=c||[];for(var d=0;d<c.length;d++){var e=c[d];if(e&&a){var f=e.b.filter||Lj;if(a&&f(a)){for(var f=e.Pc()||[],g=0;g<f.length;g++)a.Mc(f[g]);e.b.handler&&(0,e.b.handler)(a,b);e.b.runOnce&&(c.splice(d,1),--d)}}}};V.prototype.hf=function(a,b,c){this.ff(Gh(Fh(Eh(Dh("_opener"),a).md(b),c)).value())};W.prototype.Nh=function(a){this.getContext().hf(function(b){b.send("_g_wasRestyled",a,void 0,Mj)},null,Mj)};var kk=Vi.Sc();kk&&kk.register("_g_restyleDone",W.prototype.Nh,Mj);
	Qj("_g_connect",W.prototype.Hg);var lk={};lk._g_open=W.prototype.Eh;Pj("_open",lk,Mj);N("gapi.iframes.create",Cj);N("gapi.iframes.registerStyle",function(a,b){Xj[a]=b});N("gapi.iframes.registerBeforeOpenStyle",function(a,b){Uj[a]=b});N("gapi.iframes.getStyle",Wj);N("gapi.iframes.getBeforeOpenStyle",function(a){return Uj[a]});N("gapi.iframes.registerIframesApi",Pj);N("gapi.iframes.registerIframesApiHandler",function(a,b,c){P("_default"!=a,"Cannot update default api");Ng(Ui,a,{map:{},filter:Lj}).map[b]=c});N("gapi.iframes.getContext",function(){return Vi});N("gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER",Lj);
	N("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER",Mj);N("gapi.iframes.makeWhiteListIframesFilter",function(a){for(var b=R(),c=0;c<a.length;c++)b[a[c]]=!0;return function(a){return!!b[a.Wa]}});N("gapi.iframes.Context",V);N("gapi.iframes.Context.prototype.isDisposed",V.prototype.wa);N("gapi.iframes.Context.prototype.getWindow",V.prototype.Rb);N("gapi.iframes.Context.prototype.getFrameName",V.prototype.ha);N("gapi.iframes.Context.prototype.getGlobalParam",V.prototype.xe);
	N("gapi.iframes.Context.prototype.setGlobalParam",V.prototype.Ve);N("gapi.iframes.Context.prototype.open",V.prototype.open);N("gapi.iframes.Context.prototype.openChild",V.prototype.Rf);N("gapi.iframes.Context.prototype.getParentIframe",V.prototype.Sc);N("gapi.iframes.Context.prototype.closeSelf",V.prototype.qf);N("gapi.iframes.Context.prototype.restyleSelf",V.prototype.eg);N("gapi.iframes.Context.prototype.setCloseSelfFilter",V.prototype.Yh);
	N("gapi.iframes.Context.prototype.setRestyleSelfFilter",V.prototype.$h);N("gapi.iframes.Iframe",W);N("gapi.iframes.Iframe.prototype.isDisposed",W.prototype.wa);N("gapi.iframes.Iframe.prototype.getContext",W.prototype.getContext);N("gapi.iframes.Iframe.prototype.getFrameName",W.prototype.ha);N("gapi.iframes.Iframe.prototype.getId",W.prototype.qc);N("gapi.iframes.Iframe.prototype.register",W.prototype.register);N("gapi.iframes.Iframe.prototype.unregister",W.prototype.unregister);
	N("gapi.iframes.Iframe.prototype.send",W.prototype.send);N("gapi.iframes.Iframe.prototype.applyIframesApi",W.prototype.Mc);N("gapi.iframes.Iframe.prototype.getIframeEl",W.prototype.Eb);N("gapi.iframes.Iframe.prototype.getSiteEl",W.prototype.$g);N("gapi.iframes.Iframe.prototype.setSiteEl",W.prototype.ai);N("gapi.iframes.Iframe.prototype.getWindow",W.prototype.Rb);N("gapi.iframes.Iframe.prototype.getOrigin",W.prototype.Na);N("gapi.iframes.Iframe.prototype.close",W.prototype.close);
	N("gapi.iframes.Iframe.prototype.restyle",W.prototype.dg);N("gapi.iframes.Iframe.prototype.restyleDone",W.prototype.Mh);N("gapi.iframes.Iframe.prototype.registerWasRestyled",W.prototype.Jh);N("gapi.iframes.Iframe.prototype.registerWasClosed",W.prototype.Ih);N("gapi.iframes.Iframe.prototype.getParam",W.prototype.Yg);N("gapi.iframes.Iframe.prototype.setParam",W.prototype.Zh);N("gapi.iframes.Iframe.prototype.ping",W.prototype.ping);N("gapi.iframes.Context.prototype.addOnConnectHandler",V.prototype.ff);N("gapi.iframes.Context.prototype.removeOnConnectHandler",V.prototype.Kh);N("gapi.iframes.Context.prototype.addOnOpenerHandler",V.prototype.hf);N("gapi.iframes.Context.prototype.connectIframes",V.prototype.Ig);var mk=function(a){this.Lb=a;this.Ce=null;this.Ch=this.Nd()},nk=function(a){var b=new th;b.b.where=document.body;b.setUrl(a.Lb);vh(b,Mj);xh(b).Xe({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.b.dontclear=!0;return b};mk.prototype.Nd=function(){var a=this;return new C(function(b){Vi.open(nk(a).value(),function(c){a.Ce=c;a.Ce.dg({setHideOnLeave:!1});b()})})};var ok=function(a,b){a.Ch.then(function(){a.Ce.register("authEvent",b,Mj)})};var qk=function(a,b,c,d){this.Bb=a;this.ma=b;this.ab=c;d=this.Nb=d||null;a=tf(a,"/__/auth/iframe");sf(a,"apiKey",b);sf(a,"appName",c);d&&sf(a,"v",d);this.oh=a.toString();this.ph=new mk(this.oh);this.le=[];pk(this)},rk=function(a,b,c,d,e,f,g,k,l){a=tf(a,"/__/auth/handler");sf(a,"apiKey",b);sf(a,"appName",c);sf(a,"authType",d);sf(a,"providerId",e);f&&f.length&&sf(a,"scopes",f.join(","));g&&sf(a,"redirectUrl",g);k&&sf(a,"eventId",k);l&&sf(a,"v",l);return a.toString()},pk=function(a){ok(a.ph,function(b){var c=
	{};if(b&&b.authEvent){var d=!1;b=b.authEvent||{};if(b.type){if(c=b.error)var e=(c=b.error)&&(c.name||c.code),c=e?new K(e.substring(5),c.message):null;b=new bg(b.type,b.eventId,b.urlResponse,b.sessionId,c)}else b=null;for(c=0;c<a.le.length;c++)d=a.le[c](b)||d;c={};c.status=d?"ACK":"ERROR";return D(c)}c.status="ERROR";return D(c)})};qk.prototype.ef=function(a){this.le.push(a)};var uk=function(a,b,c){var d=null,e=null;ha(a)?(d=a,e={name:sk(d)}):(e=a,d=tk(a.name));this.code=d;this.ta=e;a="Error "+b+": "+this.getName();c&&(a+=", "+c);u.call(this,a)};t(uk,u);uk.prototype.getName=function(){return this.ta.name};
	var vk={UNKNOWN_ERR:1,NON_TRANSIENT_ERR:2,NOT_FOUND_ERR:3,CONSTRAINT_ERR:4,DATA_ERR:5,NOT_ALLOWED_ERR:6,TRANSACTION_INACTIVE_ERR:7,ABORT_ERR:8,READ_ONLY_ERR:9,mi:10,TIMEOUT_ERR:11,QUOTA_ERR:12,INVALID_ACCESS_ERR:13,INVALID_STATE_ERR:14},wk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).UNKNOWN_ERR,xk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).NOT_FOUND_ERR,yk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).CONSTRAINT_ERR,zk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||
	vk).DATA_ERR,Ak=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).TRANSACTION_INACTIVE_ERR,Bk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).ABORT_ERR,Ck=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).READ_ONLY_ERR,Dk=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).TIMEOUT_ERR,Ek=(m.IDBDatabaseException||m.webkitIDBDatabaseException||vk).QUOTA_ERR,Fk=(m.DOMException||vk).INVALID_ACCESS_ERR,Gk=(m.DOMException||vk).INVALID_STATE_ERR,tk=function(a){switch(a){case "UnknownError":return wk;
	case "NotFoundError":return xk;case "ConstraintError":return yk;case "DataError":return zk;case "TransactionInactiveError":return Ak;case "AbortError":return Bk;case "ReadOnlyError":return Ck;case "TimeoutError":return Dk;case "QuotaExceededError":return Ek;case "InvalidAccessError":return Fk;case "InvalidStateError":return Gk;default:return wk}},sk=function(a){switch(a){case wk:return"UnknownError";case xk:return"NotFoundError";case yk:return"ConstraintError";case zk:return"DataError";case Ak:return"TransactionInactiveError";
	case Bk:return"AbortError";case Ck:return"ReadOnlyError";case Dk:return"TimeoutError";case Ek:return"QuotaExceededError";case Fk:return"InvalidAccessError";case Gk:return"InvalidStateError";default:return"UnknownError"}},Hk=function(a,b){return"error"in a?new uk(a.error,b):"name"in a?new uk({name:sk(a.errorCode)},b):new uk({name:"UnknownError"},b)},Ik=function(a,b){if("name"in a){var c=b+": "+a.message;return new uk(a,c)}if("code"in a){var d=sk(a.code),c=b+": "+a.message;return new uk({name:d},c)}return new uk({name:"UnknownError"},
	b)};var Jk=function(){G.call(this)};t(Jk,G);Jk.prototype.Ob=null;Jk.prototype.next=function(a){if(a)this.Ob["continue"](a);else this.Ob["continue"]()};Jk.prototype.update=function(a){var b="updating via cursor with value ",c=new E,d;try{d=this.Ob.update(a)}catch(e){return b+=Ae(a),F(c,Ik(e,b)),c}d.onsuccess=function(){c.Cb()};d.onerror=function(d){b+=Ae(a);F(c,Hk(d.target,b))};return c};
	Jk.prototype.remove=function(){var a=new E,b;try{b=this.Ob["delete"]()}catch(c){return F(a,Ik(c,"deleting via cursor")),a}b.onsuccess=function(){a.Cb()};b.onerror=function(b){F(a,Hk(b.target,"deleting via cursor"))};return a};
	var Kk=function(a,b,c){var d=new Jk,e;try{var f=b?b.pi():null;e=c?a.openCursor(f,c):a.openCursor(f)}catch(g){throw d.Sa(),Ik(g,a.name);}e.onsuccess=function(a){d.Ob=a.target.result||null;d.Ob?d.dispatchEvent("n"):d.dispatchEvent("c")};e.onerror=function(){d.dispatchEvent("e")};return d};var Lk=function(a){Qb.call(this);this.Be=a;this.u={}};t(Lk,Qb);var Mk=[];Lk.prototype.Va=function(a,b,c,d){fa(b)||(b&&(Mk[0]=b.toString()),b=Mk);for(var e=0;e<b.length;e++){var f=dc(a,b[e],c||this.handleEvent,d||!1,this.Be||this);if(!f)break;this.u[f.key]=f}return this};Lk.prototype.Id=function(a,b,c,d){return Nk(this,a,b,c,d)};var Nk=function(a,b,c,d,e,f){if(fa(c))for(var g=0;g<c.length;g++)Nk(a,b,c[g],d,e,f);else{b=kc(b,c,d||a.handleEvent,e,f||a.Be||a);if(!b)return a;a.u[b.key]=b}return a};
	Lk.prototype.cf=function(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)this.cf(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.Be||this,c=ec(c),d=!!d,b=Ub(a)?a.Rc(b,c,d,e):a?(a=gc(a))?a.Rc(b,c,d,e):null:null,b&&(mc(b),delete this.u[b.key]);return this};Lk.prototype.removeAll=function(){Va(this.u,function(a,b){this.u.hasOwnProperty(b)&&mc(a)},this);this.u={}};Lk.prototype.Ka=function(){Lk.Hc.Ka.call(this);this.removeAll()};
	Lk.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var Ok=function(a){this.Gc=a};Ok.prototype.getName=function(){return this.Gc.name};var Pk=function(a,b,c,d,e){var f=new E,g;try{g=e?a.Gc[b](d,e):a.Gc[b](d)}catch(k){return c+=Ae(d),e&&(c+=", with key "+Ae(e)),F(f,Ik(k,c)),f}g.onsuccess=function(){f.Cb()};g.onerror=function(a){c+=Ae(d);e&&(c+=", with key "+Ae(e));F(f,Hk(a.target,c))};return f};h=Ok.prototype;h.put=function(a,b){return Pk(this,"put","putting into "+this.getName()+" with value",a,b)};
	h.add=function(a,b){return Pk(this,"add","adding into "+this.getName()+" with value ",a,b)};h.remove=function(a){var b=new E,c;try{c=this.Gc["delete"](a)}catch(e){return c="removing from "+this.getName()+" with key "+Ae(a),F(b,Ik(e,c)),b}c.onsuccess=function(){b.Cb()};var d=this;c.onerror=function(c){var f="removing from "+d.getName()+" with key "+Ae(a);F(b,Hk(c.target,f))};return b};
	h.get=function(a){var b=new E,c;try{c=this.Gc.get(a)}catch(e){return c="getting from "+this.getName()+" with key "+Ae(a),F(b,Ik(e,c)),b}c.onsuccess=function(a){b.Cb(a.target.result)};var d=this;c.onerror=function(c){var f="getting from "+d.getName()+" with key "+Ae(a);F(b,Hk(c.target,f))};return b};
	h.getAll=function(a,b){var c=new E,d;try{d=this.openCursor(a,b)}catch(f){return F(c,f),c}var e=[];dc(d,"n",function(){e.push(d.Ob.value);d.next()});kc(d,["e","c"],function(a){d.Sa();"c"==a.type?c.Cb(e):F(c)});return c};h.openCursor=function(a,b){return Kk(this.Gc,a,b)};var Qk=function(a,b){G.call(this);this.rd=a;this.Ja=b;this.Ta=new Lk(this);this.Ta.Va(this.rd,"complete",r(this.dispatchEvent,this,"complete"));this.Ta.Va(this.rd,"abort",r(this.dispatchEvent,this,"abort"));this.Ta.Va(this.rd,"error",this.ue)};t(Qk,G);Qk.prototype.ue=function(a){a.target instanceof uk?this.dispatchEvent({type:"error",target:a.target}):this.dispatchEvent({type:"error",target:Hk(a.target,"in transaction")})};
	Qk.prototype.objectStore=function(a){try{return new Ok(this.rd.objectStore(a))}catch(b){throw Ik(b,"getting object store "+a);}};Qk.prototype.abort=function(){this.rd.abort()};Qk.prototype.Ka=function(){Qk.Hc.Ka.call(this);this.Ta.Sa()};var Rk=function(a){G.call(this);this.Ja=a;this.Ta=new Lk(this);this.Ta.Va(this.Ja,"abort",r(this.dispatchEvent,this,"abort"));this.Ta.Va(this.Ja,"error",this.ue);this.Ta.Va(this.Ja,"versionchange",this.Pg);this.Ta.Va(this.Ja,"close",r(this.dispatchEvent,this,"close"))};t(Rk,G);h=Rk.prototype;h.Nd=!0;h.ue=function(a){this.dispatchEvent({type:"error",errorCode:a.target.errorCode})};h.Pg=function(a){this.dispatchEvent(new Sk(a.oldVersion,a.newVersion))};
	h.close=function(){this.Nd&&(this.Ja.close(),this.Nd=!1)};h.getName=function(){return this.Ja.name};h.Af=function(){return this.Ja.version};h.createObjectStore=function(a,b){try{return new Ok(this.Ja.createObjectStore(a,b))}catch(c){throw Ik(c,"creating object store "+a);}};h.Ka=function(){Rk.Hc.Ka.call(this);this.Ta.Sa()};var Sk=function(a,b){Rb.call(this,"versionchange");this.oldVersion=a;this.newVersion=b};t(Sk,Rb);var Tk=m.indexedDB||m.mozIndexedDB||m.webkitIndexedDB||m.moz_indexedDB,Uk=function(a,b,c){w(ba(b)==ba(c),"opt_version must be passed to goog.db.openDatabase if and only if opt_onUpgradeNeeded is also passed");var d=new E;b=b?Tk.open(a,b):Tk.open(a);b.onsuccess=function(a){a=new Rk(a.target.result);d.Cb(a)};b.onerror=function(b){F(d,Hk(b.target,"opening database "+a))};b.onupgradeneeded=function(a){if(c){var b=new Rk(a.target.result);c(new Sk(a.oldVersion,a.newVersion),b,new Qk(a.target.transaction,
	b))}};b.onblocked=function(){};return d};var Vk=function(a){this.Kd=a};Vk.prototype.set=function(a,b){ba(b)?this.Kd.set(a,vc(b)):this.Kd.remove(a)};Vk.prototype.get=function(a){var b;try{b=this.Kd.get(a)}catch(c){return}if(null!==b)try{return sc(b)}catch(c){throw"Storage: Invalid value was encountered";}};Vk.prototype.remove=function(a){this.Kd.remove(a)};var Wk=function(){};var Xk=function(){};t(Xk,Wk);Xk.prototype.Ma=function(){var a=0;ne(this.Mb(!0),function(b){Da(b);a++});return a};var Yk=function(a){this.Ga=a};t(Yk,Xk);var Zk=function(a){if(!a.Ga)return!1;try{return a.Ga.setItem("__sak","1"),a.Ga.removeItem("__sak"),!0}catch(b){return!1}};h=Yk.prototype;h.set=function(a,b){try{this.Ga.setItem(a,b)}catch(c){if(0==this.Ga.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};h.get=function(a){a=this.Ga.getItem(a);if(!n(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};h.remove=function(a){this.Ga.removeItem(a)};
	h.Ma=function(){return this.Ga.length};h.Mb=function(a){var b=0,c=this.Ga,d=new le;d.next=function(){if(b>=c.length)throw ke;var d=Da(c.key(b++));if(a)return d;d=c.getItem(d);if(!n(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};h.key=function(a){return this.Ga.key(a)};var $k=function(){var a=null;try{a=window.localStorage||null}catch(b){}this.Ga=a};t($k,Yk);var al=function(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.Ga=a};t(al,Yk);var bl="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),Y=function(a,b){return{name:a||"",$a:"a valid string",optional:!!b,Ia:n}},cl=function(a){return{name:a||"",$a:"a valid object",optional:!1,Ia:ia}},dl=function(a,b){return{name:a||"",$a:"a function",optional:!!b,Ia:p}},el=function(){return{name:"",$a:"null",optional:!1,Ia:ea}},fl=function(){return{name:"credential",$a:"a valid credential",optional:!1,Ia:function(a){return!(!a||!a.Bd)}}},gl=function(){return{name:"authProvider",
	$a:"a valid Auth provider",optional:!1,Ia:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},hl=function(a,b,c,d){return{name:c||"",$a:a.$a+" or "+b.$a,optional:!!d,Ia:function(c){return a.Ia(c)||b.Ia(c)}}};var jl=function(a,b){for(var c in b){var d=b[c].name;a[d]=il(d,a[c],b[c].j)}},kl=function(a,b,c,d){a[b]=il(b,c,d)},il=function(a,b,c){if(!c)return b;var d=ll(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var l=!1,q=0;q<c.length;q++)if(c[q].optional)l=!0;else{if(l)throw new K("internal-error","Argument validator encountered a required argument after an optional argument.");k++}l=c.length;if(e.length<k||l<e.length)e="Expected "+(k==l?
	1==k?"1 argument":k+" arguments":k+"-"+l+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(l=c[k].optional&&void 0===e[k],!c[k].Ia(e[k])&&!l){e=c[k];if(0>k||k>=bl.length)throw new K("internal-error","Argument validator received an unsupported number of arguments.");e=bl[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.$a+".";break a}e=null}}if(e)throw new K("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
	b.prototype[e];return a},ll=function(a){a=a.split(".");return a[a.length-1]};var pl=function(a,b,c){var d=(this.Nb=firebase.SDK_VERSION||null)?Cf(this.Nb):null;this.o=new M(b,null,d);this.Tf=ml(this.o);this.Bb=a;this.ma=b;this.ab=c;this.od=[];this.Hf=!1;this.Cg=r(this.bh,this);this.ld=new nl;this.Zf=new ol;this.Jc={};this.Jc.unknown=this.ld;this.Jc.signInViaRedirect=this.ld;this.Jc.linkViaRedirect=this.ld;this.Jc.signInViaPopup=this.Zf;this.Jc.linkViaPopup=this.Zf},ml=function(a){var b=window.location.href;return qg(a).then(function(a){a:{for(var d=(b instanceof df?b.clone():
	new df(b,void 0)).Db,e=0;e<a.length;e++){var f;var g=a[e];f=d;var k=Yc(g);k?f=(f=Yc(f))?k.equals(f):!1:(k=g.split(".").join("\\."),f=(new RegExp("^(.+."+k+"|"+k+")$","i")).test(f));if(f){a=!0;break a}}a=!1}if(!a)throw new K("unauthorized-domain");})},ql=function(a){a.Hf=!0;Af().then(function(){a.mh=new qk(a.Bb,a.ma,a.ab,a.Nb);a.mh.ef(a.Cg)})};pl.prototype.subscribe=function(a){Na(this.od,a)||this.od.push(a);this.Hf||ql(this)};pl.prototype.unsubscribe=function(a){Qa(this.od,function(b){return b==a})};
	pl.prototype.bh=function(a){if(!a)throw new K("invalid-auth-event");for(var b=!1,c=0;c<this.od.length;c++){var d=this.od[c];if(d.pf(a.Kb,a.Pb)){(b=this.Jc[a.Kb])&&b.$f(a,d);b=!0;break}}a=this.ld;a.Pe||(a.Pe=!0,rl(a,!1,null,null));return b};pl.prototype.getRedirectResult=function(){return this.ld.getRedirectResult()};
	var tl=function(a,b,c,d,e){return b?a.Tf.then(function(){sl(d);var f=rk(a.Bb,a.ma,a.ab,c,d.providerId,d.yf(),null,e,a.Nb);Mb((b||window).location,f);return b}):Bd(new K("popup-blocked"))},ul=function(a,b,c,d){return a.Tf.then(function(){sl(c);var e=rk(a.Bb,a.ma,a.ab,b,c.providerId,c.yf(),window.location.href,d,a.Nb);Mb(window.location,e)})},vl=function(a,b,c,d){var e=new K("popup-closed-by-user");return zf(c).then(function(){return Oe(3E4).then(function(){a.Yb(b,null,e,d)})})},sl=function(a){if(!a.isOAuthProvider)throw new K("invalid-oauth-provider");
	},wl={},xl=function(a,b,c){var d=b+":"+c;wl[d]||(wl[d]=new pl(a,b,c));return wl[d]},nl=function(){this.Qe=this.Td=this.zc=this.Za=null;this.Pe=!1};nl.prototype.$f=function(a,b){if(!a)return Bd(new K("invalid-auth-event"));this.Pe=!0;var c=a.Kb,d=a.Pb;"unknown"==c?(this.Za||rl(this,!1,null,null),c=D()):c=a.ta?this.Me(a,b):b.Qc(c,d)?this.Ne(a,b):Bd(new K("invalid-auth-event"));return c};nl.prototype.Me=function(a){this.Za||rl(this,!0,null,a.getError());return D()};
	nl.prototype.Ne=function(a,b){var c=this,d=a.Kb,e=b.Qc(d,a.Pb),f=a.Kc,g=a.ye(),k="signInViaRedirect"==d||"linkViaRedirect"==d;return e(f,g).then(function(a){c.Za||rl(c,k,a,null)}).Ha(function(a){c.Za||rl(c,k,null,a)})};var rl=function(a,b,c,d){b?d?(a.Za=function(){return Bd(d)},a.Td&&a.Td(d)):(a.Za=function(){return D(c)},a.zc&&a.zc(c)):(a.Za=function(){return D({user:null})},a.zc&&a.zc({user:null}));a.zc=null;a.Td=null};
	nl.prototype.getRedirectResult=function(){var a=this;this.mf||(this.mf=new C(function(b,c){a.Za?a.Za().then(b,c):(a.zc=b,a.Td=c,yl(a))}));return this.mf};var yl=function(a){var b=new K("timeout");a.Qe&&a.Qe.cancel();a.Qe=Oe(3E4).then(function(){a.Za||rl(a,!0,null,b)})},ol=function(){};ol.prototype.$f=function(a,b){if(!a)return Bd(new K("invalid-auth-event"));var c=a.Kb,d=a.Pb;return a.ta?this.Me(a,b):b.Qc(c,d)?this.Ne(a,b):Bd(new K("invalid-auth-event"))};
	ol.prototype.Me=function(a,b){b.Yb(a.Kb,null,a.getError(),a.Pb);return D()};ol.prototype.Ne=function(a,b){var c=a.Pb,d=a.Kb,e=b.Qc(d,c),f=a.Kc,g=a.ye();return e(f,g).then(function(a){b.Yb(d,a,null,c)}).Ha(function(a){b.Yb(d,null,a,c)})};var zl=function(a){this.o=a;this.dc=this.tb=null;this.lc=0};zl.prototype.Ra=function(){return{apiKey:this.o.ma,refreshToken:this.tb,accessToken:this.dc,expirationTime:this.lc}};
	var Cl=function(a,b){var c=b.idToken,d=b.refreshToken,e=Al(b.expiresIn);a.dc=c;a.lc=e;a.tb=d},Al=function(a){return oa()+1E3*parseInt(a,10)},Dl=function(a,b){return hg(a.o,b).then(function(b){a.dc=b.access_token;a.lc=Al(b.expires_in);a.tb=b.refresh_token;return{accessToken:a.dc,expirationTime:a.lc,refreshToken:a.tb}},function(){throw new K("internal-error");})};
	zl.prototype.getToken=function(a){return a||!this.dc||oa()>this.lc-3E4?this.tb?Dl(this,{grant_type:"refresh_token",refresh_token:this.tb}):D(null):D({accessToken:this.dc,expirationTime:this.lc,refreshToken:this.tb})};var El=function(a,b,c,d,e){Ff(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},Fl=function(a,b){Rb.call(this,a);for(var c in b)this[c]=b[c]};t(Fl,Rb);
	var Il=function(a,b,c){this.Qa=[];this.ma=a.apiKey;this.ab=a.appName;this.Bb=a.authDomain||null;a=firebase.SDK_VERSION?Cf(firebase.SDK_VERSION):null;this.o=new M(this.ma,null,a);this.Jb=new zl(this.o);Gl(this,b.idToken);Cl(this.Jb,b);J(this,"refreshToken",this.Jb.tb);Hl(this,c||{});G.call(this);this.Qd=!1;this.Bb&&(this.$=xl(this.Bb,this.ma,this.ab));this.Xd=[]};t(Il,G);
	var Gl=function(a,b){a.Jf=b;J(a,"_lat",b)},Jl=function(a,b){Qa(a.Xd,function(a){return a==b})},Kl=function(a){for(var b=[],c=0;c<a.Xd.length;c++)b.push(a.Xd[c](a));return Fd(b).then(function(){return a})},Ll=function(a){a.$&&!a.Qd&&(a.Qd=!0,a.$.subscribe(a))},Hl=function(a,b){Ff(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};J(Il.prototype,"providerId","firebase");
	var Ml=function(){},Nl=function(a){return D().then(function(){if(a.Mg)throw new K("app-deleted");})},Ol=function(a){return Ia(a.providerData,function(a){return a.providerId})},Ql=function(a,b){b&&(Pl(a,b.providerId),a.providerData.push(b))},Pl=function(a,b){Qa(a.providerData,function(a){return a.providerId==b})},Rl=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&J(a,b,c)};
	Il.prototype.copy=function(a){var b=this;b!=a&&(Ff(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),Ga(a.providerData,function(a){Ql(b,a)}),this.Jb=a.Jb,J(this,"refreshToken",this.Jb.tb))};Il.prototype.reload=function(){var a=this;return Nl(this).then(function(){return Sl(a).then(function(){return Kl(a)}).then(Ml)})};
	var Sl=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return Tl(a,b).then(function(){c||Rl(a,"isAnonymous",!1);return b}).Ha(function(b){"auth/user-token-expired"==b.code&&(a.dispatchEvent(new Fl("userDeleted")),a.destroy());throw b;})})};
	Il.prototype.getToken=function(a){var b=this;return Nl(this).then(function(){return b.Jb.getToken(a)}).then(function(a){if(!a)throw new K("internal-error");a.accessToken!=b.Jf&&(Gl(b,a.accessToken),b.Fb());Rl(b,"refreshToken",a.refreshToken);return a.accessToken})};var Ul=function(a,b){b.idToken&&a.Jf!=b.idToken&&(Cl(a.Jb,b),a.Fb(),Gl(a,b.idToken))};Il.prototype.Fb=function(){this.dispatchEvent(new Fl("tokenChanged"))};var Tl=function(a,b){return L(a.o,Ig,{idToken:b}).then(r(a.Fh,a))};
	Il.prototype.Fh=function(a){a=a.users;if(!a||!a.length)throw new K("internal-error");a=a[0];Hl(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=Vl(a),c=0;c<b.length;c++)Ql(this,b[c]);Rl(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
	var Vl=function(a){return(a=a.providerUserInfo)&&a.length?Ia(a,function(a){return new El(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};Il.prototype.reauthenticate=function(a){var b=this;return this.v(a.Bd(this.o).then(function(a){var d;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=sc(yb(e));if(k.sub&&k.iss&&k.aud&&k.exp){d=new Lf(k);break a}}catch(l){}}d=null}if(!d||b.uid!=d.wh)throw new K("user-mismatch");Ul(b,a);return b.reload()}))};
	var Wl=function(a,b){return Sl(a).then(function(){if(Na(Ol(a),b))return Kl(a).then(function(){throw new K("provider-already-linked");})})};h=Il.prototype;h.link=function(a){var b=this;return this.v(Wl(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.Lf(b.o,c)}).then(r(this.vf,this)))};h.vf=function(a){Ul(this,a);var b=this;return this.reload().then(function(){return b})};
	h.updateEmail=function(a){var b=this;return this.v(this.getToken().then(function(c){return b.o.updateEmail(c,a)}).then(function(a){Ul(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.v(this.getToken().then(function(c){return b.o.updatePassword(c,a)}).then(function(a){Ul(b,a);return b.reload()}))};
	h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Nl(this);var b=this;return this.v(this.getToken().then(function(c){return b.o.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Ul(b,a);Rl(b,"displayName",a.displayName||null);Rl(b,"photoURL",a.photoUrl||null);return Kl(b)}).then(Ml))};
	h.unlink=function(a){var b=this;return this.v(Sl(this).then(function(c){return Na(Ol(b),a)?yg(b.o,c,[a]).then(function(a){var c=new xe;Ga(a.providerUserInfo||[],function(a){c.add(a.providerId)});Ga(Ol(b),function(a){c.contains(a)||Pl(b,a)});return Kl(b)}):Kl(b).then(function(){throw new K("no-such-provider");})}))};h["delete"]=function(){var a=this;return this.v(this.getToken().then(function(b){return L(a.o,Hg,{idToken:b})}).then(function(){a.dispatchEvent(new Fl("userDeleted"))})).then(function(){a.destroy()})};
	h.pf=function(a,b){return"linkViaPopup"==a&&(this.qb||null)==b&&this.Xa||"linkViaRedirect"==a&&(this.Sd||null)==b?!0:!1};h.Yb=function(a,b,c,d){"linkViaPopup"==a&&d==(this.qb||null)&&(c&&this.Vb?this.Vb(c):b&&!c&&this.Xa&&this.Xa(b),this.Wb&&(this.Wb.cancel(),this.Wb=null),delete this.Xa,delete this.Vb)};h.Qc=function(a,b){return"linkViaPopup"==a&&b==(this.qb||null)||"linkViaRedirect"==a&&(this.Sd||null)==b?r(this.Sg,this):null};h.Ad=function(){return this.uid+":::"+Math.floor(1E9*Math.random()).toString()};
	h.linkWithPopup=function(a){var b=this,c=Jf(a.providerId),d=yf(c&&c.kd,c&&c.jd),e=this.Ad(),c=Wl(this,a.providerId).then(function(){return Kl(b)}).then(function(){b.nc();return b.getToken()}).then(function(){return tl(b.$,d,"linkViaPopup",a,e)}).then(function(a){return new C(function(c,d){b.Yb("linkViaPopup",null,new K("cancelled-popup-request"),b.qb||null);b.Xa=c;b.Vb=d;b.qb=e;b.Wb=vl(b,"linkViaPopup",a,e)})}).then(function(a){d&&(d||window).close();return a}).Ha(function(a){d&&(d||window).close();
	throw a;});return this.v(c)};h.linkWithRedirect=function(a){var b=this,c=null,d=this.Ad(),e=Wl(this,a.providerId).then(function(){b.nc();return b.getToken()}).then(function(){b.Sd=d;return Kl(b)}).then(function(a){b.Xb&&(a=b.ma+":"+b.ab,a=Xl(b.Xb,Yl,b.Ra(),a));return a}).then(function(){return ul(b.$,"linkViaRedirect",a,d)}).Ha(function(a){c=a;if(b.Xb)return Zl(b.Xb,Yl,b.ma+":"+b.ab);throw c;}).then(function(){if(c)throw c;});return this.v(e)};
	h.nc=function(){if(this.$&&this.Qd)return this.$;if(this.$&&!this.Qd)throw new K("internal-error");throw new K("auth-domain-config-required");};h.Sg=function(a,b){var c=this,d=null,e=this.getToken().then(function(d){return L(c.o,Pf,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=$f(a);return c.vf(a)}).then(function(a){return{user:a,credential:d}});return this.v(e)};
	h.sendEmailVerification=function(){var a=this;return this.v(this.getToken().then(function(b){return a.o.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};h.destroy=function(){for(var a=0;a<this.Qa.length;a++)this.Qa[a].cancel("app-deleted");this.Qa=[];this.Mg=!0;J(this,"refreshToken",null);this.$&&this.$.unsubscribe(this)};h.v=function(a){var b=this;this.Qa.push(a);Jd(a,function(){Pa(b.Qa,a)});return a};
	h.Ra=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.ma,appName:this.ab,authDomain:this.Bb,stsTokenManager:this.Jb.Ra(),redirectEventId:this.Sd||null};Ga(this.providerData,function(b){a.providerData.push(Gf(b))});return a};
	var $l=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.refreshToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken,c.expiresIn=(a.stsTokenManager.expirationTime-oa())/1E3;else return null;var d=new Il(b,c,a);a.providerData&&Ga(a.providerData,function(a){if(a){var b={};Ff(b,a);Ql(d,b)}});a.redirectEventId&&
	(d.Sd=a.redirectEventId);return d},am=function(a,b,c){var d=new Il(a,b);c&&(d.Xb=c);return d.reload().then(function(){return d})};var bm,cm=function(a,b,c,d,e){this.Lg=a;this.Ge=b;this.te=c;this.rg=d;this.wb=e;this.Jd={};this.nd=[];this.hd=0},dm=function(a){return D(Uk(a.Lg,a.wb,function(b,c){c.createObjectStore(a.Ge,{keyPath:a.te})}))},em=function(a){a.Gf||(a.Gf=dm(a));return a.Gf},fm=function(a,b,c){var d;var e=[a.Ge];c=c?"readwrite":"readonly";try{var f=c?b.Ja.transaction(e,c):b.Ja.transaction(e);d=new Qk(f,b)}catch(g){throw Ik(g,"creating transaction");}return d.objectStore(a.Ge)};
	cm.prototype.set=function(a,b){var c=!1,d,e=this;return Jd(em(this).then(function(b){d=b;return fm(e,d,!0).get(a)}).then(function(f){var g=fm(e,d,!0);if(f)return f.value=b,g.put(f);e.hd++;c=!0;f={};f[e.te]=a;f[e.rg]=b;return g.add(f)}).then(function(){e.Jd[a]=b}),function(){c&&e.hd--})};cm.prototype.get=function(a){var b=this;return em(this).then(function(c){return fm(b,c,!1).get(a)})};
	cm.prototype.remove=function(a){var b=!1,c=this;return Jd(em(this).then(function(d){b=!0;c.hd++;return fm(c,d,!0).remove(a)}).then(function(){delete c.Jd[a]}),function(){b&&c.hd--})};cm.prototype.ci=function(){var a=this;return em(this).then(function(b){return fm(a,b,!1).getAll()}).then(function(b){var c={},d=[];if(0==a.hd){for(d=0;d<b.length;d++)c[b[d][a.te]]=b[d][a.rg];d=xf(a.Jd,c);a.Jd=c}return d})};var gm=function(a,b){Qa(a.nd,function(a){return a==b});0==a.nd.length&&a.Yd()};
	cm.prototype.af=function(){var a=this;this.Yd();var b=function(){a.Ke=Oe(1E3).then(r(a.ci,a)).then(function(b){0<b.length&&Ga(a.nd,function(a){a(b)})}).then(b).Ha(function(a){"STOP_EVENT"!=a.message&&b()});return a.Ke};b()};cm.prototype.Yd=function(){this.Ke&&this.Ke.cancel("STOP_EVENT")};var Yl={name:"redirectUser",nb:!1},hm={name:"sessionId",nb:!1},im={name:"authEvent",nb:!0},jm={name:"authUser",nb:!0},km=function(a,b,c,d,e){this.Ah=a;this.ig=b;this.dd=d;this.Sh=e;if(!Zk(new $k)||!Zk(new al))throw new K("web-storage-unsupported");this.Oa={};this.Wc=c;this.Mf=r(this.xh,this);this.Ff=r(this.qh,this)},lm,mm=function(){if(!lm){var a;bm||(bm=new cm("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1));a=bm;var b=y&&!!ub&&11==ub||/Edge\/\d+/.test(db),c=navigator.userAgent.toLowerCase();
	lm=new km("firebase",":",a,b,-1!=c.indexOf("safari")&&-1==c.indexOf("chrome")&&window!=window.top?!0:!1)}return lm},nm=function(a,b){var c;b?(a.Yf||(c=new $k,c=Zk(c)?c:null,a.Yf=new Vk(c)),c=a.Yf):(a.ng||(c=new al,c=Zk(c)?c:null,a.ng=new Vk(c)),c=a.ng);return c};km.prototype.ka=function(a,b){return this.Ah+this.ig+a.name+(b?this.ig+b:"")};
	var om=function(a,b,c){return a.dd&&b.nb?a.Wc.get(a.ka(b,c)).then(function(a){return a&&a.value}):D(nm(a,b.nb).get(a.ka(b,c)))},Zl=function(a,b,c){if(a.dd&&b.nb)return a.Wc.remove(a.ka(b,c));nm(a,b.nb).remove(a.ka(b,c));return D()},Xl=function(a,b,c,d){if(a.dd&&b.nb)return a.Wc.set(a.ka(b,d),c);nm(a,b.nb).set(a.ka(b,d),c);return D()};km.prototype.ye=function(a){return om(this,hm,a)};km.prototype.ef=function(a,b){pm(this,this.ka(im,a),b)};
	var qm=function(a,b){return om(a,jm,b).then(function(a){return $l(a||{})})},rm=function(a,b){return om(a,Yl,b).then(function(a){return $l(a||{})})},pm=function(a,b,c){Za(a.Oa)&&a.af();a.Oa[b]||(a.Oa[b]=[]);a.Oa[b].push(c)},sm=function(a,b,c){a.Oa[b]&&(Qa(a.Oa[b],function(a){return a==c}),0==a.Oa[b].length&&delete a.Oa[b]);Za(a.Oa)&&a.Yd()};h=km.prototype;h.af=function(){if(this.dd){var a=this.Wc,b=this.Ff;0==a.nd.length&&a.af();a.nd.push(b)}else dc(window,"storage",this.Mf)};
	h.Yd=function(){this.dd?gm(this.Wc,this.Ff):lc(window,"storage",this.Mf)};h.xh=function(a){var b=a.yd.key;if(this.Sh){var c=window.localStorage.getItem(b);a=a.yd.newValue;a!=c&&(a?window.localStorage.setItem(b,a):a||window.localStorage.removeItem(b))}this.nf(b)};h.qh=function(a){Ga(a,r(this.nf,this))};h.nf=function(a){this.Oa[a]&&Ga(this.Oa[a],function(a){a()})};var xm=function(a){this.tf=!1;J(this,"app",a);this.ac=mm();this.Ac=mm();if(tm(this).options&&tm(this).options.apiKey)a=firebase.SDK_VERSION?Cf(firebase.SDK_VERSION):null,this.o=new M(tm(this).options&&tm(this).options.apiKey,null,a);else throw new K("invalid-api-key");this.Qa=[];this.Nc=[];this.Bh=firebase.INTERNAL.createSubscribe(r(this.rh,this));um(this,null);this.hc=vm(this);this.Yc=!1;this.zf=r(this.bi,this);this.pg=r(this.uc,this);this.qg=r(this.jh,this);this.og=r(this.ih,this);wm(this);this.INTERNAL=
	{};this.INTERNAL["delete"]=r(this["delete"],this)};xm.prototype.nc=function(){return this.Qg||Bd(new K("auth-domain-config-required"))};var wm=function(a){var b=tm(a).options.authDomain,c=tm(a).options.apiKey;b&&(a.Qg=a.hc.then(function(){a.$=xl(b,c,tm(a).name);a.$.subscribe(a);Z(a)&&Ll(Z(a));a.Re&&(Ll(a.Re),a.Re=null);return a.$}))};h=xm.prototype;h.pf=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.qb==b&&!!this.Xa;default:return!1}};
	h.Yb=function(a,b,c,d){"signInViaPopup"==a&&this.qb==d&&(c&&this.Vb?this.Vb(c):b&&!c&&this.Xa&&this.Xa(b),this.Wb&&(this.Wb.cancel(),this.Wb=null),delete this.Xa,delete this.Vb)};h.Qc=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.qb==b&&this.Xa?r(this.Tg,this):null};
	h.Tg=function(a,b){var c=this,d=null,e=Nf(c.o,{requestUri:a,sessionId:b}).then(function(a){d=$f(a);return a}),f=c.hc.then(function(){return e}).then(function(a){return ym(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.v(f)};h.Ad=function(){return Math.floor(1E9*Math.random()).toString()};
	h.signInWithPopup=function(a){var b=this,c=Jf(a.providerId),d=yf(c&&c.kd,c&&c.jd),e=this.Ad(),c=this.nc().then(function(b){return tl(b,d,"signInViaPopup",a,e)}).then(function(a){return new C(function(c,d){b.Yb("signInViaPopup",null,new K("cancelled-popup-request"),b.qb);b.Xa=c;b.Vb=d;b.qb=e;b.Wb=vl(b,"signInViaPopup",a,e)})}).then(function(a){d&&(d||window).close();return a}).Ha(function(a){d&&(d||window).close();throw a;});return this.v(c)};
	h.signInWithRedirect=function(a){var b=this,c=this.nc().then(function(){return ul(b.$,"signInViaRedirect",a)});return this.v(c)};h.getRedirectResult=function(){var a=this,b=this.nc().then(function(){return a.$.getRedirectResult()});return this.v(b)};
	var ym=function(a,b){var c={};c.apiKey=tm(a).options.apiKey;c.authDomain=tm(a).options.authDomain;c.appName=tm(a).name;return a.hc.then(function(){return am(c,b,a.Ac)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.uc(b);um(a,b);Ll(b);return a.uc(b)}).then(function(){a.Fb()})},um=function(a,b){Z(a)&&(Jl(Z(a),a.pg),lc(Z(a),"tokenChanged",a.qg),lc(Z(a),"userDeleted",a.og));b&&(b.Xd.push(a.pg),dc(b,"tokenChanged",a.qg),dc(b,"userDeleted",a.og));J(a,"currentUser",b)};
	xm.prototype.signOut=function(){var a=this,b=this.hc.then(function(){if(!Z(a))return D();um(a,null);return Zl(a.ac,jm,zm(a)).then(function(){a.Fb()})});return this.v(b)};
	var Am=function(a){var b=zm(a),c=rm(a.Ac,b).then(function(c){if(a.Re=c)c.Xb=a.Ac;return Zl(a.Ac,Yl,b)});return a.v(c)},vm=function(a){var b=zm(a),c=Jd(Am(a).then(function(){return qm(a.ac,b)}).then(function(c){return c?(c.Xb=a.Ac,c.reload().then(function(){return c}).Ha(function(e){return"auth/network-request-failed"==e.code?c:Zl(a.ac,jm,b)})):null}).then(function(b){um(a,b||null);a.Yc=!0;a.Fb()}),function(){if(!a.tf){a.Yc=!0;var c=a.ac;pm(c,c.ka(jm,b),a.zf)}});return a.v(c)};
	xm.prototype.bi=function(){var a=this;return qm(this.ac,zm(this)).then(function(b){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();um(a,b);b&&(Ll(b),b.Xb=a.Ac);a.$.subscribe(a);a.Fb()})};xm.prototype.uc=function(a){var b=zm(this);return Xl(this.ac,jm,a.Ra(),b)};xm.prototype.jh=function(){this.Yc=!0;this.Fb();this.uc(Z(this))};xm.prototype.ih=function(){this.signOut()};
	var Bm=function(a,b){return a.v(b.then(function(b){return ym(a,b)}).then(function(){return Z(a)}))};h=xm.prototype;h.rh=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.Yc&&firebase.Promise.resolve().then(function(){p(a)?a(Z(d)):p(a.next)&&a.next(Z(d))});return this.Bh(a,b,c)};h.getToken=function(a){var b=this,c=this.hc.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.v(c)};
	h.signInWithCustomToken=function(a){var b=this;return Bm(this,L(this.o,Jg,{token:a})).then(function(a){Rl(a,"isAnonymous",!1);return b.uc(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){return Bm(this,L(this.o,Wf,{email:a,password:b}))};h.createUserWithEmailAndPassword=function(a,b){return Bm(this,L(this.o,Gg,{email:a,password:b}))};h.signInWithCredential=function(a){return Bm(this,a.Bd(this.o))};
	h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?D(a):Bm(this,this.o.signInAnonymously()).then(function(a){Rl(a,"isAnonymous",!0);return b.uc(a)}).then(function(){return Z(b)})};var zm=function(a){return tm(a).options.apiKey+":"+tm(a).name},tm=function(a){return a.app},Z=function(a){return a.currentUser};h=xm.prototype;h.Fb=function(){for(var a=0;a<this.Nc.length;a++)if(this.Nc[a])this.Nc[a](Z(this)&&Z(this)._lat||null)};
	h.addAuthTokenListener=function(a){this.Nc.push(a);var b=this;this.Yc&&this.hc.then(function(){a(Z(b)&&Z(b)._lat||null)})};h.removeAuthTokenListener=function(a){Qa(this.Nc,function(b){return b==a})};h["delete"]=function(){this.tf=!0;for(var a=0;a<this.Qa.length;a++)this.Qa[a].cancel("app-deleted");this.Qa=[];a=this.ac;sm(a,a.ka(jm,zm(this)),this.zf);this.$&&this.$.unsubscribe(this)};h.v=function(a){var b=this;this.Qa.push(a);Jd(a,function(){Pa(b.Qa,a)});return a};
	h.fetchProvidersForEmail=function(a){return this.v(og(this.o,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};h.confirmPasswordReset=function(a,b){return this.v(this.o.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.v(this.o.checkActionCode(a).then(function(a){return{data:{email:a.email}}}))};h.applyActionCode=function(a){return this.v(this.o.applyActionCode(a).then(function(){}))};
	h.sendPasswordResetEmail=function(a){return this.v(this.o.sendPasswordResetEmail(a).then(function(){}))};jl(xm.prototype,{applyActionCode:{name:"applyActionCode",j:[Y("code")]},checkActionCode:{name:"checkActionCode",j:[Y("code")]},confirmPasswordReset:{name:"confirmPasswordReset",j:[Y("code"),Y("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",j:[Y("email"),Y("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",j:[Y("email")]},getRedirectResult:{name:"getRedirectResult",j:[]},onAuthStateChanged:{name:"onAuthStateChanged",j:[hl(cl(),dl(),"nextOrObserver"),
	dl("opt_error",!0),dl("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",j:[Y("email")]},signInAnonymously:{name:"signInAnonymously",j:[]},signInWithCredential:{name:"signInWithCredential",j:[fl()]},signInWithCustomToken:{name:"signInWithCustomToken",j:[Y("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",j:[Y("email"),Y("password")]},signInWithPopup:{name:"signInWithPopup",j:[gl()]},signInWithRedirect:{name:"signInWithRedirect",j:[gl()]},signOut:{name:"signOut",
	j:[]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",j:[Y("code")]}});
	jl(Il.prototype,{"delete":{name:"delete",j:[]},getToken:{name:"getToken",j:[{name:"opt_forceRefresh",$a:"a boolean",optional:!0,Ia:function(a){return"boolean"==typeof a}}]},link:{name:"link",j:[fl()]},linkWithPopup:{name:"linkWithPopup",j:[gl()]},linkWithRedirect:{name:"linkWithRedirect",j:[gl()]},reauthenticate:{name:"reauthenticate",j:[fl()]},reload:{name:"reload",j:[]},sendEmailVerification:{name:"sendEmailVerification",j:[]},unlink:{name:"unlink",j:[Y("provider")]},updateEmail:{name:"updateEmail",
	j:[Y("email")]},updatePassword:{name:"updatePassword",j:[Y("password")]},updateProfile:{name:"updateProfile",j:[cl("profile")]}});jl(C.prototype,{Ha:{name:"catch"},then:{name:"then"}});kl(Yf,"credential",function(a,b){return new Vf(a,b)},[Y("email"),Y("password")]);jl(Rf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Rf,"credential",Rf.credential,[hl(Y(),cl(),"token")]);jl(Sf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Sf,"credential",Sf.credential,[hl(Y(),cl(),"token")]);
	jl(Tf.prototype,{addScope:{name:"addScope",j:[Y("scope")]}});kl(Tf,"credential",Tf.credential,[hl(Y(),hl(cl(),el()),"idToken"),hl(Y(),el(),"accessToken",!0)]);kl(Uf,"credential",Uf.credential,[hl(Y(),cl(),"token"),Y("secret",!0)]);
	(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:xm,Error:K};kl(a,"EmailAuthProvider",Yf,[]);kl(a,"FacebookAuthProvider",Rf,[]);kl(a,"GithubAuthProvider",Sf,[]);kl(a,"GoogleAuthProvider",Tf,[]);kl(a,"TwitterAuthProvider",Uf,[]);firebase.INTERNAL.registerService("auth",function(a,c){var d=new xm(a);c({INTERNAL:{getToken:r(d.getToken,d),addAuthTokenListener:r(d.addAuthTokenListener,d),removeAuthTokenListener:r(d.removeAuthTokenListener,
	d)}});return d},a);firebase.INTERNAL.registerAppHook(function(a,c){"create"===a&&c.auth()});firebase.INTERNAL.extendNamespace({User:Il})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();})();
	(function() {var g,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.Wb=function(){return a.$e?a.$e:a.$e=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==ca(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
	function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
	function ka(a,b){function c(){}c.prototype=b.prototype;a.Eg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Bg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function la(){this.Xa=-1};function ma(){this.Xa=-1;this.Xa=64;this.N=[];this.Wd=[];this.Hf=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Xa;++a)this.zd[a]=0;this.Pd=this.ac=0;this.reset()}ka(ma,la);ma.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.Pd=this.ac=0};
	function na(a,b,c){c||(c=0);var d=a.Hf;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],m=a.N[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+m&4294967295}
	ma.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Xa,d=0,e=this.Wd,f=this.ac;d<b;){if(0==f)for(;d<=c;)na(this,a,d),d+=this.Xa;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Xa){na(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Xa){na(this,e);f=0;break}}this.ac=f;this.Pd+=b}};function t(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function oa(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function pa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function qa(a){var b=0,c;for(c in a)b++;return b}function ra(a){for(var b in a)return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ta(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ua(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function va(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function wa(a,b){var c=va(a,b,void 0);return c&&a[c]}function xa(a){for(var b in a)return!1;return!0}function ya(a){var b={},c;for(c in a)b[c]=a[c];return b};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Fd=void 0}
	function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
	c.push(":"),Ba(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};var v;a:{var Fa=n.navigator;if(Fa){var Ga=Fa.userAgent;if(Ga){v=Ga;break a}}v=""};function Ha(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ha);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(Ha,Error);Ha.prototype.name="CustomError";var w=Array.prototype,Ia=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ja=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ka=w.filter?function(a,b,c){return w.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},La=w.map?function(a,b,c){return w.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ma=w.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=r(b,d));return w.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ja(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Na=w.every?function(a,b,
	c){return w.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Oa(a,b){var c=Pa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Pa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Qa(a,b){var c=Ia(a,b);0<=c&&w.splice.call(a,c,1)}function Ra(a,b,c){return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)}
	function Sa(a,b){a.sort(b||Ta)}function Ta(a,b){return a>b?1:a<b?-1:0};var Ua=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Va=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Wa=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Xa=-1!=v.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Ua&&n.opera)return a=n.opera.version,ga(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Va&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
	function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a){n.setTimeout(function(){throw a;},0)}var db;
	function eb(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==v.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==v.indexOf("Trident")&&-1==v.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Ke;c.Ke=null;a()}};return function(a){d.next={Ke:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function fb(a,b){gb||hb();ib||(gb(),ib=!0);jb.push(new kb(a,b))}var gb;function hb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();gb=function(){a.then(lb)}}else gb=function(){var a=lb;!ga(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(db||(db=eb()),db(a)):n.setImmediate(a)}}var ib=!1,jb=[];[].push(function(){ib=!1;jb=[]});
	function lb(){for(;jb.length;){var a=jb;jb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Uf.call(c.scope)}catch(d){cb(d)}}}ib=!1}function kb(a,b){this.Uf=a;this.scope=b};function mb(a,b){this.L=nb;this.sf=void 0;this.Ca=this.Ha=null;this.jd=this.be=!1;if(a==ob)pb(this,qb,b);else try{var c=this;a.call(b,function(a){pb(c,qb,a)},function(a){if(!(a instanceof rb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}pb(c,sb,a)})}catch(d){pb(this,sb,d)}}var nb=0,qb=2,sb=3;function ob(){}mb.prototype.then=function(a,b,c){return tb(this,ga(a)?a:null,ga(b)?b:null,c)};mb.prototype.then=mb.prototype.then;mb.prototype.$goog_Thenable=!0;g=mb.prototype;
	g.xg=function(a,b){return tb(this,null,a,b)};g.cancel=function(a){this.L==nb&&fb(function(){var b=new rb(a);ub(this,b)},this)};function ub(a,b){if(a.L==nb)if(a.Ha){var c=a.Ha;if(c.Ca){for(var d=0,e=-1,f=0,h;h=c.Ca[f];f++)if(h=h.m)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.L==nb&&1==d?ub(c,b):(d=c.Ca.splice(e,1)[0],vb(c,d,sb,b)))}a.Ha=null}else pb(a,sb,b)}function wb(a,b){a.Ca&&a.Ca.length||a.L!=qb&&a.L!=sb||xb(a);a.Ca||(a.Ca=[]);a.Ca.push(b)}
	function tb(a,b,c,d){var e={m:null,ff:null,hf:null};e.m=new mb(function(a,h){e.ff=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){h(l)}}:a;e.hf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof rb?h(b):a(e)}catch(l){h(l)}}:h});e.m.Ha=a;wb(a,e);return e.m}g.Af=function(a){this.L=nb;pb(this,qb,a)};g.Bf=function(a){this.L=nb;pb(this,sb,a)};
	function pb(a,b,c){if(a.L==nb){if(a==c)b=sb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.L=1;c.then(a.Af,a.Bf,a);return}if(ha(c))try{var f=c.then;if(ga(f)){yb(a,c,f);return}}catch(h){b=sb,c=h}}a.sf=c;a.L=b;a.Ha=null;xb(a);b!=sb||c instanceof rb||zb(a,c)}}function yb(a,b,c){function d(b){f||(f=!0,a.Bf(b))}function e(b){f||(f=!0,a.Af(b))}a.L=1;var f=!1;try{c.call(b,e,d)}catch(h){d(h)}}
	function xb(a){a.be||(a.be=!0,fb(a.Sf,a))}g.Sf=function(){for(;this.Ca&&this.Ca.length;){var a=this.Ca;this.Ca=null;for(var b=0;b<a.length;b++)vb(this,a[b],this.L,this.sf)}this.be=!1};function vb(a,b,c,d){if(c==qb)b.ff(d);else{if(b.m)for(;a&&a.jd;a=a.Ha)a.jd=!1;b.hf(d)}}function zb(a,b){a.jd=!0;fb(function(){a.jd&&Ab.call(null,b)})}var Ab=cb;function rb(a){Ha.call(this,a)}ka(rb,Ha);rb.prototype.name="cancel";function Bb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function x(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Cb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function y(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Db(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function A(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Db(a,b,d)+"must be a valid function.");}function Eb(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Db(a,b,!0)+"must be a valid context object.");};function Fb(a){var b=[];Cb(a,function(a,d){da(d)?Ja(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var Gb=n.Promise||mb;mb.prototype["catch"]=mb.prototype.xg;function Hb(){var a=this;this.reject=this.resolve=null;this.ra=new Gb(function(b,c){a.resolve=b;a.reject=c})}function Ib(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(Jb(a.ra),1===b.length?b(c):b(c,d))}}function Jb(a){a.then(void 0,aa)};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function Mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function Ob(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function B(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Pb(a,b){this.committed=a;this.snapshot=b};function Qb(a){this.se=a;this.Bd=[];this.Rb=0;this.Yd=-1;this.Gb=null}function Rb(a,b,c){a.Yd=b;a.Gb=c;a.Yd<a.Rb&&(a.Gb(),a.Gb=null)}function Sb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Rb];){var d=a.Bd[a.Rb];delete a.Bd[a.Rb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Tb(function(){f.se(d[e])})}if(a.Rb===a.Yd){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Rb++}};function Ub(){this.qc={}}Ub.prototype.set=function(a,b){null==b?delete this.qc[a]:this.qc[a]=b};Ub.prototype.get=function(a){return Bb(this.qc,a)?this.qc[a]:null};Ub.prototype.remove=function(a){delete this.qc[a]};Ub.prototype.af=!0;function Vb(a){this.vc=a;this.Cd="firebase:"}g=Vb.prototype;g.set=function(a,b){null==b?this.vc.removeItem(this.Cd+a):this.vc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.vc.getItem(this.Cd+a);return null==a?null:Ob(a)};g.remove=function(a){this.vc.removeItem(this.Cd+a)};g.af=!1;g.toString=function(){return this.vc.toString()};function Wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Vb(b)}}catch(c){}return new Ub}var Xb=Wb("localStorage"),Yb=Wb("sessionStorage");function Zb(a,b,c){this.type=$b;this.source=a;this.path=b;this.Ja=c}Zb.prototype.Nc=function(a){return this.path.e()?new Zb(this.source,C,this.Ja.R(a)):new Zb(this.source,D(this.path),this.Ja)};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function ac(a,b){this.type=bc;this.source=a;this.path=b}ac.prototype.Nc=function(){return this.path.e()?new ac(this.source,C):new ac(this.source,D(this.path))};ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function cc(a){this.Ge=a}cc.prototype.getToken=function(a){return this.Ge.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(E("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function dc(a,b){a.Ge.INTERNAL.addAuthTokenListener(b)};function ec(){this.Jd=F}ec.prototype.j=function(a){return this.Jd.Q(a)};ec.prototype.toString=function(){return this.Jd.toString()};function fc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.oe=c;this.zg=d;this.lf=e||"";this.ab=Xb.get("host:"+a)||this.host}function gc(a,b){b!==a.ab&&(a.ab=b,"s-"===a.ab.substr(0,2)&&Xb.set("host:"+a.host,a.ab))}
	function hc(a,b,c){H("string"===typeof b,"typeof type must == string");H("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.ab+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.ab+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.ab&&(c.ns=a.oe);var d=[];t(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	fc.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.lf&&(a+="<"+this.lf+">");return a};function ic(a,b){this.xf={};this.Vc=new jc(a);this.va=b;var c=1E4+2E4*Math.random();setTimeout(r(this.pf,this),Math.floor(c))}ic.prototype.pf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&Bb(this.xf,d)&&(b[d]=a[d],c=!0);c&&this.va.xe(b);setTimeout(r(this.pf,this),Math.floor(6E5*Math.random()))};function kc(){this.uc={}}function lc(a,b,c){p(c)||(c=1);Bb(a.uc,b)||(a.uc[b]=0);a.uc[b]+=c}kc.prototype.get=function(){return ya(this.uc)};function jc(a){this.Lf=a;this.rd=null}jc.prototype.get=function(){var a=this.Lf.get(),b=ya(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};var mc={},nc={};function oc(a){a=a.toString();mc[a]||(mc[a]=new kc);return mc[a]}function pc(a,b){var c=a.toString();nc[c]||(nc[c]=b());return nc[c]};function qc(){this.wb=[]}function rc(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.wb.push(c),c=null);null===c&&(c=new sc(f));c.add(e)}c&&a.wb.push(c)}function tc(a,b,c){rc(a,c);uc(a,function(a){return a.ca(b)})}function vc(a,b,c){rc(a,c);uc(a,function(a){return a.contains(b)||b.contains(a)})}
	function uc(a,b){for(var c=!0,d=0;d<a.wb.length;d++){var e=a.wb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.wb[d],f=0;f<e.hd.length;f++){var h=e.hd[f];if(null!==h){e.hd[f]=null;var k=h.Ub();wc&&E("event: "+h.toString());Tb(k)}}a.wb[d]=null}else c=!1}c&&(a.wb=[])}function sc(a){this.qa=a;this.hd=[]}sc.prototype.add=function(a){this.hd.push(a)};sc.prototype.Zb=function(){return this.qa};function xc(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.gd=a}xc.prototype.Zb=function(){var a=this.Md.xb();return"value"===this.gd?a.path:a.getParent().path};xc.prototype.ge=function(){return this.gd};xc.prototype.Ub=function(){return this.ae.Ub(this)};xc.prototype.toString=function(){return this.Zb().toString()+":"+this.gd+":"+B(this.Md.Se())};function yc(a,b,c){this.ae=a;this.error=b;this.path=c}yc.prototype.Zb=function(){return this.path};yc.prototype.ge=function(){return"cancel"};
	yc.prototype.Ub=function(){return this.ae.Ub(this)};yc.prototype.toString=function(){return this.path.toString()+":cancel"};function zc(){}zc.prototype.Ve=function(){return null};zc.prototype.fe=function(){return null};var Ac=new zc;function Bc(a,b,c){this.Ef=a;this.Na=b;this.yd=c}Bc.prototype.Ve=function(a){var b=this.Na.O;if(Cc(b,a))return b.j().R(a);b=null!=this.yd?new Dc(this.yd,!0,!1):this.Na.u();return this.Ef.rc(a,b)};Bc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:Ec(this.Na);a=this.Ef.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function I(a,b,c,d){this.type=a;this.Ma=b;this.Ya=c;this.pe=d;this.Dd=void 0}function Fc(a){return new I(Gc,a)}var Gc="value";function Dc(a,b,c){this.A=a;this.ea=b;this.Tb=c}function Hc(a){return a.ea}function Ic(a){return a.Tb}function Jc(a,b){return b.e()?a.ea&&!a.Tb:Cc(a,J(b))}function Cc(a,b){return a.ea&&!a.Tb||a.A.Fa(b)}Dc.prototype.j=function(){return this.A};function Kc(a,b){return Lc(a.name,b.name)}function Mc(a,b){return Lc(a,b)};function K(a,b){this.name=a;this.S=b}function Nc(a,b){return new K(a,b)};function Oc(a,b){return a&&"object"===typeof a?(H(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Pc(a,b){var c=new Qc;Rc(a,new L(""),function(a,e){Sc(c,a,Tc(e,b))});return c}function Tc(a,b){var c=a.C().H(),c=Oc(c,b),d;if(a.J()){var e=Oc(a.Ea(),b);return e!==a.Ea()||c!==a.C().H()?new Uc(e,M(c)):a}d=a;c!==a.C().H()&&(d=d.ga(new Uc(c)));a.P(N,function(a,c){var e=Tc(c,b);e!==c&&(d=d.U(a,e))});return d};var Vc=function(){var a=1;return function(){return a++}}(),H=Kb,Wc=Lb;
	function Xc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ra(d,c,
	c+8192));b=a}}return b}catch(l){E("base64Decode failed: ",l)}return null}function Yc(a){var b=Mb(a);a=new ma;a.update(b);var b=[],c=8*a.Pd;56>a.ac?a.update(a.zd,56-a.ac):a.update(a.zd,a.Xa-(a.ac-56));for(var d=a.Xa-1;56<=d;d--)a.Wd[d]=c&255,c/=256;na(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return ab(b)}
	function Zc(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+Zc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var wc=null,$c=!0;
	function ad(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?wc=r(console.log,console):"object"===typeof console.log&&(wc=function(a){console.log(a)})),b&&Yb.set("logging_enabled",!0)):ga(a)?wc=a:(wc=null,Yb.remove("logging_enabled"))}function E(a){!0===$c&&($c=!1,null===wc&&!0===Yb.get("logging_enabled")&&ad(!0));if(wc){var b=Zc.apply(null,arguments);wc(b)}}
	function bd(a){return function(){E(a,arguments)}}function cd(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Zc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function dd(a){var b=Zc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Zc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function ed(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(q(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&dd(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||dd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{kc:new fc(b,d,c,"ws"===e||"wss"===e),path:new L(f)}}function fd(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function gd(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function Lc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=hd(a),d=hd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function id(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function jd(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=jd(a[b[d]]);return c+"}"}function kd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function ld(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else t(a,b)}
	function md(a){H(!fd(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var nd=/^-?\d{1,10}$/;function hd(a){return nd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Tb(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function od(a,b,c){Object.defineProperty(a,b,{get:c})};function pd(a){var b={};try{var c=a.split(".");Ob(Xc(c[0])||"");b=Ob(Xc(c[1])||"");delete b.d}catch(d){}a=b;return"object"===typeof a&&!0===x(a,"admin")};var qd=null;"undefined"!==typeof MozWebSocket?qd=MozWebSocket:"undefined"!==typeof WebSocket&&(qd=WebSocket);function rd(a,b,c,d){this.Zd=a;this.f=bd(this.Zd);this.frames=this.Ac=null;this.qb=this.rb=this.Ee=0;this.Wa=oc(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Le=hc(b,"websocket",a)}var td;
	rd.prototype.open=function(a,b){this.kb=b;this.fg=a;this.f("Websocket connecting to "+this.Le);this.xc=!1;Xb.set("previous_websocket_failure",!0);try{this.La=new qd(this.Le)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.eb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.xc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.eb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.qb+=
	a.length,lc(e.Wa,"bytes_received",a.length),ud(e),null!==e.frames)vd(e,a);else{a:{H(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Ee=b;e.frames=[];a=null;break a}}e.Ee=1;e.frames=[]}null!==a&&vd(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.eb()}};rd.prototype.start=function(){};
	rd.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==qd&&!td};rd.responsesRequiredToBeHealthy=2;rd.healthyTimeout=3E4;g=rd.prototype;g.sd=function(){Xb.remove("previous_websocket_failure")};function vd(a,b){a.frames.push(b);if(a.frames.length==a.Ee){var c=a.frames.join("");a.frames=null;c=Ob(c);a.fg(c)}}
	g.send=function(a){ud(this);a=B(a);this.rb+=a.length;lc(this.Wa,"bytes_sent",a.length);a=kd(a,16384);1<a.length&&wd(this,String(a.length));for(var b=0;b<a.length;b++)wd(this,a[b])};g.Tc=function(){this.Bb=!0;this.Ac&&(clearInterval(this.Ac),this.Ac=null);this.La&&(this.La.close(),this.La=null)};g.eb=function(){this.Bb||(this.f("WebSocket is closing itself"),this.Tc(),this.kb&&(this.kb(this.xc),this.kb=null))};g.close=function(){this.Bb||(this.f("WebSocket is being closed"),this.Tc())};
	function ud(a){clearInterval(a.Ac);a.Ac=setInterval(function(){a.La&&wd(a,"0");ud(a)},Math.floor(45E3))}function wd(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(r(a.eb,a),0)}};function xd(a,b,c){this.f=bd("p:rest:");this.M=a;this.Hb=b;this.Vd=c;this.$={}}function yd(a,b){if(p(b))return"tag$"+b;H(zd(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=xd.prototype;
	g.bf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ya());var f=yd(a,c),h={};this.$[f]=h;a=Ad(a.n);var k=this;Bd(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Hb(e,u,!1,c);x(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Cf=function(a,b){var c=yd(a,b);delete this.$[c]};g.of=function(){};g.qe=function(){};g.ef=function(){};g.xd=function(){};g.put=function(){};g.cf=function(){};g.xe=function(){};
	function Bd(a,b,c,d){c=c||{};c.format="export";a.Vd.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.M.Sc?"https://":"http://")+a.M.host+b+"?"+Fb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=Ob(h.responseText)}catch(c){O("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&O("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Cd(a,b,c){this.type=Dd;this.source=a;this.path=b;this.children=c}Cd.prototype.Nc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Zb(this.source,C,a.value):new Cd(this.source,C,a);H(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new Cd(this.source,D(this.path),this.children)};Cd.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Ed(){this.hb={}}
	function Fd(a,b){var c=b.type,d=b.Ya;H("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");H(".priority"!==d,"Only non-priority child changes can be tracked.");var e=x(a.hb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.Ma);else if("child_removed"==c&&"child_added"==f)delete a.hb[d];else if("child_removed"==c&&"child_changed"==f)a.hb[d]=new I("child_removed",e.pe,d);else if("child_changed"==c&&
	"child_added"==f)a.hb[d]=new I("child_added",b.Ma,d);else if("child_changed"==c&&"child_changed"==f)a.hb[d]=new I("child_changed",b.Ma,d,e.pe);else throw Wc("Illegal combination of changes: "+b+" occurred after "+e);}else a.hb[d]=b};function Gd(a){this.W=a;this.g=a.n.g}function Hd(a,b,c,d){var e=[],f=[];Ja(b,function(b){"child_changed"===b.type&&a.g.nd(b.pe,b.Ma)&&f.push(new I("child_moved",b.Ma,b.Ya))});Id(a,e,"child_removed",b,d,c);Id(a,e,"child_added",b,d,c);Id(a,e,"child_moved",f,d,c);Id(a,e,"child_changed",b,d,c);Id(a,e,Gc,b,d,c);return e}function Id(a,b,c,d,e,f){d=Ka(d,function(a){return a.type===c});Sa(d,r(a.Mf,a));Ja(d,function(c){var d=Jd(a,c,f);Ja(e,function(e){e.rf(c.type)&&b.push(e.createEvent(d,a.W))})})}
	function Jd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Xe(b.Ya,b.Ma,a.g));return b}Gd.prototype.Mf=function(a,b){if(null==a.Ya||null==b.Ya)throw Wc("Should only compare child_ events.");return this.g.compare(new K(a.Ya,a.Ma),new K(b.Ya,b.Ma))};function Kd(a,b){this.Sd=a;this.Kf=b}function Ld(a){this.V=a}
	Ld.prototype.gb=function(a,b,c,d){var e=new Ed,f;if(b.type===$b)b.source.ee?c=Md(this,a,b.path,b.Ja,c,d,e):(H(b.source.Ue,"Unknown source."),f=b.source.De||Ic(a.u())&&!b.path.e(),c=Nd(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===Dd)b.source.ee?c=Od(this,a,b.path,b.children,c,d,e):(H(b.source.Ue,"Unknown source."),f=b.source.De||Ic(a.u()),c=Pd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Qd)if(b.Id)if(b=b.path,null!=c.mc(b))c=a;else{f=new Bc(c,a,d);d=a.O.j();if(b.e()||".priority"===J(b))Hc(a.u())?
	b=c.Ba(Ec(a)):(b=a.u().j(),H(b instanceof P,"serverChildren would be complete if leaf node"),b=c.sc(b)),b=this.V.za(d,b,e);else{var h=J(b),k=c.rc(h,a.u());null==k&&Cc(a.u(),h)&&(k=d.R(h));b=null!=k?this.V.F(d,h,k,D(b),f,e):a.O.j().Fa(h)?this.V.F(d,h,F,D(b),f,e):d;b.e()&&Hc(a.u())&&(d=c.Ba(Ec(a)),d.J()&&(b=this.V.za(b,d,e)))}d=Hc(a.u())||null!=c.mc(C);c=Rd(a,b,d,this.V.Qa())}else c=Sd(this,a,b.path,b.Pb,c,d,e);else if(b.type===bc)d=b.path,b=a.u(),f=b.j(),h=b.ea||d.e(),c=Td(this,new Ud(a.O,new Dc(f,
	h,b.Tb)),d,c,Ac,e);else throw Wc("Unknown operation type: "+b.type);e=sa(e.hb);d=c;b=d.O;b.ea&&(f=b.j().J()||b.j().e(),h=Vd(a),(0<e.length||!a.O.ea||f&&!b.j().ca(h)||!b.j().C().ca(h.C()))&&e.push(Fc(Vd(d))));return new Kd(c,e)};
	function Td(a,b,c,d,e,f){var h=b.O;if(null!=d.mc(c))return b;var k;if(c.e())H(Hc(b.u()),"If change path is empty, we must have complete server data"),Ic(b.u())?(e=Ec(b),d=d.sc(e instanceof P?e:F)):d=d.Ba(Ec(b)),f=a.V.za(b.O.j(),d,f);else{var m=J(c);if(".priority"==m)H(1==Wd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.u().j(),d=d.$c(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var l=D(c);Cc(h,m)?(k=b.u().j(),d=d.$c(c,h.j(),k),d=null!=d?h.j().R(m).F(l,d):h.j().R(m)):d=d.rc(m,
	b.u());f=null!=d?a.V.F(h.j(),m,d,l,e,f):h.j()}}return Rd(b,f,h.ea||c.e(),a.V.Qa())}function Nd(a,b,c,d,e,f,h,k){var m=b.u();h=h?a.V:a.V.Vb();if(c.e())d=h.za(m.j(),d,null);else if(h.Qa()&&!m.Tb)d=m.j().F(c,d),d=h.za(m.j(),d,null);else{var l=J(c);if(!Jc(m,c)&&1<Wd(c))return b;var u=D(c);d=m.j().R(l).F(u,d);d=".priority"==l?h.ga(m.j(),d):h.F(m.j(),l,d,u,Ac,null)}m=m.ea||c.e();b=new Ud(b.O,new Dc(d,m,h.Qa()));return Td(a,b,c,e,new Bc(e,b,f),k)}
	function Md(a,b,c,d,e,f,h){var k=b.O;e=new Bc(e,b,f);if(c.e())h=a.V.za(b.O.j(),d,h),a=Rd(b,h,!0,a.V.Qa());else if(f=J(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Rd(b,h,k.ea,k.Tb);else{c=D(c);var m=k.j().R(f);if(!c.e()){var l=e.Ve(f);d=null!=l?".priority"===Xd(c)&&l.Q(c.parent()).e()?l:l.F(c,d):F}m.ca(d)?a=b:(h=a.V.F(k.j(),f,d,c,e,h),a=Rd(b,h,k.ea,a.V.Qa()))}return a}
	function Od(a,b,c,d,e,f,h){var k=b;Yd(d,function(d,l){var u=c.m(d);Cc(b.O,J(u))&&(k=Md(a,k,u,l,e,f,h))});Yd(d,function(d,l){var u=c.m(d);Cc(b.O,J(u))||(k=Md(a,k,u,l,e,f,h))});return k}function Zd(a,b){Yd(b,function(b,d){a=a.F(b,d)});return a}
	function Pd(a,b,c,d,e,f,h,k){if(b.u().j().e()&&!Hc(b.u()))return b;var m=b;c=c.e()?d:$d(Q,c,d);var l=b.u().j();c.children.ia(function(c,d){if(l.Fa(c)){var G=b.u().j().R(c),G=Zd(G,d);m=Nd(a,m,new L(c),G,e,f,h,k)}});c.children.ia(function(c,d){var G=!Cc(b.u(),c)&&null==d.value;l.Fa(c)||G||(G=b.u().j().R(c),G=Zd(G,d),m=Nd(a,m,new L(c),G,e,f,h,k))});return m}
	function Sd(a,b,c,d,e,f,h){if(null!=e.mc(c))return b;var k=Ic(b.u()),m=b.u();if(null!=d.value){if(c.e()&&m.ea||Jc(m,c))return Nd(a,b,c,m.j().Q(c),e,f,k,h);if(c.e()){var l=Q;m.j().P(ae,function(a,b){l=l.set(new L(a),b)});return Pd(a,b,c,l,e,f,k,h)}return b}l=Q;Yd(d,function(a){var b=c.m(a);Jc(m,b)&&(l=l.set(a,m.j().Q(b)))});return Pd(a,b,c,l,e,f,k,h)};function be(a){this.g=a}g=be.prototype;g.F=function(a,b,c,d,e,f){H(a.zc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).ca(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Fd(f,new I("child_removed",e,b)):H(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Fd(f,new I("child_added",c,b)):Fd(f,new I("child_changed",c,b,e)));return a.J()&&c.e()?a:a.U(b,c).ob(this.g)};
	g.za=function(a,b,c){null!=c&&(a.J()||a.P(N,function(a,e){b.Fa(a)||Fd(c,new I("child_removed",e,a))}),b.J()||b.P(N,function(b,e){if(a.Fa(b)){var f=a.R(b);f.ca(e)||Fd(c,new I("child_changed",e,b,f))}else Fd(c,new I("child_added",e,b))}));return b.ob(this.g)};g.ga=function(a,b){return a.e()?F:a.ga(b)};g.Qa=function(){return!1};g.Vb=function(){return this};function ce(a){this.he=new be(a.g);this.g=a.g;var b;a.ka?(b=de(a),b=a.g.Fc(ee(a),b)):b=a.g.Ic();this.Uc=b;a.na?(b=fe(a),a=a.g.Fc(ge(a),b)):a=a.g.Gc();this.wc=a}g=ce.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.wc)};g.F=function(a,b,c,d,e,f){this.matches(new K(b,c))||(c=F);return this.he.F(a,b,c,d,e,f)};
	g.za=function(a,b,c){b.J()&&(b=F);var d=b.ob(this.g),d=d.ga(F),e=this;b.P(N,function(a,b){e.matches(new K(a,b))||(d=d.U(a,F))});return this.he.za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.he};function he(a){this.sa=new ce(a);this.g=a.g;H(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Jb=!ie(a)}g=he.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new K(b,c))||(c=F);return a.R(b).ca(c)?a:a.Fb()<this.oa?this.sa.Vb().F(a,b,c,d,e,f):je(this,a,b,c,e,f)};
	g.za=function(a,b,c){var d;if(b.J()||b.e())d=F.ob(this.g);else if(2*this.oa<b.Fb()&&b.zc(this.g)){d=F.ob(this.g);b=this.Jb?b.$b(this.sa.wc,this.g):b.Yb(this.sa.Uc,this.g);for(var e=0;0<b.Sa.length&&e<this.oa;){var f=R(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.wc))d=d.U(f.name,f.S),e++;else break}}else{d=b.ob(this.g);d=d.ga(F);var k,m,l;if(this.Jb){b=d.Ye(this.g);k=this.sa.wc;m=this.sa.Uc;var u=ke(this.g);l=function(a,b){return u(b,a)}}else b=d.Xb(this.g),k=this.sa.Uc,
	m=this.sa.wc,l=ke(this.g);for(var e=0,z=!1;0<b.Sa.length;)f=R(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=l(f,m))?e++:d=d.U(f.name,F)}return this.sa.Vb().za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.sa.Vb()};
	function je(a,b,c,d,e,f){var h;if(a.Jb){var k=ke(a.g);h=function(a,b){return k(b,a)}}else h=ke(a.g);H(b.Fb()==a.oa,"");var m=new K(c,d),l=a.Jb?le(b,a.g):me(b,a.g),u=a.sa.matches(m);if(b.Fa(c)){for(var z=b.R(c),l=e.fe(a.g,l,a.Jb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.fe(a.g,l,a.Jb);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&Fd(f,new I("child_changed",d,c,z)),b.U(c,d);null!=f&&Fd(f,new I("child_removed",z,c));b=b.U(c,F);return null!=l&&a.sa.matches(l)?(null!=f&&Fd(f,new I("child_added",
	l.S,l.name)),b.U(l.name,l.S)):b}return d.e()?b:u&&0<=h(l,m)?(null!=f&&(Fd(f,new I("child_removed",l.S,l.name)),Fd(f,new I("child_added",d,c))),b.U(c,d).U(l.name,F)):b};function Uc(a,b){this.B=a;H(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||F;ne(this.aa);this.Eb=null}var oe=["object","boolean","number","string"];g=Uc.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.ga=function(a){return new Uc(this.B,a)};g.R=function(a){return".priority"===a?this.aa:F};g.Q=function(a){return a.e()?this:".priority"===J(a)?this.aa:F};g.Fa=function(){return!1};g.Xe=function(){return null};
	g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:F.U(a,b).ga(this.aa)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;H(".priority"!==c||1===Wd(a),".priority must be the last token in a path");return this.U(c,F.F(D(a),b))};g.e=function(){return!1};g.Fb=function(){return 0};g.P=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().H()}:this.Ea()};
	g.hash=function(){if(null===this.Eb){var a="";this.aa.e()||(a+="priority:"+pe(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+md(this.B):a+this.B;this.Eb=Yc(a)}return this.Eb};g.Ea=function(){return this.B};g.tc=function(a){if(a===F)return 1;if(a instanceof P)return-1;H(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Ia(oe,b),e=Ia(oe,c);H(0<=d,"Unknown leaf type: "+b);H(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.ob=function(){return this};g.zc=function(){return!0};g.ca=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.H(!0))};function qe(){}var re={};function ke(a){return r(a.compare,a)}qe.prototype.nd=function(a,b){return 0!==this.compare(new K("[MIN_NAME]",a),new K("[MIN_NAME]",b))};qe.prototype.Ic=function(){return se};function te(a){H(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ka(te,qe);g=te.prototype;g.yc=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.tc(d);return 0===c?Lc(a.name,b.name):c};
	g.Fc=function(a,b){var c=M(a),c=F.F(this.cc,c);return new K(b,c)};g.Gc=function(){var a=F.F(this.cc,ue);return new K("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function ve(){}ka(ve,qe);g=ve.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.tc(d);return 0===c?Lc(a.name,b.name):c};g.yc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().ca(b.C())};g.Ic=function(){return se};g.Gc=function(){return new K("[MAX_NAME]",new Uc("[PRIORITY-POST]",ue))};
	g.Fc=function(a,b){var c=M(a);return new K(b,new Uc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new ve;function we(){}ka(we,qe);g=we.prototype;g.compare=function(a,b){return Lc(a.name,b.name)};g.yc=function(){throw Wc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Ic=function(){return se};g.Gc=function(){return new K("[MAX_NAME]",F)};g.Fc=function(a){H(q(a),"KeyIndex indexValue must always be a string.");return new K(a,F)};g.toString=function(){return".key"};
	var ae=new we;function xe(){}ka(xe,qe);g=xe.prototype;g.compare=function(a,b){var c=a.S.tc(b.S);return 0===c?Lc(a.name,b.name):c};g.yc=function(){return!0};g.nd=function(a,b){return!a.ca(b)};g.Ic=function(){return se};g.Gc=function(){return ye};g.Fc=function(a,b){var c=M(a);return new K(b,c)};g.toString=function(){return".value"};var ze=new xe;function Ae(){this.Sb=this.na=this.Lb=this.ka=this.xa=!1;this.oa=0;this.oc="";this.ec=null;this.Ab="";this.bc=null;this.yb="";this.g=N}var Be=new Ae;function ie(a){return""===a.oc?a.ka:"l"===a.oc}function ee(a){H(a.ka,"Only valid if start has been set");return a.ec}function de(a){H(a.ka,"Only valid if start has been set");return a.Lb?a.Ab:"[MIN_NAME]"}function ge(a){H(a.na,"Only valid if end has been set");return a.bc}
	function fe(a){H(a.na,"Only valid if end has been set");return a.Sb?a.yb:"[MAX_NAME]"}function Ce(a){var b=new Ae;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.ec=a.ec;b.Lb=a.Lb;b.Ab=a.Ab;b.na=a.na;b.bc=a.bc;b.Sb=a.Sb;b.yb=a.yb;b.g=a.g;return b}g=Ae.prototype;g.me=function(a){var b=Ce(this);b.xa=!0;b.oa=a;b.oc="l";return b};g.ne=function(a){var b=Ce(this);b.xa=!0;b.oa=a;b.oc="r";return b};g.Nd=function(a,b){var c=Ce(this);c.ka=!0;p(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.Ab=b):(c.Lb=!1,c.Ab="");return c};
	g.fd=function(a,b){var c=Ce(this);c.na=!0;p(a)||(a=null);c.bc=a;p(b)?(c.Sb=!0,c.yb=b):(c.Dg=!1,c.yb="");return c};function De(a,b){var c=Ce(a);c.g=b;return c}function Ee(a){var b={};a.ka&&(b.sp=a.ec,a.Lb&&(b.sn=a.Ab));a.na&&(b.ep=a.bc,a.Sb&&(b.en=a.yb));if(a.xa){b.l=a.oa;var c=a.oc;""===c&&(c=ie(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function S(a){return!(a.ka||a.na||a.xa)}function zd(a){return S(a)&&a.g==N}
	function Ad(a){var b={};if(zd(a))return b;var c;a.g===N?c="$priority":a.g===ze?c="$value":a.g===ae?c="$key":(H(a.g instanceof te,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ka&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.Ab)));a.na&&(b.endAt=B(a.bc),a.Sb&&(b.endAt+=","+B(a.yb)));a.xa&&(ie(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return B(Ee(this))};function Fe(a,b){this.od=a;this.dc=b}Fe.prototype.get=function(a){var b=x(this.od,a);if(!b)throw Error("No index defined for "+a);return b===re?null:b};function Ge(a,b,c){var d=oa(a.od,function(d,f){var h=x(a.dc,f);H(h,"Missing index implementation for "+f);if(d===re){if(h.yc(b.S)){for(var k=[],m=c.Xb(Nc),l=R(m);l;)l.name!=b.name&&k.push(l),l=R(m);k.push(b);return He(k,ke(h))}return re}h=c.get(b.name);k=d;h&&(k=k.remove(new K(b.name,h)));return k.Ra(b,b.S)});return new Fe(d,a.dc)}
	function Ie(a,b,c){var d=oa(a.od,function(a){if(a===re)return a;var d=c.get(b.name);return d?a.remove(new K(b.name,d)):a});return new Fe(d,a.dc)}var Je=new Fe({".priority":re},{".priority":N});function Ke(){this.set={}}g=Ke.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return Bb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return xa(this.set)};g.count=function(){return qa(this.set)};function Le(a,b){t(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];t(this.set,function(b,c){a.push(c)});return a};function Me(a,b,c,d){this.Zd=a;this.f=bd(a);this.kc=b;this.qb=this.rb=0;this.Wa=oc(b);this.zf=c;this.xc=!1;this.Db=d;this.Yc=function(a){return hc(b,"long_polling",a)}}var Ne,Oe;
	Me.prototype.open=function(a,b){this.Oe=0;this.ja=b;this.df=new Qb(a);this.Bb=!1;var c=this;this.tb=setTimeout(function(){c.f("Timed out trying to connect.");c.eb();c.tb=null},Math.floor(3E4));gd(function(){if(!c.Bb){c.Va=new Pe(function(a,b,d,k,m){Qe(c,arguments);if(c.Va)if(c.tb&&(clearTimeout(c.tb),c.tb=null),c.xc=!0,"start"==a)c.id=b,c.kf=d;else if("close"===a)b?(c.Va.Kd=!1,Rb(c.df,b,function(){c.eb()})):c.eb();else throw Error("Unrecognized command received: "+a);},function(a,b){Qe(c,arguments);
	Sb(c.df,a,b)},function(){c.eb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Va.Qd&&(a.cb=c.Va.Qd);a.v="5";c.zf&&(a.s=c.zf);c.Db&&(a.ls=c.Db);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);Re(c.Va,a,function(){})}})};
	Me.prototype.start=function(){var a=this.Va,b=this.kf;a.dg=this.id;a.eg=b;for(a.Ud=!0;Se(a););a=this.id;b=this.kf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.Yc(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
	Me.isAvailable=function(){return Ne||!Oe&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Ag)&&!0};g=Me.prototype;g.sd=function(){};g.Tc=function(){this.Bb=!0;this.Va&&(this.Va.close(),this.Va=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.tb&&(clearTimeout(this.tb),this.tb=null)};
	g.eb=function(){this.Bb||(this.f("Longpoll is closing itself"),this.Tc(),this.ja&&(this.ja(this.xc),this.ja=null))};g.close=function(){this.Bb||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.rb+=a.length;lc(this.Wa,"bytes_sent",a.length);a=Mb(a);a=ab(a,!0);a=kd(a,1840);for(var b=0;b<a.length;b++){var c=this.Va;c.Qc.push({sg:this.Oe,yg:a.length,Qe:a[b]});c.Ud&&Se(c);this.Oe++}};function Qe(a,b){var c=B(b).length;a.qb+=c;lc(a.Wa,"bytes_received",c)}
	function Pe(a,b,c,d){this.Yc=d;this.kb=c;this.ue=new Ke;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Vc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||E("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.ib=a.contentDocument:a.contentWindow?a.ib=a.contentWindow.document:a.document&&(a.ib=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.ib.open(),this.Ga.ib.write(a),this.Ga.ib.close()}catch(f){E("frame writing exception"),f.stack&&E(f.stack),E(f)}}
	Pe.prototype.close=function(){this.Ud=!1;if(this.Ga){this.Ga.ib.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.kb;b&&(this.kb=null,b())};
	function Se(a){if(a.Ud&&a.Kd&&a.ue.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.dg;b.pw=a.eg;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Qe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.sg+"&ts"+d+"="+e.yg+"&d"+d+"="+e.Qe;d++}else break;Te(a,b+c,a.$d);return!0}return!1}function Te(a,b,c){function d(){a.ue.remove(c);Se(a)}a.ue.add(c,1);var e=setTimeout(d,Math.floor(25E3));Re(a,b,function(){clearTimeout(e);d()})}
	function Re(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ga.ib.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){E("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ga.ib.body.appendChild(d)}}catch(e){}},Math.floor(1))};function Ue(a){Ve(this,a)}var We=[Me,rd];function Ve(a,b){var c=rd&&rd.isAvailable(),d=c&&!(Xb.af||!0===Xb.get("previous_websocket_failure"));b.zg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[rd];else{var e=a.Wc=[];ld(We,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Xe(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function Ye(a,b,c,d,e,f,h){this.id=a;this.f=bd("c:"+this.id+":");this.se=c;this.Mc=d;this.ja=e;this.re=f;this.M=b;this.Ad=[];this.Me=0;this.yf=new Ue(b);this.L=0;this.Db=h;this.f("Connection created");Ze(this)}
	function Ze(a){var b=Xe(a.yf);a.I=new b("c:"+a.id+":"+a.Me++,a.M,void 0,a.Db);a.we=b.responsesRequiredToBeHealthy||0;var c=$e(a,a.I),d=af(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Cb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=setTimeout(function(){a.md=null;a.Cb||(a.I&&102400<a.I.qb?(a.f("Connection exceeded healthy timeout but has received "+a.I.qb+" bytes.  Marking connection healthy."),a.Cb=!0,a.I.sd()):a.I&&10240<a.I.rb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.rb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function af(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.L?1===a.L&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.M.ab.substr(0,2)&&(Xb.remove("host:"+a.M.host),a.M.ab=a.M.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function $e(a,b){return function(c){if(2!=a.L)if(b===a.Rc){var d=id("t",c);c=id("d",c);if("c"==d){if(d=id("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.wf=c.s;gc(a.M,f);0==a.L&&(a.I.start(),bf(a,a.I,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.yf,(c=1<c.Wc.length?c.Wc[1]:null)&&cf(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];df(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.re&&(a.re(c),a.re=null),a.ja=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),gc(a.M,c),1===a.L?a.close():(ef(a),Ze(a))):"e"===d?cd("Server Error: "+c):"o"===d?(a.f("got pong on primary."),ff(a),gf(a)):cd("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=id("t",c),c=id("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?hf(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.uf--,hf(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Ye.prototype.ua=function(a){jf(this,{t:"d",d:a})};function df(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
	function hf(a){0>=a.uf?(a.f("Secondary connection is healthy."),a.Cb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,df(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}Ye.prototype.wd=function(a){ff(this);this.se(a)};function ff(a){a.Cb||(a.we--,0>=a.we&&(a.f("Primary connection is healthy."),a.Cb=!0,a.I.sd()))}
	function cf(a,b){a.D=new b("c:"+a.id+":"+a.Me++,a.M,a.wf);a.uf=b.responsesRequiredToBeHealthy||0;a.D.open($e(a,a.D),af(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function bf(a,b,c){a.f("Realtime connection established.");a.I=b;a.L=1;a.Mc&&(a.Mc(c,a.wf),a.Mc=null);0===a.we?(a.f("Primary connection is healthy."),a.Cb=!0):setTimeout(function(){gf(a)},Math.floor(5E3))}
	function gf(a){a.Cb||1!==a.L||(a.f("sending ping on primary."),jf(a,{t:"c",d:{t:"p",d:{}}}))}function jf(a,b){if(1!==a.L)throw"Connection is not connected";a.Xc.send(b)}Ye.prototype.close=function(){2!==this.L&&(this.f("Closing realtime connection."),this.L=2,ef(this),this.ja&&(this.ja(),this.ja=null))};function ef(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function T(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return T(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function kf(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Lc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Wd(a){return a.o.length-a.Z}function D(a){var b=a.Z;b<a.o.length&&b++;return new L(a.o,b)}function Xd(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
	g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
	g.m=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.o.length};g.ca=function(a){if(Wd(this)!==Wd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Z,c=a.Z;if(Wd(this)>Wd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new L("");function lf(a,b){this.Ta=a.slice();this.Ka=Math.max(1,this.Ta.length);this.Re=b;for(var c=0;c<this.Ta.length;c++)this.Ka+=Nb(this.Ta[c]);mf(this)}lf.prototype.push=function(a){0<this.Ta.length&&(this.Ka+=1);this.Ta.push(a);this.Ka+=Nb(a);mf(this)};lf.prototype.pop=function(){var a=this.Ta.pop();this.Ka-=Nb(a);0<this.Ta.length&&--this.Ka};
	function mf(a){if(768<a.Ka)throw Error(a.Re+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ta.length)throw Error(a.Re+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+nf(a));}function nf(a){return 0==a.Ta.length?"":"in property '"+a.Ta.join(".")+"'"};function of(a){a instanceof pf||dd("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new U(a,C);this.INTERNAL=new qf(this)}var rf={TIMESTAMP:{".sv":"timestamp"}};g=of.prototype;g.app=null;g.nf=function(a){sf(this,"ref");y("database.ref",0,1,arguments.length);return p(a)?this.ba.m(a):this.ba};
	g.pg=function(a){sf(this,"database.refFromURL");y("database.refFromURL",1,1,arguments.length);var b=ed(a);tf("database.refFromURL",b);var c=b.kc;c.host!==this.ta.M.host&&dd("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.M.host+")");return this.nf(b.path.toString())};function sf(a,b){null===a.ta&&dd("Cannot call "+b+" on a deleted database.")}g.Yf=function(){y("database.goOffline",0,0,arguments.length);sf(this,"goOffline");this.ta.bb()};
	g.Zf=function(){y("database.goOnline",0,0,arguments.length);sf(this,"goOnline");this.ta.lc()};Object.defineProperty(of.prototype,"app",{get:function(){return this.ta.app}});function qf(a){this.Za=a}qf.prototype.delete=function(){sf(this.Za,"delete");var a=uf.Wb(),b=this.Za.ta;x(a.nb,b.app.name)!==b&&dd("Database "+b.app.name+" has already been deleted.");b.bb();delete a.nb[b.app.name];this.Za.ta=null;this.Za.ba=null;this.Za=this.Za.INTERNAL=null;return Promise.resolve()};of.prototype.ref=of.prototype.nf;
	of.prototype.refFromURL=of.prototype.pg;of.prototype.goOnline=of.prototype.Zf;of.prototype.goOffline=of.prototype.Yf;qf.prototype["delete"]=qf.prototype.delete;function Qc(){this.k=this.B=null}Qc.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.k)return null;var b=J(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Sc(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Ke);var d=J(b);a.k.contains(d)||a.k.add(d,new Qc);a=a.k.get(d);b=D(b);Sc(a,b,c)}}
	function vf(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){Sc(a,new L(b),c)});return vf(a,b)}return null!==a.k?(c=J(b),b=D(b),a.k.contains(c)&&vf(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Rc(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new L(b.toString()+"/"+a);Rc(e,f,c)})}Qc.prototype.P=function(a){null!==this.k&&Le(this.k,function(b,c){a(b,c)})};var wf=/[\[\].#$\/\u0000-\u001F\u007F]/,xf=/[\[\].#$\u0000-\u001F\u007F]/;function yf(a){return q(a)&&0!==a.length&&!wf.test(a)}function zf(a){return null===a||q(a)||fa(a)&&!fd(a)||ha(a)&&Bb(a,".sv")}function Af(a,b,c,d){d&&!p(b)||Bf(Db(a,1,d),b,c)}
	function Bf(a,b,c){c instanceof L&&(c=new lf(c,a));if(!p(b))throw Error(a+"contains undefined "+nf(c));if(ga(b))throw Error(a+"contains a function "+nf(c)+" with contents: "+b.toString());if(fd(b))throw Error(a+"contains "+b.toString()+" "+nf(c));if(q(b)&&b.length>10485760/3&&10485760<Nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+nf(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Cb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!yf(b)))throw Error(a+" contains an invalid key ("+b+") "+nf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Bf(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+nf(c)+" in addition to actual children.");}}
	function Cf(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!yf(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(kf);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function Df(a,b,c){var d=Db(a,1,!1);if(!ha(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Cb(b,function(a,b){var k=new L(a);Bf(d,b,c.m(k));if(".priority"===Xd(k)&&!zf(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});Cf(d,e)}
	function Ef(a,b,c){if(fd(c))throw Error(Db(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!zf(c))throw Error(Db(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function Ff(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Db(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Gf(a,b){if(p(b)&&!yf(b))throw Error(Db(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function Hf(a,b){if(!q(b)||0===b.length||xf.test(b))throw Error(Db(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function If(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function tf(a,b){var c=b.path.toString(),d;!(d=!q(b.kc.host)||0===b.kc.host.length||!yf(b.kc.oe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(q(c)&&0!==c.length&&!xf.test(c)));if(d)throw Error(Db(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function V(a,b){this.ta=a;this.qa=b}V.prototype.cancel=function(a){y("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);var b=new Hb;this.ta.xd(this.qa,Ib(b,a));return b.ra};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){y("Firebase.onDisconnect().remove",0,1,arguments.length);If("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);var b=new Hb;Jf(this.ta,this.qa,null,Ib(b,a));return b.ra};
	V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){y("Firebase.onDisconnect().set",1,2,arguments.length);If("Firebase.onDisconnect().set",this.qa);Af("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);var c=new Hb;Jf(this.ta,this.qa,a,Ib(c,b));return c.ra};V.prototype.set=V.prototype.set;
	V.prototype.Kb=function(a,b,c){y("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);If("Firebase.onDisconnect().setWithPriority",this.qa);Af("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Ef("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new Hb;Kf(this.ta,this.qa,a,b,Ib(d,c));return d.ra};V.prototype.setWithPriority=V.prototype.Kb;
	V.prototype.update=function(a,b){y("Firebase.onDisconnect().update",1,2,arguments.length);If("Firebase.onDisconnect().update",this.qa);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Df("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
	c=new Hb;Lf(this.ta,this.qa,a,Ib(c,b));return c.ra};V.prototype.update=V.prototype.update;function Mf(a){H(da(a)&&0<a.length,"Requires a non-empty array");this.If=a;this.Ec={}}Mf.prototype.Fe=function(a,b){var c;c=this.Ec[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Je.apply(c[d].Pa,Array.prototype.slice.call(arguments,1))};Mf.prototype.hc=function(a,b,c){Nf(this,a);this.Ec[a]=this.Ec[a]||[];this.Ec[a].push({Je:b,Pa:c});(a=this.We(a))&&b.apply(c,a)};
	Mf.prototype.Jc=function(a,b,c){Nf(this,a);a=this.Ec[a]||[];for(var d=0;d<a.length;d++)if(a[d].Je===b&&(!c||c===a[d].Pa)){a.splice(d,1);break}};function Nf(a,b){H(Oa(a.If,function(a){return a===b}),"Unknown event: "+b)};function Of(){Mf.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.Fe("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.Fe("online",!1))},!1)}}ka(Of,Mf);Of.prototype.We=function(a){H("online"===a,"Unknown event type: "+a);return[this.ic]};ba(Of);function Pf(){Mf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Nb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Nb&&(c.Nb=b,c.Fe("visible",b))},!1)}}ka(Pf,Mf);Pf.prototype.We=function(a){H("visible"===a,"Unknown event type: "+a);return[this.Nb]};ba(Pf);var Qf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);H(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);H(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function Rf(a,b){this.Oa=a;this.ba=b?b:Sf}g=Rf.prototype;g.Ra=function(a,b){return new Rf(this.Oa,this.ba.Ra(a,b,this.Oa).Y(null,null,!1,null,null))};g.remove=function(a){return new Rf(this.Oa,this.ba.remove(a,this.Oa).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.Oa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Tf(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.Oa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Hc=function(){return this.ba.Hc()};g.fc=function(){return this.ba.fc()};g.ia=function(a){return this.ba.ia(a)};
	g.Xb=function(a){return new Uf(this.ba,null,this.Oa,!1,a)};g.Yb=function(a,b){return new Uf(this.ba,a,this.Oa,!1,b)};g.$b=function(a,b){return new Uf(this.ba,a,this.Oa,!0,b)};g.Ye=function(a){return new Uf(this.ba,null,this.Oa,!0,a)};function Uf(a,b,c,d,e){this.Hd=e||null;this.ke=d;this.Sa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.ke?a.left:a.right;else if(0===e){this.Sa.push(a);break}else this.Sa.push(a),a=this.ke?a.right:a.left}
	function R(a){if(0===a.Sa.length)return null;var b=a.Sa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.ke)for(b=b.left;!b.e();)a.Sa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Sa.push(b),b=b.left;return c}function Vf(a){if(0===a.Sa.length)return null;var b;b=a.Sa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function Wf(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Sf;this.right=null!=e?e:Sf}g=Wf.prototype;
	g.Y=function(a,b,c,d,e){return new Wf(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function Xf(a){return a.left.e()?a:Xf(a.left)}g.Hc=function(){return Xf(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
	g.Ra=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ra(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ra(a,b,c));return Yf(e)};function Zf(a){if(a.left.e())return Sf;a.left.fa()||a.left.left.fa()||(a=$f(a));a=a.Y(null,null,null,Zf(a.left),null);return Yf(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=$f(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=ag(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=bg(c),c.left.left.fa()&&(c=ag(c),c=bg(c)));if(0===b(a,c.key)){if(c.right.e())return Sf;d=Xf(c.right);c=c.Y(d.key,d.value,null,null,Zf(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return Yf(c)};g.fa=function(){return this.color};
	function Yf(a){a.right.fa()&&!a.left.fa()&&(a=cg(a));a.left.fa()&&a.left.left.fa()&&(a=ag(a));a.left.fa()&&a.right.fa()&&(a=bg(a));return a}function $f(a){a=bg(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,ag(a.right)),a=cg(a),a=bg(a));return a}function cg(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function ag(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
	function bg(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function dg(){}g=dg.prototype;g.Y=function(){return this};g.Ra=function(a,b){return new Wf(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Hc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var Sf=new dg;function P(a,b,c){this.k=a;(this.aa=b)&&ne(this.aa);a.e()&&H(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.zb=c;this.Eb=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.aa||F};g.ga=function(a){return this.k.e()?this:new P(this.k,a,this.zb)};g.R=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?F:a};g.Q=function(a){var b=J(a);return null===b?this:this.R(b).Q(D(a))};g.Fa=function(a){return null!==this.k.get(a)};
	g.U=function(a,b){H(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new K(a,b),d,e;b.e()?(d=this.k.remove(a),c=Ie(this.zb,c,this.k)):(d=this.k.Ra(a,b),c=Ge(this.zb,c,this.k));e=d.e()?F:this.aa;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;H(".priority"!==J(a)||1===Wd(a),".priority must be the last token in a path");var d=this.R(c).F(D(a),b);return this.U(c,d)};g.e=function(){return this.k.e()};g.Fb=function(){return this.k.count()};
	var eg=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.H(a);c++;e&&eg.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Eb){var a="";this.C().e()||(a+="priority:"+pe(this.C().H())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":Yc(a)}return this.Eb};
	g.Xe=function(a,b,c){return(c=fg(this,c))?(a=Tf(c,new K(a,b)))?a.name:null:Tf(this.k,a)};function le(a,b){var c;c=(c=fg(a,b))?(c=c.Hc())&&c.name:a.k.Hc();return c?new K(c,a.k.get(c)):null}function me(a,b){var c;c=(c=fg(a,b))?(c=c.fc())&&c.name:a.k.fc();return c?new K(c,a.k.get(c)):null}g.P=function(a,b){var c=fg(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.k.ia(b)};g.Xb=function(a){return this.Yb(a.Ic(),a)};
	g.Yb=function(a,b){var c=fg(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.k.Yb(a.name,Nc),d=Vf(c);null!=d&&0>b.compare(d,a);)R(c),d=Vf(c);return c};g.Ye=function(a){return this.$b(a.Gc(),a)};g.$b=function(a,b){var c=fg(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.k.$b(a.name,Nc),d=Vf(c);null!=d&&0<b.compare(d,a);)R(c),d=Vf(c);return c};g.tc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===ue?-1:0};
	g.ob=function(a){if(a===ae||ua(this.zb.dc,a.toString()))return this;var b=this.zb,c=this.k;H(a!==ae,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Nc),f=R(c);f;)e=e||a.yc(f.S),d.push(f),f=R(c);d=e?He(d,ke(a)):re;e=a.toString();c=ya(b.dc);c[e]=a;a=ya(b.od);a[e]=d;return new P(this.k,this.aa,new Fe(a,c))};g.zc=function(a){return a===ae||ua(this.zb.dc,a.toString())};
	g.ca=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().ca(a.C())&&this.k.count()===a.k.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=R(b),d=R(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=R(b);d=R(a)}return null===c&&null===d}return!1};function fg(a,b){return b===ae?null:a.zb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return F;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);H(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Uc(a,M(c));if(a instanceof Array){var d=F,e=a;t(e,function(a,b){if(Bb(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.J()||!c.e())d=
	d.U(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;Cb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new K(a,b)))}});if(0==f.length)return F;var m=He(f,Kc,function(a){return a.name},Mc);if(h){var l=He(f,ke(N));return new P(m,M(c),new Fe({".priority":l},{".priority":N}))}return new P(m,M(c),Je)}var gg=Math.log(2);
	function hg(a){this.count=parseInt(Math.log(a+1)/gg,10);this.Pe=this.count-1;this.Jf=a+1&parseInt(Array(this.count+1).join("1"),2)}function ig(a){var b=!(a.Jf&1<<a.Pe);a.Pe--;return b}
	function He(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new Wf(u,l.S,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new Wf(u,l.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],G=c?c(k):k,z=new Wf(G,k.S,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var G=ig(b),sd=Math.pow(2,b.count-(z+1));G?d(sd,!1):(d(sd,!1),d(sd,!0))}return l}(new hg(a.length));
	return null!==f?new Rf(d||b,f):new Rf(d||b)}function pe(a){return"number"===typeof a?"number:"+md(a):"string:"+a}function ne(a){if(a.J()){var b=a.H();H("string"===typeof b||"number"===typeof b||"object"===typeof b&&Bb(b,".sv"),"Priority must be a string or number.")}else H(a===ue||a.e(),"priority of unexpected type.");H(a===ue||a.C().e(),"Priority nodes can't have a priority of their own.")}var F=new P(new Rf(Mc),null,Je);function jg(){P.call(this,new Rf(Mc),F,Je)}ka(jg,P);g=jg.prototype;
	g.tc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.C=function(){return this};g.R=function(){return F};g.e=function(){return!1};var ue=new jg,se=new K("[MIN_NAME]",F),ye=new K("[MAX_NAME]",ue);function W(a,b,c){this.A=a;this.W=b;this.g=c}W.prototype.H=function(){y("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};W.prototype.val=W.prototype.H;W.prototype.Se=function(){y("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};W.prototype.exportVal=W.prototype.Se;W.prototype.Tf=function(){y("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.Tf;
	W.prototype.m=function(a){y("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));Hf("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.W.m(b);return new W(this.A.Q(b),c,N)};W.prototype.child=W.prototype.m;W.prototype.Fa=function(a){y("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Hf("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.Q(b).e()};W.prototype.hasChild=W.prototype.Fa;
	W.prototype.C=function(){y("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){y("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new W(d,b.W.m(c),N))})};W.prototype.forEach=W.prototype.forEach;
	W.prototype.kd=function(){y("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.kd;W.prototype.getKey=function(){y("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.getKey()};od(W.prototype,"key",W.prototype.getKey);W.prototype.Fb=function(){y("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Fb()};W.prototype.numChildren=W.prototype.Fb;
	W.prototype.xb=function(){y("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};od(W.prototype,"ref",W.prototype.xb);function Ud(a,b){this.O=a;this.Ld=b}function Rd(a,b,c,d){return new Ud(new Dc(b,c,d),a.Ld)}function Vd(a){return a.O.ea?a.O.j():null}Ud.prototype.u=function(){return this.Ld};function Ec(a){return a.Ld.ea?a.Ld.j():null};function kg(a,b){this.W=a;var c=a.n,d=new be(c.g),c=S(c)?new be(c.g):c.xa?new he(c):new ce(c);this.mf=new Ld(c);var e=b.u(),f=b.O,h=d.za(F,e.j(),null),k=c.za(F,f.j(),null);this.Na=new Ud(new Dc(k,f.ea,c.Qa()),new Dc(h,e.ea,d.Qa()));this.$a=[];this.Qf=new Gd(a)}function lg(a){return a.W}g=kg.prototype;g.u=function(){return this.Na.u().j()};g.jb=function(a){var b=Ec(this.Na);return b&&(S(this.W.n)||!a.e()&&!b.R(J(a)).e())?b.Q(a):null};g.e=function(){return 0===this.$a.length};g.Ob=function(a){this.$a.push(a)};
	g.mb=function(a,b){var c=[];if(b){H(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Ja(this.$a,function(a){(a=a.Ne(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.$a.length;++f){var h=this.$a[f];if(!h.matches(a))e.push(h);else if(a.Ze()){e=e.concat(this.$a.slice(f+1));break}}this.$a=e}else this.$a=[];return c};
	g.gb=function(a,b,c){a.type===Dd&&null!==a.source.Ib&&(H(Ec(this.Na),"We should always have a full cache before handling merges"),H(Vd(this.Na),"Missing event cache, even though we have a server cache"));var d=this.Na;a=this.mf.gb(d,a,b,c);b=this.mf;c=a.Sd;H(c.O.j().zc(b.V.g),"Event snap not indexed");H(c.u().j().zc(b.V.g),"Server snap not indexed");H(Hc(a.Sd.u())||!Hc(d.u()),"Once a server snap is complete, it should never go back");this.Na=a.Sd;return mg(this,a.Kf,a.Sd.O.j(),null)};
	function ng(a,b){var c=a.Na.O,d=[];c.j().J()||c.j().P(N,function(a,b){d.push(new I("child_added",b,a))});c.ea&&d.push(Fc(c.j()));return mg(a,d,c.j(),b)}function mg(a,b,c,d){return Hd(a.Qf,b,c,d?[d]:a.$a)};function og(a,b,c){this.Qb=a;this.sb=b;this.ub=c||null}g=og.prototype;g.rf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new xc("value",this,new W(a.Ma,b.xb(),c))};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.Qb;return function(){d.call(b,a.Md)}};g.Ne=function(a,b){return this.sb?new yc(this,a,b):null};
	g.matches=function(a){return a instanceof og?a.Qb&&this.Qb?a.Qb===this.Qb&&a.ub===this.ub:!0:!1};g.Ze=function(){return null!==this.Qb};function pg(a,b,c){this.ha=a;this.sb=b;this.ub=c}g=pg.prototype;g.rf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.Ne=function(a,b){return this.sb?new yc(this,a,b):null};
	g.createEvent=function(a,b){H(null!=a.Ya,"Child events should have a childName.");var c=b.xb().m(a.Ya);return new xc(a.type,this,new W(a.Ma,c,b.n.g),a.Dd)};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){H(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.ha[a.gd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof pg){if(!this.ha||!a.ha)return!0;if(this.ub===a.ub){var b=qa(a.ha);if(b===qa(this.ha)){if(1===b){var b=ra(a.ha),c=ra(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return pa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.Ze=function(){return null!==this.ha};function X(a,b,c,d){this.w=a;this.path=b;this.n=c;this.Oc=d}
	function qg(a){var b=null,c=null;a.ka&&(b=ee(a));a.na&&(c=ge(a));if(a.g===ae){if(a.ka){if("[MIN_NAME]"!=de(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=fe(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!zf(b)||null!=c&&!zf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(H(a.g instanceof te||a.g===ze,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function rg(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.oc))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function sg(a,b){if(!0===a.Oc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.xb=function(){y("Query.ref",0,0,arguments.length);return new U(this.w,this.path)};
	g.hc=function(a,b,c,d){y("Query.on",2,4,arguments.length);Ff("Query.on",a,!1);A("Query.on",2,b,!1);var e=tg("Query.on",c,d);if("value"===a)ug(this.w,this,new og(b,e.cancel||null,e.Pa||null));else{var f={};f[a]=b;ug(this.w,this,new pg(f,e.cancel,e.Pa))}return b};
	g.Jc=function(a,b,c){y("Query.off",0,3,arguments.length);Ff("Query.off",a,!0);A("Query.off",2,b,!0);Eb("Query.off",3,c);var d=null,e=null;"value"===a?d=new og(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new pg(e,null,c||null));e=this.w;d=".info"===J(this.path)?e.pd.mb(this,d):e.K.mb(this,d);tc(e.da,this.path,d)};
	g.ig=function(a,b){function c(k){f&&(f=!1,e.Jc(a,c),b&&b.call(d.Pa,k),h.resolve(k))}y("Query.once",1,4,arguments.length);Ff("Query.once",a,!1);A("Query.once",2,b,!0);var d=tg("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new Hb;Jb(h.ra);this.hc(a,c,function(b){e.Jc(a,c);d.cancel&&d.cancel.call(d.Pa,b);h.reject(b)});return h.ra};
	g.me=function(a){y("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.w,this.path,this.n.me(a),this.Oc)};
	g.ne=function(a){y("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.w,this.path,this.n.ne(a),this.Oc)};
	g.jg=function(a){y("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Hf("Query.orderByChild",a);sg(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new te(b);b=De(this.n,b);qg(b);return new X(this.w,this.path,b,!0)};g.kg=function(){y("Query.orderByKey",0,0,arguments.length);sg(this,"Query.orderByKey");var a=De(this.n,ae);qg(a);return new X(this.w,this.path,a,!0)};g.lg=function(){y("Query.orderByPriority",0,0,arguments.length);sg(this,"Query.orderByPriority");var a=De(this.n,N);qg(a);return new X(this.w,this.path,a,!0)};
	g.mg=function(){y("Query.orderByValue",0,0,arguments.length);sg(this,"Query.orderByValue");var a=De(this.n,ze);qg(a);return new X(this.w,this.path,a,!0)};g.Nd=function(a,b){y("Query.startAt",0,2,arguments.length);Af("Query.startAt",a,this.path,!0);Gf("Query.startAt",b);var c=this.n.Nd(a,b);rg(c);qg(c);if(this.n.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new X(this.w,this.path,c,this.Oc)};
	g.fd=function(a,b){y("Query.endAt",0,2,arguments.length);Af("Query.endAt",a,this.path,!0);Gf("Query.endAt",b);var c=this.n.fd(a,b);rg(c);qg(c);if(this.n.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.w,this.path,c,this.Oc)};
	g.Pf=function(a,b){y("Query.equalTo",1,2,arguments.length);Af("Query.equalTo",a,this.path,!1);Gf("Query.equalTo",b);if(this.n.ka)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).fd(a,b)};
	g.toString=function(){y("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.w.toString()+(b||"/")};g.ya=function(){var a=jd(Ee(this.n));return"{}"===a?"default":a};
	function tg(a,b,c){var d={cancel:null,Pa:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Pa=c,Eb(a,4,d.Pa);else if(b)if("object"===typeof b&&null!==b)d.Pa=b;else if("function"===typeof b)d.cancel=b;else throw Error(Db(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.hc;X.prototype.off=X.prototype.Jc;X.prototype.once=X.prototype.ig;X.prototype.limitToFirst=X.prototype.me;X.prototype.limitToLast=X.prototype.ne;X.prototype.orderByChild=X.prototype.jg;
	X.prototype.orderByKey=X.prototype.kg;X.prototype.orderByPriority=X.prototype.lg;X.prototype.orderByValue=X.prototype.mg;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.fd;X.prototype.equalTo=X.prototype.Pf;X.prototype.toString=X.prototype.toString;od(X.prototype,"ref",X.prototype.xb);function vg(a,b){this.value=a;this.children=b||wg}var wg=new Rf(function(a,b){return a===b?0:a<b?-1:1});function xg(a){var b=Q;t(a,function(a,d){b=b.set(new L(d),a)});return b}g=vg.prototype;g.e=function(){return null===this.value&&this.children.e()};function yg(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=yg(a,D(b),c),null!=b?{path:(new L(d)).m(b.path),value:b.value}:null):null}
	function zg(a,b){return yg(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new vg(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Ra(c,d);return new vg(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new vg(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Ra(b,a),null===this.value&&b.e()?Q:new vg(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
	function $d(a,b,c){if(b.e())return c;var d=J(b);b=$d(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Ra(d,b);return new vg(a.value,d)}function Ag(a,b){return Bg(a,C,b)}function Bg(a,b,c){var d={};a.children.ia(function(a,f){d[a]=Bg(f,b.m(a),c)});return c(b,a.value,d)}function Cg(a,b,c){return Dg(a,b,C,c)}function Dg(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?Dg(a,D(b),c.m(e),d):null}
	function Eg(a,b,c){Fg(a,b,C,c)}function Fg(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?Fg(a,D(b),c.m(e),d):Q}function Yd(a,b){Gg(a,C,b)}function Gg(a,b,c){a.children.ia(function(a,e){Gg(e,b.m(a),c)});a.value&&c(b,a.value)}function Hg(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Q=new vg(null);vg.prototype.toString=function(){var a={};Yd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Ig(a,b,c){this.type=Qd;this.source=Jg;this.path=a;this.Pb=b;this.Id=c}Ig.prototype.Nc=function(a){if(this.path.e()){if(null!=this.Pb.value)return H(this.Pb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Pb.subtree(new L(a));return new Ig(C,a,this.Id)}H(J(this.path)===a,"operationForChild called for unrelated child.");return new Ig(D(this.path),this.Pb,this.Id)};
	Ig.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Pb+")"};var $b=0,Dd=1,Qd=2,bc=3;function Kg(a,b,c,d){this.ee=a;this.Ue=b;this.Ib=c;this.De=d;H(!d||b,"Tagged queries must be from server.")}var Jg=new Kg(!0,!1,null,!1),Lg=new Kg(!1,!0,null,!1);Kg.prototype.toString=function(){return this.ee?"user":this.De?"server(queryID="+this.Ib+")":"server"};function Mg(a){this.X=a}var Ng=new Mg(new vg(null));function Og(a,b,c){if(b.e())return new Mg(new vg(c));var d=zg(a.X,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.F(b,c);return new Mg(a.X.set(e,d))}a=$d(a.X,b,new vg(c));return new Mg(a)}function Pg(a,b,c){var d=a;Cb(c,function(a,c){d=Og(d,b.m(a),c)});return d}Mg.prototype.Ed=function(a){if(a.e())return Ng;a=$d(this.X,a,Q);return new Mg(a)};function Qg(a,b){var c=zg(a.X,b);return null!=c?a.X.get(c.path).Q(T(c.path,b)):null}
	function Rg(a){var b=[],c=a.X.value;null!=c?c.J()||c.P(N,function(a,c){b.push(new K(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new K(a,c.value))});return b}function Sg(a,b){if(b.e())return a;var c=Qg(a,b);return null!=c?new Mg(new vg(c)):new Mg(a.X.subtree(b))}Mg.prototype.e=function(){return this.X.e()};Mg.prototype.apply=function(a){return Tg(C,this.X,a)};
	function Tg(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(H(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Tg(a.m(b),f,c)});c.Q(a).e()||null===d||(c=c.F(a.m(".priority"),d));return c};function Ug(){this.Aa={}}g=Ug.prototype;g.e=function(){return xa(this.Aa)};g.gb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=x(this.Aa,d),H(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];t(this.Aa,function(d){e=e.concat(d.gb(a,b,c))});return e};g.Ob=function(a,b,c,d,e){var f=a.ya(),h=x(this.Aa,f);if(!h){var h=c.Ba(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.sc(d):F,k=!1);h=new kg(a,new Ud(new Dc(h,k,!1),new Dc(d,e,!1)));this.Aa[f]=h}h.Ob(b);return ng(h,b)};
	g.mb=function(a,b,c){var d=a.ya(),e=[],f=[],h=null!=Vg(this);if("default"===d){var k=this;t(this.Aa,function(a,d){f=f.concat(a.mb(b,c));a.e()&&(delete k.Aa[d],S(a.W.n)||e.push(a.W))})}else{var m=x(this.Aa,d);m&&(f=f.concat(m.mb(b,c)),m.e()&&(delete this.Aa[d],S(m.W.n)||e.push(m.W)))}h&&null==Vg(this)&&e.push(new U(a.w,a.path));return{qg:e,Rf:f}};function Wg(a){return Ka(sa(a.Aa),function(a){return!S(a.W.n)})}g.jb=function(a){var b=null;t(this.Aa,function(c){b=b||c.jb(a)});return b};
	function Xg(a,b){if(S(b.n))return Vg(a);var c=b.ya();return x(a.Aa,c)}function Vg(a){return wa(a.Aa,function(a){return S(a.W.n)})||null};function Yg(){this.T=Ng;this.la=[];this.Cc=-1}function Zg(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Yg.prototype;
	g.Ed=function(a){var b=Pa(this.la,function(b){return b.Zc===a});H(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&$g(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=ah(this.la,bh,C),this.Cc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ja)this.T=this.T.Ed(c.path);else{var k=this;t(c.children,function(a,b){k.T=k.T.Ed(c.path.m(b))})}return!0}return!1};
	g.Ba=function(a,b,c,d){if(c||d){var e=Sg(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Qg(e,C)?(e=ah(this.la,function(b){return(b.visible||d)&&(!c||!(0<=Ia(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||F,e.apply(b)):null}e=Qg(this.T,a);if(null!=e)return e;e=Sg(this.T,a);return e.e()?b:null!=b||null!=Qg(e,C)?(b=b||F,e.apply(b)):null};
	g.sc=function(a,b){var c=F,d=Qg(this.T,a);if(d)d.J()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=Sg(this.T,a);b.P(N,function(a,b){var d=Sg(e,new L(a)).apply(b);c=c.U(a,d)});Ja(Rg(e),function(a){c=c.U(a.name,a.S)})}else e=Sg(this.T,a),Ja(Rg(e),function(a){c=c.U(a.name,a.S)});return c};g.$c=function(a,b,c,d){H(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.m(b);if(null!=Qg(this.T,a))return null;a=Sg(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
	g.rc=function(a,b,c){a=a.m(b);var d=Qg(this.T,a);return null!=d?d:Cc(c,b)?Sg(this.T,a).apply(c.j().R(b)):null};g.mc=function(a){return Qg(this.T,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Sg(this.T,a);h=Qg(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.ob(f);if(h.e()||h.J())return[];b=[];a=ke(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=R(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=R(e);return b};
	function $g(a,b){return a.Ja?a.path.contains(b):!!va(a.children,function(c,d){return a.path.m(d).contains(b)})}function bh(a){return a.visible}
	function ah(a,b,c){for(var d=Ng,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ja)c.contains(h)?(h=T(c,h),d=Og(d,h,f.Ja)):h.contains(c)&&(h=T(h,c),d=Og(d,C,f.Ja.Q(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=Pg(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=Pg(d,C,f.children);else if(f=x(f.children,J(h)))f=f.Q(D(h)),d=Og(d,C,f)}else throw Wc("WriteRecord should have .snap or .children");}}return d}function ch(a,b){this.Mb=a;this.X=b}g=ch.prototype;
	g.Ba=function(a,b,c){return this.X.Ba(this.Mb,a,b,c)};g.sc=function(a){return this.X.sc(this.Mb,a)};g.$c=function(a,b,c){return this.X.$c(this.Mb,a,b,c)};g.mc=function(a){return this.X.mc(this.Mb.m(a))};g.Xd=function(a,b,c,d,e){return this.X.Xd(this.Mb,a,b,c,d,e)};g.rc=function(a,b){return this.X.rc(this.Mb,a,b)};g.m=function(a){return new ch(this.Mb.m(a),this.X)};function dh(){this.children={};this.ad=0;this.value=null}function eh(a,b,c){this.ud=a?a:"";this.Ha=b?b:null;this.A=c?c:new dh}function fh(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=J(c));)d=new eh(e,d,x(d.A.children,e)||new dh),c=D(c);return d}g=eh.prototype;g.Ea=function(){return this.A.value};function gh(a,b){H("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;hh(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.ad=0;hh(this)};
	g.kd=function(){return 0<this.A.ad};g.e=function(){return null===this.Ea()&&!this.kd()};g.P=function(a){var b=this;t(this.A.children,function(c,d){a(new eh(d,b,c))})};function ih(a,b,c,d){c&&!d&&b(a);a.P(function(a){ih(a,b,!0,d)});c&&d&&b(a)}function jh(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Ha?this.ud:this.Ha.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Ha};
	function hh(a){if(null!==a.Ha){var b=a.Ha,c=a.ud,d=a.e(),e=Bb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.ad--,hh(b)):d||e||(b.A.children[c]=a.A,b.A.ad++,hh(b))}};function kh(a,b,c,d,e,f){this.id=lh++;this.f=bd("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Pc=0;this.Lc=[];this.ma=!1;this.fb=1E3;this.td=3E5;this.Hb=b;this.Kc=c;this.te=d;this.M=a;this.pb=this.Ia=this.Db=this.ye=null;this.Vd=e;this.de=!1;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Ie=f||null;this.vb=null;this.Nb=!1;this.Gd={};this.rg=0;this.Te=!0;this.Bc=this.le=null;mh(this,0);Pf.Wb().hc("visible",this.hg,this);-1===a.host.indexOf("fblocal")&&
	Of.Wb().hc("online",this.gg,this)}var lh=0,nh=0;g=kh.prototype;g.ua=function(a,b,c){var d=++this.rg;a={r:d,a:a,b:b};this.f(B(a));H(this.ma,"sendRequest call when we're not connected not allowed.");this.Ia.ua(a);c&&(this.Gd[d]=c)};
	g.bf=function(a,b,c,d){var e=a.ya(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};H(zd(a.n)||!S(a.n),"listen() called for non-default but complete query");H(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,ng:a,tag:c};this.$[f][e]=a;this.ma&&oh(this,a)};
	function oh(a,b){var c=b.ng,d=c.path.toString(),e=c.ya();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ee(c.n),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&Bb(k,"w")){var l=x(k,"w");da(l)&&0<=Ia(l,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==m&&ph(a,d,e),b.G&&b.G(m,
	k))})}g.of=function(a){this.pb=a;this.f("Auth token refreshed");this.pb?qh(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||pd(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function qh(a){if(a.ma&&a.pb){var b=a.pb,c={cred:b};a.Ie&&(c.authvar=a.Ie);a.ua("auth",c,function(c){var e=c.s;c=c.d||"error";"ok"!==e&&a.pb===b&&rh(a,e,c)})}}
	g.Cf=function(a,b){var c=a.path.toString(),d=a.ya();this.f("Unlisten called for "+c+" "+d);H(zd(a.n)||!S(a.n),"unlisten() called for non-default but complete query");if(ph(this,c,d)&&this.ma){var e=Ee(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.qe=function(a,b,c){this.ma?sh(this,"o",a,b,c):this.Lc.push({ve:a,action:"o",data:b,G:c})};g.ef=function(a,b,c){this.ma?sh(this,"om",a,b,c):this.Lc.push({ve:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.ma?sh(this,"oc",a,null,b):this.Lc.push({ve:a,action:"oc",data:null,G:b})};function sh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){th(this,"p",a,b,c,d)};g.cf=function(a,b,c,d){th(this,"m",a,b,c,d)};function th(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.pa.push({action:b,qf:d,G:e});a.Pc++;b=a.pa.length-1;a.ma?uh(a,b):a.f("Buffering put: "+c)}
	function uh(a,b){var c=a.pa[b].action,d=a.pa[b].qf,e=a.pa[b].G;a.pa[b].og=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Pc--;0===a.Pc&&(a.pa=[]);e&&e(d.s,d.d)})}g.xe=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Hb(a.p,a.d,!1,a.t):"m"===b?this.Hb(a.p,a.d,!0,a.t):"c"===b?vh(this,a.p,a.q):"ac"===b?rh(this,a.s,a.d):"sd"===b?this.ye?this.ye(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):cd("Unrecognized action received from server: "+
	B(b)+"\nAre you using the latest client?"))}};
	g.Mc=function(a,b){this.f("connection ready");this.ma=!0;this.Bc=(new Date).getTime();this.te({serverTimeOffset:a-(new Date).getTime()});this.Db=b;if(this.Te){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;"undefined"!==typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")?c["framework.cordova"]=1:"object"===typeof navigator&&
	"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.xe(c)}wh(this);this.Te=!1;this.Kc(!0)};function mh(a,b){H(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.vb&&clearTimeout(a.vb);a.vb=setTimeout(function(){a.vb=null;xh(a)},Math.floor(b))}g.hg=function(a){a&&!this.Nb&&this.fb===this.td&&(this.f("Window became visible.  Reducing delay."),this.fb=1E3,this.Ia||mh(this,0));this.Nb=a};
	g.gg=function(a){a?(this.f("Browser went online."),this.fb=1E3,this.Ia||mh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
	g.gf=function(){this.f("data client disconnected");this.ma=!1;this.Ia=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.qf&&b.og&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Pc--)}0===this.Pc&&(this.pa=[]);this.Gd={};yh(this)&&(this.Nb?this.Bc&&(3E4<(new Date).getTime()-this.Bc&&(this.fb=1E3),this.Bc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.fb=this.td,this.le=(new Date).getTime()),a=Math.max(0,this.fb-((new Date).getTime()-this.le)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),mh(this,a),this.fb=Math.min(this.td,1.3*this.fb));this.Kc(!1)};
	function xh(a){if(yh(a)){a.f("Making a connection attempt");a.le=(new Date).getTime();a.Bc=null;var b=r(a.wd,a),c=r(a.Mc,a),d=r(a.gf,a),e=a.id+":"+nh++,f=a.Db,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Ia={close:m,ua:function(a){H(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var l=a.de;a.de=!1;a.Vd.getToken(l).then(function(l){h?E("getToken() completed but was canceled"):(E("getToken() completed. Creating connection."),a.pb=l&&l.accessToken,k=new Ye(e,a.M,b,c,d,function(b){O(b+
	" ("+a.M.toString()+")");a.bb("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.bb=function(a){E("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Ia?this.Ia.close():(this.vb&&(clearTimeout(this.vb),this.vb=null),this.ma&&this.gf())};g.lc=function(a){E("Resuming connection for reason: "+a);delete this.qd[a];xa(this.qd)&&(this.fb=1E3,this.Ia||mh(this,0))};
	function vh(a,b,c){c=c?La(c,function(a){return jd(a)}).join("$"):"default";(a=ph(a,b,c))&&a.G&&a.G("permission_denied")}function ph(a,b,c){b=(new L(b)).toString();var d;p(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===qa(a.$[b])&&delete a.$[b]):d=void 0;return d}function rh(a,b,c){E("Auth token revoked: "+b+"/"+c);a.pb=null;a.de=!0;a.Ia.close()}
	function wh(a){qh(a);t(a.$,function(b){t(b,function(b){oh(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&uh(a,b);for(;a.Lc.length;)b=a.Lc.shift(),sh(a,b.action,b.ve,b.data,b.G)}function yh(a){var b;b=Of.Wb().ic;return xa(a.qd)&&b};var Y={Vf:function(){Ne=td=!0}};Y.forceLongPolling=Y.Vf;Y.Wf=function(){Oe=!0};Y.forceWebSockets=Y.Wf;Y.bg=function(){return rd.isAvailable()};Y.isWebSocketsAvailable=Y.bg;Y.ug=function(a,b){a.w.Ua.ye=b};Y.setSecurityDebugCallback=Y.ug;Y.Ae=function(a,b){a.w.Ae(b)};Y.stats=Y.Ae;Y.Be=function(a,b){a.w.Be(b)};Y.statsIncrementCounter=Y.Be;Y.ed=function(a){return a.w.ed};Y.dataUpdateCount=Y.ed;Y.ag=function(a,b){a.w.je=b};Y.interceptServerData=Y.ag;function zh(a){this.wa=Q;this.lb=new Yg;this.Ce={};this.jc={};this.Dc=a}function Ah(a,b,c,d,e){var f=a.lb,h=e;H(d>f.Cc,"Stacking an older write on top of newer ones");p(h)||(h=!0);f.la.push({path:b,Ja:c,Zc:d,visible:h});h&&(f.T=Og(f.T,b,c));f.Cc=d;return e?Bh(a,new Zb(Jg,b,c)):[]}function Ch(a,b,c,d){var e=a.lb;H(d>e.Cc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.T=Pg(e.T,b,c);e.Cc=d;c=xg(c);return Bh(a,new Cd(Jg,b,c))}
	function Dh(a,b,c){c=c||!1;var d=Zg(a.lb,b);if(a.lb.Ed(b)){var e=Q;null!=d.Ja?e=e.set(C,!0):Cb(d.children,function(a,b){e=e.set(new L(a),b)});return Bh(a,new Ig(d.path,e,c))}return[]}function Eh(a,b,c){c=xg(c);return Bh(a,new Cd(Lg,b,c))}function Fh(a,b,c,d){d=Gh(a,d);if(null!=d){var e=Hh(d);d=e.path;e=e.Ib;b=T(d,b);c=new Zb(new Kg(!1,!0,e,!0),b,c);return Ih(a,d,c)}return[]}
	function Jh(a,b,c,d){if(d=Gh(a,d)){var e=Hh(d);d=e.path;e=e.Ib;b=T(d,b);c=xg(c);c=new Cd(new Kg(!1,!0,e,!0),b,c);return Ih(a,d,c)}return[]}
	zh.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;Eg(this.wa,c,function(a,b){var f=T(a,c);d=d||b.jb(f);e=e||null!=Vg(b)});var f=this.wa.get(c);f?(e=e||null!=Vg(f),d=d||f.jb(C)):(f=new Ug,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=F,Hg(this.wa.subtree(c),function(a,b){var c=b.jb(C);c&&(d=d.U(a,c))}));var k=null!=Xg(f,a);if(!k&&!S(a.n)){var m=Kh(a);H(!(m in this.jc),"View does not exist, but we have a tag");var l=Lh++;this.jc[m]=l;this.Ce["_"+l]=m}h=f.Ob(a,b,new ch(c,this.lb),d,h);k||
	e||(f=Xg(f,a),h=h.concat(Mh(this,a,f)));return h};
	zh.prototype.mb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ya()||null!=Xg(e,a))){f=e.mb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.qg;f=f.Rf;b=-1!==Pa(e,function(a){return S(a.n)});var h=Cg(this.wa,d,function(a,b){return null!=Vg(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=Nh(d),k=0;k<d.length;++k){var m=d[k],l=m.W,m=Oh(this,m);this.Dc.ze(Ph(l),Qh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Dc.Od(Ph(a),null);else{var u=this;Ja(e,function(a){a.ya();
	var b=u.jc[Kh(a)];u.Dc.Od(Ph(a),b)})}Rh(this,e)}return f};zh.prototype.Ba=function(a,b){var c=this.lb,d=Cg(this.wa,a,function(b,c){var d=T(b,a);if(d=c.jb(d))return d});return c.Ba(a,d,b,!0)};function Nh(a){return Ag(a,function(a,c,d){if(c&&null!=Vg(c))return[Vg(c)];var e=[];c&&(e=Wg(c));t(d,function(a){e=e.concat(a)});return e})}function Rh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.n)){var d=Kh(d),e=a.jc[d];delete a.jc[d];delete a.Ce["_"+e]}}}
	function Ph(a){return S(a.n)&&!zd(a.n)?a.xb():a}function Mh(a,b,c){var d=b.path,e=Qh(a,b);c=Oh(a,c);b=a.Dc.ze(Ph(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)H(null==Vg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ag(d,function(a,b,c){if(!a.e()&&b&&null!=Vg(b))return[lg(Vg(b))];var d=[];b&&(d=d.concat(La(Wg(b),function(a){return a.W})));t(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Dc.Od(Ph(c),Qh(a,c));return b}
	function Oh(a,b){var c=b.W,d=Qh(a,c);return{ld:function(){return(b.u()||F).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=Gh(a,d)){var h=Hh(b);b=h.path;h=h.Ib;f=T(b,f);f=new ac(new Kg(!1,!0,h,!0),f);b=Ih(a,b,f)}else b=[]}else b=Bh(a,new ac(Lg,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.mb(c,null,f)}}}function Kh(a){return a.path.toString()+"$"+a.ya()}function Hh(a){var b=a.indexOf("$");H(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new L(a.substr(0,b))}}function Gh(a,b){var c=a.Ce,d="_"+b;return d in c?c[d]:void 0}function Qh(a,b){var c=Kh(b);return x(a.jc,c)}var Lh=1;
	function Ih(a,b,c){var d=a.wa.get(b);H(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new ch(b,a.lb),null)}function Bh(a,b){return Sh(a,b,a.wa,null,new ch(C,a.lb))}function Sh(a,b,c,d,e){if(b.path.e())return Th(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[],k=J(b.path),m=b.Nc(k);if((c=c.children.get(k))&&m)var l=d?d.R(k):null,k=e.m(k),h=h.concat(Sh(a,m,c,l,k));f&&(h=h.concat(f.gb(b,e,d)));return h}
	function Th(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[];c.children.ia(function(c,f){var l=d?d.R(c):null,u=e.m(c),z=b.Nc(c);z&&(h=h.concat(Th(a,z,f,l,u)))});f&&(h=h.concat(f.gb(b,e,d)));return h};function pf(a,b,c){this.app=c;var d=new cc(c);this.M=a;this.Wa=oc(a);this.Vc=null;this.da=new qc;this.vd=1;this.Ua=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new xd(this.M,r(this.Hb,this),d),setTimeout(r(this.Kc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==ca(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ua=new kh(this.M,r(this.Hb,this),r(this.Kc,this),r(this.te,this),d,b)}var f=this;dc(d,function(a){f.va.of(a)});this.wg=pc(a,r(function(){return new ic(this.Wa,this.va)},this));this.nc=new eh;this.ie=new ec;this.pd=new zh({ze:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=Bh(f.pd,new Zb(Lg,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:aa});Uh(this,"connected",!1);this.ja=new Qc;this.Za=new of(this);this.ed=
	0;this.je=null;this.K=new zh({ze:function(a,b,c,d){f.va.bf(a,c,b,function(b,c){var e=d(b,c);vc(f.da,a.path,e)});return[]},Od:function(a,b){f.va.Cf(a,b)}})}g=pf.prototype;g.toString=function(){return(this.M.Sc?"https://":"http://")+this.M.host};g.name=function(){return this.M.oe};function Vh(a){a=a.ie.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Wh(a){a=a={timestamp:Vh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Hb=function(a,b,c,d){this.ed++;var e=new L(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=oa(b,function(a){return M(a)}),a=Jh(this.K,e,b,d)):(b=M(b),a=Fh(this.K,e,b,d)):c?(d=oa(b,function(a){return M(a)}),a=Eh(this.K,e,d)):(d=M(b),a=Bh(this.K,new Zb(Lg,e,d)));d=e;0<a.length&&(d=Xh(this,e));vc(this.da,d,a)};g.Kc=function(a){Uh(this,"connected",a);!1===a&&Yh(this)};g.te=function(a){var b=this;ld(a,function(a,d){Uh(b,d,a)})};
	function Uh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=Bh(a.pd,new Zb(Lg,b,c));vc(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Cg:c});var e=Wh(this);b=M(b,c);var e=Tc(b,e),f=this.vd++,e=Ah(this.K,a,e,f,!0);rc(this.da,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=Dh(h.K,f,!e);vc(h.da,a,e);Zh(d,b,c)});e=$h(this,a);Xh(this,e);vc(this.da,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Wh(this),f={};t(b,function(a,b){d=!1;var c=M(a);f[b]=Tc(c,e)});if(d)E("update() called with empty data.  Don't do anything."),Zh(c,"ok");else{var h=this.vd++,k=Ch(this.K,a,f,h);rc(this.da,k);var m=this;this.va.cf(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=Dh(m.K,h,!e),f=a;0<e.length&&(f=Xh(m,a));vc(m.da,f,e);Zh(c,b,d)});b=$h(this,a);Xh(this,b);vc(this.da,a,[])}};
	function Yh(a){a.f("onDisconnectEvents");var b=Wh(a),c=[];Rc(Pc(a.ja,b),C,function(b,e){c=c.concat(Bh(a.K,new Zb(Lg,b,e)));var f=$h(a,b);Xh(a,f)});a.ja=new Qc;vc(a.da,C,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&vf(c.ja,a);Zh(b,d,e)})};function Jf(a,b,c,d){var e=M(c);a.va.qe(b.toString(),e.H(!0),function(c,h){"ok"===c&&Sc(a.ja,b,e);Zh(d,c,h)})}function Kf(a,b,c,d,e){var f=M(c,d);a.va.qe(b.toString(),f.H(!0),function(c,d){"ok"===c&&Sc(a.ja,b,f);Zh(e,c,d)})}
	function Lf(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(E("onDisconnect().update() called with empty data.  Don't do anything."),Zh(d,"ok")):a.va.ef(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=M(c[m]);Sc(a.ja,b.m(m),l)}Zh(d,e,f)})}function ug(a,b,c){c=".info"===J(b.path)?a.pd.Ob(b,c):a.K.Ob(b,c);tc(a.da,b.path,c)}g.bb=function(){this.Ua&&this.Ua.bb("repo_interrupt")};g.lc=function(){this.Ua&&this.Ua.lc("repo_interrupt")};
	g.Ae=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new jc(this.Wa)),a=this.Vc.get()):a=this.Wa.get();var b=Ma(ta(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Be=function(a){lc(this.Wa,a);this.wg.xf[a]=!0};g.f=function(a){var b="";this.Ua&&(b=this.Ua.id+":");E(b,arguments)};
	function Zh(a,b,c){a&&Tb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ai(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.hc("value",f);c={path:b,update:c,G:d,status:null,jf:Vc(),He:e,tf:0,Rd:function(){h.Jc("value",f)},Td:null,Da:null,bd:null,cd:null,dd:null};d=a.K.Ba(b,void 0)||F;c.bd=d;d=c.update(d.H());if(p(d)){Bf("transaction failed: Data returned ",d,c.path);c.status=1;e=fh(a.nc,b);var k=e.Ea()||[];k.push(c);gh(e,k);"object"===typeof d&&null!==d&&Bb(d,".priority")?(k=x(d,".priority"),H(zf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Ba(b)||F).C().H();e=Wh(a);d=M(d,k);e=Tc(d,e);c.cd=d;c.dd=e;c.Da=a.vd++;c=Ah(a.K,b,e,c.Da,c.He);vc(a.da,b,c);bi(a)}else c.Rd(),c.cd=null,c.dd=null,c.G&&(a=new W(c.bd,new U(a,c.path),N),c.G(null,!1,a))}function bi(a,b){var c=b||a.nc;b||ci(a,c);if(null!==c.Ea()){var d=di(a,c);H(0<d.length,"Sending zero length transaction queue");Na(d,function(a){return 1===a.status})&&ei(a,c.path(),d)}else c.kd()&&c.P(function(b){bi(a,b)})}
	function ei(a,b,c){for(var d=La(c,function(a){return a.Da}),e=a.K.Ba(b,d)||F,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];H(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.tf++;var k=T(b,h.path),d=d.F(k,h.cd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(Dh(a.K,c[f].Da));if(c[f].G){var h=c[f].dd,k=new U(a,c[f].path);d.push(r(c[f].G,
	null,null,!0,new W(h,k,N)))}c[f].Rd()}ci(a,fh(a.nc,b));bi(a);vc(a.da,b,e);for(f=0;f<d.length;f++)Tb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Xh(a,b)}},e)}function Xh(a,b){var c=fi(a,b),d=c.path(),c=di(a,c);gi(a,c,d);return d}
	function gi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=La(b,function(a){return a.Da}),h=0;h<b.length;h++){var k=b[h],m=T(c,k.path),l=!1,u;H(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(Dh(a.K,k.Da,!0));else if(1===k.status)if(25<=k.tf)l=!0,u="maxretry",e=e.concat(Dh(a.K,k.Da,!0));else{var z=a.K.Ba(k.path,f)||F;k.bd=z;var G=b[h].update(z.H());p(G)?(Bf("transaction failed: Data returned ",G,k.path),m=M(G),"object"===typeof G&&null!=
	G&&Bb(G,".priority")||(m=m.ga(z.C())),z=k.Da,G=Wh(a),G=Tc(m,G),k.cd=m,k.dd=G,k.Da=a.vd++,Qa(f,z),e=e.concat(Ah(a.K,k.path,G,k.Da,k.He)),e=e.concat(Dh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(Dh(a.K,k.Da,!0)))}vc(a.da,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(r(b[h].G,null,null,!1,new W(b[h].bd,k,N)))):d.push(r(b[h].G,null,Error(u),!1,null))))}ci(a,a.nc);for(h=0;h<d.length;h++)Tb(d[h]);bi(a)}}
	function fi(a,b){for(var c,d=a.nc;null!==(c=J(b))&&null===d.Ea();)d=fh(d,c),b=D(b);return d}function di(a,b){var c=[];hi(a,b,c);c.sort(function(a,b){return a.jf-b.jf});return c}function hi(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){hi(a,b,c)})}function ci(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;gh(b,0<c.length?c:null)}b.P(function(b){ci(a,b)})}
	function $h(a,b){var c=fi(a,b).path(),d=fh(a.nc,b);jh(d,function(b){ii(a,b)});ii(a,d);ih(d,function(b){ii(a,b)});return c}
	function ii(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(H(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(H(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(Dh(a.K,c[h].Da,!0)),c[h].G&&d.push(r(c[h].G,null,Error("set"),!1,null))));-1===f?gh(b,null):c.length=f+1;vc(a.da,b.path(),e);for(h=0;h<d.length;h++)Tb(d[h])}};function uf(){this.nb={};this.Df=!1}uf.prototype.bb=function(){for(var a in this.nb)this.nb[a].bb()};uf.prototype.lc=function(){for(var a in this.nb)this.nb[a].lc()};uf.prototype.ce=function(a){this.Df=a};ba(uf);uf.prototype.interrupt=uf.prototype.bb;uf.prototype.resume=uf.prototype.lc;var Z={};Z.pc=kh;Z.DataConnection=Z.pc;kh.prototype.vg=function(a,b){this.ua("q",{p:a},b)};Z.pc.prototype.simpleListen=Z.pc.prototype.vg;kh.prototype.Of=function(a,b){this.ua("echo",{d:a},b)};Z.pc.prototype.echo=Z.pc.prototype.Of;kh.prototype.interrupt=kh.prototype.bb;Z.Gf=Ye;Z.RealTimeConnection=Z.Gf;Ye.prototype.sendRequest=Ye.prototype.ua;Ye.prototype.close=Ye.prototype.close;
	Z.$f=function(a){var b=kh.prototype.put;kh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){kh.prototype.put=b}};Z.hijackHash=Z.$f;Z.Ff=fc;Z.ConnectionTarget=Z.Ff;Z.ya=function(a){return a.ya()};Z.queryIdentifier=Z.ya;Z.cg=function(a){return a.w.Ua.$};Z.listens=Z.cg;Z.ce=function(a){uf.Wb().ce(a)};Z.forceRestClient=Z.ce;Z.Context=uf;function U(a,b){if(!(a instanceof pf))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,Be,!1);this.then=void 0;this["catch"]=void 0}ka(U,X);g=U.prototype;g.getKey=function(){y("Firebase.key",0,0,arguments.length);return this.path.e()?null:Xd(this.path)};
	g.m=function(a){y("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof L))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Hf("Firebase.child",b)}else Hf("Firebase.child",a);return new U(this.w,this.path.m(a))};g.getParent=function(){y("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.w,a)};
	g.Xf=function(){y("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Nf=function(){return this.w.Za};g.set=function(a,b){y("Firebase.set",1,2,arguments.length);If("Firebase.set",this.path);Af("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);var c=new Hb;this.w.Kb(this.path,a,null,Ib(c,b));return c.ra};
	g.update=function(a,b){y("Firebase.update",1,2,arguments.length);If("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Df("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);c=new Hb;this.w.update(this.path,a,Ib(c,b));return c.ra};
	g.Kb=function(a,b,c){y("Firebase.setWithPriority",2,3,arguments.length);If("Firebase.setWithPriority",this.path);Af("Firebase.setWithPriority",a,this.path,!1);Ef("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new Hb;this.w.Kb(this.path,a,b,Ib(d,c));return d.ra};
	g.remove=function(a){y("Firebase.remove",0,1,arguments.length);If("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){y("Firebase.transaction",1,3,arguments.length);If("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Db("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new Hb;ga(b)&&Jb(d.ra);ai(this.w,this.path,a,function(a,c,
	h){a?d.reject(a):d.resolve(new Pb(c,h));ga(b)&&b(a,c,h)},c);return d.ra};g.tg=function(a,b){y("Firebase.setPriority",1,2,arguments.length);If("Firebase.setPriority",this.path);Ef("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);var c=new Hb;this.w.Kb(this.path.m(".priority"),a,null,Ib(c,b));return c.ra};
	g.push=function(a,b){y("Firebase.push",0,2,arguments.length);If("Firebase.push",this.path);Af("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Vh(this.w),d=Qf(c),c=this.m(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.m(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Jb(f)}return c};g.kb=function(){If("Firebase.onDisconnect",this.path);return new V(this.w,this.path)};U.prototype.child=U.prototype.m;U.prototype.set=U.prototype.set;U.prototype.update=U.prototype.update;
	U.prototype.setWithPriority=U.prototype.Kb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.tg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.kb;od(U.prototype,"database",U.prototype.Nf);od(U.prototype,"key",U.prototype.getKey);od(U.prototype,"parent",U.prototype.getParent);od(U.prototype,"root",U.prototype.Xf);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=uf.Wb(),c=a.options.databaseURL;p(c)||dd("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=ed(c),c=d.kc;tf("Invalid Firebase Database URL",d);d.path.e()||dd("Database URL must point to the root of a Firebase Database (not including a child path).");(d=x(b.nb,a.name))&&dd("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new pf(c,b.Df,a);b.nb[a.name]=
	d;return d.Za},{Reference:U,Query:X,Database:of,enableLogging:ad,INTERNAL:Y,TEST_ACCESS:Z,ServerValue:rf})}catch(ji){dd("Failed to register the Firebase Database Service ("+ji+")")};})();

	(function() {var k,aa=aa||{},m=this,n=function(a){return void 0!==a},ba=function(){},p=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=
	typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"string"==typeof a},r=function(a){return"function"==p(a)},da=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0,ga=function(a,b,c){return a.call.apply(a.bind,
	arguments)},ha=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},v=function(a,b,c){v=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return v.apply(null,arguments)},ia=Date.now||function(){return+new Date},w=function(a,b){function c(){}
	c.prototype=b.prototype;a.G=b.prototype;a.prototype=new c;a.Ma=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};var ja=function(a,b,c){function d(){O||(O=!0,b.apply(null,arguments))}function e(b){l=setTimeout(function(){l=null;a(f,2===t)},b)}function f(a,b){if(!O)if(a)d.apply(null,arguments);else if(2===t||u)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===t?(t=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){Sb||(Sb=!0,O||(null!==l?(a||(t=2),clearTimeout(l),e(0)):a||(t=1)))}var h=1,l=null,u=!1,t=0,O=!1,Sb=!1;e(0);setTimeout(function(){u=!0;g(!0)},c);return g};var ka="https://firebasestorage.googleapis.com";var x=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};w(x,Error);
	var la=function(){return new x("unknown","An unknown error occurred, please check the error payload for server response.")},ma=function(){return new x("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again.")},na=function(a){return new x("unauthorized","User does not have permission to access '"+a+"'.")},oa=function(){return new x("canceled","User canceled the upload/download.")},pa=function(a,b,c){return new x("invalid-argument","Invalid argument in `"+
	b+"` at index "+a+": "+c)},qa=function(){return new x("app-deleted","The Firebase app was deleted.")};var ra=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},sa=function(a){var b={};ra(a,function(a,d){b[a]=d});return b};var y=function(a,b,c,d){this.l=a;this.f={};this.i=b;this.b={};this.c="";this.N=c;this.g=this.a=null;this.h=[200];this.j=d};var ta={STATE_CHANGED:"state_changed"},ua={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},va=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var z=function(a){return n(a)&&null!==a},wa=function(a){return"string"===typeof a||a instanceof String};var xa=function(a,b,c){this.f=c;this.c=a;this.g=b;this.b=0;this.a=null};xa.prototype.get=function(){var a;0<this.b?(this.b--,a=this.a,this.a=a.next,a.next=null):a=this.c();return a};var ya=function(a,b){a.g(b);a.b<a.f&&(a.b++,b.next=a.a,a.a=b)};var za=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,za);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};w(za,Error);za.prototype.name="CustomError";var Aa=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Aa.prototype.a=null;var Ba=0;Aa.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ba++;d||ia();this.b=b;delete this.a};var Ca=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Da=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ea=function(a){return null!==a&&"withCredentials"in a},Fa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ga=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Fa.length;f++)c=Fa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Ha=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},Ia=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var Ja=function(a){Ja[" "](a);return a};Ja[" "]=ba;var Ka=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},La=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Ma=function(a,b){return a<b?-1:a>b?1:0};var Na=function(a,b){this.a=a;this.b=b};Na.prototype.clone=function(){return new Na(this.a,this.b)};var A=function(a,b){this.bucket=a;this.path=b},Oa=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Pa=function(a){for(var b=null,c=[{ja:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,aa:{bucket:1,path:3},ia:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{ja:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,aa:{bucket:1,path:3},ia:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
	c[d],f=e.ja.exec(a);if(f){b=f[e.aa.bucket];(f=f[e.aa.path])||(f="");b=new A(b,f);e.ia(b);break}}if(null==b)throw new x("invalid-url","Invalid URL '"+a+"'.");return b};var Qa=function(a,b,c){r(a)||z(b)||z(c)?(this.next=a,this.error=b||null,this.a=c||null):(this.next=a.next||null,this.error=a.error||null,this.a=a.complete||null)};var Ra=function(a){var b=encodeURIComponent,c="?";ra(a,function(a,e){var f=b(a)+"="+b(e);c=c+f+"&"});return c=c.slice(0,-1)};var B=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=B.prototype;k.qa=function(){return this.b};k.La=function(){return this.h};k.Ia=function(){return this.f};k.Da=function(){return this.a};k.sa=function(){if(z(this.a)){var a=this.a.downloadURLs;return z(a)&&z(a[0])?a[0]:null}return null};k.Ka=function(){return this.g};k.Ga=function(){return this.c};var Sa=function(a,b){b.unshift(a);za.call(this,Ka.apply(null,b));b.shift()};w(Sa,za);Sa.prototype.name="AssertionError";
	var Ta=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new Sa(""+e,f||[]);},C=function(a,b,c){a||Ta("",null,b,Array.prototype.slice.call(arguments,2))},Ua=function(a,b){throw new Sa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Wa=function(a,b,c){r(a)||Ta("Expected function but got %s: %s.",[p(a),a],b,Array.prototype.slice.call(arguments,2))};var D=function(){this.g=this.g;this.s=this.s};D.prototype.g=!1;D.prototype.fa=function(){this.g||(this.g=!0,this.A())};D.prototype.A=function(){if(this.s)for(;this.s.length;)this.s.shift()()};var Xa="closure_listenable_"+(1E6*Math.random()|0),Ya=0;var Za;a:{var $a=m.navigator;if($a){var ab=$a.userAgent;if(ab){Za=ab;break a}}Za=""}var E=function(a){return-1!=Za.indexOf(a)};var bb=function(){};bb.prototype.a=null;var db=function(a){var b;(b=a.a)||(b={},cb(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var eb=Array.prototype.indexOf?function(a,b,c){C(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},fb=Array.prototype.forEach?function(a,b,c){C(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},gb=Array.prototype.filter?function(a,
	b,c){C(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var l=g[h];b.call(c,l,h,a)&&(e[f++]=l)}return e},hb=Array.prototype.map?function(a,b,c){C(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},ib=Array.prototype.some?function(a,b,c){C(null!=a.length);return Array.prototype.some.call(a,
	b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},kb=function(a){var b;a:{b=jb;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]},lb=function(a){if("array"!=p(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0},mb=function(a,b){var c=eb(a,b),d;if(d=0<=c)C(null!=a.length),Array.prototype.splice.call(a,c,1);return d},nb=function(a){var b=
	a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var pb=new xa(function(){return new ob},function(a){a.reset()},100),rb=function(){var a=qb,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b},ob=function(){this.next=this.b=this.a=null};ob.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};ob.prototype.reset=function(){this.next=this.b=this.a=null};var sb=function(a,b){this.type=a;this.a=this.target=b;this.ka=!0};sb.prototype.b=function(){this.ka=!1};var tb=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.U=!!d;this.N=e;++Ya;this.O=this.T=!1},ub=function(a){a.O=!0;a.listener=null;a.a=null;a.src=null;a.N=null};var vb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;var wb=function(a,b){var c=gb(b.split("/"),function(a){return 0<a.length}).join("/");return 0===a.length?c:a+"/"+c},xb=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var yb=function(a){this.src=a;this.a={};this.b=0},Ab=function(a,b,c,d,e,f){var g=b.toString();b=a.a[g];b||(b=a.a[g]=[],a.b++);var h=zb(b,c,e,f);-1<h?(a=b[h],d||(a.T=!1)):(a=new tb(c,a.src,g,!!e,f),a.T=d,b.push(a));return a},Bb=function(a,b){var c=b.type;c in a.a&&mb(a.a[c],b)&&(ub(b),0==a.a[c].length&&(delete a.a[c],a.b--))},zb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.O&&f.listener==b&&f.U==!!c&&f.N==d)return e}return-1};var Cb,Db=function(){};w(Db,bb);var Eb=function(a){return(a=cb(a))?new ActiveXObject(a):new XMLHttpRequest},cb=function(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b};Cb=new Db;var Fb=function(a){this.a=[];if(a)a:{var b;if(a instanceof Fb){if(b=a.D(),a=a.w(),0>=this.o()){for(var c=this.a,d=0;d<b.length;d++)c.push(new Na(b[d],a[d]));break a}}else b=Da(a),a=Ca(a);for(d=0;d<b.length;d++)Gb(this,b[d],a[d])}},Gb=function(a,b,c){var d=a.a;d.push(new Na(b,c));b=d.length-1;a=a.a;for(c=a[b];0<b;)if(d=b-1>>1,a[d].a>c.a)a[b]=a[d],b=d;else break;a[b]=c};k=Fb.prototype;k.w=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].b);return b};
	k.D=function(){for(var a=this.a,b=[],c=a.length,d=0;d<c;d++)b.push(a[d].a);return b};k.clone=function(){return new Fb(this)};k.o=function(){return this.a.length};k.F=function(){return 0==this.a.length};k.clear=function(){lb(this.a)};var Hb=function(){this.b=[];this.a=[]},Ib=function(a){0==a.b.length&&(a.b=a.a,a.b.reverse(),a.a=[]);return a.b.pop()};Hb.prototype.o=function(){return this.b.length+this.a.length};Hb.prototype.F=function(){return 0==this.b.length&&0==this.a.length};Hb.prototype.clear=function(){this.b=[];this.a=[]};Hb.prototype.w=function(){for(var a=[],b=this.b.length-1;0<=b;--b)a.push(this.b[b]);for(var c=this.a.length,b=0;b<c;++b)a.push(this.a[b]);return a};var Jb=function(a){if(a.w&&"function"==typeof a.w)return a.w();if(q(a))return a.split("");if(ca(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ca(a)},Kb=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ca(a)||q(a))fb(a,b,void 0);else{var c;if(a.D&&"function"==typeof a.D)c=a.D();else if(a.w&&"function"==typeof a.w)c=void 0;else if(ca(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Da(a);for(var d=Jb(a),e=d.length,f=0;f<e;f++)b.call(void 0,
	d[f],c&&c[f],a)}};var Lb=function(a){m.setTimeout(function(){throw a;},0)},Mb,Nb=function(){var a=m.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!E("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=v(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!E("Trident")&&!E("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(n(c.next)){c=c.next;var a=c.ea;c.ea=null;a()}};return function(a){d.next={ea:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){m.setTimeout(a,0)}};var Ob="StopIteration"in m?m.StopIteration:{message:"StopIteration",stack:""},Pb=function(){};Pb.prototype.next=function(){throw Ob;};Pb.prototype.X=function(){return this};var Qb=function(){Fb.call(this)};w(Qb,Fb);var Rb=E("Opera"),F=E("Trident")||E("MSIE"),Tb=E("Edge"),Ub=E("Gecko")&&!(-1!=Za.toLowerCase().indexOf("webkit")&&!E("Edge"))&&!(E("Trident")||E("MSIE"))&&!E("Edge"),Vb=-1!=Za.toLowerCase().indexOf("webkit")&&!E("Edge"),Wb=function(){var a=m.document;return a?a.documentMode:void 0},Xb;
	a:{var Yb="",Zb=function(){var a=Za;if(Ub)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Tb)return/Edge\/([\d\.]+)/.exec(a);if(F)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Vb)return/WebKit\/(\S+)/.exec(a);if(Rb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Zb&&(Yb=Zb?Zb[1]:"");if(F){var $b=Wb();if(null!=$b&&$b>parseFloat(Yb)){Xb=String($b);break a}}Xb=Yb}
	var ac=Xb,bc={},G=function(a){var b;if(!(b=bc[a])){b=0;for(var c=La(String(ac)).split("."),d=La(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",l=/(\d*)(\D*)/g,u=/(\d*)(\D*)/g;do{var t=l.exec(g)||["","",""],O=u.exec(h)||["","",""];if(0==t[0].length&&0==O[0].length)break;b=Ma(0==t[1].length?0:parseInt(t[1],10),0==O[1].length?0:parseInt(O[1],10))||Ma(0==t[2].length,0==O[2].length)||Ma(t[2],O[2])}while(0==b)}b=bc[a]=0<=b}return b},cc=m.document,dc=cc&&
	F?Wb()||("CSS1Compat"==cc.compatMode?parseInt(ac,10):5):void 0;var hc=function(a,b){ec||fc();gc||(ec(),gc=!0);var c=qb,d=pb.get();d.set(a,b);c.b?c.b.next=d:(C(!c.a),c.a=d);c.b=d},ec,fc=function(){if(m.Promise&&m.Promise.resolve){var a=m.Promise.resolve(void 0);ec=function(){a.then(ic)}}else ec=function(){var a=ic;!r(m.setImmediate)||m.Window&&m.Window.prototype&&!E("Edge")&&m.Window.prototype.setImmediate==m.setImmediate?(Mb||(Mb=Nb()),Mb(a)):m.setImmediate(a)}},gc=!1,qb=new function(){this.b=this.a=null},ic=function(){for(var a=null;a=rb();){try{a.a.call(a.b)}catch(b){Lb(b)}ya(pb,
	a)}gc=!1};var jc;(jc=!F)||(jc=9<=Number(dc));var kc=jc,lc=F&&!G("9");!Vb||G("528");Ub&&G("1.9b")||F&&G("8")||Rb&&G("9.5")||Vb&&G("528");Ub&&!G("8")||F&&G("9");var mc=function(a,b){this.b={};this.a=[];this.f=this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof mc?(c=a.D(),d=a.w()):(c=Da(a),d=Ca(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};k=mc.prototype;k.o=function(){return this.c};k.w=function(){nc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};k.D=function(){nc(this);return this.a.concat()};
	k.F=function(){return 0==this.c};k.clear=function(){this.b={};this.f=this.c=this.a.length=0};
	var oc=function(a,b){return Object.prototype.hasOwnProperty.call(a.b,b)?(delete a.b[b],a.c--,a.f++,a.a.length>2*a.c&&nc(a),!0):!1},nc=function(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}};k=mc.prototype;
	k.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.b,a)?this.b[a]:b};k.set=function(a,b){Object.prototype.hasOwnProperty.call(this.b,a)||(this.c++,this.a.push(a),this.f++);this.b[a]=b};k.forEach=function(a,b){for(var c=this.D(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};k.clone=function(){return new mc(this)};
	k.X=function(a){nc(this);var b=0,c=this.f,d=this,e=new Pb;e.next=function(){if(c!=d.f)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Ob;var e=d.a[b++];return a?e:d.b[e]};return e};var pc=function(a,b){sb.call(this,a?a.type:"");this.c=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&Ub)try{Ja(c.nodeName)}catch(d){}this.c=a;a.defaultPrevented&&this.b()}};w(pc,sb);pc.prototype.b=function(){pc.G.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,lc)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var H=function(a,b){this.a=0;this.i=void 0;this.c=this.b=this.f=null;this.g=this.h=!1;if(a!=ba)try{var c=this;a.call(b,function(a){qc(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}qc(c,3,a)})}catch(d){qc(this,3,d)}},rc=function(){this.next=this.f=this.c=this.a=this.b=null;this.g=!1};rc.prototype.reset=function(){this.f=this.c=this.a=this.b=null;this.g=!1};
	var sc=new xa(function(){return new rc},function(a){a.reset()},100),tc=function(a,b,c){var d=sc.get();d.a=a;d.c=b;d.f=c;return d},uc=function(a){if(a instanceof H)return a;var b=new H(ba);qc(b,2,a);return b},vc=function(a){return new H(function(b,c){c(a)})};
	H.prototype.then=function(a,b,c){null!=a&&Wa(a,"opt_onFulfilled should be a function.");null!=b&&Wa(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return wc(this,r(a)?a:null,r(b)?b:null,c)};Ha(H);H.prototype.l=function(a,b){return wc(this,null,a,b)};
	var yc=function(a,b){a.b||2!=a.a&&3!=a.a||xc(a);C(null!=b.a);a.c?a.c.next=b:a.b=b;a.c=b},wc=function(a,b,c,d){var e=tc(null,null,null);e.b=new H(function(a,g){e.a=b?function(c){try{var e=b.call(d,c);a(e)}catch(u){g(u)}}:a;e.c=c?function(b){try{var e=c.call(d,b);a(e)}catch(u){g(u)}}:g});e.b.f=a;yc(a,e);return e.b};H.prototype.s=function(a){C(1==this.a);this.a=0;qc(this,2,a)};H.prototype.m=function(a){C(1==this.a);this.a=0;qc(this,3,a)};
	var qc=function(a,b,c){if(0==a.a){a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.a=1;var d;a:{var e=c,f=a.s,g=a.m;if(e instanceof H)null!=f&&Wa(f,"opt_onFulfilled should be a function."),null!=g&&Wa(g,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),yc(e,tc(f||ba,g||null,a)),d=!0;else if(Ia(e))e.then(f,g,a),d=!0;else{if(da(e))try{var h=e.then;if(r(h)){zc(e,h,f,g,a);d=!0;break a}}catch(l){g.call(a,l);d=!0;break a}d=!1}}d||
	(a.i=c,a.a=b,a.f=null,xc(a),3!=b||Ac(a,c))}},zc=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,h)}catch(l){h(l)}},xc=function(a){a.h||(a.h=!0,hc(a.j,a))},Bc=function(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.c=null);null!=b&&C(null!=b.a);return b};
	H.prototype.j=function(){for(var a=null;a=Bc(this);){var b=this.a,c=this.i;if(3==b&&a.c&&!a.g)for(var d=void 0,d=this;d&&d.g;d=d.f)d.g=!1;if(a.b)a.b.f=null,Cc(a,b,c);else try{a.g?a.a.call(a.f):Cc(a,b,c)}catch(e){Dc.call(null,e)}ya(sc,a)}this.h=!1};var Cc=function(a,b,c){2==b?a.a.call(a.f,c):a.c&&a.c.call(a.f,c)},Ac=function(a,b){a.g=!0;hc(function(){a.g&&Dc.call(null,b)})},Dc=Lb;var Fc=function(a){this.a=new mc;if(a){a=Jb(a);for(var b=a.length,c=0;c<b;c++){var d=a[c];this.a.set(Ec(d),d)}}},Ec=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[ea]||(a[ea]=++fa)):b.substr(0,1)+a};k=Fc.prototype;k.o=function(){return this.a.o()};k.clear=function(){this.a.clear()};k.F=function(){return this.a.F()};k.w=function(){return this.a.w()};k.clone=function(){return new Fc(this)};k.X=function(){return this.a.X(!1)};var Gc=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);uc(!0).then(function(){a.apply(null,b)})}};var Hc="closure_lm_"+(1E6*Math.random()|0),Ic={},Jc=0,Kc=function(a,b,c,d,e){if("array"==p(b)){for(var f=0;f<b.length;f++)Kc(a,b[f],c,d,e);return null}c=Lc(c);a&&a[Xa]?(Mc(a),a=Ab(a.b,String(b),c,!1,d,e)):a=Nc(a,b,c,!1,d,e);return a},Nc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=Oc(a);h||(a[Hc]=h=new yb(a));c=Ab(h,b,c,d,e,f);if(c.a)return c;d=Pc();c.a=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Qc(b.toString()),
	d);else throw Error("addEventListener and attachEvent are unavailable.");Jc++;return c},Pc=function(){var a=Rc,b=kc?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},Sc=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Sc(a,b[f],c,d,e);else c=Lc(c),a&&a[Xa]?Ab(a.b,String(b),c,!0,d,e):Nc(a,b,c,!0,d,e)},Tc=function(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Tc(a,b[f],c,d,e);else(c=Lc(c),a&&a[Xa])?(a=a.b,b=String(b).toString(),
	b in a.a&&(f=a.a[b],c=zb(f,c,d,e),-1<c&&(ub(f[c]),C(null!=f.length),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=Oc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=zb(b,c,!!d,e)),(c=-1<a?b[a]:null)&&Uc(c))},Uc=function(a){if("number"!=typeof a&&a&&!a.O){var b=a.src;if(b&&b[Xa])Bb(b.b,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.U):b.detachEvent&&b.detachEvent(Qc(c),d);Jc--;(c=Oc(b))?(Bb(c,a),0==c.b&&(c.src=null,b[Hc]=null)):ub(a)}}},Qc=function(a){return a in
	Ic?Ic[a]:Ic[a]="on"+a},Wc=function(a,b,c,d){var e=!0;if(a=Oc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.U==c&&!f.O&&(f=Vc(f,d),e=e&&!1!==f)}return e},Vc=function(a,b){var c=a.listener,d=a.N||a.src;a.T&&Uc(a);return c.call(d,b)},Rc=function(a,b){if(a.O)return!0;if(!kc){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new pc(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==
	e.keyCode)try{e.keyCode=-1;break a}catch(l){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;0<=g;g--){c.a=e[g];var h=Wc(e[g],f,!0,c),d=d&&h}for(g=0;g<e.length;g++)c.a=e[g],h=Wc(e[g],f,!1,c),d=d&&h}return d}return Vc(a,new pc(b,this))},Oc=function(a){a=a[Hc];return a instanceof yb?a:null},Xc="__closure_events_fn_"+(1E9*Math.random()>>>0),Lc=function(a){C(a,"Listener can not be null.");if(r(a))return a;C(a.handleEvent,"An object listener must have handleEvent method.");
	a[Xc]||(a[Xc]=function(b){return a.handleEvent(b)});return a[Xc]};var I=function(a,b){D.call(this);this.l=a||0;this.c=b||10;if(this.l>this.c)throw Error("[goog.structs.Pool] Min can not be greater than max");this.a=new Hb;this.b=new Fc;this.i=null;this.S()};w(I,D);I.prototype.W=function(){var a=ia();if(!(null!=this.i&&0>a-this.i)){for(var b;0<this.a.o()&&(b=Ib(this.a),!this.j(b));)this.S();!b&&this.o()<this.c&&(b=this.h());b&&(this.i=a,this.b.a.set(Ec(b),b));return b}};var Zc=function(a){var b=Yc;oc(b.b.a,Ec(a))&&b.Y(a)};
	I.prototype.Y=function(a){oc(this.b.a,Ec(a));this.j(a)&&this.o()<this.c?this.a.a.push(a):$c(a)};I.prototype.S=function(){for(var a=this.a;this.o()<this.l;){var b=this.h();a.a.push(b)}for(;this.o()>this.c&&0<this.a.o();)$c(Ib(a))};I.prototype.h=function(){return{}};var $c=function(a){if("function"==typeof a.fa)a.fa();else for(var b in a)a[b]=null};I.prototype.j=function(a){return"function"==typeof a.ra?a.ra():!0};I.prototype.o=function(){return this.a.o()+this.b.o()};
	I.prototype.F=function(){return this.a.F()&&this.b.F()};I.prototype.A=function(){I.G.A.call(this);if(0<this.b.o())throw Error("[goog.structs.Pool] Objects not released");delete this.b;for(var a=this.a;!a.F();)$c(Ib(a));delete this.a};/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var ad=function(a,b){this.c=[];this.m=b||null;this.a=this.h=!1;this.b=void 0;this.j=this.g=!1;this.f=0;this.i=null;this.s=0};ad.prototype.l=function(a,b){this.g=!1;this.h=!0;this.b=b;this.a=!a;bd(this)};var cd=function(a,b,c){C(!a.j,"Blocking Deferreds can not be re-used");a.c.push([b,c,void 0]);a.h&&bd(a)};ad.prototype.then=function(a,b,c){var d,e,f=new H(function(a,b){d=a;e=b});cd(this,d,function(a){e(a)});return f.then(a,b,c)};Ha(ad);
	var dd=function(a){return ib(a.c,function(a){return r(a[1])})},bd=function(a){if(a.f&&a.h&&dd(a)){var b=a.f,c=ed[b];c&&(m.clearTimeout(c.a),delete ed[b]);a.f=0}a.i&&(a.i.s--,delete a.i);for(var b=a.b,d=c=!1;a.c.length&&!a.g;){var e=a.c.shift(),f=e[0],g=e[1],e=e[2];if(f=a.a?g:f)try{var h=f.call(e||a.m,b);n(h)&&(a.a=a.a&&(h==b||h instanceof Error),a.b=b=h);if(Ia(b)||"function"===typeof m.Promise&&b instanceof m.Promise)d=!0,a.g=!0}catch(l){b=l,a.a=!0,dd(a)||(c=!0)}}a.b=b;d&&(h=v(a.l,a,!0),d=v(a.l,a,
	!1),b instanceof ad?(cd(b,h,d),b.j=!0):b.then(h,d));c&&(b=new fd(b),ed[b.a]=b,a.f=b.a)},fd=function(a){this.a=m.setTimeout(v(this.c,this),0);this.b=a};fd.prototype.c=function(){C(ed[this.a],"Cannot throw an error that is not scheduled.");delete ed[this.a];throw this.b;};var ed={};var gd=function(a){this.f=a;this.b=this.c=this.a=null},hd=function(a,b){this.name=a;this.value=b};hd.prototype.toString=function(){return this.name};var id=new hd("SEVERE",1E3),jd=new hd("CONFIG",700),kd=new hd("FINE",500),ld=function(a){if(a.c)return a.c;if(a.a)return ld(a.a);Ua("Root logger has no level set.");return null};
	gd.prototype.log=function(a,b,c){if(a.value>=ld(this).value)for(r(b)&&(b=b()),a=new Aa(a,String(b),this.f),c&&(a.a=c),c="log:"+a.b,m.console&&(m.console.timeStamp?m.console.timeStamp(c):m.console.markTimeline&&m.console.markTimeline(c)),m.msWriteProfilerMark&&m.msWriteProfilerMark(c),c=this;c;)c=c.a};
	var md={},nd=null,od=function(a){nd||(nd=new gd(""),md[""]=nd,nd.c=jd);var b;if(!(b=md[a])){b=new gd(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=od(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;md[a]=b}return b};var J=function(){D.call(this);this.b=new yb(this);this.ma=this;this.I=null};w(J,D);J.prototype[Xa]=!0;J.prototype.removeEventListener=function(a,b,c,d){Tc(this,a,b,c,d)};
	var K=function(a,b){Mc(a);var c,d=a.I;if(d){c=[];for(var e=1;d;d=d.I)c.push(d),C(1E3>++e,"infinite loop")}var d=a.ma,e=b,f=e.type||e;if(q(e))e=new sb(e,d);else if(e instanceof sb)e.target=e.target||d;else{var g=e,e=new sb(f,d);Ga(e,g)}var g=!0,h;if(c)for(var l=c.length-1;0<=l;l--)h=e.a=c[l],g=pd(h,f,!0,e)&&g;h=e.a=d;g=pd(h,f,!0,e)&&g;g=pd(h,f,!1,e)&&g;if(c)for(l=0;l<c.length;l++)h=e.a=c[l],g=pd(h,f,!1,e)&&g};
	J.prototype.A=function(){J.G.A.call(this);if(this.b){var a=this.b,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,ub(d[e]);delete a.a[c];a.b--}}this.I=null};var pd=function(a,b,c,d){b=a.b.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.O&&g.U==c){var h=g.listener,l=g.N||g.src;g.T&&Bb(a.b,g);e=!1!==h.call(l,d)&&e}}return e&&0!=d.ka},Mc=function(a){C(a.b,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var L=function(a,b){this.f=new Qb;I.call(this,a,b)};w(L,I);k=L.prototype;k.W=function(a,b){if(!a)return L.G.W.call(this);Gb(this.f,n(b)?b:100,a);this.$()};k.$=function(){for(var a=this.f;0<a.o();){var b=this.W();if(b){var c;var d=a,e=d.a,f=e.length;c=e[0];if(0>=f)c=void 0;else{if(1==f)lb(e);else{e[0]=e.pop();for(var e=0,d=d.a,f=d.length,g=d[e];e<f>>1;){var h=2*e+1,l=2*e+2,h=l<f&&d[l].a<d[h].a?l:h;if(d[h].a>g.a)break;d[e]=d[h];e=h}d[e]=g}c=c.b}c.apply(this,[b])}else break}};
	k.Y=function(a){L.G.Y.call(this,a);this.$()};k.S=function(){L.G.S.call(this);this.$()};k.A=function(){L.G.A.call(this);m.clearTimeout(void 0);this.f.clear();this.f=null};var M=function(a,b){a&&a.log(kd,b,void 0)};var qd=function(a,b,c){if(r(a))c&&(a=v(a,c));else if(a&&"function"==typeof a.handleEvent)a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:m.setTimeout(a,b||0)};var N=function(a){J.call(this);this.L=new mc;this.C=a||null;this.c=!1;this.B=this.a=null;this.P=this.l="";this.J=0;this.h="";this.f=this.H=this.j=this.K=!1;this.i=0;this.m=null;this.da="";this.v=this.ba=this.Z=!1};w(N,J);var rd=N.prototype,sd=od("goog.net.XhrIo");rd.u=sd;var td=/^https?$/i,ud=["POST","PUT"];
	N.prototype.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.l+"; newUri="+a);b=b?b.toUpperCase():"GET";this.l=a;this.h="";this.J=0;this.P=b;this.K=!1;this.c=!0;this.a=this.C?Eb(this.C):Eb(Cb);this.B=this.C?db(this.C):db(Cb);this.a.onreadystatechange=v(this.ca,this);this.ba&&"onprogress"in this.a&&(this.a.onprogress=v(function(a){this.R(a,!0)},this),this.a.upload&&(this.a.upload.onprogress=v(this.R,this)));try{M(this.u,P(this,"Opening Xhr")),
	this.H=!0,this.a.open(b,String(a),!0),this.H=!1}catch(f){M(this.u,P(this,"Error opening Xhr: "+f.message));vd(this,f);return}a=c||"";var e=this.L.clone();d&&Kb(d,function(a,b){e.set(b,a)});d=kb(e.D());c=m.FormData&&a instanceof m.FormData;!(0<=eb(ud,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.da&&(this.a.responseType=this.da);Ea(this.a)&&(this.a.withCredentials=this.Z);try{wd(this),0<this.i&&(this.v=
	xd(this.a),M(this.u,P(this,"Will abort after "+this.i+"ms if incomplete, xhr2 "+this.v)),this.v?(this.a.timeout=this.i,this.a.ontimeout=v(this.M,this)):this.m=qd(this.M,this.i,this)),M(this.u,P(this,"Sending request")),this.j=!0,this.a.send(a),this.j=!1}catch(f){M(this.u,P(this,"Send error: "+f.message)),vd(this,f)}};var xd=function(a){return F&&G(9)&&"number"==typeof a.timeout&&n(a.ontimeout)},jb=function(a){return"content-type"==a.toLowerCase()};
	N.prototype.M=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.i+"ms, aborting",this.J=8,M(this.u,P(this,this.h)),K(this,"timeout"),yd(this,8))};var vd=function(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;a.J=5;zd(a);Ad(a)},zd=function(a){a.K||(a.K=!0,K(a,"complete"),K(a,"error"))},yd=function(a,b){a.a&&a.c&&(M(a.u,P(a,"Aborting")),a.c=!1,a.f=!0,a.a.abort(),a.f=!1,a.J=b||7,K(a,"complete"),K(a,"abort"),Ad(a))};
	N.prototype.A=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),Ad(this,!0));N.G.A.call(this)};N.prototype.ca=function(){this.g||(this.H||this.j||this.f?Bd(this):this.na())};N.prototype.na=function(){Bd(this)};
	var Bd=function(a){if(a.c&&"undefined"!=typeof aa)if(a.B[1]&&4==Dd(a)&&2==Q(a))M(a.u,P(a,"Local request error detected and ignored"));else if(a.j&&4==Dd(a))qd(a.ca,0,a);else if(K(a,"readystatechange"),4==Dd(a)){M(a.u,P(a,"Request complete"));a.c=!1;try{if(Ed(a))K(a,"complete"),K(a,"success");else{a.J=6;var b;try{b=2<Dd(a)?a.a.statusText:""}catch(c){M(a.u,"Can not get status: "+c.message),b=""}a.h=b+" ["+Q(a)+"]";zd(a)}}finally{Ad(a)}}};
	N.prototype.R=function(a,b){C("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");K(this,Fd(a,"progress"));K(this,Fd(a,b?"downloadprogress":"uploadprogress"))};
	var Fd=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Ad=function(a,b){if(a.a){wd(a);var c=a.a,d=a.B[0]?ba:null;a.a=null;a.B=null;b||K(a,"ready");try{c.onreadystatechange=d}catch(e){(c=a.u)&&c.log(id,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},wd=function(a){a.a&&a.v&&(a.a.ontimeout=null);"number"==typeof a.m&&(m.clearTimeout(a.m),a.m=null)},Ed=function(a){var b=Q(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=
	!0;break a;default:c=!1}if(!c){if(b=0===b)a=String(a.l).match(vb)[1]||null,!a&&m.self&&m.self.location&&(a=m.self.location.protocol,a=a.substr(0,a.length-1)),b=!td.test(a?a.toLowerCase():"");c=b}return c},Dd=function(a){return a.a?a.a.readyState:0},Q=function(a){try{return 2<Dd(a)?a.a.status:-1}catch(b){return-1}},Gd=function(a){try{return a.a?a.a.responseText:""}catch(b){return M(a.u,"Can not get responseText: "+b.message),""}},Hd=function(a,b){return a.a&&4==Dd(a)?a.a.getResponseHeader(b):void 0},
	P=function(a,b){return b+" ["+a.P+" "+a.l+" "+Q(a)+"]"};var Id=function(a,b,c,d){this.m=a;this.v=!!d;L.call(this,b,c)};w(Id,L);Id.prototype.h=function(){var a=new N,b=this.m;b&&b.forEach(function(b,d){a.L.set(d,b)});this.v&&(a.Z=!0);return a};Id.prototype.j=function(a){return!a.g&&!a.a};var Yc=new Id;var Kd=function(a,b,c,d,e,f,g,h,l,u){this.L=a;this.H=b;this.B=c;this.m=d;this.I=e.slice();this.s=this.l=this.f=this.c=null;this.h=this.i=!1;this.v=f;this.j=g;this.g=l;this.M=u;this.K=h;var t=this;this.C=new H(function(a,b){t.l=a;t.s=b;Jd(t)})},Ld=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Jd=function(a){function b(a,b){b?a(!1,new Ld(!1,null,!0)):Yc.W(function(b){b.Z=d.M;d.c=b;var c=null;null!==d.g&&(b.ba=!0,c=Kc(b,"uploadprogress",function(a){d.g(a.loaded,a.lengthComputable?a.total:-1)}),b.ba=
	null!==d.g);b.send(d.L,d.H,d.m,d.B);Sc(b,"complete",function(b){null!==c&&Uc(c);d.c=null;b=b.target;var f=6===b.J&&100<=Q(b),f=Ed(b)||f,g=Q(b);!f||500<=g&&600>g||429===g?(f=7===b.J,Zc(b),a(!1,new Ld(!1,null,f))):(f=0<=eb(d.I,g),a(!0,new Ld(f,b)))})})}function c(a,b){var c=d.l,h=d.s,l=b.c;if(b.b)try{var u=d.v(l,Gd(l));n(u)?c(u):c()}catch(t){h(t)}else null!==l?(c=la(),u=Gd(l),c.serverResponse=u,d.j?h(d.j(l,c)):h(c)):(c=b.a?d.h?qa():oa():new x("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),
	h(c));Zc(l)}var d=a;a.i?c(0,new Ld(!1,null,!0)):a.f=ja(b,c,a.K)};Kd.prototype.a=function(){return this.C};Kd.prototype.b=function(a){this.i=!0;this.h=a||!1;null!==this.f&&(0,this.f)(!1);null!==this.c&&yd(this.c)};var Md=function(a,b,c){var d=Ra(a.f),d=a.l+d,e=a.b?sa(a.b):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/1.0.0";return new Kd(d,a.i,e,a.c,a.h,a.N,a.a,a.j,a.g,c)};var Nd=function(a){var b=m.BlobBuilder||m.WebKitBlobBuilder;if(n(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=nb(arguments);c=m.BlobBuilder||m.WebKitBlobBuilder;if(n(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(n(m.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},Od=function(a,b,c){n(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,c):a.mozSlice?a.mozSlice(b,
	c):a.slice?Ub&&!G("13.0")||Vb&&!G("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var Pd=function(a){this.c=vc(a)};Pd.prototype.a=function(){return this.c};Pd.prototype.b=function(){};var Qd=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},Rd=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)};Qd.prototype.clear=function(){ra(this.a,function(a,b){b&&b.b(!0)});this.a={}};var Sd=function(a,b,c,d){this.a=a;this.f=null;null!==this.a&&(a=this.a.options,z(a)?this.f=a.storageBucket||null:this.f=null);this.l=b;this.j=c;this.i=d;this.c=12E4;this.b=6E4;this.h=new Qd;this.g=!1},Td=function(a){return null!==a.a&&z(a.a.INTERNAL)&&z(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return z(a)?a.accessToken:null},function(){return null}):uc(null)};Sd.prototype.bucket=function(){if(this.g)throw qa();return this.f};
	var R=function(a,b,c){if(a.g)return new Pd(qa());b=a.j(b,c,null===a.a);Rd(a.h,b);return b};var Ud=function(a,b){return b},S=function(a,b,c,d){this.c=a;this.b=b||a;this.f=!!c;this.a=d||Ud},Vd=null,Wd=function(){if(Vd)return Vd;var a=[];a.push(new S("bucket"));a.push(new S("generation"));a.push(new S("metageneration"));a.push(new S("name","fullPath",!0));var b=new S("name");b.a=function(a,b){return!wa(b)||2>b.length?b:xb(b)};a.push(b);b=new S("size");b.a=function(a,b){return z(b)?+b:b};a.push(b);a.push(new S("timeCreated"));a.push(new S("updated"));a.push(new S("md5Hash",null,!0));a.push(new S("cacheControl",
	null,!0));a.push(new S("contentDisposition",null,!0));a.push(new S("contentEncoding",null,!0));a.push(new S("contentLanguage",null,!0));a.push(new S("contentType",null,!0));a.push(new S("metadata","customMetadata",!0));a.push(new S("downloadTokens","downloadURLs",!1,function(a,b){if(!(wa(b)&&0<b.length))return[];var e=encodeURIComponent;return hb(b.split(","),function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+e(a.bucket)+"/o/"+e(d));b=Ra({alt:"media",token:b});return d+
	b})}));return Vd=a},Xd=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.l(b,new A(a.bucket,a.fullPath))}})},Yd=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.f&&(c[f.c]=a[f.b])}return JSON.stringify(c)},Zd=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b&&"object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}};var T=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new x("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw pa(f,a,g.message);throw pa(f,a,g);}},U=function(a,b){var c=this;this.a=function(b){c.b&&!n(b)||a(b)};
	this.b=!!b},$d=function(a,b){return function(c){a(c);b(c)}},ae=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=$d(c,a):d=c;return new U(d,b)},be=function(){return new U(function(a){if(!(a instanceof Blob))throw"Expected Blob or File.";})},ce=function(){return new U(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},de=function(a,b){return new U(function(b){if(!(null===b||z(b)&&
	b instanceof Object))throw"Expected an Object.";z(a)&&a(b)},b)},ee=function(){return new U(function(a){if(null!==a&&!r(a))throw"Expected a Function.";},!0)};var fe=function(a){if(!a)throw la();},ge=function(a,b){return function(c,d){var e;a:{try{e=JSON.parse(d)}catch(u){e=null;break a}e=da(e)?e:null}if(null===e)e=null;else{for(var f={type:"file"},g=b.length,h=0;h<g;h++){var l=b[h];f[l.b]=l.a(f,e[l.c])}Xd(f,a);e=f}fe(null!==e);return e}},he=function(a){return function(b,c){var d;d=404===Q(b)?new x("object-not-found","Object '"+a.path+"' does not exist."):401===Q(b)?ma():403===Q(b)?na(a.path):c;d.serverResponse=c.serverResponse;return d}},ie=function(a){return function(b,
	c){var d;d=401===Q(b)?ma():403===Q(b)?na(a.path):c;d.serverResponse=c.serverResponse;return d}},je=function(a,b,c){var d=Oa(b);a=new y(ka+"/v0"+d,"GET",ge(a,c),a.c);a.a=he(b);return a},ke=function(a,b){var c=Oa(b),c=new y(ka+"/v0"+c,"DELETE",function(){},a.c);c.h=[200,204];c.a=he(b);return c},le=function(a,b,c){c=c?sa(c):{};c.fullPath=a.path;c.size=b.size;c.contentType||(c.contentType=b&&b.type||"application/octet-stream");return c},me=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+
	"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var l=0;2>l;l++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+h;e=le(b,d,e);l=Yd(e,c);d=Nd("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+l+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");a=new y(ka+"/v0"+f,"POST",ge(a,c),a.b);a.f={name:e.fullPath};a.b=g;a.c=d;a.a=ie(b);return a},ne=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},oe=function(a,
	b){var c;try{c=Hd(a,"X-Goog-Upload-Status")}catch(e){fe(!1)}var d;d=0<=eb(b||["active"],c);fe(d);return c},pe=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=le(b,d,e);e={name:g.fullPath};f=ka+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.size,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=Yd(g,c);a=new y(f,"POST",function(a){oe(a);var b;try{b=Hd(a,"X-Goog-Upload-URL")}catch(c){fe(!1)}fe(wa(b));
	return b},a.b);a.f=e;a.b=d;a.c=c;a.a=ie(b);return a},qe=function(a,b,c,d){a=new y(c,"POST",function(a){var b=oe(a,["active","final"]),c;try{c=Hd(a,"X-Goog-Upload-Size-Received")}catch(h){fe(!1)}a=c;isFinite(a)&&(a=String(a));a=q(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;fe(!isNaN(a));return new ne(a,d.size,"final"===b)},a.b);a.b={"X-Goog-Upload-Command":"query"};a.a=ie(b);return a},re=function(a,b,c,d,e,f){var g=new ne(0,0);f?(g.a=f.a,g.total=f.total):(g.a=0,g.total=d.size);if(d.size!==
	g.total)throw new x("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var h=f=g.total-g.a,h=Math.min(h,262144),l=g.a;f={"X-Goog-Upload-Command":h===f?"upload, finalize":"upload","X-Goog-Upload-Offset":g.a};l=Od(d,l,l+h);if(null===l)throw new x("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.");c=new y(c,"POST",function(a,c){var f=oe(a,["active","final"]),l=g.a+h,Cd=d.size,Va;"final"===f?Va=ge(b,e)(a,c):Va=null;return new ne(l,
	Cd,"final"===f,Va)},b.b);c.b=f;c.c=l;c.g=null;c.a=ie(a);return c};var W=function(a,b,c,d,e,f){this.K=a;this.c=b;this.i=c;this.f=e;this.h=f||null;this.l=d;this.j=0;this.B=this.s=!1;this.v=[];this.R=262144<this.f.size;this.b="running";this.a=this.m=this.g=null;var g=this;this.V=function(a){g.a=null;"storage/canceled"===a.code?(g.s=!0,se(g)):(g.g=a,V(g,"error"))};this.P=function(a){g.a=null;"storage/canceled"===a.code?se(g):(g.g=a,V(g,"error"))};te(this)},te=function(a){"running"===a.b&&null===a.a&&(a.R?null===a.m?ue(a):a.s?ve(a):a.B?we(a):xe(a):ye(a))},ze=function(a,
	b){Td(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":V(a,"canceled");break;case "pausing":V(a,"paused")}})},ue=function(a){ze(a,function(b){var c=pe(a.c,a.i,a.l,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.m=b;a.s=!1;se(a)},this.V)})},ve=function(a){var b=a.m;ze(a,function(c){var d=qe(a.c,a.i,b,a.f);a.a=R(a.c,d,c);a.a.a().then(function(b){a.a=null;Ae(a,b.a);a.s=!1;b.b&&(a.B=!0);se(a)},a.V)})},xe=function(a){var b=new ne(a.j,a.f.size),c=a.m;ze(a,function(d){var e;
	try{e=re(a.i,a.c,c,a.f,a.l,b)}catch(f){a.g=f;V(a,"error");return}a.a=R(a.c,e,d);a.a.a().then(function(b){a.a=null;Ae(a,b.a);b.b?(a.h=b.c,V(a,"success")):se(a)},a.V)})},we=function(a){ze(a,function(b){var c=je(a.c,a.i,a.l);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;V(a,"success")},a.P)})},ye=function(a){ze(a,function(b){var c=me(a.c,a.i,a.l,a.f,a.h);a.a=R(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;Ae(a,a.f.size);V(a,"success")},a.V)})},Ae=function(a,b){var c=a.j;a.j=b;a.j>c&&Be(a)},
	V=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.b();break;case "pausing":a.b=b;null!==a.a&&a.a.b();break;case "running":var c="paused"===a.b;a.b=b;c&&(Be(a),te(a));break;case "paused":a.b=b;Be(a);break;case "canceled":a.g=oa();a.b=b;Be(a);break;case "error":a.b=b;Be(a);break;case "success":a.b=b,Be(a)}},se=function(a){switch(a.b){case "pausing":V(a,"paused");break;case "canceling":V(a,"canceled");break;case "running":te(a)}};
	W.prototype.C=function(){return new B(this.j,this.f.size,va(this.b),this.h,this,this.K)};
	W.prototype.I=function(a,b,c,d){function e(a){try{g(a);return}catch(b){}try{if(h(a),!(n(a.next)||n(a.error)||n(a.complete)))throw"";}catch(b){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&T("on",a,arguments);var e=new Qa(b,c,d);Ce(l,e);return function(){mb(l.v,e)}}}var g=ee().a,h=de(null,!0).a;T("on",[ae(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";}),de(e,!0),
	ee(),ee()],arguments);var l=this,u=[de(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),ee(),ee()];return n(b)||n(c)||n(d)?f(null)(b,c,d):f(u)};
	var Ce=function(a,b){a.v.push(b);De(a,b)},Be=function(a){var b=nb(a.v);fb(b,function(b){De(a,b)})},De=function(a,b){switch(va(a.b)){case "running":case "paused":null!==b.next&&Gc(b.next.bind(b,a.C()))();break;case "success":null!==b.a&&Gc(b.a.bind(b))();break;case "canceled":case "error":null!==b.error&&Gc(b.error.bind(b,a.g))();break;default:null!==b.error&&Gc(b.error.bind(b,a.g))()}};
	W.prototype.M=function(){T("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&V(this,"running");return a};W.prototype.L=function(){T("pause",[],arguments);var a="running"===this.b;a&&V(this,"pausing");return a};W.prototype.H=function(){T("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&V(this,"canceling");return a};var X=function(a,b){this.b=a;if(b)this.a=b instanceof A?b:Pa(b);else{var c=a.bucket();if(null!==c)this.a=new A(c,"");else throw new x("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");}};X.prototype.toString=function(){T("toString",[],arguments);return"gs://"+this.a.bucket+"/"+this.a.path};var Ee=function(a,b){return new X(a,b)};k=X.prototype;
	k.ga=function(a){T("child",[ae()],arguments);var b=wb(this.a.path,a);return Ee(this.b,new A(this.a.bucket,b))};k.Fa=function(){var a;a=this.a.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Ee(this.b,new A(this.a.bucket,a))};k.Ha=function(){return Ee(this.b,new A(this.a.bucket,""))};k.pa=function(){return this.a.bucket};k.Aa=function(){return this.a.path};k.Ea=function(){return xb(this.a.path)};k.Ja=function(){return this.b.i};
	k.ua=function(a,b){T("put",[be(),new U(Zd,!0)],arguments);Fe(this,"put");return new W(this,this.b,this.a,Wd(),a,b)};k.delete=function(){T("delete",[],arguments);Fe(this,"delete");var a=this;return Td(this.b).then(function(b){var c=ke(a.b,a.a);return R(a.b,c,b).a()})};k.ha=function(){T("getMetadata",[],arguments);Fe(this,"getMetadata");var a=this;return Td(this.b).then(function(b){var c=je(a.b,a.a,Wd());return R(a.b,c,b).a()})};
	k.va=function(a){T("updateMetadata",[new U(Zd,void 0)],arguments);Fe(this,"updateMetadata");var b=this;return Td(this.b).then(function(c){var d=b.b,e=b.a,f=a,g=Wd(),h=Oa(e),h=ka+"/v0"+h,f=Yd(f,g),d=new y(h,"PATCH",ge(d,g),d.c);d.b={"Content-Type":"application/json; charset=utf-8"};d.c=f;d.a=he(e);return R(b.b,d,c).a()})};
	k.ta=function(){T("getDownloadURL",[],arguments);Fe(this,"getDownloadURL");return this.ha().then(function(a){a=a.downloadURLs[0];if(z(a))return a;throw new x("no-download-url","The given file does not have any download URLs.");})};var Fe=function(a,b){if(""===a.a.path)throw new x("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a){this.a=new Sd(a,function(a,c){return new X(a,c)},Md,this);this.b=a;this.c=new Ge(this)};k=Y.prototype;k.wa=function(a){T("ref",[ae(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new X(this.a);return n(a)?b.ga(a):b};
	k.xa=function(a){T("refFromURL",[ae(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Pa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new X(this.a,a)};k.Ca=function(){return this.a.b};k.za=function(a){T("setMaxUploadRetryTime",[ce()],arguments);this.a.b=a};k.Ba=function(){return this.a.c};k.ya=function(a){T("setMaxOperationRetryTime",[ce()],arguments);this.a.c=a};k.oa=function(){return this.b};
	k.la=function(){return this.c};var Ge=function(a){this.a=a};Ge.prototype.delete=function(){var a=this.a.a;a.g=!0;a.a=null;a.h.clear()};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};X.prototype.toString=X.prototype.toString;X.prototype.child=X.prototype.ga;X.prototype.put=X.prototype.ua;X.prototype["delete"]=X.prototype.delete;X.prototype.getMetadata=X.prototype.ha;X.prototype.updateMetadata=X.prototype.va;X.prototype.getDownloadURL=X.prototype.ta;Z(X.prototype,"parent",X.prototype.Fa);Z(X.prototype,"root",X.prototype.Ha);Z(X.prototype,"bucket",X.prototype.pa);Z(X.prototype,"fullPath",X.prototype.Aa);
	Z(X.prototype,"name",X.prototype.Ea);Z(X.prototype,"storage",X.prototype.Ja);Y.prototype.ref=Y.prototype.wa;Y.prototype.refFromURL=Y.prototype.xa;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.Ba);Y.prototype.setMaxOperationRetryTime=Y.prototype.ya;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.Ca);Y.prototype.setMaxUploadRetryTime=Y.prototype.za;Z(Y.prototype,"app",Y.prototype.oa);Z(Y.prototype,"INTERNAL",Y.prototype.la);Ge.prototype["delete"]=Ge.prototype.delete;
	Y.prototype.capi_=function(a){ka=a};W.prototype.on=W.prototype.I;W.prototype.resume=W.prototype.M;W.prototype.pause=W.prototype.L;W.prototype.cancel=W.prototype.H;Z(W.prototype,"snapshot",W.prototype.C);Z(B.prototype,"bytesTransferred",B.prototype.qa);Z(B.prototype,"totalBytes",B.prototype.La);Z(B.prototype,"state",B.prototype.Ia);Z(B.prototype,"metadata",B.prototype.Da);Z(B.prototype,"downloadURL",B.prototype.sa);Z(B.prototype,"task",B.prototype.Ka);Z(B.prototype,"ref",B.prototype.Ga);
	ta.STATE_CHANGED="state_changed";ua.RUNNING="running";ua.PAUSED="paused";ua.SUCCESS="success";ua.CANCELED="canceled";ua.ERROR="error";H.prototype["catch"]=H.prototype.l;H.prototype.then=H.prototype.then;
	(function(){function a(a){return new Y(a)}var b={TaskState:ua,TaskEvent:ta,Storage:Y,Reference:X};if(window.firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// Global helpers

	var showOverlay = function(){ // So that it's accesible to other functions here
	  var $overlay = $(".overlay");
	  $overlay.css('z-index', '1');
	  $overlay.show();
	  $("#character-bottom-nav-menu").css('z-index', 1);
	}; module.exports.showOverlay = showOverlay;


	var hideOverlay = function(){ // So that it's accesible to other functions here
	  $(".overlay").hide();
	  $(".join-overlay").hide();
	  $("#character-bottom-nav-menu").css('z-index', '');
	  $(".join-modal").hide();
	}; module.exports.hideOverlay = hideOverlay;


	module.exports.revealPage = function(){
	  if (window.revealed == false){
	    $(".loading-message").hide();
	    $(".body-content").addClass("u-opacity1");
	  };
	};


	module.exports.getUrlParam = function(name, url) {
	  if (!url) url = window.location.href;
	  name = name.replace(/[\[\]]/g, "\\$&");
	  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	      results = regex.exec(url);
	  if (!results) return null;
	  if (!results[2]) return '';
	  return decodeURIComponent(results[2].replace(/\+/g, " "));
	}


	module.exports.showDetailPane = function(selector, fieldValue){
	  var $detailTab = $("[data-selector="+ selector +"]");
	  var $detailPane = $("#" + fieldValue + "-info");

	  showOverlay();

	  $(".detail-panes").addClass("off-screen"); // Hide all detail panes
	  $(".character-detail-tab").removeClass("selected"); // Remove selected highlight style

	  $detailTab.removeClass("off-screen"); // Show race tabs
	  $detailTab.find($("#"+ fieldValue +"-tab")).addClass("selected");
	  $detailPane.removeClass("off-screen"); // Show the selected race pane
	};


	module.exports.hideDetailPane = function(){
	  $(".detail-tabs").addClass("off-screen");
	  $(".detail-panes").addClass("off-screen"); // Hide detail panes
	  hideOverlay();
	};


	// String.prototype.capitalize = function() { // TODO I think this isn't used
	//   return this.charAt(0).toUpperCase() + this.slice(1);
	// };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var requiresAuth = __webpack_require__(10).requiresAuth;
	var charactersPage = __webpack_require__(11).charactersPage;
	var characterPage = __webpack_require__(15).characterPage;
	var campaignsPage = __webpack_require__(16).campaignsPage;
	var campaignPage = __webpack_require__(18).campaignPage;
	var joinPage = __webpack_require__(19).joinPage;
	var profilePage = __webpack_require__(20).profilePage;

	var twitterAuth = __webpack_require__(10).twitterAuth;
	var revealPage = __webpack_require__(8).revealPage;

	// ROUTER
	// For routing the user around depending on their state
	module.exports.routeUser = function(){

	  firebase.auth().onAuthStateChanged(function(user) {

	    // If user is logged in, set global
	    if (user){
	      window.currentUser = firebase.auth().currentUser;
	      $("#mobile-nav-toggle").show();
	     }

	    if (window.location.pathname === "/"){
	      if (window.currentUser == undefined){ // If user is logged OUT
	        $(".logged-in").hide();
	      } else {
	        $(".logged-out").hide();
	      };
	      revealPage();
	    }

	    else if (window.location.pathname === "/login"){ // IF at login

	      if (window.currentUser) { // Redirect if already logged in
	        window.location.replace("/");
	      } else { // Else show login page
	        revealPage();
	      }
	      // Enable login click handlers (Might not really belong here but whatevs #YOLO)
	      $('.ion-social-twitter').on('click',function(){ twitterAuth(); });
	    }

	    else if (window.location.pathname === "/character"){ // Specific character
	      requiresAuth(characterPage);
	    }
	    else if (window.location.pathname === "/characters"){ // List of characters
	      requiresAuth(charactersPage);
	    }
	    else if (window.location.pathname === "/join"){ // Join a campaign
	      requiresAuth(joinPage); // TODO make this unique page to explain why to sign up?
	    }
	    else if (window.location.pathname === "/campaign"){ // Specific campaign
	      requiresAuth(campaignPage);
	    }
	    else if (window.location.pathname === "/campaigns"){ // List of campaigns
	      requiresAuth(campaignsPage);
	    }
	    else if (window.location.pathname === "/profile"){ // List of campaigns
	      requiresAuth(profilePage);
	    }

	  });
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// AUTH - - - -
	// Contains functions related to authentication

	var firebase = __webpack_require__(5);
	var fb_auth = __webpack_require__(5).auth;
	var fb_data = __webpack_require__(5).database();


	// Only let authorized users into these pages
	module.exports.requiresAuth = function requiresAuth(callback){
	  if (!window.currentUser) {
	    window.location.replace("/login");
	  } else {
	    if (callback) callback();
	  }
	};

	// Twitter authentication
	module.exports.twitterAuth = function(){
	  var provider = new firebase.auth.TwitterAuthProvider();
	  firebase.auth().signInWithPopup(provider).then(function(result) {
	    window.currentUser = result.user;
	  }).catch(function(error){
	    var errorCode = error.code;
	    console.log("An error happened during login lol", error);
	    alert(error.message)
	  });
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Defines functions applicable to the /characters list page

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(6).database();
	var revealPage = __webpack_require__(8).revealPage;
	var gameTypes = __webpack_require__(12).gameTypes;
	var gameMeta = __webpack_require__(12).gameMeta;

	module.exports.charactersPage = function charactersPage(){
	  var userUid = window.currentUser.uid;
	  var charactersPath = "users/" + userUid + "/characters";
	  var characters = []; // Used to render all characters on page through vue

	  fb_data.ref(charactersPath).once('value').then(function(snap){
	    if (snap.val() == null){ // If no characters exist yet

	      $(".button-add").addClass("button-huge-middle");
	      // TODO maybe show some instruction on adding first character?

	    } else { // Else, display each character user has

	      Object.keys(snap.val()).forEach(function(character_id){
	        fb_data.ref("characters/" + character_id).once('value', function(character_snap){
	          // Push each character to the characters array so that vue can draw them afterwards
	          var cc = character_snap.val();
	          cc.key = character_id;
	          cc.game_type = gameMeta(cc.game_type).short_name; // Transform game type to readable format
	          characters.push(cc);
	        });
	      });

	    };
	  }).then(function(){
	    revealPage();
	    new Vue({ // Draw all the characters pulled from firebase above
	      el: '#vue-characters',
	      data: { characters: characters }
	    });
	    attachClickHandlers();

	  });
	};


	var attachClickHandlers = function(){
	  // Clicking on a character sends you to a character page
	  $(document).on("click", ".character", function(ee){
	    window.location.href = "/character?id=" + $(ee.currentTarget).attr("id");
	  });

	  $(document).on("click touchstart", ".overlay", function(ee){
	    $(ee.target).hide();
	    $(".modal").hide();
	  });

	  $(document).keyup(function(e){ // Escape key
	    if (e.keyCode === 27) $('.overlay').click();
	  });

	  // Clicking on the new button adds a new (mostly-empty) character
	  $(document).on("click", "#new-character", function(ee){
	    showGameTypeModal();
	  });

	};

	var showGameTypeModal = function(){
	  new Vue({
	    el: '#game-selection',
	    data: { game_types: gameTypes() },
	    methods: { createNewCharacter: createNewCharacter }
	  });
	  $(".modal").show(); $(".overlay").show();
	};

	// Creates a new character, pushes it to fb, performs callback w/ character_id string
	var createNewCharacter = function(ee){
	  var userUid = window.currentUser.uid;
	  var charactersPath = "users/" + userUid + "/characters";
	  var game_type = $(ee.target).attr('id'); // Game type from link id
	  var new_char_template = gameMeta(game_type).default_character; // Get default from meta
	  new_char_template.game_type = game_type; // Set game type on new character

	  var oo = fb_data.ref("characters").push(new_char_template); // Push new character to /characters

	  // Add to /users node to draw referance
	  // This might change with Firebase 3?
	  var character_id = oo.key;
	  fb_data.ref(charactersPath + "/" + character_id).update(
	    { created_on: (new Date).toString() }
	  );
	  window.location.href = "/character?id=" + character_id; // Redirect to character view
	};

	// 🎵 Wildcat!Wildcat! Tower


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	// The game meta documents are design to define character and game structure for drawing and
	// maniuplating views related to a character of that 'game type' - This contains the
	// appropriate functions to fetch game meta for use in view.

	// -- Adding Game Meta --
	// You'll need to create a new file for each 'game type' which should correspond with it's key
	// used to access it. Use dnd_5e as an example - it contains stat information, how characters
	// should be structure, spells, etc.

	// A view will not inherintly be smart enough to know what to do with a gameMeta object, but
	// you can use them as an easy way to abstract view logic and allow for consinstent changes
	// for a given game type.

	// NOTE: Game meta information for each game are stored in seperate files in this folder, and can
	// be disabled by setting the 'active' flag to false before a game type is active/live.





	// Retrieve full 'game meta' information based on the key passed in
	// Arguments(game_key) [String] - eg. 'dnd_5e'
	// Returns gameMeta Object
	module.exports.gameMeta = function(game_key){
	  var game_meta = __webpack_require__(13)("./" + game_key).gameMeta();
	  return game_meta;
	};



	// returns [Object]
	// Returns and array of objects containing a pruned subset of information about a given game type
	// (key, long_name, short_name) - This can be expanded later if needed
	module.exports.gameTypes = function(){
	  var gameMeta = __webpack_require__(12).gameMeta;
	  var game_list = ['dnd_5e']; // Harded coded list of string matching meta filename
	  var game_type_data = {};

	  game_list.forEach(function(game_key){
	    var full_game_data = gameMeta(game_key); // Entire game meta

	    if (full_game_data.active != false){
	      game_type_data[game_key] = {
	        key: game_key,
	        short_name: full_game_data.short_name,
	        long_name: full_game_data.long_name,
	      };
	    };
	  });
	  return game_type_data; // Just return the subset
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./dnd_5e": 14,
		"./dnd_5e.js": 14,
		"./meta": 12,
		"./meta.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	// DND 5E Game meta information
	// This structure is used to determine field types and skill/spell/attribute
	// data when creating and viewing a character of this game type

	module.exports.gameMeta = function gameMeta(){
	  var game_meta = {
	    active: true,
	    long_name: 'Dungeons and Dragons: 5th Edition',
	    short_name: 'D&D 5E',
	    rules_url: 'http://dnd.wizards.com/products/tabletop/players-basic-rules',

	    character_structure: {
	      name: 'text',
	      age: 'text',
	      experience: 'number',
	      height: 'text',
	      current_hp: 'number',
	      temporary_hp: 'number',
	      max_hp: 'number',
	      sex: 'text',
	      languages: 'text',

	      stats: {
	        str: 'number',
	        dex: 'number',
	        con: 'number',
	        int: 'number',
	        wis: 'number',
	        cha: 'number',
	      },

	      alignment: {
	        options: [
	          'Lawful Good', 'Neutral Good', 'Chaotic Good',
	          'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
	          'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
	        ]},

	      classes: {
	        fighter: {
	          hit_die: "1d10 per fighter level",
	          hit_points_starting: "10+con",
	          hit_points_after: "1d10 (or 6) + your Constitution modifier per fighter level after 1st",
	          proficiencies: {
	            Armor: 'All armor, shields',
	            Weapons: 'Simple weapons and martial weapons',
	            Tools: 'None',
	            Saving_Throws: 'Strength, Constitution',
	          },
	          skill_count: 2,
	          skills: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Perception', 'Survival']
	        },
	        rogue: {
	          hit_die: "1d18 per rogue level",
	          hit_points_starting: "8+con",
	          hit_points_after: "1d8 (or 5) + your Constitution modifier per rogue level after 1st",
	          proficiencies: {
	            Armor: 'Light armor',
	            Weapons: 'Simple weapons, hand crossbows, longswords, rapiers, shortswords',
	            Tools: 'Thieves’ tools',
	            Saving_Throws: 'Dexterity, Intelligence',
	          },
	          skill_count: 4,
	          skills: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation',
	                   'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth']
	        },
	        cleric: {
	          hit_die: "1d8 per cleric level",
	          hit_points_starting: "8+con",
	          hit_points_after: "1d8 (or 5) + your Constitution modifier per cleric level after 1st",
	          proficiencies: {
	            Armor: 'Light armor, medium armor, shields',
	            Weapons: 'All simple weapons',
	            Tools: 'None',
	            Saving_Throws: 'Wisdom, Charisma',
	          },
	          skill_count: 2,
	          skills: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
	          spell_casting: true,
	        },
	        wizard: {
	          hit_die: "1d6 per wizard level",
	          hit_points_starting: "6+con",
	          hit_points_after: "1d6 (or 4) + your Constitution modifier per wizard level after 1st",
	          proficiencies: {
	            Armor: 'None',
	            Weapons: 'Daggers, darts, slings, quarterstaffs, light crossbows',
	            Tools: 'None',
	            Saving_Throws: 'Wisdom, Intelligence',
	          },
	          skill_count: 2,
	          skills: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
	          spell_casting: true,
	        },
	      },

	      races: {
	        dwarf: {
	          description: "Dwarfs are small",
	          traits: [
	            {label: "Ability Score Increase", description: "Your Constitution score increases by 2"},
	            {label: "Darkvision", description: "You can see in dim light. Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray."},
	            {label: "Dwarven Resilience", description: "You have advantage on saving throws against poison and resistance against poison damage."},
	            {label: "Dwarven Combat Training", description: "You have proficiency with the battleaxe, handaxe, throwing hammer, and warhammer."},
	            {label: "Stonecunning", description: "Double your proficiency bonus when making history skill checks related to the origin of stonework and you are considered proficient in history for such checks."},
	            {label: "Speed", description: "Your speed is not reduced by heavy armor."},
	            {label: "Language", description: "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak."}
	          ],
	          facts: [
	            {label: "Age", description: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years."},
	            {label: "Alignment", description: "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order."},
	            {label: "Size", description: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium."},
	          ]
	        },
	        human: {
	          description: "Humans are boring",
	          traits: [
	            {label: "Ability Score Increase", description: "Your ability scores each increase by 1."},
	            {label: "Language", description: "Languages: You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on."}
	          ],
	          facts: [
	            {label: "Age", description: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50."},
	            {label: "Alignment", description: "Humans tend toward no particular alignment. The best and the worst are found among them."},
	            {label: "Size", description: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium."},
	            {label: "Speed", description: "Your base walking speed is 30 feet."},
	          ]
	        },
	        elf: {
	          description: "Elves",
	          traits: [
	            {label: "Ability Score Increase", description: "Your Dexterity score increases by 2."},
	            {label: "Darkvision", description: "You can see in dim light. Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray."},
	            {label: "Keen Senses", description: "You have proficiency in the Perception skill."},
	            {label: "Fey Ancestry", description: "You have advantage on saving throws against being charmed, and magic can’t put you to sleep."},
	            {label: "Trance", description: "Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. While meditating (in trance), you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep."},
	            {label: "Language", description: "You can speak, read, and write Common and Elvish."},
	          ],
	          facts: [
	            {label: "Age", description: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old."},
	            {label: "Alignment", description: "Elves love freedom, variety, and self- expression, so they lean bly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not."},
	            {label: "Size", description: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium."},
	          ]
	        },
	        halfling: {
	          description: "Halflings",
	          traits: [
	            {label: "Ability Score Increase", description: "Your Dexterity score increases by 2."},
	            {label: "Halfling Nimbleness", description: "You can move through the space of any creature that is of a size larger than yours."},
	            {label: "Brave", description: "You have advantage on saving throws against being frightened."},
	            {label: "Lucky", description: "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."},
	            {label: "Language", description: "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling."},
	          ],
	          facts: [
	            {label: "Age", description: "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century."},
	            {label: "Alignment", description: "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways."},
	            {label: "Size", description: "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small."},
	            {label: "Speed", description: "Your base walking speed is 25 feet."},
	          ]
	        },
	      },


	      skills: {
	        acrobatics: {
	          name: 'Acrobatics',
	          stat: 'dex'
	        },
	        animal_handling: {
	          name: 'Animal Handling',
	          stat: 'wis'
	        },
	        arcana: {
	          name: 'Arcana',
	          stat: 'int'
	        },
	        athletics: {
	          name: 'Athletics',
	          stat: 'str'
	        },
	        deception: {
	          name: 'Deception',
	          stat: 'cha'
	        },
	        history: {
	          name: 'History',
	          stat: 'int'
	        },
	        insight: {
	          name: 'Insight',
	          stat: 'wis'
	        },
	        intimidation: {
	          name: 'Intimidation',
	          stat: 'chr'
	        },
	        investigation: {
	          name: 'Investigation',
	          stat: 'int'
	        },
	        medicine: {
	          name: 'Medicine',
	          stat: 'wis'
	        },
	        nature: {
	          name: 'Nature',
	          stat: 'int'
	        },
	        perception: {
	          name: 'Perception',
	          stat: 'wis'
	        },
	        performance: {
	          name: 'Performance',
	          stat: 'cha'
	        },
	        persuasion: {
	          name: 'Persuasion',
	          stat: 'wis'
	        },
	        religion: {
	          name: 'Religion',
	          stat: 'int'
	        },
	        sleight_of_hand: {
	          name: 'Sleight of Hand',
	          stat: 'dex'
	        },
	        stealth: {
	          name: 'Stealth',
	          stat: 'dex'
	        },
	        survival: {
	          name: 'Survival',
	          stat: 'wis'
	        }
	      },

	      ability_modifiers: {
	        1: "-5",
	        2: "-4",
	        3: "-4",
	        4: "-3",
	        5: "-3",
	        6: "-2",
	        7: "-2",
	        8: "-1",
	        9: "-1",
	        10: "+0",
	        11: "+0",
	        12: "-1",
	        13: "-1",
	        14: "-2",
	        15: "-2",
	        16: "-3",
	        17: "-3",
	        18: "-4",
	        19: "-4",
	        20: "-5",
	        21: "-5",
	        22: "-6",
	        23: "-6",
	        24: "-7",
	        25: "-7",
	        26: "-8",
	        27: "-8",
	        28: "-9",
	        29: "-9",
	        30: '+10'
	      }

	    },

	    // Level progression isn't currently used
	    level_progression: { //TODO these numbers probably aren't right
	      1: 300,
	      2: 600,
	      3: 1800,
	      4: 3800,
	      5: 7500,
	      6: 9000,
	      7: 11000,
	      8: 14000,
	      9: 16000,
	      10: 21000,
	      11: 15000,
	      12: 20000,
	      13: 20000,
	      14: 25000,
	      15: 30000,
	      16: 30000,
	      17: 40000,
	      18: 40000,
	      19: 50000,
	    }, // http://www.enworld.org/forum/showthread.php?367079-5e-XP-Chart-Progression-Question&s=b74b6ad8f6216bc7f28c90cf06fcf862#ixzz47MrhUGYY

	    default_character: {
	      name: 'New Character',
	      experience: 0,
	      level: 1,
	      race: 'dwarf',
	      class: 'fighter',
	      alignment: 'Neutral',
	      proficiency_bonus: 2,
	      background: {
	        languages: 'Common',
	      },
	      stats: {
	        str: 15,
	        dex: 14,
	        con: 13,
	        int: 12,
	        wis: 10,
	        cha: 8,
	      }
	    },

	    default_npc: {
	      name: 'New NPC',
	    },


	    spells: {
	      acid_splash: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "conjuration",
	        components: "V, S",
	        description: "",
	        range: "60 feet",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. " +
	        "A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
	        subtext: "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
	      },
	      dancing_lights: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "evocation",
	        components: "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
	        description: "",
	        range: "120 feet",
	        casting_time: "1 action",
	        duration: "Concentration, up to 1 minute",
	        description: "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air " +
	        "for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light " +
	        "sheds dim light in a 10-foot radius.",
	        subtext: "As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another " +
	        "light created by this spell, and a light winks out if it exceeds the spell’s range.",
	      },
	      fire_bolt: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "evocation",
	        components: "V, S",
	        description: "",
	        range: "120 feet",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target " +
	        "takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn’t being worn or carried.",
	        subtext: "This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
	      },
	      guidance: {
	        level: 0,
	        eligible_classes: ['cleric'],
	        school: "divination",
	        components: "V, S",
	        range: "Touch",
	        casting_time: "1 action",
	        duration: "Concentration, up to 1 minute",
	        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check " +
	        "of its choice. It can roll the die before or after making the ability check. The spell then ends.",
	      },
	      light: {
	        level: 0,
	        eligible_classes: ['cleric', 'wizard'],
	        school: "evocation",
	        components: "V, M (a firefly or phosphorescent moss)",
	        range: "120 feet",
	        casting_time: "1 action",
	        duration: "1 hour",
	        description:  "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot " +
	        "radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the " +
	        "light. The spell ends if you cast it again or dismiss it as an action.",
	        subtext: "If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
	      },
	      mage_hand: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "conjuration",
	        components: "V, S",
	        range: "30 feet",
	        casting_time: "1 action",
	        duration: "1 minute",
	        description: "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. " +
	        "The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
	        subtext:  "You can use your action to control the hand.You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve " +
	        "an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it. The hand can’t attack, " +
	        "activate magic items, or carry more than 10 pounds.",
	      },
	      minor_illusion: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "illusion",
	        components: "S, M (a bit of fleece)",
	        range: "30 feet",
	        casting_time: "1 action",
	        duration: "1 minute",
	        description:  "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss " +
	        "it as an action or cast this spell again. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, " +
	        "someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, " +
	        "or you can make discrete sounds at different times before the spell ends.",
	        subtext:  "If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot cube. " +
	        "The image can’t create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, " +
	        "because things can pass through it. If a creature uses its action to examine the sound or image, the creature can determine that it is an " +
	        "illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, " +
	        "the illusion becomes faint to the creature.",
	      },
	      poison_spray: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "conjuration",
	        components: "V, S",
	        range: "10 feet",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. " +
	        "The creature must succeed on a Constitution saving throw or take 1d12 poison damage.",
	        subtext: "This spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
	      },
	      prestidigitation: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "conjuration",
	        components: "V, S",
	        range: "10 feet",
	        casting_time: "1 action",
	        duration: "Up to 1 hour",
	        description:  "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:" +
	        "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor." +
	        "You instantaneously light or snuff out a candle, a torch, or a small campfire." +
	        "You instantaneously clean or soil an object no larger than 1 cubic foot." +
	        "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour." +
	        "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour." +
	        "You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.",
	        subtext: "If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
	      },
	      ray_of_frost: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "conjuration",
	        components: "V, S",
	        range: "60 feet",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, " +
	        "and its speed is reduced by 10 feet until the start of your next turn.",
	        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
	      },
	      resistance: {
	        level: 0,
	        eligible_classes: ['cleric'],
	        school: "conjuration",
	        components: "V, S, M (a miniature cloak)",
	        range: "Touch",
	        casting_time: "1 action",
	        duration: "Concentration, up to 1 minute",
	        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll " +
	        "the die before or after making the saving throw. The spell then ends.",
	        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
	      },
	      sacred_flame: {
	        level: 0,
	        eligible_classes: ['cleric'],
	        school: "evocation",
	        components: "V, S",
	        range: "60 feet",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The " +
	        "target gains no benefit from cover for this saving throw.",
	        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
	      },
	      shocking_grasp: {
	        level: 0,
	        eligible_classes: ['wizard'],
	        school: "evocation",
	        components: "V, S",
	        range: "Touch",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack " +
	        " roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.",
	        subtext: "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
	      },
	      spare_the_dying: {
	        level: 0,
	        eligible_classes: ['cleric'],
	        school: "necromancy",
	        components: "V, S",
	        range: "Touch",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
	      },
	      thaumaturgy: {
	        level: 0,
	        eligible_classes: ['cleric'],
	        school: "transmutation",
	        components: "V",
	        range: "30 feet",
	        casting_time: "1 action",
	        duration: "Up to 1 minute",
	        description: "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range:" +
	        "Your voice booms up to three times as loud as normal for 1 minute." +
	        "You cause flames to flicker, brighten, dim, or change color for 1 minute." +
	        "You cause harmless tremors in the ground for 1 minute." +
	        "You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers." +
	        "You instantaneously cause an unlocked door or window to fly open or slam shut." +
	        "You alter the appearance of your eyes for 1 minute.",
	        subtext: "If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.",
	      },
	      bless: {
	        level: 1,
	        eligible_classes: ['cleric'],
	        school: "enchantment",
	        components: "V, S, M (a sprinkling of holy water)",
	        range: "30 ft",
	        casting_time: "1 action",
	        duration: "Concentration, up to 1 minute",
	        description: "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.",
	        subtext: "At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
	      },
	      burning_hands: {
	        level: 1,
	        eligible_classes: ['wizard'],
	        school: "evocation",
	        components: "V, S",
	        range: "Self (15-foot cone)",
	        casting_time: "1 action",
	        duration: "Instantaneous",
	        description: "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone " +
	        "must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one." +
	        "The fire ignites any flammable objects in the area that aren’t being worn or carried.",
	        subtext: "At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
	      },

	    }
	  };

	  return game_meta;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Defines functions applicable to an individual /campaign page

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(5).database();
	var revealPage = __webpack_require__(8).revealPage;
	var gameMeta = __webpack_require__(12).gameMeta;
	var getUrlParam = __webpack_require__(8).getUrlParam;

	var showOverlay = __webpack_require__(8).showOverlay;
	var hideOverlay = __webpack_require__(8).hideOverlay;
	var showDetailPane = __webpack_require__(8).showDetailPane;
	var hideDetailPane = __webpack_require__(8).hideDetailPane;



	module.exports.characterPage = function characterPage(){
	  window.locked = false; // Lock ability to edit fields
	  var character_id = getUrlParam("id");
	  var characterPath = "characters/" + character_id;
	  var trigger = getUrlParam("trigger");
	  var default_equipment = { name: 'New Equipment' };
	  var default_ability = { name: 'New Ability', bonus: 'Bonus', type: 'Type' };

	  // Generate a vue directly from the firebase character object
	  // All fb object properties will be avilable and bindable in the view
	  // for the vue templating to manipulate/show/iterate on
	  fb_data.ref("characters/" + character_id).on("value", function(snap){
	    var character_data = snap.val();

	    if (!window.character){ // If we don't have character, make vue
	      console.log(gameMeta('dnd_5e'))
	      window.character = new Vue({
	        el: '#vue-character',
	        data: {
	          trigger: trigger,
	          character: character_data,
	          gameMeta: gameMeta( character_data.game_type ),
	          campaigns: {},
	        },
	        methods: {
	          updateStore: function(){
	            fb_data.ref(characterPath).update(this.character);
	          },
	          addEquipment: function(){ // Push a new equipment
	            if (window.locked === true) return; // Ignore if locked
	            fb_data.ref(characterPath + "/equipment").push(default_equipment);
	          },
	          deleteEquipment: function(ee){ // Destroy equipment
	            if (window.locked === true) return; // Ignore if locked
	            var equipment_id = $(ee.target).data("equipment-id");
	            fb_data.ref(characterPath + "/equipment/" + equipment_id).remove();
	          },
	          addAbility: function(){ // Push a new equipment
	            if (window.locked === true) return; // Ignore if locked
	            fb_data.ref(characterPath + "/abilities").push(default_ability);
	          },
	          deleteAbility: function(ee){ // Destroy equipment
	            if (window.locked === true) return; // Ignore if locked
	            var ability_id = $(ee.target).data("ability-id");
	            fb_data.ref(characterPath + "/abilities/" + ability_id).remove();
	          },
	          updateSkill: function(ee){
	            var $closestBox = $(ee.currentTarget).closest(".box-skill")
	            var selectedSkill = $closestBox.find("input").attr('id').replace("skill-", "");
	            var skillPath = characterPath + "/skills/" + selectedSkill;

	            if ($(ee.currentTarget).prop('checked')) { // If it's becoming checked (not currently)
	              fb_data.ref(skillPath).set(1);
	            } else {
	              fb_data.ref(skillPath).remove();
	            };
	          },
	          addAbilityPicker: function(){
	            if (window.locked === true) return; // Ignore if locked
	            showSpellPane();
	          },
	          addSpell: function(ee){
	            ee.preventDefault();
	            var spellName = $(ee.currentTarget).data('spell');
	            var spellData = this.gameMeta.spells[spellName];

	            var serializedSpell = {
	              name: spellName.replace("_", " "),
	              description: spellData.casting_time + " : " +
	                spellData.duration + " : " +
	                spellData.components + " : " +
	                spellData.range,
	              long_description: spellData.description +
	                spellData.casting_time + " : " +
	                spellData.duration + " : " +
	                spellData.components + " : " +
	                spellData.range
	            };

	            fb_data.ref(characterPath + "/abilities").push(serializedSpell).then(function(){
	              hideDetailPane();
	            });
	          },
	          toggleInfo: function(ee){ // Toggle long information for abilities and spells
	            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
	          },
	        }
	      });

	      attachClickHandlers();
	      revealPage();

	    } else { // If we do have a vue object, update it when fb sends us stuff
	      window.character.$set("character", character_data);
	    };

	    getCampaigns(snap.val()); // Go fetch campaign data whether it's init or update
	  });
	};


	// Fetch campaign data from character snap and push it into our character vue object to render
	var getCampaigns = function(character_snap){
	  // Reset campaign data to {} (for updates)
	  // ^ If this isn't done deletes won't update because we're just setting existing keys
	  window.character.$set("campaigns", {});

	  if (character_snap.campaigns){ // If any campaigns exist
	    var campaignIds = Object.keys(character_snap.campaigns);
	    campaignIds.forEach(function(campaignId){
	      // Set listener off before we do anything to ensure ther aren't multiple listers attached
	      // A better way to do this is prob listen to child_added on the campaign reference list on
	      // character, and then set on and off based on that
	      fb_data.ref("campaigns/" + campaignId).off();
	      fb_data.ref("campaigns/" + campaignId).on("value", function(campaign_snap){
	        Vue.set(window.character.campaigns, campaignId, campaign_snap.val());
	        $("#campaign-join-warning").hide(); // Hide join campaign prompt
	        $(".join-campaign-home").hide(); // Hide join campaign button on main page
	      });
	    });
	  } else {
	    window.character.$set("campaigns", {});
	    $("#campaign-join-warning").show();
	  };
	};

	var attachClickHandlers = function(){
	  $(".button-disabled").on('click', function(e){
	    e.preventDefault();
	  });

	  $("body").on("click", ".leave-campaign", function(e){
	    var character_id = getUrlParam("id");
	    var characterPath = "characters/" + character_id;
	    var campaign_id = $(e.currentTarget).data('campaign-id');
	    // Remove character reference from campaign
	    fb_data.ref("campaigns/" + campaign_id + "/characters/" + character_id).remove();
	    // Remove campaign reference from character
	    fb_data.ref(characterPath + "/campaigns/" + campaign_id).remove();
	  });

	  // Prevent form submission
	  $("#character-form-primary, #character-form-secondary").submit(function(e){
	    e.preventDefault(); // TODO Can maybe put a modal up that explains realtime?
	  });

	  // Class & Race selection
	  // When the race or class form is clicked, opn up detail pane
	  $(".detail-change-click").on("click", function(e){
	    if (window.locked == false){
	      e.preventDefault();
	      var fieldName = $(e.currentTarget).data('field'); // 'race' or 'class'
	      var $inputVal = $("#character-" + fieldName).val();
	      showDetailPane(fieldName, $inputVal);
	    };
	  });

	  // Tabs inside detail panes (rogue, human, etc.)
	  $("body").on("click", ".character-detail-tab", function(e){
	    var _this = $(e.currentTarget) // this tab
	    var selectorType = _this.closest("[data-selector]").data('selector'); // 'race' or 'class' from parent selector
	    showDetailPane(selectorType, _this.data("lookup") );
	  });

	  // When they choose a race or class
	  $("[data-detail-select]").on("click", function(e){
	    var _this = $(e.currentTarget);
	    var detailSelect = $(e.currentTarget).data('detail-select');

	    if (_this.data('lookup') === 'race'){
	      $("#character-race").val(detailSelect); // Set input
	      $("#character-race").change(); // Trigger change so vue diffing knows it's different?
	    } else {
	      $("#character-class").val(detailSelect); // Set input
	      $("#character-class").change(); // Trigger change so vue diffing knows it's different?
	    }
	    window.character.updateStore(); // Now call updateStore directly since change doesn't trigger it
	    hideDetailPane(); // Hide pane
	  });


	  // Join campaign button
	  $(".join-campaign").on("click", function(){
	    //TODO add focus to form on modal
	    $(".join-overlay").show();
	    $(".join-modal").show();
	  })
	  // Close join campaign overlay by clicking outside of modal
	  $(".join-overlay").on("click", function(){
	    $(".join-overlay").hide();
	    $(".join-modal").hide();
	  });

	  $(".add-character-to-campaign").on("click", function(e){
	    var campaignCode = $(e.currentTarget)
	    .closest(".join-modal-content")
	    .find(".campaign-code-input")
	    .val();
	    addCharacterToCampaign(campaignCode);
	  });

	  $(".character-lock-fields").on("click", function(e){
	    if ($(e.currentTarget).hasClass("ion-unlocked")){
	      // Lock fields down
	      $lockIcons = $(".character-lock-fields");
	      $lockIcons.addClass("ion-locked");
	      $lockIcons.removeClass("ion-unlocked");
	      $("input, textarea").prop( "disabled", true );
	      window.locked = true;
	    } else {
	      // Unlock fields
	      $lockIcons.addClass("ion-unlocked");
	      $lockIcons.removeClass("ion-locked");
	      $("input, textarea").prop( "disabled", false );
	      window.locked = false;
	    };
	  });

	};


	// Shake the campaign modal and clear it's value to tell the user what they did was wrong
	var shakeAndClearCampaignModal = function(){
	  $(".campaign-code-input").val(""); // Clear field
	  $(".join-modal").addClass("animated shake");
	  setTimeout(function(){
	    $(".join-modal").removeClass("animated shake");
	  }, 400);
	  console.log("No campaign found with that code.")
	};

	var addCharacterToCampaign = function(campaignCode){
	  var characterKey = getUrlParam("id");

	  fb_data.ref("campaigns")
	    .orderByChild('campaign_key') // Using index (set in rules)
	    .startAt(campaignCode)
	    .limitToFirst(1)
	    .once("value", function(snap){

	    // If no reference exists, exit
	    if (snap.val() === null) { shakeAndClearCampaignModal(); return; }

	    // Check if campaign code matches thing, else return not found
	    if (snap.val()[Object.keys(snap.val())[0]].campaign_key == campaignCode){
	      var campaignId = Object.keys(snap.val())[0];

	      // Add character reference to campaign
	      fb_data.ref("campaigns/" + campaignId + "/characters/" + characterKey).set(Date.now());
	      // Add campaign reference to characeter
	      fb_data.ref("characters/" + characterKey + "/campaigns/" + campaignId).set(Date.now());
	      hideOverlay();
	    } else {
	      // Note: at this point something WAS returned, but priority lookups will
	      // find the closest match if the beginning letters match
	      shakeAndClearCampaignModal();
	    }
	  });
	};


	var showSpellPane = function(){
	  $("#spell-pane").removeClass("off-screen");
	  showOverlay();
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Defines functions applicable to the /campaigns list page

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(6).database();
	var revealPage = __webpack_require__(8).revealPage;
	var gameTypes = __webpack_require__(12).gameTypes;
	var gameMeta = __webpack_require__(12).gameMeta;
	var campaignKeyGenerator = __webpack_require__(17).campaignKeyGenerator;

	module.exports.campaignsPage = function campaignsPage(){
	  var userUid = window.currentUser.uid;
	  var campaignsPath = "users/" + userUid + "/campaigns";
	  var campaigns = []; // Used to render all characters on page through vue

	  fb_data.ref(campaignsPath).once('value').then(function(snap){
	    if (snap.val() == null){ // If no characters exist yet

	      $(".button-add").addClass("button-huge-middle");
	      revealPage(); // TODO Show a tooltip or something on how to make new

	    } else { // Else, display each campaign a user has

	      Object.keys(snap.val()).forEach(function(campaign_id){
	        fb_data.ref("campaigns/" + campaign_id).once('value', function(campaign_snap){
	          // IF we encounter a campaign that doesn't exist
	          if (campaign_snap.val() == null){
	            fb_data.ref(campaignsPath + "/" + campaign_id).remove();
	          } else { // Else, transform & show data
	            // Push each campaign to the campaigns array so that vue can draw them afterwards
	            var cc = campaign_snap.val();
	            cc.game_type = gameMeta(cc.game_type).short_name; // Transform game type to readable format
	            cc.key = campaign_id;
	            campaigns.push(cc);
	          };
	        });
	      });

	    };
	  }).then(function(){

	    new Vue({ // Draw all the characters pulled from firebase above
	      el: '#vue-campaigns',
	      data: {
	        campaigns: campaigns,
	        game_types: gameTypes(),
	      }
	    });

	    new Vue({ // Draw all the characters pulled from firebase above
	      el: '#vue-campaigns-modal',
	      data: {
	        game_types: gameTypes(),
	      },
	      methods: {
	        createCampaign: function(ee){
	          var game_type = $(ee.target).attr('id');
	          createNewCampaign(game_type);
	        }
	      }
	    });

	    revealPage();
	    attachClickHandlers();
	  });
	};


	var attachClickHandlers = function(){
	  $(document).on("click", "#new-campaign", function(ee){ // New campaign triggers confirmation modal
	    showConfirmationModal();
	  });

	  // TODO these modal things are sort of duplicated in global - need to refactor
	  // Things which hide modal
	  $(document).on("click touchstart", ".overlay" , function(ee){ hideModal(); });
	  $(document).keyup(function(e){  if (e.keyCode === 27) hideModal(); });

	  // Clicking on a campaign sends you to a character page
	  $(document).on("click", ".campaign", function(ee){
	    window.location.href = "/campaign?id=" + $(ee.currentTarget).attr("id");
	  });

	};


	var hideModal = function(){
	  $(".modal").hide();
	  $(".overlay").hide();
	};

	var showConfirmationModal = function(){
	  $(".modal").show();
	  $(".overlay").show();
	};


	var createNewCampaign = function(game_type){

	  // Set user as the owner for the campaign
	  var owners = {};
	  owners[window.currentUser.uid] = Date.now();
	  var campaignKey = campaignKeyGenerator();

	  // Default campaign object
	  var defaultCampaign = {
	    name: 'New Campaign',
	    owners: owners,
	    campaign_key: campaignKey,
	    game_type: game_type,
	  };

	  // Push default campaign object as new campaign
	  var campaignPush = fb_data.ref("campaigns").push(defaultCampaign);

	  // Then, reference it in user info
	  fb_data.ref("users/" + window.currentUser.uid + "/campaigns/" + campaignPush.key).set({
	    created_on: Date.now(),
	    campaign_key: campaignKey,
	  }).then(function(){
	    console.log('Campaign created!');
	    window.location.href = "/campaign?id=" + campaignPush.key;
	  });

	  var campaignReference = fb_data.ref("campaigns/" + campaignPush.key);
	  campaignReference.setPriority(campaignKey);

	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var fb_data = __webpack_require__(6).database();

	// Generates a random campaign key for other users to join to campaigns

	module.exports.campaignKeyGenerator = function campaignKeyGenerator(){
	  var words = [ "acid", "blade", "lights", "fire", "bolt", "light", "mending", "poison",
	    "trap", "minor", "ray", "sacred", "flame", "pooky", "duck", "vicious", "mockery", "lime",
	    "green", "blue", "black", "yellow", "purple", "maroon", "pink", "orange", "red", "white",
	    "knight", "king", "queen", "squire", "charming", "hex", "magic", "missile", "spider", "owlbear",
	    "deathly", "hallowed", "web", "beam", "power", "weird", "sheep", "monkey", "cow", "moose",
	    "bear", "dragon", "serpent", "goblin", "naga", "orc", "elf", "dwarf", "halfing", "astral",
	    "feeble", "druid", "ranger", "wizard", "cleric", "dreaming", "squirrel", "gnome", "badger",
	    "dungeon", "priest", "skull", "mage", "cult", "bugbear", "evil", "noble", "team", "helm",
	    "potion", "alchemy", "boots", "sword", "flying", "wand", "spark", "musical", "bard", "treasure",
	    "dark", "ghoul", "undead", "war", "ruffian", "ambush", "pit", "tree", "forest", "cake", "ale",
	  ];

	  var w1 = words[Math.floor(Math.random()*words.length)];
	  var w2 = words[Math.floor(Math.random()*words.length)];
	  return (w1 + "-" + w2 + Math.floor(Math.random()*999)).toString();
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Defines functions applicable to an individual /campaign page

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(5).database();
	var revealPage = __webpack_require__(8).revealPage;
	var gameMeta = __webpack_require__(12).gameMeta; //TODO do we need this? (see below)
	var showOverlay = __webpack_require__(8).showOverlay;

	module.exports.campaignPage = function campaignPage(){
	  var campaign_id = window.location.search.replace("?id=", "");
	  var campaignPath = "campaigns/" + campaign_id;
	  var npcsPath = campaignPath + '/npcs'

	  var defaultNpc = gameMeta('dnd_5e').default_npc; // TODO make this pull from meta?

	  // Generate a vue directly from the firebase campaign object
	  fb_data.ref(campaignPath).on("value", function(snap){
	    var campaign_data = snap.val();

	    if (!window.campaign){ // If we don't have campaign, make vue

	      window.campaign = new Vue({
	        el: '#vue-campaign',
	        data: {
	          campaign: campaign_data, // Stores campaign data and character references
	          characters: {}, // Stores expanded character data
	          gameMeta: gameMeta( campaign_data.game_type ),
	        },
	        methods: {
	          updateStore: function(){
	            fb_data.ref(campaignPath).update(this.campaign);
	          },
	          toggleInfo: function(ee){   // Toggle long information for abilities and spells
	            $(ee.currentTarget).closest(".ability-item").find(".long-description").toggle();
	          },
	          addNpc: function(){
	            fb_data.ref(npcsPath).push(defaultNpc);
	          },
	          deleteNpc: function(ee){
	            var npc_id = $(ee.currentTarget).data('npc-id');
	            console.log(npc_id, npcsPath + '/npc_id')
	            fb_data.ref(npcsPath + '/' + npc_id).remove();
	          },
	        }
	      });

	      attachClickHandlers();
	      revealPage();

	    } else { // Otherwise, set existing window reference to the vue object
	      window.campaign.$set("campaign", campaign_data);
	    };

	    updateCharacters(campaign_id);
	  });
	};


	// Go through our character references stored in our campaign, and set up
	// listeners for those individual character lookups. On change from firebase,
	// they will change their character on the campaign object, thus re-rendering
	// the vue. On subsiquent polls, it will simply add characters, etc.
	// TODO will not remove characters in real time
	var updateCharacters = function(campaign_id){
	  if (window.campaign.campaign.characters){
	    var characterIds = Object.keys(window.campaign.campaign.characters);
	    characterIds.forEach(function(character_id){
	      fb_data.ref("characters/" + character_id).on("value", function(character_snap){

	        if (character_snap.val() == null) { // If this character has been removed, remove the reference
	          fb_data.ref("campaigns/" + campaign_id + "/characters/" + character_id).remove();
	        } else {
	          Vue.set(window.campaign.characters, character_id, character_snap.val());
	          attachCharacterClickHandler(character_id);
	        };

	      });
	    });
	  };
	};


	var attachClickHandlers = function(){

	  // Invite/code drawer at bottom of page
	  $(".invite-info").on("click", function(ee){
	    $inviteInfo = $(ee.currentTarget);
	    $inviteInfo.toggleClass("shrink");
	  });

	};

	var attachCharacterClickHandler = function(character_id){
	  $(document).on("click", "[data-show-character="+ character_id +"]", function(e){
	    showCharacterDetails(character_id);
	  });
	};

	var showCharacterDetails = function(character_id){
	  showOverlay();
	  $("#detail-" + character_id).removeClass("off-screen");
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(5).database();
	var revealPage = __webpack_require__(8).revealPage;

	module.exports.joinPage = function joinPage(){
	  console.log('loller');
	  revealPage();
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(3);
	var fb_data = __webpack_require__(5).database();
	var revealPage = __webpack_require__(8).revealPage;

	var removeUser = function(){
	  var uid = window.currentUser.uid;
	  var userPath = "users/" + uid;
	  var userData;

	  fb_data.ref(userPath).once("value", function(snap){
	    userData = snap.val();
	  }).then(function(){

	    // Remove all user campaigns
	    if (userData.campaigns){
	      Object.keys(userData.campaigns).forEach(function(campaign_key){
	        // Note: At this point not all references to this campaign has been removed
	        // Instead, when a user is pulling up their campaign data, if it's not present,
	        // the referebce will be removed.
	        fb_data.ref("/campaigns/" + campaign_key).remove();
	      });
	    };

	    if (userData.characters){
	      // Remove all user characters
	      Object.keys(userData.characters).forEach(function(character_key){
	        fb_data.ref("/characters/" + character_key).remove();
	      });
	    };

	    // Remove the user data in database
	    fb_data.ref(userPath).remove();

	  }).then(function(){
	    firebase.auth().currentUser.delete().then(function() {
	      window.location.replace("/");
	    }, function(error) {
	      console.log(error);
	      alert(error.message);
	    });
	  });
	};


	module.exports.profilePage = function profilePage(){
	  var uid = window.currentUser.uid;
	  var userPath = "users/" + uid;
	  var userData;

	  fb_data.ref(userPath).once("value", function(snap){
	    userData = snap.val();
	    var authData = window.currentUser.providerData[0];

	    if (snap.val() == undefined || snap.val() == null){
	      fb_data.ref(userPath).update({
	        provider: authData.providerId,
	        displayName: authData.displayName
	      }).then(function(){
	        profilePage(); // Recall
	      });
	    } else {
	      window.profileData = new Vue({
	        el: '#vue-user',
	        data: {
	          user: userData, // Stores campaign data and character references
	        },
	        methods: {
	          updateStore: function(){
	            fb_data.ref(userPath).update(this.user);
	          },
	          deleteUser: function(){
	            var c = confirm("Delete your account, including all your characters and campaigns?");
	            if (c == true) {
	              console.log('You will be remembered...');
	              removeUser();
	            } else {
	              console.log('Great choice');
	            }
	          },
	          signOut: function(){
	            firebase.auth().signOut().then(function(){
	              window.location.replace('/');
	            });
	          },
	        }
	      });

	      revealPage();
	    };
	  });
	};


/***/ }
/******/ ]);