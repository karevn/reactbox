import FacebookIcon from 'react-icons/fa/facebook';
import TwitterIcon from 'react-icons/fa/twitter';
import GooglePlusIcon from 'react-icons/fa/google-plus';
import RedditIcon from 'react-icons/fa/reddit';
import DiggIcon from 'react-icons/fa/digg';
import StumbleUponIcon from 'react-icons/fa/stumbleupon';
import DeliciousIcon from 'react-icons/fa/delicious';
import PinterestIcon from 'react-icons/fa/pinterest';
import VkIcon from 'react-icons/fa/vk';
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

var i18n = {
  toolbar: {
    download: 'Download',
    share: 'Share',
    fullscreen: {
      enter: 'Enter fullscreen',
      exit: 'Exit fullscreen'
    }
  }
};

var services = {
  facebook: {
    url: '//www.facebook.com/share.php?v=4&src=bm&u=%url%',
    name: 'Facebook',
    component: FacebookIcon
  },
  twitter: {
    url: '//twitter.com/home?status=%url%',
    name: 'Twitter',
    component: TwitterIcon
  },
  googleplus: {
    url: '//plus.google.com/share?url=%url%',
    name: 'Google Plus',
    component: GooglePlusIcon
  },
  reddit: {
    url: '//reddit.com/submit?url=%url%',
    name: 'Reddit',
    component: RedditIcon
  },
  digg: {
    url: '//digg.com/submit?phase=2&url=%url%',
    name: 'Digg',
    component: DiggIcon
  },
  stumbleupon: {
    url: 'http://www.stumbleupon.com/submit?url=%url%&title=%title%',
    name: 'Stumbleupon',
    component: StumbleUponIcon
  },
  delicious: {
    url: '//delicious.com/post?url=%url%',
    name: 'Delicious',
    component: DeliciousIcon
  },
  pinterest: {
    url: 'https://www.pinterest.com/pin/create/button/?url=%url%&media=%image_url%&description=%description%&title=%title%',
    name: 'Pinterest',
    component: PinterestIcon
  },
  vk: {
    url: 'http://vk.com/share.php?url=%url%',
    name: 'VK',
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
    description: item.description || ''
  };
  return Object.keys(tags).reduce(function (url, tag) {
    return url.replace('%' + tag + '%', encodeURIComponent(tags[tag]));
  }, service.url);
}

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function guessType(url) {
  if (url.match(/\.(jpg|jpeg|png|gif|bmp|jfif|tif|jpe)$/i)) {
    return 'image';
  }
  if (url.match(/(youtube\.com|youtu\.be|vimeo\.com|\.mp4$)/i)) {
    return 'video';
  }
  if (url.match(/\.(html?$|php$|google\.com\/maps\/embed)/i)) {
    return 'iframe';
  }
  return 'image';
}
function options (options) {
  options = _extends({
    services: services,
    toolbar: { share: true },
    i18n: i18n,
    activeIndex: 0,
    carousel: true,
    theme: 'black'
  }, options);
  options.items.forEach(function (item, index) {
    item.index = index;
    if (!item.type) {
      item.type = item.url ? guessType(item.url) : 'image';
    }
  });
  return options;
}

function getContentType(item) {
  if (item.type) {
    return item.type;
  }
  if (item.html) {
    return 'html';
  }
  return 'image';
}
function getCarousel(prop) {
  if (prop.items.length <= 1) {
    return false;
  }
  return prop.carousel && window.innerWidth > 768;
}

var find = require('array.prototype.find');

