import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import GooglePlusIcon from 'react-icons/lib/fa/google-plus';
import RedditIcon from 'react-icons/lib/fa/reddit';
import DiggIcon from 'react-icons/lib/fa/digg';
import StumbleUponIcon from 'react-icons/lib/fa/stumbleupon';
import DeliciousIcon from 'react-icons/lib/fa/delicious';
import PinterestIcon from 'react-icons/lib/fa/pinterest';
import VkIcon from 'react-icons/lib/fa/vk';
import React from 'react';
import DownloadIcon from 'react-icons/lib/md/file-download';
import CloseIcon from 'react-icons/lib/md/close';
import FullScreenIcon from 'react-icons/lib/md/fullscreen';
import FullScreenExitIcon from 'react-icons/lib/md/fullscreen-exit';
import ShareIcon from 'react-icons/lib/md/share';
import Scrollbar from 'react-scrollbar';
import ReactDOM from 'react-dom';
import LeftIcon from 'react-icons/lib/md/arrow-back';
import RightIcon from 'react-icons/lib/md/arrow-forward';
import App from 'yaux/lib/app';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _redefine = _hide;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _iterators = {};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise = _global.Promise;
var isNode = _cof(process$1) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$1 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$1
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

var task = _task.set;
var microtask = _microtask();



var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

var promise = _core.Promise;

var promise$1 = createCommonjsModule(function (module) {
module.exports = { "default": promise, __esModule: true };
});

var _Promise = unwrapExports(promise$1);

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

unwrapExports(assign$1);

var _extends = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

var i18n = {
  toolbar: {
    download: "Download",
    share: "Share",
    fullscreen: {
      enter: "Enter fullscreen",
      exit: "Exit fullscreen"
    }
  }
};

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$1);

var services = {
  facebook: {
    url: "//www.facebook.com/share.php?v=4&src=bm&u=%url%",
    name: "Facebook",
    component: FacebookIcon
  },
  twitter: {
    url: "//twitter.com/home?status=%url%",
    name: "Twitter",
    component: TwitterIcon
  },
  googleplus: {
    url: "//plus.google.com/share?url=%url%",
    name: "Google Plus",
    component: GooglePlusIcon
  },
  reddit: {
    url: "//reddit.com/submit?url=%url%",
    name: "Reddit",
    component: RedditIcon
  },
  digg: {
    url: "//digg.com/submit?phase=2&url=%url%",
    name: "Digg",
    component: DiggIcon
  },
  stumbleupon: {
    url: "http://www.stumbleupon.com/submit?url=%url%&title=%title%",
    name: "Stumbleupon",
    component: StumbleUponIcon
  },
  delicious: {
    url: "//delicious.com/post?url=%url%",
    name: "Delicious",
    component: DeliciousIcon
  },
  pinterest: {
    url: "https://www.pinterest.com/pin/create/button/?url=%url%&media=%image_url%&description=%description%&title=%title%",
    name: "Pinterest",
    component: PinterestIcon
  },
  vk: {
    url: "http://vk.com/share.php?url=%url%",
    name: "VK",
    component: VkIcon
  }
};
function getShareUrl(service, item) {
  var tags = {
    url: window.location.href,
    image_url: __guard__(item.urls, function (x) {
      return x.image;
    }),
    title: item.title,
    description: item.description || ""
  };
  return _Object$keys(tags).reduce(function (url, tag) {
    return url.replace("%" + tag + "%", encodeURIComponent(tags[tag]));
  }, service.url);
}

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}

function guessType(url) {
  if (url.match(/\.(jpg|jpeg|png|gif|bmp|jfif|tif|jpe)$/i)) {
    return "image";
  }
  if (url.match(/(youtube\.com|youtu\.be|vimeo\.com|\.mp4$)/i)) {
    return "video";
  }
  if (url.match(/\.(html?$|php$|google\.com\/maps\/embed)/i)) {
    return "iframe";
  }
  return "image";
}
function options (options) {
  options = _extends$1({
    services: services,
    toolbar: { share: true },
    i18n: i18n,
    activeIndex: 0,
    carousel: true,
    theme: "black"
  }, options);
  options.items.forEach(function (item, index) {
    item.index = index;
    if (!item.type) {
      item.type = item.url ? guessType(item.url) : "image";
    }
  });
  return options;
}

function getContentType(item) {
  if (item.type) {
    return item.type;
  }
  if (item.html) {
    return "html";
  }
  return "image";
}
function getCarousel(prop) {
  if (prop.items.length <= 1) {
    return false;
  }
  return prop.carousel && window.innerWidth > 768;
}

var find = require("array.prototype.find");

var prefix = function prefix(prop) {
  return ["moz", "ms", "webkit"].map(function (prefix) {
    return "" + prefix + prop;
  });
};
var fullscreen = {
  supports: function supports() {
    var el = document.documentElement;
    if (el.requestFullscreen) {
      return true;
    }
    return !!find(prefix("RequestFullScreen"), function (prefixed) {
      return !!el[prefixed];
    });
  },
  is: function is() {
    var _arr = ["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullscreenEnabled", "msFullscreenEnabled"];

    for (var _i = 0; _i < _arr.length; _i++) {
      var method = _arr[_i];
      if (document[method]) {
        return document[method];
      }
    }
    return null;
  },
  enter: function enter(el) {
    if (!el) {
      el = document.documentElement;
    }
    var method = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    return method.apply(el);
  },
  exit: function exit() {
    var el = document.documentElement;
    var method = el.exitFullscreen || el.mozCancelFullScreen || el.msExitFullscreen;
    if (method) {
      method.apply(el);
    }
    if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    }
  }
};

