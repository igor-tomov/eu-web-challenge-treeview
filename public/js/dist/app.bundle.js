webpackJsonp([0],[
/* 0 */
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * App entry point
	 */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _modelsTreeModel = __webpack_require__(/*! ./models/TreeModel */ 1);
	
	var _modelsTreeModel2 = _interopRequireDefault(_modelsTreeModel);
	
	var _viewsJSONTreeView = __webpack_require__(/*! ./views/JSONTreeView */ 5);
	
	var _viewsJSONTreeView2 = _interopRequireDefault(_viewsJSONTreeView);
	
	var _viewsSVGTreeView = __webpack_require__(/*! ./views/SVGTreeView */ 16);
	
	var _viewsSVGTreeView2 = _interopRequireDefault(_viewsSVGTreeView);
	
	var _configDemoJson = __webpack_require__(/*! ./config/demo.json */ 17);
	
	var _configDemoJson2 = _interopRequireDefault(_configDemoJson);
	
	// init Tree model
	var treeModel = new _modelsTreeModel2['default']();
	
	// init views
	new _viewsJSONTreeView2['default']({ model: treeModel, bootJSON: _configDemoJson2['default'] });
	new _viewsSVGTreeView2['default']({ model: treeModel });

/***/ },
/* 1 */
/*!*********************************!*\
  !*** ./app/models/TreeModel.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _backbone = __webpack_require__(/*! backbone */ 2);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	/**
	 * Represents data of single tree node
	 */
	var TreeNodeModel = _backbone2['default'].Model.extend({
	
	  defaults: {
	    name: 'Untitled',
	    left: 0,
	    right: 0
	  },
	
	  validate: function validate(attrs) {
	    if (!attrs.left || !attrs.right) {
	      return "Required fields aren't provided";
	    }
	
	    if (attrs.left > attrs.right) {
	      return "'right' cannot be less than 'left'";
	    }
	  }
	});
	
	exports['default'] = _backbone2['default'].Collection.extend({
	  model: TreeNodeModel
	});
	module.exports = exports['default'];

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/*!***********************************!*\
  !*** ./app/views/JSONTreeView.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _backbone = __webpack_require__(/*! backbone */ 2);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	var _utils = __webpack_require__(/*! ../utils */ 6);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	exports['default'] = _backbone2['default'].View.extend({
	  el: '#json-tree-view',
	
	  events: {
	    'input': 'onInputChange'
	  },
	
	  TEXT_INPUT_SELECTOR: '.json-placeholder',
	  INVALID_CONTENT_CLASS: 'panel-danger',
	
	  initialize: function initialize(options) {
	    if (options.bootJSON) {
	      this.$el.find(this.TEXT_INPUT_SELECTOR).val(JSON.stringify(options.bootJSON)).trigger("input");
	    }
	  },
	
	  onInputChange: function onInputChange(event) {
	    this.updateTree(event.target.value);
	  },
	
	  /**
	   * Update model state according to updated input data
	   *
	   * @param {String} content
	   */
	  updateTree: function updateTree(content) {
	    var _this = this;
	
	    this.$el.removeClass(this.INVALID_CONTENT_CLASS);
	
	    if (!content) {
	      this.model.reset();
	      return;
	    }
	
	    _utils2['default'].parseJSON(content).then(function (json) {
	      return _this.model.reset(json, { validate: true });
	    }, function (reason) {
	      _this.$el.addClass(_this.INVALID_CONTENT_CLASS);
	      _this.model.reset();
	    });
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 6 */
/*!****************************!*\
  !*** ./app/utils/index.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _promise = __webpack_require__(/*! promise */ 7);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports['default'] = {
	
	  /**
	   * Parse supplied text to JSON and return result as Promise
	   *
	   * @param {String} text
	   * @returns {Promise}
	   */
	  parseJSON: function parseJSON(text) {
	    // Response() provides more efficient way of JSON parsing than JSON.parse()
	    // So, try to use it where it's available
	    if (typeof Response === 'function') {
	      return new Response(text).json();
	    } else {
	      return new _promise2['default'](function (resolve, reject) {
	        var data = undefined;
	
	        try {
	          data = JSON.parse(text);
	        } catch (e) {
	          reject(e.toString());
	        }
	
	        resolve(data);
	      });
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/*!****************************!*\
  !*** ./~/promise/index.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./lib */ 8)


/***/ },
/* 8 */
/*!********************************!*\
  !*** ./~/promise/lib/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./core.js */ 9);
	__webpack_require__(/*! ./done.js */ 11);
	__webpack_require__(/*! ./finally.js */ 12);
	__webpack_require__(/*! ./es6-extensions.js */ 13);
	__webpack_require__(/*! ./node-extensions.js */ 14);


/***/ },
/* 9 */
/*!*******************************!*\
  !*** ./~/promise/lib/core.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var asap = __webpack_require__(/*! asap/raw */ 10);
	
	function noop() {}
	
	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable
	
	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.
	
	
	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	module.exports = Promise;
	
	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._37 = 0;
	  this._12 = null;
	  this._59 = [];
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._99 = noop;
	
	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};
	
	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._37 === 3) {
	    self = self._12;
	  }
	  if (self._37 === 0) {
	    self._59.push(deferred);
	    return;
	  }
	  asap(function() {
	    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._37 === 1) {
	        resolve(deferred.promise, self._12);
	      } else {
	        reject(deferred.promise, self._12);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._12);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._37 = 3;
	      self._12 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._37 = 1;
	  self._12 = newValue;
	  finale(self);
	}
	
	function reject(self, newValue) {
	  self._37 = 2;
	  self._12 = newValue;
	  finale(self);
	}
	function finale(self) {
	  for (var i = 0; i < self._59.length; i++) {
	    handle(self, self._59[i]);
	  }
	  self._59 = null;
	}
	
	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}
	
	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  })
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ },
/* 10 */
/*!*****************************************!*\
  !*** ./~/promise/~/asap/browser-raw.js ***!
  \*****************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}
	
	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;
	
	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}
	
	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
	
	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
	
	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);
	
	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.
	
	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396
	
	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}
	
	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;
	
	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}
	
	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html
	
	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.
	
	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }
	
	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.
	
	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }
	
	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.
	
	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.
	
	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);
	
	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}
	
	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
	
	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/*!*******************************!*\
  !*** ./~/promise/lib/done.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(/*! ./core.js */ 9);
	
	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};


