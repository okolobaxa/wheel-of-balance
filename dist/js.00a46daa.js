// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/file-saver/dist/FileSaver.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


},{}],"js/text-to-arc.js":[function(require,module,exports) {
(function () {
  var FILL = 0; // const to indicate filltext render

  var STROKE = 1;
  var renderType = FILL; // used internal to set fill or stroke text

  var multiplyCurrentTransform = true; // if true Use current transform when rendering
  // if false use absolute coordinates which is a little quicker
  // after render the currentTransform is restored to default transform
  // measure circle text
  // ctx: canvas context
  // text: string of text to measure
  // r: radius in pixels
  //
  // returns the size metrics of the text
  //
  // width: Pixel width of text
  // angularWidth : angular width of text in radians
  // pixelAngularSize : angular width of a pixel in radians

  var measure = function measure(ctx, text, radius) {
    var textWidth = ctx.measureText(text).width; // get the width of all the text

    return {
      width: textWidth,
      angularWidth: 1 / radius * textWidth,
      pixelAngularSize: 1 / radius
    };
  }; // displays text along a circle
  // ctx: canvas context
  // text: string of text to measure
  // x,y: position of circle center
  // r: radius of circle in pixels
  // start: angle in radians to start. 
  // [end]: optional. If included text align is ignored and the text is 
  //        scaled to fit between start and end;
  // [forward]: optional default true. if true text direction is forwards, if false  direction is backward


  var circleText = function circleText(ctx, text, x, y, radius, start, end, forward) {
    var i, textWidth, pA, pAS, a, aw, wScale, aligned, dir, fontSize;

    if (text.trim() === "" || ctx.globalAlpha === 0) {
      // dont render empty string or transparent
      return;
    }

    if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(start) || end !== undefined && end !== null && isNaN(end)) {
      // 
      throw TypeError("circle text arguments requires a number for x,y, radius, start, and end.");
    }

    aligned = ctx.textAlign; // save the current textAlign so that it can be restored at end

    dir = forward ? 1 : forward === false ? -1 : 1; // set dir if not true or false set forward as true  

    pAS = 1 / radius; // get the angular size of a pixel in radians

    textWidth = ctx.measureText(text).width; // get the width of all the text

    if (end !== undefined && end !== null) {
      // if end is supplied then fit text between start and end
      pA = (end - start) / textWidth * dir;
      wScale = pA / pAS * dir;
    } else {
      // if no end is supplied correct start and end for alignment
      // if forward is not given then swap top of circle text to read the correct direction
      if (forward === null || forward === undefined) {
        if ((start % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) > Math.PI) {
          dir = -1;
        }
      }

      pA = -pAS * dir;
      wScale = -1 * dir;

      switch (aligned) {
        case "center":
          // if centered move around half width
          start -= pA * textWidth / 2;
          end = start + pA * textWidth;
          break;

        case "right": // intentionally falls through to case "end"

        case "end":
          end = start;
          start -= pA * textWidth;
          break;

        case "left": // intentionally falls through to case "start"

        case "start":
          end = start + pA * textWidth;
      }
    }

    ctx.textAlign = "center"; // align for rendering

    a = start; // set the start angle

    for (var i = 0; i < text.length; i += 1) {
      // for each character
      aw = ctx.measureText(text[i]).width * pA; // get the angular width of the text

      var xDx = Math.cos(a + aw / 2); // get the yAxies vector from the center x,y out

      var xDy = Math.sin(a + aw / 2);

      if (multiplyCurrentTransform) {
        // transform multiplying current transform
        ctx.save();

        if (xDy < 0) {
          // is the text upside down. If it is flip it
          ctx.transform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
        } else {
          ctx.transform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
        }
      } else {
        if (xDy < 0) {
          // is the text upside down. If it is flip it
          ctx.setTransform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
        } else {
          ctx.setTransform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
        }
      }

      if (renderType === FILL) {
        ctx.fillText(text[i], 0, 0); // render the character
      } else {
        ctx.strokeText(text[i], 0, 0); // render the character
      }

      if (multiplyCurrentTransform) {
        // restore current transform
        ctx.restore();
      }

      a += aw; // step to the next angle
    } // all done clean up.


    if (!multiplyCurrentTransform) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }

    ctx.textAlign = aligned; // restore the text alignment
  }; // define fill text


  var fillCircleText = function fillCircleText(text, x, y, radius, start, end, forward) {
    renderType = FILL;
    circleText(this, text, x, y, radius, start, end, forward);
  }; // define stroke text


  var strokeCircleText = function strokeCircleText(text, x, y, radius, start, end, forward) {
    renderType = STROKE;
    circleText(this, text, x, y, radius, start, end, forward);
  }; // define measure text


  var measureCircleTextExt = function measureCircleTextExt(text, radius) {
    return measure(this, text, radius);
  }; // set the prototypes


  CanvasRenderingContext2D.prototype.fillCircleText = fillCircleText;
  CanvasRenderingContext2D.prototype.strokeCircleText = strokeCircleText;
  CanvasRenderingContext2D.prototype.measureCircleText = measureCircleTextExt;
})();
},{}],"js/canvas-toBlob.js":[function(require,module,exports) {
/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */

/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */
(function (view) {
  "use strict";

  var Uint8Array = view.Uint8Array,
      HTMLCanvasElement = view.HTMLCanvasElement,
      canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
      is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
      to_data_url = "toDataURL",
      base64_ranks,
      decode_base64 = function decode_base64(base64) {
    var len = base64.length,
        buffer = new Uint8Array(len / 4 * 3 | 0),
        i = 0,
        outptr = 0,
        last = [0, 0],
        state = 0,
        save = 0,
        rank,
        code,
        undef;

    while (len--) {
      code = base64.charCodeAt(i++);
      rank = base64_ranks[code - 43];

      if (rank !== 255 && rank !== undef) {
        last[1] = last[0];
        last[0] = code;
        save = save << 6 | rank;
        state++;

        if (state === 4) {
          buffer[outptr++] = save >>> 16;

          if (last[1] !== 61
          /* padding character */
          ) {
              buffer[outptr++] = save >>> 8;
            }

          if (last[0] !== 61
          /* padding character */
          ) {
              buffer[outptr++] = save;
            }

          state = 0;
        }
      }
    } // 2/3 chance there's going to be some null bytes at the end, but that
    // doesn't really matter with most image formats.
    // If it somehow matters for you, truncate the buffer up outptr.


    return buffer;
  };

  if (Uint8Array) {
    base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
  }

  if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
    if (!canvas_proto.toBlob) canvas_proto.toBlob = function (callback, type
    /*, ...args*/
    ) {
      if (!type) {
        type = "image/png";
      }

      if (this.mozGetAsFile) {
        callback(this.mozGetAsFile("canvas", type));
        return;
      }

      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
        callback(this.msToBlob());
        return;
      }

      var args = Array.prototype.slice.call(arguments, 1),
          dataURI = this[to_data_url].apply(this, args),
          header_end = dataURI.indexOf(","),
          data = dataURI.substring(header_end + 1),
          is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
          blob;

      if (Blob.fake) {
        // no reason to decode a data: URI that's just going to become a data URI again
        blob = new Blob();

        if (is_base64) {
          blob.encoding = "base64";
        } else {
          blob.encoding = "URI";
        }

        blob.data = data;
        blob.size = data.length;
      } else if (Uint8Array) {
        if (is_base64) {
          blob = new Blob([decode_base64(data)], {
            type: type
          });
        } else {
          blob = new Blob([decodeURIComponent(data)], {
            type: type
          });
        }
      }

      callback(blob);
    };

    if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = "toDataURLHD";
        var blob = this.toBlob();
        to_data_url = "toDataURL";
        return blob;
      };
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob;
    }
  }
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this);
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fileSaver = require("file-saver");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('./text-to-arc.js');