/* global location */
var hash = null;
var hasHistoryAPI = function hasHistoryAPI() {
  return window.history && window.history.pushState;
};

var addToHistoryAPI = function addToHistoryAPI() {
  return window.history.pushState("", "", window.location.pathname);
};
var addUsingLocation = function addUsingLocation() {
  window.location.href = window.location.href.replace(/#.*$/, "#");
};
var clearHash = function clearHash() {
  return hasHistoryAPI() ? addToHistoryAPI() : addUsingLocation();
};

var storeHash = function storeHash() {
  hash = location.hash;
};
var setHash = function setHash(value) {
  location.hash = value;
};
var justTry = function justTry(callback) {
  try {
    callback();
  } catch (error) {}
};
var deeplink = {
  init: function init() {
    if (location.hash) {
      storeHash();
    }
  },
  set: function set(item) {
    justTry(function () {
      return setHash(item.hash ? item.hash : hash || "");
    });
  },
  reset: function reset() {
    justTry(function () {
      if (hash) {
        setHash(hash);
      } else {
        clearHash();
      }
    });
    storeHash(null);
  }
};

function prev(state) {
  if (state.activeIndex > 0) {
    state.activeIndex -= 1;
  }
  deeplink.set(state.items[state.activeIndex]);
}
function next(state) {
  if (state.activeIndex < state.items.length - 1) {
    state.activeIndex += 1;
  }
  deeplink.set(state.items[state.activeIndex]);
}
function getItem(state, item) {
  return state.items[item.index];
}
var store$1 = {
  "share.open": function shareOpen(state) {
    state.toolbar.shareActive = true;
  },
  "share.close": function shareClose(state) {
    state.toolbar.shareActive = false;
  },
  next: next,
  prev: prev,
  "item.thumbnail.click": function itemThumbnailClick(state, item) {
    state.activeIndex = item.index;
    deeplink.set(state.items[state.activeIndex]);
  },
  "item.load": function itemLoad(state, item) {
    getItem(state, item).loaded = true;
  },
  "item.unload": function itemUnload(state, item) {
    getItem(state, item).loaded = false;
  },

  "item.thumbnail.load": function itemThumbnailLoad(state, item) {
    getItem(state, item).thumbnailLoaded = true;
  },
  "item.thumbnail.error": function itemThumbnailError(state, item) {
    getItem(state, item).thumbnailError = true;
  },

  "touch.start": function touchStart(state, position) {
    state.touch = {
      start: position
    };
  },
  "touch.move": function touchMove(state, position) {
    state.touch.offset = {
      x: position.x - state.touch.start.x,
      y: position.y - state.touch.start.y
    };
  },
  "touch.end": function touchEnd(state, position) {
    var threshold = window.innerWidth / 3;
    if (state.touch && state.touch.offset) {
      var offset = state.touch.offset.x;
      if (offset > threshold && state.activeIndex > 0) {
        prev(state);
      }
      if (offset < -threshold && state.activeIndex < state.items.length - 1) {
        next(state);
      }
    }
    delete state.touch;
  },
  "fullscreen.enter": function fullscreenEnter(state) {
    fullscreen.enter();
    state.toolbar.isFullscreen = true;
  },
  "fullscreen.exit": function fullscreenExit(state) {
    fullscreen.exit();
    state.toolbar.isFullscreen = false;
  },
  "carousel.resize": function carouselResize(state, size) {
    state.carousel = size;
  }
};

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf = _core.Object.getPrototypeOf;

var getPrototypeOf$1 = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

var classCallCheck = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$1);

var createClass = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var f$4 = _wks;

var _wksExt = {
	f: f$4
};

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$1);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$3 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$6 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$6
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$7
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE$1 = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE$1) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

unwrapExports(symbol$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$1);



var _symbol2 = _interopRequireDefault(symbol$1);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

unwrapExports(_typeof_1);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var setPrototypeOf$1 = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf, __esModule: true };
});

unwrapExports(setPrototypeOf$1);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$1 = _core.Object;
var create = function create(P, D) {
  return $Object$1.create(P, D);
};

var create$1 = createCommonjsModule(function (module) {
module.exports = { "default": create, __esModule: true };
});

unwrapExports(create$1);

var inherits = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



var _create2 = _interopRequireDefault(create$1);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

var classnames = require("classnames");

function ShareMenu(props) {
  return React.createElement(
    "div",
    {
      className: classnames("reactbox-share-menu", {
        "reactbox-share-menu--open": props.open
      })
    },
    _Object$keys(props.services).map(function (slug) {
      var service = props.services[slug];
      return React.createElement(
        "a",
        {
          target: "_blank",
          className: "reactbox-share-link",
          key: slug,
          onClick: function onClick(e) {
            e.preventDefault();
            props.dispatch("share.close");
          },
          href: getShareUrl(service, props.activeItem)
        },
        service.icon ? React.createElement("img", { src: service.icon, alt: "" }) : null,
        !service.icon && !!service.component ? React.createElement(service.component) : null,
        service.name
      );
    })
  );
}