/***/ },
/* 12 */
/*!**********************************!*\
  !*** ./~/promise/lib/finally.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(/*! ./core.js */ 9);
	
	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};


/***/ },
/* 13 */
/*!*****************************************!*\
  !*** ./~/promise/lib/es6-extensions.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//This file contains the ES6 extensions to the core Promises/A+ API
	
	var Promise = __webpack_require__(/*! ./core.js */ 9);
	
	module.exports = Promise;
	
	/* Static Functions */
	
	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');
	
	function valuePromise(value) {
	  var p = new Promise(Promise._99);
	  p._37 = 1;
	  p._12 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;
	
	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;
	
	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};
	
	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);
	
	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._37 === 3) {
	            val = val._12;
	          }
	          if (val._37 === 1) return res(i, val._12);
	          if (val._37 === 2) reject(val._12);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};
	
	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};
	
	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};
	
	/* Prototype Methods */
	
	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ },
/* 14 */
/*!******************************************!*\
  !*** ./~/promise/lib/node-extensions.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This file contains then/promise specific extensions that are only useful
	// for node.js interop
	
	var Promise = __webpack_require__(/*! ./core.js */ 9);
	var asap = __webpack_require__(/*! asap */ 15);
	
	module.exports = Promise;
	
	/* Static Functions */
	
	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity;
	  return function () {
	    var self = this;
	    var args = Array.prototype.slice.call(arguments, 0,
	        argumentCount > 0 ? argumentCount : 0);
	    return new Promise(function (resolve, reject) {
	      args.push(function (err, res) {
	        if (err) reject(err);
	        else resolve(res);
	      })
	      var res = fn.apply(self, args);
	      if (res &&
	        (
	          typeof res === 'object' ||
	          typeof res === 'function'
	        ) &&
	        typeof res.then === 'function'
	      ) {
	        resolve(res);
	      }
	    })
	  }
	}
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback =
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        })
	      }
	    }
	  }
	}
	
	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;
	
	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	}