require('./canvas-toBlob.js');

var Wheel = /*#__PURE__*/function () {
  function Wheel(canvas, config) {
    var _this2 = this;

    _classCallCheck(this, Wheel);

    _defineProperty(this, "defaultConfig", {
      radius: 200,
      levels: 10,
      segments: [{
        color: "#97CC64",
        text: "Section 1",
        level: 10
      }, {
        color: "#4569BC",
        text: "Section 2",
        level: 10
      }, {
        color: "#A955B8",
        text: "Section 3",
        level: 10
      }]
    });

    _defineProperty(this, "draw", function () {
      var ctx = this.canvas.getContext('2d');
      this.drawSegments(ctx, this.config.segments, this.radiansPerSegment, this.step);
      this.drawCircles(ctx, this.config.levels, this.step, this.config.segments.length);
      this.drawTexts(ctx, this.config.segments, this.radiansPerSegment, this.config.radius);
    });

    _defineProperty(this, "download", function () {
      this.canvas.toBlob(function (blob) {
        (0, _fileSaver.saveAs)(blob, "wheel-of-balance.jpg");
      }, "image/jpeg");
    });

    _defineProperty(this, "clear", function () {
      var _this = this;

      this.data = this.config.segments.map(function (s) {
        return {
          level: s.level || _this.config.levels
        };
      });
      this.redraw();
    });

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw "First argument should be of type HTMLCanvasElement";
    }

    this.canvas = canvas;

    if (config) {
      this.config = config;
    } else {
      this.config = this.defaultConfig;
    }

    this.step = this.config.radius / this.config.levels;
    this.degreesPerSegment = 360 / this.config.segments.length;
    this.radiansPerSegment = this.degreesPerSegment / 180 * Math.PI;
    this.data = this.config.segments.map(function (s) {
      return {
        level: s.level
      };
    });

    this.canvas.onmousedown = function (event) {
      return _this2.setLevel(canvas, event);
    };
  }

  _createClass(Wheel, [{
    key: "redraw",
    value: function redraw() {
      this.clean();
      this.draw();
    }
  }, {
    key: "clean",
    value: function clean() {
      var context = this.canvas.getContext('2d');
      context.beginPath();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    }
  }, {
    key: "drawSegments",
    value: function drawSegments(ctx, segments, radiansPerSegment, step) {
      for (var i = 0; i < segments.length; i++) {
        var startAngle = i * radiansPerSegment;
        var endAngle = startAngle + radiansPerSegment;
        var segment = segments[i];
        var dataItem = this.data[i];
        this.drawSegment(ctx, step * dataItem.level, startAngle, endAngle, segment.color);
      }
    }
  }, {
    key: "drawTexts",
    value: function drawTexts(ctx, segments, radiansPerSegment, radius) {
      for (var i = 0; i < segments.length; i++) {
        var startAngle = i * radiansPerSegment;
        var endAngle = startAngle + radiansPerSegment;
        var center = (startAngle + endAngle) / 2;
        var segment = segments[i];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.fillStyle = segment.color;
        ctx.fillCircleText(segment.text, 250, 250, radius + 10, center, null);
        ctx.fill();
        ctx.closePath();
      }
    }
  }, {
    key: "drawSegment",
    value: function drawSegment(ctx, radius, startAngle, endAngle, color) {
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, radius, startAngle, endAngle, false);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "drawCircles",
    value: function drawCircles(ctx, levels, step, segmentsCount) {
      var currentR = step;

      for (var i = 0; i < levels; i++) {
        ctx.beginPath();
        ctx.arc(250, 250, currentR, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        currentR += step;
      }

      for (var _i = 1; _i <= segmentsCount; _i++) {
        var radians = _i * (360 / segmentsCount) / 180 * Math.PI;
        var endX = 250 + levels * step * Math.cos(radians);
        var endY = 250 - levels * step * Math.sin(radians);
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }, {
    key: "setLevel",
    value: function setLevel(canvas, e) {
      var _this$calculateLineEn = this.calculateLineEnd(canvas, e),
          dx = _this$calculateLineEn.dx,
          dy = _this$calculateLineEn.dy;

      var degrees = this.calculateLineAngel(dx, dy);
      var segmentId = Math.floor(degrees / this.degreesPerSegment);
      var dataItem = this.data[segmentId];
      var pointRadius = Math.sqrt(dx * dx + dy * dy);
      var length = Math.min(pointRadius, this.config.radius);
      dataItem.level = length / this.step;
      this.redraw();
    }
  }, {
    key: "calculateLineEnd",
    value: function calculateLineEnd(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      return {
        dx: x - 250,
        dy: y - 250
      };
    }
  }, {
    key: "calculateLineAngel",
    value: function calculateLineAngel(dx, dy) {
      var radians = Math.atan(dy / dx); // wrong, in [-1/2 pi, 1/2 pi]

      if (1 / dx < 0) radians += Math.PI; // fixed, in [-1/2 pi, 3/2 pi]

      if (1 / radians < 0) radians += 2 * Math.PI; // fixed, in [+0, 2 pi]

      return radians * 180 / Math.PI;
    }
  }, {
    key: "hexToRgbA",
    value: function hexToRgbA(hex, opacity) {
      var c;

      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');

        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }

        c = '0x' + c.join('');
        return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',' + opacity + ')';
      }

      throw new Error('Bad Hex');
    }
  }]);

  return Wheel;
}();

exports.default = Wheel;
window.Wheel = Wheel;
},{"file-saver":"node_modules/file-saver/dist/FileSaver.min.js","./text-to-arc.js":"js/text-to-arc.js","./canvas-toBlob.js":"js/canvas-toBlob.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52939" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map