var hasFullscreen = fullscreen.supports();

function Tooltip(props) {
  return React.createElement(
    "span",
    { className: "reactbox-tooltip" },
    props.children
  );
}

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || _Object$getPrototypeOf(Toolbar)).call(this, props));

    _this.onWindowClickWhenSharing = function () {
      _this.props.dispatch("share.close");
    };

    _this.state = { shareOpen: false };
    return _this;
  }

  _createClass(Toolbar, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(newProps, newState) {
      if (newState.shareOpen && !this.state.shareOpen) {
        window.addEventListener("click", this.onWindowClickWhenSharing, true);
      }
      if (!newState.shareOpen && this.state.shareOpen) {
        window.removeEventListener("click", this.onWindowClickWhenSharing, true);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.shareOpen) {
        window.removeEventListener("click", this.onWindowClickWhenSharing, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var activeItem = props.items[props.activeIndex];
      return React.createElement(
        "div",
        { className: "reactbox-toolbar" },
        React.createElement(
          "a",
          {
            href: "#",
            onClick: function onClick(e) {
              e.preventDefault();
              props.dispatch("unmount");
            },
            className: "reactbox-toolbar-close reactbox-toolbar-link"
          },
          React.createElement(CloseIcon, null)
        ),
        hasFullscreen && !props.toolbar.isFullscreen ? React.createElement(
          "a",
          {
            href: "#",
            onClick: function onClick(e) {
              e.preventDefault();
              props.dispatch("fullscreen.enter");
            },
            className: "reactbox-toolbar-fullscreen reactbox-toolbar-link"
          },
          React.createElement(FullScreenIcon, null),
          React.createElement(
            "span",
            { className: "reactbox-tooltip" },
            props.i18n.toolbar.fullscreen.enter
          )
        ) : null,
        hasFullscreen && props.toolbar.isFullscreen ? React.createElement(
          "a",
          {
            href: "#",
            className: "reactbox-toolbar-link reactbox-toolbar-exit-fullscreen",
            onClick: function onClick(e) {
              e.preventDefault();
              props.dispatch("fullscreen.exit");
            }
          },
          React.createElement(FullScreenExitIcon, null),
          React.createElement(
            Tooltip,
            null,
            props.i18n.toolbar.fullscreen.exit
          )
        ) : null,
        activeItem && _Object$keys(props.services).length > 0 && props.toolbar.share ? React.createElement(
          "div",
          { className: "reactbox-toolbar-link reactbox-toolbar-share" },
          React.createElement(ShareIcon, {
            onClick: function onClick(e) {
              e.preventDefault();
              _this2.setState({ shareOpen: true });
              props.dispatch("share.open");
            }
          }),
          React.createElement(
            Tooltip,
            null,
            props.i18n.toolbar.share
          ),
          props.toolbar.shareActive ? React.createElement(ShareMenu, {
            dispatch: props.dispatch,
            open: this.state.shareOpen,
            services: props.services,
            activeItem: activeItem
          }) : null
        ) : null,
        activeItem.download ? React.createElement(
          "a",
          {
            className: "reactbox-toolbar-download reactbox-toolbar-link",
            download: true,
            href: activeItem.download,
            target: "_blank"
          },
          React.createElement(DownloadIcon, null),
          React.createElement(
            Tooltip,
            null,
            props.i18n.toolbar.download
          )
        ) : null
      );
    }
  }]);

  return Toolbar;
}(React.Component);

function Loading(props) {
  return React.createElement('div', { className: 'reactbox-loading' });
}

function getStyle(item) {
  if (!item.description || !item.description.trim()) {
    return "none";
  }
  if (item.descriptionStyle === "right" && window.innerWidth < 1024) {
    return "bottom";
  }
  return item.descriptionStyle || "mini";
}

var classnames$1 = require("classnames");

function Wrap(props) {
  return React.createElement(
    "div",
    { className: "reactbox-lightbox-item-description" },
    React.createElement(
      "div",
      { className: "reactbox-lightbox-item-description-inner" },
      props.children
    )
  );
}

var Description = function (_React$Component) {
  _inherits(Description, _React$Component);

  function Description() {
    _classCallCheck(this, Description);

    return _possibleConstructorReturn(this, (Description.__proto__ || _Object$getPrototypeOf(Description)).apply(this, arguments));
  }

  _createClass(Description, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var style = getStyle(item);
      var Scroll = style === "bottom" ? Wrap : Scrollbar;
      return React.createElement(
        Scroll,
        {
          className: classnames$1("reactbox-lightbox-item-description", {
            "reactbox-description-light": style === "right" && item.type === "video"
          }),
          speed: 0.8,
          horizontal: false,
          contentClassName: "reactbox-lightbox-item-description-inner"
        },
        !!item.description ? React.createElement("div", {
          className: "reactbox-lightbox-item-description-content",
          dangerouslySetInnerHTML: { __html: item.description }
        }) : null
      );
    }
  }]);

  return Description;
}(React.Component);

function includes(list, item) {
  return list.indexOf(item) !== -1;
}

var camelcase = require("uppercamelcase");