/***/ },
/* 15 */
/*!******************************************!*\
  !*** ./~/promise/~/asap/browser-asap.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(/*! ./raw */ 10);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
	
	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}
	
	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}
	
	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}
	
	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ },
/* 16 */
/*!**********************************!*\
  !*** ./app/views/SVGTreeView.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _backbone = __webpack_require__(/*! backbone */ 2);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	var _svgJs = __webpack_require__(/*! svg.js */ 18);
	
	var _svgJs2 = _interopRequireDefault(_svgJs);
	
	var _utils = __webpack_require__(/*! ../utils */ 6);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	exports['default'] = _backbone2['default'].View.extend({
	
	  el: '#svg-tree-view',
	
	  SVG_ROW_HEIGHT: 25,
	  SVG_ROW_OFFSET: 25,
	
	  initialize: function initialize() {
	    this.listenTo(this.model, "reset", this.onModelUpdate);
	  },
	
	  /**
	   * Model update listener
	   */
	  onModelUpdate: function onModelUpdate() {
	    this.render();
	  },
	
	  /**
	   * Render view according to current model state
	   */
	  render: function render() {
	    var data = this.model.toJSON();
	
	    // remove previous view state
	    this.reset();
	
	    if (data && data.length) {
	      // render tree view according to current model data
	      this.renderTree(data);
	    }
	  },
	
	  /**
	   * Render SVG tree using preorder tree traversal method
	   *
	   * @param {Array} input
	   */
	  renderTree: function renderTree(input) {
	    var _this = this;
	
	    // initialize SVG document
	    var svg = (0, _svgJs2['default'])(this.el).size('100%', input.length * 30);
	
	    svg.addClass('svg-container');
	
	    // stack of right values
	    var rightStack = [];
	
	    // sort input data according to 'left' property
	    input = input.sort(function (a, b) {
	      if (a.left < b.left) return -1;
	      if (a.left > b.left) return 1;
	      return 0;
	    });
	
	    // iterate through input array and build SVG tree
	    input.forEach(function (item, i) {
	      if (rightStack.length) {
	        while (rightStack[rightStack.length - 1] < item.right) {
	          rightStack.pop();
	        }
	      }
	
	      _this.renderSVGRow(svg, item.name, rightStack.length, i);
	
	      rightStack.push(item.right);
	    });
	  },
	
	  /**
	   * Render Tree node to supplied SVG document with an appropriate position
	   *
	   * @param {SVG.doc} doc
	   * @param {String} title
	   * @param {Number} offsetCount
	   * @param {Number} index
	   */
	  renderSVGRow: function renderSVGRow(doc, title, offsetCount, index) {
	    var height = this.SVG_ROW_HEIGHT,
	        offset = this.SVG_ROW_OFFSET;
	
	    if (offsetCount) {
	      var i = offsetCount;
	
	      do {
	        var x = i * offset - offset / 2,
	            y = index * height;
	
	        var path = doc.polyline([[x, y], [x, y + height]]);
	
	        if (i === offsetCount) {
	          doc.line(x, y + height / 2, Math.ceil(x + offset / 2), y + height / 2).addClass("tree-view-branch");
	        }
	
	        path.addClass("tree-view-branch");
	      } while (--i);
	    }
	
	    doc.text(title).addClass('tree-view-title').dx(offset * offsetCount + 3).dy(index * height - 4);
	  },
	
	  /**
	   * Clear inner content of view
	   */
	  reset: function reset() {
	    this.$el.empty();
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 17 */
/*!******************************!*\
  !*** ./app/config/demo.json ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "Cars",
			"left": 1,
			"right": 18
		},
		{
			"name": "Fast",
			"left": 2,
			"right": 11
		},
		{
			"name": "Red",
			"left": 3,
			"right": 6
		},
		{
			"name": "Ferrari",
			"left": 4,
			"right": 5
		},
		{
			"name": "Yellow",
			"left": 7,
			"right": 10
		},
		{
			"name": "Lamborghini",
			"left": 8,
			"right": 9
		},
		{
			"name": "Slow",
			"left": 12,
			"right": 17
		},
		{
			"name": "Lada",
			"left": 13,
			"right": 14
		},
		{
			"name": "Polonez",
			"left": 15,
			"right": 16
		}
	];

/***/ }
]);
//# sourceMappingURL=app.bundle.js.map