var prefix = function prefix(prop) {
  return ['moz', 'ms', 'webkit'].map(function (prefix) {
    return '' + prefix + prop;
  });
};
var fullscreen = {
  supports: function supports() {
    var el = document.documentElement;
    if (el.requestFullscreen) {
      return true;
    }
    return !!find(prefix('RequestFullScreen'), function (prefixed) {
      return !!el[prefixed];
    });
  },
  is: function is() {
    var _arr = ['fullscreenEnabled', 'webkitFullscreenEnabled', 'mozFullscreenEnabled', 'msFullscreenEnabled'];

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
function clearHash() {
  if (window.history && window.history.pushState) {
    window.history.pushState('', '', window.location.pathname);
  } else {
    window.location.href = window.location.href.replace(/#.*$/, '#');
  }
}
var deeplink = {
  init: function init() {
    if (location.hash) {
      hash = location.hash;
    }
  },
  set: function set(item) {
    try {
      if (item.hash) {
        location.hash = item.hash;
      } else {
        location.hash = hash || '';
      }
    } catch (error) {}
  },
  reset: function reset() {
    try {
      if (hash) {
        location.hash = hash;
      } else {
        clearHash();
      }
    } catch (error) {}
    hash = null;
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
var store = {
  'share.open': function shareOpen(state) {
    state.toolbar.shareActive = true;
  },
  'share.close': function shareClose(state) {
    state.toolbar.shareActive = false;
  },
  next: next,
  prev: prev,
  'item.thumbnail.click': function itemThumbnailClick(state, item) {
    state.activeIndex = item.index;
    deeplink.set(state.items[state.activeIndex]);
  },
  'item.load': function itemLoad(state, item) {
    getItem(state, item).loaded = true;
  },
  'item.unload': function itemUnload(state, item) {
    getItem(state, item).loaded = false;
  },

  'item.thumbnail.load': function itemThumbnailLoad(state, item) {
    getItem(state, item).thumbnailLoaded = true;
  },
  'item.thumbnail.error': function itemThumbnailError(state, item) {
    getItem(state, item).thumbnailError = true;
  },

  'touch.start': function touchStart(state, position) {
    state.touch = {
      start: position
    };
  },
  'touch.move': function touchMove(state, position) {
    state.touch.offset = {
      x: position.x - state.touch.start.x,
      y: position.y - state.touch.start.y
    };
  },
  'touch.end': function touchEnd(state, position) {
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
  'fullscreen.enter': function fullscreenEnter(state) {
    fullscreen.enter();
    state.toolbar.isFullscreen = true;
  },
  'fullscreen.exit': function fullscreenExit(state) {
    fullscreen.exit();
    state.toolbar.isFullscreen = false;
  },
  'carousel.resize': function carouselResize(state, size) {
    state.carousel = size;
  }
};

var classnames = require('classnames');

function ShareMenu(props) {
  return React.createElement(
    'div',
    { className: classnames('reactbox-share-menu', { 'reactbox-share-menu--open': props.open }) },
    Object.keys(props.services).map(function (slug) {
      var service = props.services[slug];
      return React.createElement(
        'a',
        { target: '_blank', className: 'reactbox-share-link',
          key: slug,
          onClick: function onClick(e) {
            e.preventDefault();
            props.dispatch('share.close');
          },
          href: getShareUrl(service, props.activeItem) },
        service.icon ? React.createElement('img', { src: service.icon, alt: '' }) : null,
        !service.icon && !!service.component ? React.createElement(service.component) : null,
        service.name
      );
    })
  );
}

var hasFullscreen = fullscreen.supports();

function Tooltip(props) {
  return React.createElement(
    'span',
    { className: 'reactbox-tooltip' },
    props.children
  );
}

var Toolbar = function (_React$Component) {
  inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    classCallCheck(this, Toolbar);

    var _this = possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.state = { shareOpen: false };
    _this.onWindowClickWhenSharing = _this.onWindowClickWhenSharing.bind(_this);
    return _this;
  }

  createClass(Toolbar, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(newProps, newState) {
      if (newState.shareOpen && !this.state.shareOpen) {
        window.addEventListener('click', this.onWindowClickWhenSharing, true);
      }
      if (!newState.shareOpen && this.state.shareOpen) {
        window.removeEventListener('click', this.onWindowClickWhenSharing, true);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.shareOpen) {
        window.removeEventListener('click', this.onWindowClickWhenSharing, true);
      }
    }
  }, {
    key: 'onWindowClickWhenSharing',
    value: function onWindowClickWhenSharing() {
      this.props.dispatch('share.close');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var activeItem = props.items[props.activeIndex];
      return React.createElement(
        'div',
        { className: 'reactbox-toolbar' },
        React.createElement(
          'a',
          { href: '#',
            onClick: function onClick(e) {
              e.preventDefault();props.dispatch('unmount');
            },
            className: 'reactbox-toolbar-close reactbox-toolbar-link' },
          React.createElement(CloseIcon, null)
        ),
        hasFullscreen && !props.toolbar.isFullscreen ? React.createElement(
          'a',
          { href: '#',
            onClick: function onClick(e) {
              e.preventDefault();
              props.dispatch('fullscreen.enter');
            },
            className: 'reactbox-toolbar-fullscreen reactbox-toolbar-link' },
          React.createElement(FullScreenIcon, null),
          React.createElement(
            'span',
            { className: 'reactbox-tooltip' },
            props.i18n.toolbar.fullscreen.enter
          )
        ) : null,
        hasFullscreen && props.toolbar.isFullscreen ? React.createElement(
          'a',
          { href: '#',
            className: 'reactbox-toolbar-link reactbox-toolbar-exit-fullscreen',
            onClick: function onClick(e) {
              e.preventDefault();
              props.dispatch('fullscreen.exit');
            } },
          React.createElement(FullScreenExitIcon, null),
          React.createElement(
            Tooltip,
            null,
            props.i18n.toolbar.fullscreen.exit
          )
        ) : null,
        activeItem && Object.keys(props.services).length > 0 && props.toolbar.share ? React.createElement(
          'div',
          { className: 'reactbox-toolbar-link reactbox-toolbar-share' },
          React.createElement(ShareIcon, {
            onClick: function onClick(e) {
              e.preventDefault();
              _this2.setState({ 'shareOpen': true });
              props.dispatch('share.open');
            } }),
          React.createElement(
            Tooltip,
            null,
            props.i18n.toolbar.share
          ),
          props.toolbar.shareActive ? React.createElement(ShareMenu, { dispatch: props.dispatch, open: this.state.shareOpen,
            services: props.services, activeItem: activeItem }) : null
        ) : null,
        activeItem.download ? React.createElement(
          'a',
          { className: 'reactbox-toolbar-download reactbox-toolbar-link',
            download: true, href: activeItem.download,
            target: '_blank' },
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
    return 'none';
  }
  if (item.descriptionStyle === 'right' && window.innerWidth < 1024) {
    return 'bottom';
  }
  return item.descriptionStyle || 'mini';
}

var classnames$1 = require('classnames');

function Wrap(props) {
  return React.createElement(
    'div',
    { className: 'reactbox-lightbox-item-description' },
    React.createElement(
      'div',
      { className: 'reactbox-lightbox-item-description-inner' },
      props.children
    )
  );
}

var Description = function (_React$Component) {
  inherits(Description, _React$Component);

  function Description() {
    classCallCheck(this, Description);
    return possibleConstructorReturn(this, (Description.__proto__ || Object.getPrototypeOf(Description)).apply(this, arguments));
  }

  createClass(Description, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var style = getStyle(item);
      var Scroll = style === 'bottom' ? Wrap : Scrollbar;
      return React.createElement(
        Scroll,
        { className: classnames$1('reactbox-lightbox-item-description', { 'reactbox-description-light': style === 'right' && item.type == 'video' }),
          speed: 0.8,
          horizontal: false,
          contentClassName: 'reactbox-lightbox-item-description-inner' },
        !!item.description ? React.createElement('div', { className: 'reactbox-lightbox-item-description-content',
          dangerouslySetInnerHTML: { __html: item.description } }) : null
      );
    }
  }]);
  return Description;
}(React.Component);

function includes(list, item) {
  return list.indexOf(item) !== -1;
}

var camelcase = require('uppercamelcase');

var defaultPrefixes = ['Moz', 'Webkit', 'O', 'MS'];
var prefixedKeys = {
  'transform': defaultPrefixes,
  'border-radius': defaultPrefixes,
  'transition': defaultPrefixes,
  'box-sizing': ['moz']
};
function mapObject(object, callback) {
  if (!object) {
    return object;
  }
  return Object.keys(object).reduce(function (result, key) {
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
  return mapObject(style, concatWith('px'));
}
var css = {
  prefix: function prefix(styles) {
    return Object.keys(styles).reduce(function (result, key) {
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
    return Object.keys(styles).reduce(function (result, key) {
      if (includes(Object.keys(prefixedKeys), key)) {
        result[camelcase(key)] = styles[key];
      } else {
        result[key] = styles[key];
      }
      return result;
    }, {});
  }
};

var classnames$2 = require('classnames');

function maybeApply(obj, func) {
  return func ? func(obj) : obj;
}

var Iframe = function (_React$Component) {
  inherits(Iframe, _React$Component);

  function Iframe(props) {
    classCallCheck(this, Iframe);

    var _this = possibleConstructorReturn(this, (Iframe.__proto__ || Object.getPrototypeOf(Iframe)).call(this, props));

    _this.state = { size: { width: 0, height: 0 } };
    _this.updateSize = _this.updateSize.bind(_this);
    return _this;
  }

  createClass(Iframe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      var node = this.refs.this;
      this.setState({ size: { width: node.clientWidth, height: node.clientHeight } });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var style = pixels(maybeApply(this.state.size, props.resize));
      return React.createElement(
        'div',
        { className: classnames$2('reactbox-lightbox-item-object', 'reactbox-object-iframe', props.className), ref: 'this' },
        React.createElement('iframe', { src: props.src,
          style: style,
          onLoad: function onLoad() {
            props.dispatch('item.load', props.item);_this2.updateSize();
          } })
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
  return Object.assign({}, size, { top: (container.height - size.height) / 2 });
}

function halign(container, size) {
  return Object.assign({}, size, { left: (container.width - size.width) / 2 });
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

var asap = require('asap');

var onItemLoad = function onItemLoad(props) {
  return function (event) {
    props.item.size = {
      width: event.target.naturalWidth,
      height: event.target.naturalHeight
    };
    props.dispatch('item.load', props.item);
  };
};

function getImageStyle(state, item) {
  if (!item.size || !state) {
    return;
  }
  if (includes(['none', 'mini'], getStyle(item))) {
    return valign(state, fit(state, item.size));
  }
  return fill(state, item.size);
}

var Image = function (_React$Component) {
  inherits(Image, _React$Component);

  function Image(props) {
    classCallCheck(this, Image);

    var _this = possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.updateSize = _this.updateSize.bind(_this);
    return _this;
  }

  createClass(Image, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
      if (!this.props.item.url) {
        asap(onItemLoad(this.props));
      }
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      var node = this.refs.this;
      this.setState({ width: node.clientWidth, height: node.clientHeight });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var state = this.state;
      var item = props.item;
      return React.createElement(
        'div',
        { className: 'reactbox-lightbox-item-object reactbox-object-image',
          ref: 'this' },
        !!item.url ? React.createElement('img', { className: 'reactbox-lightbox-content-image',
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

var find$1 = require('array.prototype.find');

function load(tag, id, srcAttr, srcVal, attr) {
  return new Promise(function (resolve, reject) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('load', resolve);
      resolve();
    }
    el = document.createElement(tag);
    el.id = id;
    el[srcAttr] = srcVal;
    if (attr) {
      Object.keys(attr).forEach(function (key) {
        el.setAttribute(key, attr[key]);
      });
    }
    document.head.appendChild(el);
    el.addEventListener('load', resolve);
    el.addEventListener('error', reject);
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
      return url.replace(regex, '');
    }
    if (url.match(regex = /.*(\/\/)?(www\.)?youtu\.be\//)) {
      return url.replace(regex, '');
    }
    return url.replace(/(https?:)?(\/\/)?(www\.)?youtube\.com\/embed\//, '');
  },
  vimeo: function vimeo(url) {
    return url.replace(/(https?:)?(\/\/)?(www\.)?vimeo\.com\//, '');
  },
  mp4: function mp4(url) {
    return url;
  }
};

var formatters = {
  youtube: function youtube(id) {
    return 'https://youtube.com/embed/' + id;
  },
  vimeo: function vimeo(id) {
    return 'https://player.vimeo.com/video/' + id;
  },
  mp4: function mp4(id) {
    return id;
  }
};

function getSrc(item) {
  var url = item.url;
  var service = find$1(Object.keys(tests), function (key) {
    return url.match(tests[key]);
  });
  var id = extractors[service](url);
  return formatters[service](id);
}
function _resize(size, style) {
  if (style === 'bottom') {
    return size;
  }
  var standard = size.width / 16 * 9;
  if (size.height > standard) {
    var newSize = Object.assign({}, size, { height: standard });
    return style === 'right' ? newSize : valign(size, newSize);
  }
  return size;
}
function IframeVideo(props) {
  return React.createElement(Iframe, _extends({}, props, { src: getSrc(props.item), full: false,
    className: 'reactbox-object-video',
    vAlign: getStyle(props.item) !== 'right',
    resize: function resize(size) {
      return _resize(size, getStyle(props.item));
    },
    fitWidth: getStyle(props.item) === 'bottom' }));
}
function loadVideoJS(callback) {
  return Promise.all(load('script', 'reactbox-video-js-loader', 'src', 'https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video.js'), load('link', 'reactbox-video-js-css', 'href', 'https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.7/video-js.min.css', { rel: 'stylesheet' }));
}

var VideoJSVideo = function (_React$Component) {
  inherits(VideoJSVideo, _React$Component);

  function VideoJSVideo(props) {
    classCallCheck(this, VideoJSVideo);

    var _this = possibleConstructorReturn(this, (VideoJSVideo.__proto__ || Object.getPrototypeOf(VideoJSVideo)).call(this, props));

    _this.state = { size: { width: 0, height: 0 } };
    _this.onResize = _this.onResize.bind(_this);
    return _this;
  }

  createClass(VideoJSVideo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;
      loadVideoJS().then(function () {
        props.dispatch('item.load', props.item).then(function () {
          _this2.updateSize(function () {
            window.addEventListener('resize', _this2.onResize);
            loadVideoJS().then(function () {
              props.dispatch('item.load', props.item);
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
    key: 'updateSize',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      if (this.state.player) {
        this.state.player.dispose();
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.updateSize();
    }
  }, {
    key: 'getVideoId',
    value: function getVideoId() {
      return 'reactbox-video-' + this.props.item.index;
    }
  }, {
    key: 'getIframeStyle',
    value: function getIframeStyle(item) {
      return this.state.size;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var iframeStyle = this.getIframeStyle(item);
      return React.createElement(
        'div',
        { className: 'video-js-wrapper', style: iframeStyle, ref: 'this' },
        React.createElement(
          'video',
          { id: this.getVideoId(), controls: true, preload: 'auto',
            poster: item.thumbnail,
            style: { width: '100%', height: '100%' },
            className: 'video-js' },
          React.createElement('source', { src: item.url })
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

var ajax$1 = require('atomicjs');

var Ajax = function (_React$Component) {
  inherits(Ajax, _React$Component);

  function Ajax(props) {
    classCallCheck(this, Ajax);

    var _this = possibleConstructorReturn(this, (Ajax.__proto__ || Object.getPrototypeOf(Ajax)).call(this, props));

    _this.state = { html: '' };
    _this.onAjaxLoaded = _this.onAjaxLoaded.bind(_this);
    _this.onAjaxError = _this.onAjaxError.bind(_this);
    return _this;
  }

  createClass(Ajax, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      ajax$1.get(this.props.item.url).success(this.onAjaxLoaded).error(this.onAjaxError);
    }
  }, {
    key: 'onAjaxError',
    value: function onAjaxError() {
      this.props.dispatch('item.error', this.props.item);
    }
  }, {
    key: 'onAjaxLoaded',
    value: function onAjaxLoaded(response) {
      this.setState({ html: response.data });
      this.props.dispatch('item.load', this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'reactbox-lightbox-item-object reactbox-lightbox-item-ajax-object',
        dangerouslySetInnerHTML: { __html: this.state.html } });
    }
  }]);
  return Ajax;
}(React.Component);

var Html = function (_React$Component) {
  inherits(Html, _React$Component);

  function Html() {
    classCallCheck(this, Html);
    return possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
  }

  createClass(Html, [{
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
  return React.createElement(Iframe, _extends({}, props, { src: props.item.url }));
}


var content = Object.freeze({
	image: Image,
	video: Video,
	ajax: Ajax,
	html: Html,
	iframe: iframe$1
});

var classnames$3 = require('classnames');

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
    return 'translate(' + offset.x + 'px, 0)';
  }
  if (isPreviousItem(item, props)) {
    return 'translate(' + (-metrics.width + offset.x) + 'px, 0)';
  }
  if (isNextItem(item, props)) {
    return 'translate(' + (metrics.width + offset.x) + 'px, 0)';
  }
}

var LightboxItem = function (_React$Component) {
  inherits(LightboxItem, _React$Component);

  function LightboxItem(props) {
    classCallCheck(this, LightboxItem);

    var _this = possibleConstructorReturn(this, (LightboxItem.__proto__ || Object.getPrototypeOf(LightboxItem)).call(this, props));

    _this.state = {};
    _this.updateSize = _this.updateSize.bind(_this);
    return _this;
  }

  createClass(LightboxItem, [{
    key: 'calcStyle',
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
        width: metrics.width + 'px',
        height: metrics.height + 'px'
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
      var _ = jQuery || $;
      _(window).trigger('lightbox:item:add', ReactDOM.findDOMNode(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateSize);
      this.props.dispatch('item.unload', this.props.item);
      var _ = jQuery || $;
      _(window).trigger('lightbox:item:remove', ReactDOM.findDOMNode(this));
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      var node = this.refs.this;
      this.setState({
        size: { width: node.clientWidth, height: node.clientHeight }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        animated: Math.abs(props.activeIndex - this.props.activeIndex) < 2 });
    }
  }, {
    key: 'getContentStyle',
    value: function getContentStyle() {
      if (!this.refs.content) {
        return null;
      }
      var offset = getCarousel(this.props) ? 130 : 24;
      if (getStyle(this.props.item) === 'bottom' && this.refs.content.offsetHeight < this.state.size.height - offset) {
        return { top: (this.state.size.height - offset + 54 - this.refs.content.offsetHeight) / 2 };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var item = props.item;
      var descriptionStyle = getStyle(item);
      var type = getContentType(item);
      var style = css.prefix(this.calcStyle());
      return React.createElement(
        'div',
        { className: classnames$3('reactbox-lightbox-item', 'reactbox-description-' + descriptionStyle, 'reactbox-content-' + type, {
            'reactbox-lightbox-active': isActiveItem(item, props),
            'reactbox-lightbox-next': isNextItem(item, props),
            'reactbox-lightbox-prev': isPreviousItem(item, props),
            'reactbox-loaded': item.loaded,
            'reactbox-animated': this.state.animated
          }), style: style, ref: 'this' },
        React.createElement(
          'div',
          { className: 'reactbox-lightbox-item-content',
            style: this.getContentStyle(),
            ref: 'content' },
          React.createElement(content[type], props),
          descriptionStyle !== 'none' ? React.createElement(Description, props) : null
        ),
        !item.loaded ? React.createElement(Loading, props) : null
      );
    }
  }]);
  return LightboxItem;
}(React.Component);

var classnames$4 = require('classnames');

var Icons = function (_React$Component) {
  inherits(Icons, _React$Component);

  function Icons() {
    classCallCheck(this, Icons);
    return possibleConstructorReturn(this, (Icons.__proto__ || Object.getPrototypeOf(Icons)).apply(this, arguments));
  }

  createClass(Icons, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.activeIndex !== this.props.activeIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var prevClasses = classnames$4(['reactbox-prev'], { 'reactbox-disabled': props.activeIndex === 0 });
      var nextClasses = classnames$4(['reactbox-next', { 'reactbox-disabled': props.activeIndex >= props.items.length - 1 }]);
      return props.items.length > 1 ? React.createElement(
        'div',
        { className: 'reactbox-prev-next' },
        React.createElement(
          'div',
          { className: prevClasses,
            onClick: function onClick() {
              return props.dispatch('prev');
            } },
          React.createElement(LeftIcon, { size: 100 })
        ),
        React.createElement(
          'div',
          { className: nextClasses,
            onClick: function onClick() {
              return props.dispatch('next');
            } },
          React.createElement(RightIcon, { size: 100 })
        )
      ) : null;
    }
  }]);
  return Icons;
}(React.Component);

var Lightbox = function (_React$Component2) {
  inherits(Lightbox, _React$Component2);

  function Lightbox(props) {
    classCallCheck(this, Lightbox);

    var _this2 = possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call(this, props));

    _this2.state = {};
    _this2.calcMetrics = _this2.calcMetrics.bind(_this2);
    return _this2;
  }

  createClass(Lightbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.calcMetrics);
      this.calcMetrics();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.calcMetrics);
    }
  }, {
    key: 'calcMetrics',
    value: function calcMetrics() {
      var node = this.refs.lightbox;
      this.setState({
        metrics: {
          left: node.offsetLeft,
          top: node.offsetTop,
          width: node.clientWidth,
          height: node.clientHeight
        }
      });
    }
  }, {
    key: 'render',
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
        'div',
        { className: 'reactbox-lightbox', ref: 'lightbox' },
        React.createElement(Icons, { items: props.items, activeIndex: activeIndex,
          dispatch: props.dispatch }),
        !!metrics ? items.map(function (item, index) {
          return React.createElement(LightboxItem, _extends({}, props, { item: item, metrics: metrics,
            key: item.index }));
        }, this) : null
      );
    }
  }]);
  return Lightbox;
}(React.Component);

var classnames$5 = require('classnames');
var find$2 = require('array.prototype.find');
var property = require('dot-prop').get;

var onClick = function onClick(props) {
  return function (e) {
    e.preventDefault();
    props.dispatch('item.thumbnail.click', props.item);
  };
};

var onError = function onError(props) {
  return function (e) {
    return props.dispatch('item.thumbnail.error', props.item);
  };
};

var onLoad = function onLoad(props) {
  return function (e) {
    props.item.thumbnailSize = { width: e.target.naturalWidth,
      height: e.target.naturalHeight };
    props.dispatch('item.thumbnail.load', props.item);
  };
};

function thumbnailTransform(props) {
  return { transform: translate(props.left, props.top) };
}
function translate(x, y) {
  return 'translate(' + x + 'px, ' + (y || 0) + 'px)';
}

function Item(props) {
  var imageStyle = css.prefix(thumbnailTransform(props));
  var classes = classnames$5('reactbox-carousel-item', {
    'reactbox-active': props.item.index === props.activeIndex,
    'reactbox-loaded': props.item.thumbnailLoaded || props.item.thumbnailError,
    'reactbox-error': props.item.thumbnailError,
    'reactbox-animated': props.item.thumbnailLoaded || props.item.thumbnailError
  });
  var item = props.item;
  return React.createElement(
    'div',
    { className: classes, onClick: onClick(props), style: imageStyle },
    !item.error ? React.createElement('img', { src: item.thumbnail,
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
  inherits(Carousel, _React$Component);

  function Carousel(props) {
    classCallCheck(this, Carousel);

    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.onWindowResize = _this.onWindowResize.bind(_this);
    return _this;
  }

  createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onWindowResize();
      window.addEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      var node = this.refs.carousel;
      this.props.dispatch('carousel.resize', { width: node.clientWidth, height: node.clientHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return React.createElement(
        'div',
        { className: 'reactbox-carousel', ref: 'carousel' },
        props.carousel ? visible(props).map(function (item, index) {
          return React.createElement(Item, _extends({}, props, { item: item.item, key: item.item.index,
            left: item.left }));
        }, this) : null
      );
    }
  }]);
  return Carousel;
}(React.Component);

var classnames$6 = require('classnames');

var getReactboxClasses = function getReactboxClasses(props) {
  return classnames$6('reactbox', {
    'reactbox-horizontal': true,
    'reactbox-has-carousel': getCarousel(props)
  }, 'reactbox--theme-' + props.theme);
};

var Reactbox = function (_React$Component) {
  inherits(Reactbox, _React$Component);

  function Reactbox(props) {
    classCallCheck(this, Reactbox);

    var _this = possibleConstructorReturn(this, (Reactbox.__proto__ || Object.getPrototypeOf(Reactbox)).call(this, props));

    _this.state = { width: window.innerWidth };
    _this.onWindowResize = _this.onWindowResize.bind(_this);
    return _this;
  }

  createClass(Reactbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      this.setState({ width: window.innerWidth });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return React.createElement(
        'div',
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
      dispatch('unmount');
    }
    if (e.which === 37 || e.which === 38) {
      dispatch('prev');
    }
    if (e.which === 40 || e.which === 39) {
      return dispatch('next');
    }
  };

  return {
    enable: function enable() {
      return window.addEventListener('keydown', onKeyDown);
    },
    disable: function disable() {
      return window.removeEventListener('keydown', onKeyDown);
    }
  };
}

function pageToXY(touch) {
  return { x: touch.pageX, y: touch.pageY };
}
function Touch (dispatch) {
  var onTouchStart = function onTouchStart(e) {
    if (e.target.closest('.reactbox-toolbar-wrapper, .reactbox-prev, .reactbox-next')) {
      return;
    }
    return dispatch('touch.start', pageToXY(e.touches[0]));
  };
  var onTouchEnd = function onTouchEnd(e) {
    var original = e.changedTouches[0];
    if (original) {
      dispatch('touch.end', pageToXY(e.changedTouches[0]));
    }
  };
  var onTouchMove = function onTouchMove(e) {
    var touch = e.touches[0];
    dispatch('touch.move', pageToXY(touch));
  };

  return {
    enable: function enable() {
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('touchmove', onTouchMove);
    },
    disable: function disable() {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchmove', onTouchMove);
    }
  };
}

function propOrProps(prop, options$$1) {
  if (options$$1[prop]) {
    return [options$$1[prop]];
  }
  return options$$1[prop + 's'];
}
function isThenable(obj) {
  return typeof obj.then === 'function';
}
function createWrapper(options$$1) {
  var el = document.createElement('div');
  el.id = 'reactbox-wrapper';
  var extraClasses = propOrProps('extraClass', options$$1);
  if (extraClasses) {
    extraClasses.forEach(function (klass) {
      return el.classList.add(klass);
    });
  }
  return el;
}

function Reactbox$1(props) {
  return new Promise(function (resolve, reject) {
    function show(props) {
      var el = createWrapper(props);
      document.body.appendChild(el);
      var overflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      var state = options(props);
      var app = new App(state, [store], el, Reactbox);
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
      app.store.dispatch('init');
      app.store.onDispatch = function (action, params) {
        if (action !== 'unmount') {
          return;
        }
        options.onUnmount();
        resolve(app.store.state.items[app.store.state.activeIndex]);
      };
    }
    if (isThenable(props)) {
      props.then(show);
    } else {
      show(props);
    }
  });
}

export default Reactbox$1;