var defaultPrefixes = ["Moz", "Webkit", "O", "MS"];
var prefixedKeys = {
  transform: defaultPrefixes,
  "border-radius": defaultPrefixes,
  transition: defaultPrefixes,
  "box-sizing": ["moz"]
};
function mapObject(object, callback) {
  if (!object) {
    return object;
  }
  return _Object$keys(object).reduce(function (result, key) {
    result[key] = callback(object[key], key, object);
    return result;
  }, {});
}
function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
}
function concatWith(suffix) {
  return function (str) {
    return str + suffix;
  };
}
function pixels(style) {
  return mapObject(style, concatWith("px"));
}
var css = {
  prefix: function prefix(styles) {
    return _Object$keys(styles).reduce(function (result, key) {
      var prefixes = prefixedKeys[key];
      if (prefixes) {
        result = prefixes.reduce(function (result, prefix) {
          result[prefix + capitalize(camelcase(key))] = styles[key];
          return result;
        }, result);
      }
      result[key] = styles[key];
      return result;
    }, {});
  },
  camelize: function camelize(styles) {
    return _Object$keys(styles).reduce(function (result, key) {
      if (includes(_Object$keys(prefixedKeys), key)) {
        result[camelcase(key)] = styles[key];
      } else {
        result[key] = styles[key];
      }
      return result;
    }, {});
  }
};

var classnames$2 = require("classnames");

function maybeApply(obj, func) {
  return func ? func(obj) : obj;
}

var Iframe = function (_React$Component) {
  _inherits(Iframe, _React$Component);

  function Iframe(props) {
    _classCallCheck(this, Iframe);

    var _this = _possibleConstructorReturn(this, (Iframe.__proto__ || _Object$getPrototypeOf(Iframe)).call(this, props));

    _this.updateSize = function () {
      var node = _this.refs.this;
      _this.setState({
        size: { width: node.clientWidth, height: node.clientHeight }
      });
    };

    _this.state = { size: { width: 0, height: 0 } };
    return _this;
  }

  _createClass(Iframe, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener("resize", this.updateSize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var style = pixels(maybeApply(this.state.size, props.resize));
      return React.createElement(
        "div",
        {
          className: classnames$2("reactbox-lightbox-item-object", "reactbox-object-iframe", props.className),
          ref: "this"
        },
        React.createElement("iframe", {
          src: props.src,
          style: style,
          onLoad: function onLoad() {
            props.dispatch("item.load", props.item);
            _this2.updateSize();
          }
        })
      );
    }
  }]);

  return Iframe;
}(React.Component);

function aspect(thing) {
  return thing.width / thing.height;
}

function fits(a, b) {
  return a.width > b.width && a.height > b.height;
}

function resize(container, content, decision) {
  if (decision(aspect(container), aspect(content))) {
    return fitWidth(container, content);
  } else {
    return fitHeight(container, content);
  }
}

function getHeight(container, content) {
  return container.width / aspect(content);
}

function getWidth(container, content) {
  return container.height * aspect(content);
}

function fitWidth(container, content) {
  return {
    width: container.width,
    height: getHeight(container, content)
  };
}

function fitHeight(container, content) {
  return {
    height: container.height,
    width: getWidth(container, content)
  };
}

function valign(container, size) {
  return _extends$1({}, size, { top: (container.height - size.height) / 2 });
}

function halign(container, size) {
  return _extends$1({}, size, { left: (container.width - size.width) / 2 });
}

function align(container, size) {
  if (!container || !size) {
    return null;
  }
  if (size.width < container.width && size.height < container.height) {
    return valign(container, halign(container, size));
  }
  if (size.width > container.width) {
    return valign(container, size);
  } else {
    return halign(container, size);
  }
}

function fit(container, content) {
  if (fits(container, content)) {
    return content;
  }
  return resize(container, content, function (container, content) {
    return container < content;
  });
}

function fill(container, content) {
  return resize(container, content, function (container, content) {
    return container > content;
  });
}

var asap = require("asap");

var onItemLoad = function onItemLoad(props) {
  return function (event) {
    if (event && event.target && event.target.naturalWidth && event.target.naturalHeight) {
      props.item.size = {
        width: event.target.naturalWidth,
        height: event.target.naturalHeight
      };
      props.dispatch("item.load", props.item);
    }
  };
};

function getImageStyle(state, item) {
  if (!item.size || !state || includes(["right", "bottom"], getStyle(item))) {
    return;
  }
  if (includes(["none", "mini"], getStyle(item))) {
    return valign(state, fit(state, item.size));
  }
  return fill(state, item.size);
}

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Image);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Image.__proto__ || _Object$getPrototypeOf(Image)).call.apply(_ref, [this].concat(args))), _this), _this.updateSize = function () {
      var node = _this.refs.this;
      _this.setState({
        width: node.clientWidth,
        height: node.clientHeight
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Image, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener("resize", this.updateSize);
      if (!this.props.item.url) {
        asap(onItemLoad(this.props));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var state = this.state;
      var item = props.item;
      return React.createElement(
        "div",
        {
          className: "reactbox-lightbox-item-object reactbox-object-image",
          ref: "this"
        },
        !!item.url ? React.createElement("img", {
          className: "reactbox-lightbox-content-image",
          style: pixels(align(state, getImageStyle(state, item))),
          src: item.url,
          alt: item.alt,
          onLoad: onItemLoad(props)
        }) : null
      );
    }
  }]);

  return Image;
}(React.Component);

var find$1 = require("array.prototype.find");

function load(tag, id, srcAttr, srcVal, attr) {
  return new _Promise(function (resolve, reject) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener("load", resolve);
      resolve();
    }
    el = document.createElement(tag);
    el.id = id;
    el[srcAttr] = srcVal;
    if (attr) {
      _Object$keys(attr).forEach(function (key) {
        el.setAttribute(key, attr[key]);
      });
    }
    document.head.appendChild(el);
    el.addEventListener("load", resolve);
    el.addEventListener("error", reject);
  });
}

var tests = {
  youtube: /(.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=)|(.*(\/\/)?(www\.)?youtu\.be\/.*)|((https?:)?(\/\/)?(www\.)?youtube\.com\/embed\/)/,
  vimeo: /(https?:)?(\/\/)?(www\.)?vimeo\.com\/\d+/,
  mp4: /\.mp4$/
};

var extractors = {
  youtube: function youtube(url) {
    var regex = void 0;
    if (url.match(regex = /.*(\(\/\/)?(www\.)?youtube\.com\/watch\?v=/)) {
      return url.replace(regex, "");
    }
    if (url.match(regex = /.*(\/\/)?(www\.)?youtu\.be\//)) {
      return url.replace(regex, "");
    }
    return url.replace(/(https?:)?(\/\/)?(www\.)?youtube\.com\/embed\//, "");
  },
  vimeo: function vimeo(url) {
    return url.replace(/(https?:)?(\/\/)?(www\.)?vimeo\.com\//, "");
  },
  mp4: function mp4(url) {
    return url;
  }
};

var formatters = {
  youtube: function youtube(id) {
    return "https://youtube.com/embed/" + id;
  },
  vimeo: function vimeo(id) {
    return "https://player.vimeo.com/video/" + id;
  },
  mp4: function mp4(id) {
    return id;
  }
};

function getSrc(item) {
  var url = item.url;
  var service = find$1(_Object$keys(tests), function (key) {
    return url.match(tests[key]);
  });
  var id = extractors[service](url);
  return formatters[service](id);
}

function _resize(size, style) {
  if (style === "bottom") {
    return {
      width: size.width,
      height: size.height > 0 ? size.height : 483
    };
  }
  var standard = size.width / 16 * 9;
  if (size.height > standard) {
    var newSize = _extends$1({}, size, { height: standard });
    return style === "right" ? newSize : valign(size, newSize);
  }
  return size;
}

function IframeVideo(props) {
  return React.createElement(Iframe, _extends$1({}, props, {
    src: getSrc(props.item),
    full: false,
    className: "reactbox-object-video",
    vAlign: getStyle(props.item) !== "right",
    resize: function resize(size) {
      return _resize(size, getStyle(props.item));
    },
    fitWidth: getStyle(props.item) === "bottom"
  }));
}
function loadVideoJS(callback) {
  return _Promise.all(load("script", "reactbox-video-js-loader", "src", "https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video.js"), load("link", "reactbox-video-js-css", "href", "https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video-js.min.css", { rel: "stylesheet" }));
}

var VideoJSVideo = function (_React$Component) {
  _inherits(VideoJSVideo, _React$Component);

  function VideoJSVideo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoJSVideo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoJSVideo.__proto__ || _Object$getPrototypeOf(VideoJSVideo)).call.apply(_ref, [this].concat(args))), _this), _this.state = { size: { width: 0, height: 0 } }, _this.onResize = function () {
      _this.updateSize();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoJSVideo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;
      loadVideoJS().then(function () {
        props.dispatch("item.load", props.item).then(function () {
          _this2.updateSize(function () {
            window.addEventListener("resize", _this2.onResize);
            loadVideoJS().then(function () {
              props.dispatch("item.load", props.item);
              var player = window.videojs(_this2.getVideoId());
              player.ready(function () {
                return _this2.setState({ player: player });
              });
            });
          });
        });
      });
    }
  }, {
    key: "updateSize",
    value: function updateSize(callback) {
      var node = this.refs.this.parentElement;
      this.setState({
        size: {
          width: node.clientWidth,
          height: node.clientHeight
        }
      }, callback);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
      if (this.state.player) {
        this.state.player.dispose();
      }
    }
  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return "reactbox-video-" + this.props.item.index;
    }
  }, {
    key: "getIframeStyle",
    value: function getIframeStyle(item) {
      return this.state.size;
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var iframeStyle = this.getIframeStyle(item);
      return React.createElement(
        "div",
        { className: "video-js-wrapper", style: iframeStyle, ref: "this" },
        React.createElement(
          "video",
          {
            id: this.getVideoId(),
            controls: true,
            preload: "auto",
            poster: item.thumbnail,
            style: { width: "100%", height: "100%" },
            className: "video-js"
          },
          React.createElement("source", { src: item.url })
        )
      );
    }
  }]);

  return VideoJSVideo;
}(React.Component);

function Video(props) {
  if (props.item.url.match(tests.mp4)) {
    return React.createElement(VideoJSVideo, props);
  } else {
    return React.createElement(IframeVideo, props);
  }
}

var ajax$1 = require("atomicjs");

var Ajax = function (_React$Component) {
  _inherits(Ajax, _React$Component);

  function Ajax() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ajax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ajax.__proto__ || _Object$getPrototypeOf(Ajax)).call.apply(_ref, [this].concat(args))), _this), _this.state = { html: "" }, _this.onAjaxError = function () {
      _this.props.dispatch("item.error", _this.props.item);
    }, _this.onAjaxLoaded = function (html) {
      _this.setState({ html: html });
      _this.props.dispatch("item.load", _this.props.item);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ajax, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      ajax$1.get(this.props.item.url).success(this.onAjaxLoaded).error(this.onAjaxError);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "reactbox-lightbox-item-object reactbox-lightbox-item-ajax-object",
        dangerouslySetInnerHTML: { __html: this.state.html }
      });
    }
  }]);

  return Ajax;
}(React.Component);

var Html = function (_React$Component) {
  _inherits(Html, _React$Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, (Html.__proto__ || _Object$getPrototypeOf(Html)).apply(this, arguments));
  }

  _createClass(Html, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dispatch('item.load', this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return React.createElement('div', {
        className: 'reactbox-lightbox-item-object reactbox-lightbox-item-html-object',
        dangerouslySetInnerHTML: { __html: props.item.html } });
    }
  }]);

  return Html;
}(React.Component);

function iframe$1(props) {
  return React.createElement(Iframe, _extends$1({}, props, { src: props.item.url }));
}

var content = Object.freeze({
	iframe: iframe$1,
	image: Image,
	video: Video,
	ajax: Ajax,
	html: Html
});

var classnames$3 = require("classnames");

function getOffset(props) {
  return props.touch && props.touch.offset ? props.touch.offset : { x: 0, y: 0 };
}
function isActiveItem(item, props) {
  return item.index === props.activeIndex;
}
function isPreviousItem(item, props) {
  return item.index < props.activeIndex;
}
function isNextItem(item, props) {
  return item.index > props.activeIndex;
}
function getTransform(props) {
  var item = props.item;
  var metrics = props.metrics;
  var offset = getOffset(props);
  if (isActiveItem(props.item, props)) {
    return "translate(" + offset.x + "px, 0)";
  }
  if (isPreviousItem(item, props)) {
    return "translate(" + (-metrics.width + offset.x) + "px, 0)";
  }
  if (isNextItem(item, props)) {
    return "translate(" + (metrics.width + offset.x) + "px, 0)";
  }
}

var LightboxItem = function (_React$Component) {
  _inherits(LightboxItem, _React$Component);

  function LightboxItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LightboxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LightboxItem.__proto__ || _Object$getPrototypeOf(LightboxItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.updateSize = function () {
      var node = _this.refs.this;
      _this.setState({
        size: { width: node.clientWidth, height: node.clientHeight }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LightboxItem, [{
    key: "calcStyle",
    value: function calcStyle() {
      var props = this.props;
      var metrics = props.metrics;
      if (!props.metrics) {
        return null;
      }
      return {
        transform: getTransform(props),
        left: 0,
        top: 0,
        width: metrics.width + "px",
        height: metrics.height + "px"
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener("resize", this.updateSize);
      var _ = jQuery || $;
      _(window).trigger("lightbox:item:add", ReactDOM.findDOMNode(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
      this.props.dispatch("item.unload", this.props.item);
      var _ = jQuery || $;
      _(window).trigger("lightbox:item:remove", ReactDOM.findDOMNode(this));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        animated: Math.abs(props.activeIndex - this.props.activeIndex) < 2
      });
    }
  }, {
    key: "getContentStyle",
    value: function getContentStyle() {
      if (!this.refs.content) {
        return null;
      }
      var offset = getCarousel(this.props) ? 130 : 24;
      if (getStyle(this.props.item) === "bottom" && this.refs.content.offsetHeight < this.state.size.height - offset) {
        return {
          top: (this.state.size.height - offset + 54 - this.refs.content.offsetHeight) / 2
        };
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var descriptionStyle = getStyle(item);
      var type = getContentType(item);
      var style = css.prefix(this.calcStyle());
      return React.createElement(
        "div",
        {
          className: classnames$3("reactbox-lightbox-item", "reactbox-description-" + descriptionStyle, "reactbox-content-" + type, {
            "reactbox-lightbox-active": isActiveItem(item, props),
            "reactbox-lightbox-next": isNextItem(item, props),
            "reactbox-lightbox-prev": isPreviousItem(item, props),
            "reactbox-loaded": item.loaded,
            "reactbox-animated": this.state.animated
          }),
          style: style,
          ref: "this"
        },
        React.createElement(
          "div",
          {
            className: "reactbox-lightbox-item-content",
            style: this.getContentStyle(),
            ref: "content"
          },
          React.createElement(content[type], props),
          descriptionStyle !== "none" ? React.createElement(Description, props) : null
        ),
        !item.loaded ? React.createElement(Loading, props) : null
      );
    }
  }]);

  return LightboxItem;
}(React.Component);

var classnames$4 = require("classnames");

var Icons = function (_React$Component) {
  _inherits(Icons, _React$Component);

  function Icons() {
    _classCallCheck(this, Icons);

    return _possibleConstructorReturn(this, (Icons.__proto__ || _Object$getPrototypeOf(Icons)).apply(this, arguments));
  }

  _createClass(Icons, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.activeIndex !== this.props.activeIndex;
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var prevClasses = classnames$4(["reactbox-prev"], {
        "reactbox-disabled": props.activeIndex === 0
      });
      var nextClasses = classnames$4(["reactbox-next", { "reactbox-disabled": props.activeIndex >= props.items.length - 1 }]);
      return props.items.length > 1 ? React.createElement(
        "div",
        { className: "reactbox-prev-next" },
        React.createElement(
          "div",
          { className: prevClasses, onClick: function onClick() {
              return props.dispatch("prev");
            } },
          React.createElement(LeftIcon, { size: 100 })
        ),
        React.createElement(
          "div",
          { className: nextClasses, onClick: function onClick() {
              return props.dispatch("next");
            } },
          React.createElement(RightIcon, { size: 100 })
        )
      ) : null;
    }
  }]);

  return Icons;
}(React.Component);

var Lightbox = function (_React$Component2) {
  _inherits(Lightbox, _React$Component2);

  function Lightbox() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Lightbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Lightbox.__proto__ || _Object$getPrototypeOf(Lightbox)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {}, _this2.calcMetrics = function () {
      var node = _this2.refs.lightbox;
      _this2.setState({
        metrics: {
          left: node.offsetLeft,
          top: node.offsetTop,
          width: node.clientWidth,
          height: node.clientHeight
        }
      });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Lightbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.calcMetrics);
      this.calcMetrics();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.calcMetrics);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var metrics = this.state.metrics;
      var items = [props.items[props.activeIndex]];
      var activeIndex = props.activeIndex;
      if (activeIndex > 0) {
        items.unshift(props.items[activeIndex - 1]);
      }
      if (activeIndex < props.items.length - 1) {
        items.push(props.items[activeIndex + 1]);
      }
      return React.createElement(
        "div",
        { className: "reactbox-lightbox", ref: "lightbox" },
        React.createElement(Icons, {
          items: props.items,
          activeIndex: activeIndex,
          dispatch: props.dispatch
        }),
        !!metrics ? items.map(function (item, index) {
          return React.createElement(LightboxItem, _extends$1({}, props, { item: item, metrics: metrics, key: item.index }));
        }, this) : null
      );
    }
  }]);

  return Lightbox;
}(React.Component);

var classnames$5 = require("classnames");

var onClick = function onClick(props) {
  return function (e) {
    e.preventDefault();
    props.dispatch("item.thumbnail.click", props.item);
  };
};

var onError = function onError(props) {
  return function (e) {
    return props.dispatch("item.thumbnail.error", props.item);
  };
};

var onLoad = function onLoad(props) {
  return function (e) {
    props.item.thumbnailSize = {
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    };
    props.dispatch("item.thumbnail.load", props.item);
  };
};

function thumbnailTransform(props) {
  return { transform: translate(props.left, props.top) };
}

function translate(x, y) {
  return "translate(" + x + "px, " + (y || 0) + "px)";
}

function Item(props) {
  var imageStyle = css.prefix(thumbnailTransform(props));
  var classes = classnames$5("reactbox-carousel-item", {
    "reactbox-active": props.item.index === props.activeIndex,
    "reactbox-loaded": props.item.thumbnailLoaded || props.item.thumbnailError,
    "reactbox-error": props.item.thumbnailError,
    "reactbox-animated": props.item.thumbnailLoaded || props.item.thumbnailError
  });
  var item = props.item;
  return React.createElement(
    "div",
    { className: classes, onClick: onClick(props), style: imageStyle },
    !item.error ? React.createElement("img", {
      src: item.thumbnail,
      onLoad: onLoad(props),
      onError: onError(props),
      alt: item.alt
    }) : null,
    item.error ? React.createElement(CloseIcon, null) : null
  );
}

function getItemWidth(props, item) {
  if (!item.thumbnail || item.thumbnailError) {
    return 100;
  }
  if (!item.thumbnailSize) {
    return 0;
  }
  return props.carousel.height * item.thumbnailSize.width / item.thumbnailSize.height;
}

function getLeftForActive(props) {
  return window.innerWidth / 2 - getItemWidth(props, props.items[props.activeIndex]) / 2;
}

function visible(props) {
  var items = props.items;
  var current = items[props.activeIndex];
  var left = getLeftForActive(props);
  var visible = [{ item: current, left: left }];
  var windowWidth = window.innerWidth;

  if (current.index < items.length - 1) {
    for (var i = current.index + 1; i < items.length; i++) {
      var _item = items[i];
      left = left + getItemWidth(props, items[i - 1]) + 12;
      visible.push({ item: _item, left: left });
      if (!(_item.thumbnailSize && (_item.thumbnailLoaded || _item.thumbnailError)) || _item.left > windowWidth * 1.5) {
        break;
      }
    }
  }
  left = getLeftForActive(props);
  if (current.index > 0 && (current.thumbnailLoaded || current.thumbnailError)) {
    for (var _i = current.index - 1; _i >= 0; _i--) {
      var _item2 = items[_i];
      left = left - getItemWidth(props, items[_i]) - 12;
      visible.unshift({ item: _item2, left: left });
      if (!(_item2.thumbnailSize && (_item2.thumbnailLoaded || _item2.thumbnailError)) || _item2.left < -(windowWidth + getItemWidth(props, _item2))) {
        break;
      }
    }
  }
  return visible;
}

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Carousel.__proto__ || _Object$getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args))), _this), _this.onWindowResize = function () {
      var node = _this.refs.carousel;
      _this.props.dispatch("carousel.resize", {
        width: node.clientWidth,
        height: node.clientHeight
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Carousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onWindowResize();
      window.addEventListener("resize", this.onWindowResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.onWindowResize);
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return React.createElement(
        "div",
        { className: "reactbox-carousel", ref: "carousel" },
        props.carousel ? visible(props).map(function (item, index) {
          return React.createElement(Item, _extends$1({}, props, {
            item: item.item,
            key: item.item.index,
            left: item.left
          }));
        }, this) : null
      );
    }
  }]);

  return Carousel;
}(React.Component);

var classnames$6 = require("classnames");

var getReactboxClasses = function getReactboxClasses(props) {
  return classnames$6("reactbox", {
    "reactbox-horizontal": true,
    "reactbox-has-carousel": getCarousel(props)
  }, "reactbox--theme-" + props.theme);
};

var Reactbox = function (_React$Component) {
  _inherits(Reactbox, _React$Component);

  function Reactbox(props) {
    _classCallCheck(this, Reactbox);

    var _this = _possibleConstructorReturn(this, (Reactbox.__proto__ || _Object$getPrototypeOf(Reactbox)).call(this, props));

    _this.onWindowResize = function () {
      _this.setState({ width: window.innerWidth });
    };

    _this.state = { width: window.innerWidth };
    return _this;
  }

  _createClass(Reactbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.onWindowResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.onWindowResize);
    }
  }, {
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return React.createElement(
        "div",
        { className: getReactboxClasses(props) },
        React.createElement(Toolbar, props),
        React.createElement(Lightbox, props),
        !!getCarousel(props) ? React.createElement(Carousel, props) : null
      );
    }
  }]);

  return Reactbox;
}(React.Component);

function Keyboard (dispatch) {
  var onKeyDown = function onKeyDown(e) {
    if (e.which === 27) {
      dispatch("unmount");
    }
    if (e.which === 37 || e.which === 38) {
      dispatch("prev");
    }
    if (e.which === 40 || e.which === 39) {
      return dispatch("next");
    }
  };

  return {
    enable: function enable() {
      return window.addEventListener("keydown", onKeyDown);
    },
    disable: function disable() {
      return window.removeEventListener("keydown", onKeyDown);
    }
  };
}

function pageToXY(touch) {
  return { x: touch.pageX, y: touch.pageY };
}
var onTouchStart = function onTouchStart(dispatch) {
  return function (e) {
    if (e.target.closest(".reactbox-toolbar-wrapper, .reactbox-prev, .reactbox-next")) {
      return;
    }
    return dispatch("touch.start", pageToXY(e.touches[0]));
  };
};

var onTouchEnd = function onTouchEnd(dispatch) {
  return function (e) {
    var original = e.changedTouches[0];
    if (original) {
      dispatch("touch.end", pageToXY(e.changedTouches[0]));
    }
  };
};

var onTouchMove = function onTouchMove(dispatch) {
  return function (e) {
    var touch = e.touches[0];
    dispatch("touch.move", pageToXY(touch));
  };
};

var Touch = (function (dispatch) {
  return {
    enable: function enable() {
      window.addEventListener("touchstart", onTouchStart(dispatch));
      window.addEventListener("touchend", onTouchEnd(dispatch));
      window.addEventListener("touchmove", onTouchMove(dispatch));
    },
    disable: function disable() {
      window.removeEventListener("touchstart", onTouchStart(dispatch));
      window.removeEventListener("touchend", onTouchEnd(dispatch));
      window.removeEventListener("touchmove", onTouchMove(dispatch));
    }
  };
});

function propOrProps(prop, options$$1) {
  return options$$1[prop] ? [options$$1[prop]] : options$$1[prop + "s"];
}

function isThenable$1(obj) {
  return typeof obj.then === "function";
}
function createWrapper(options$$1) {
  var el = document.createElement("div");
  el.id = "reactbox-wrapper";
  var extraClasses = propOrProps("extraClass", options$$1);
  if (extraClasses) {
    extraClasses.forEach(function (klass) {
      return el.classList.add(klass);
    });
  }
  return el;
}

var maybeThenable = function maybeThenable(callback, thenable) {
  return isThenable$1(thenable) ? thenable.then(callback) : callback(thenable);
};

function Reactbox$1(props) {
  return new _Promise(function (resolve, reject) {
    function show(props) {
      var el = createWrapper(props);
      document.body.appendChild(el);
      var overflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      var state = options(props);
      var app = new App(state, [store$1], el, Reactbox);
      var keyboard = Keyboard(app.store.dispatch);
      var touch = Touch(app.store.dispatch);
      var unmount = props.onUnmount;
      options.onUnmount = function (component) {
        document.documentElement.style.overflow = overflow;
        keyboard.disable();
        deeplink.reset();
        fullscreen.exit();
        touch.disable();
        if (unmount) {
          unmount(component);
        }
        ReactDOM.unmountComponentAtNode(el);
        el.parentNode.removeChild(el);
      };
      deeplink.init();
      deeplink.set(app.store.state.items[app.store.state.activeIndex]);
      keyboard.enable();
      touch.enable();
      app.store.dispatch("init");
      app.store.onDispatch = function (action, params) {
        if (action !== "unmount") {
          return;
        }
        options.onUnmount();
        resolve(app.store.state.items[app.store.state.activeIndex]);
      };
    }
    maybeThenable(show, props);
  });
}

export default Reactbox$1;
