import { c as create_ssr_component, v as validate_component, m as missing_component, a as add_attribute, e as escape } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
const app = "";
const generatedAttribute = "generated";
const mouseDownEvent = "pointerdown";
const mouseUpEvent = "pointerup";
const mouseLeaveEvent = "pointerleave";
const mouseOutEvent = "pointerout";
const mouseMoveEvent = "pointermove";
const touchStartEvent = "touchstart";
const touchEndEvent = "touchend";
const touchMoveEvent = "touchmove";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";
const errorPrefix = "tsParticles - Error";
class Vector3d {
  constructor(xOrCoords, y, z) {
    this._updateFromAngle = (angle, length) => {
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    };
    if (!isNumber(xOrCoords) && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : 0;
    } else if (xOrCoords !== void 0 && y !== void 0) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z ?? 0;
    } else {
      throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
    }
  }
  static get origin() {
    return Vector3d.create(0, 0, 0);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this._updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(length) {
    this._updateFromAngle(this.angle, length);
  }
  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  add(v) {
    return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  copy() {
    return Vector3d.clone(this);
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }
  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  normalize() {
    const length = this.length;
    if (length != 0) {
      this.multTo(1 / length);
    }
  }
  rotate(angle) {
    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), 0);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : 0;
  }
  sub(v) {
    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
}
class Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, 0);
  }
  static get origin() {
    return Vector.create(0, 0);
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
}
let _random = Math.random;
const easings = /* @__PURE__ */ new Map();
function addEasing(name, easing) {
  if (easings.get(name)) {
    return;
  }
  easings.set(name, easing);
}
function getEasing(name) {
  return easings.get(name) || ((value) => value);
}
function getRandom() {
  return clamp(_random(), 0, 1 - 1e-16);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);
  if (max === min) {
    min = 0;
  }
  return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
  return isNumber(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
  return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
  return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === void 0 && isNumber(source)) {
    return source;
  }
  const min = getRangeMin(source), max = getRangeMax(source);
  return value !== void 0 ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
  return { dx, dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction, position, center) {
  if (isNumber(direction)) {
    return direction * Math.PI / 180;
  }
  switch (direction) {
    case "top":
      return -Math.PI * 0.5;
    case "top-right":
      return -Math.PI * 0.25;
    case "right":
      return 0;
    case "bottom-right":
      return Math.PI * 0.25;
    case "bottom":
      return Math.PI * 0.5;
    case "bottom-left":
      return Math.PI * 0.75;
    case "left":
      return Math.PI;
    case "top-left":
      return -Math.PI * 0.75;
    case "inside":
      return Math.atan2(center.y - position.y, center.x - position.x);
    case "outside":
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom() * Math.PI * 2;
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}
function calcExactPositionOrRandomFromSize(data) {
  return {
    x: data.position?.x ?? getRandom() * data.size.width,
    y: data.position?.y ?? getRandom() * data.size.height
  };
}
function parseAlpha(input) {
  return input ? input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input) : 1;
}
const _logger = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function getLogger() {
  return _logger;
}
function rectSideBounce(data) {
  const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;
  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
    return res;
  }
  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * 0.5 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * 0.5 && velocity < 0) {
    res.velocity = velocity * -factor;
    res.bounced = true;
  }
  return res;
}
function checkSelector(element, selectors) {
  const res = executeOnSingleOrMultiple(selectors, (selector) => {
    return element.matches(selector);
  });
  return isArray(res) ? res.some((t) => t) : res;
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
  return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
  if (!hasMatchMedia()) {
    return;
  }
  return matchMedia(query);
}
function safeIntersectionObserver(callback) {
  if (isSsr() || typeof IntersectionObserver === "undefined") {
    return;
  }
  return new IntersectionObserver(callback);
}
function safeMutationObserver(callback) {
  if (isSsr() || typeof MutationObserver === "undefined") {
    return;
  }
  return new MutationObserver(callback);
}
function isInArray(value, array) {
  return value === array || isArray(array) && array.indexOf(value) > -1;
}
async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
  } catch {
  }
}
function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== void 0 && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius ?? 0), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;
  if (!direction || direction === "bottom") {
    inside = bounds.top < size.height + offset.x;
  }
  if (inside && (!direction || direction === "left")) {
    inside = bounds.right > offset.x;
  }
  if (inside && (!direction || direction === "right")) {
    inside = bounds.left < size.width + offset.y;
  }
  if (inside && (!direction || direction === "top")) {
    inside = bounds.bottom > offset.y;
  }
  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === void 0 || source === null) {
      continue;
    }
    if (!isObject(source)) {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source, value = sourceDict[key], destDict = destination;
      destDict[key] = isObject(value) && Array.isArray(value) ? value.map((v) => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }
  return destination;
}
function isDivModeEnabled(mode, divs) {
  return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
  executeOnSingleOrMultiple(divs, (div) => {
    const divMode2 = div.mode, divEnabled = div.enable;
    if (divEnabled && isInArray(mode, divMode2)) {
      singleDivModeExecute(div, callback);
    }
  });
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  executeOnSingleOrMultiple(selectors, (selector) => {
    callback(selector, div);
  });
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  return findItemFromSingleOrMultiple(divs, (div) => {
    return checkSelector(element, div.selectors);
  });
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
  };
}
function circleBounce(p1, p2) {
  const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = getDistances(pos2, pos1);
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
    return;
  }
  const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), bounceOptions = particle.options.bounce, resH = rectSideBounce({
    pSide: {
      min: bounds.left,
      max: bounds.right
    },
    pOtherSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    rectSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    rectOtherSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    velocity: particle.velocity.x,
    factor: getRangeValue(bounceOptions.horizontal.value)
  });
  if (resH.bounced) {
    if (resH.velocity !== void 0) {
      particle.velocity.x = resH.velocity;
    }
    if (resH.position !== void 0) {
      particle.position.x = resH.position;
    }
  }
  const resV = rectSideBounce({
    pSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    pOtherSide: {
      min: bounds.left,
      max: bounds.right
    },
    rectSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    rectOtherSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    velocity: particle.velocity.y,
    factor: getRangeValue(bounceOptions.vertical.value)
  });
  if (resV.bounced) {
    if (resV.velocity !== void 0) {
      particle.velocity.y = resV.velocity;
    }
    if (resV.position !== void 0) {
      particle.position.y = resV.position;
    }
  }
}
function executeOnSingleOrMultiple(obj, callback) {
  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  return isArray(obj) ? obj.find((t, index) => callback(t, index)) : callback(obj, 0) ? obj : void 0;
}
function initParticleNumericAnimationValue(options, pxRatio) {
  const valueRange = options.value, animationOptions = options.animation, res = {
    delayTime: getRangeValue(animationOptions.delay) * 1e3,
    enable: animationOptions.enable,
    value: getRangeValue(options.value) * pxRatio,
    max: getRangeMax(valueRange) * pxRatio,
    min: getRangeMin(valueRange) * pxRatio,
    loops: 0,
    maxLoops: getRangeValue(animationOptions.count),
    time: 0
  };
  if (animationOptions.enable) {
    res.decay = 1 - getRangeValue(animationOptions.decay);
    switch (animationOptions.mode) {
      case "increase":
        res.status = "increasing";
        break;
      case "decrease":
        res.status = "decreasing";
        break;
      case "random":
        res.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
        break;
    }
    const autoStatus = animationOptions.mode === "auto";
    switch (animationOptions.startValue) {
      case "min":
        res.value = res.min;
        if (autoStatus) {
          res.status = "increasing";
        }
        break;
      case "max":
        res.value = res.max;
        if (autoStatus) {
          res.status = "decreasing";
        }
        break;
      case "random":
      default:
        res.value = randomInRange(res);
        if (autoStatus) {
          res.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
        }
        break;
    }
  }
  res.initialValue = res.value;
  return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
  const isPercent = positionOrSize.mode === "percent";
  if (!isPercent) {
    const { mode: _, ...rest } = positionOrSize;
    return rest;
  }
  const isPosition = "x" in positionOrSize;
  if (isPosition) {
    return {
      x: positionOrSize.x / 100 * canvasSize.width,
      y: positionOrSize.y / 100 * canvasSize.height
    };
  } else {
    return {
      width: positionOrSize.width / 100 * canvasSize.width,
      height: positionOrSize.height / 100 * canvasSize.height
    };
  }
}
function getPosition(position, canvasSize) {
  return getPositionOrSize(position, canvasSize);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isString(arg) {
  return typeof arg === "string";
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
const randomColorValue = "random", midColorValue = "mid", colorManagers = /* @__PURE__ */ new Map();
function addColorManager(manager) {
  colorManagers.set(manager.key, manager);
}
function stringToRgba(input) {
  for (const [, manager] of colorManagers) {
    if (input.startsWith(manager.stringPrefix)) {
      return manager.parseString(input);
    }
  }
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
    return r + r + g + g + b + b + (a !== void 0 ? a + a : "");
  }), regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, result = regex.exec(hexFixed);
  return result ? {
    a: result[4] !== void 0 ? parseInt(result[4], 16) / 255 : 1,
    b: parseInt(result[3], 16),
    g: parseInt(result[2], 16),
    r: parseInt(result[1], 16)
  } : void 0;
}
function rangeColorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return colorToRgb(color.value, index, useIndex);
  }
  if (isArray(color.value)) {
    return rangeColorToRgb({
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const [, manager] of colorManagers) {
    const res = manager.handleRangeColor(color);
    if (res) {
      return res;
    }
  }
}
function colorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
  }
  if (isArray(color.value)) {
    return colorToRgb({
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const [, manager] of colorManagers) {
    const res = manager.handleColor(color);
    if (res) {
      return res;
    }
  }
}
function rangeColorToHsl(color, index, useIndex = true) {
  const rgb = rangeColorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : void 0;
}
function rgbToHsl(color) {
  const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
    h: 0,
    l: (max + min) * 0.5,
    s: 0
  };
  if (max !== min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2 + (b1 - r1) / (max - min) : 4 + (r1 - g1) / (max - min);
  }
  res.l *= 100;
  res.s *= 100;
  res.h *= 60;
  if (res.h < 0) {
    res.h += 360;
  }
  if (res.h >= 360) {
    res.h -= 360;
  }
  return res;
}
function stringToRgb(input) {
  return stringToRgba(input);
}
function hslToRgb(hsl) {
  const h = (hsl.h % 360 + 360) % 360, s = Math.max(0, Math.min(100, hsl.s)), l = Math.max(0, Math.min(100, hsl.l)), hNormalized = h / 360, sNormalized = s / 100, lNormalized = l / 100;
  if (s === 0) {
    const grayscaleValue = Math.round(lNormalized * 255);
    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }
  const channel = (temp12, temp22, temp3) => {
    if (temp3 < 0) {
      temp3 += 1;
    }
    if (temp3 > 1) {
      temp3 -= 1;
    }
    if (temp3 * 6 < 1) {
      return temp12 + (temp22 - temp12) * 6 * temp3;
    }
    if (temp3 * 2 < 1) {
      return temp22;
    }
    if (temp3 * 3 < 2) {
      return temp12 + (temp22 - temp12) * (2 / 3 - temp3) * 6;
    }
    return temp12;
  }, temp1 = lNormalized < 0.5 ? lNormalized * (1 + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized, temp2 = 2 * lNormalized - temp1, red = Math.min(255, 255 * channel(temp2, temp1, hNormalized + 1 / 3)), green = Math.min(255, 255 * channel(temp2, temp1, hNormalized)), blue = Math.min(255, 255 * channel(temp2, temp1, hNormalized - 1 / 3));
  return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function getRandomRgbColor(min) {
  const fixedMin = min ?? 0;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? 1})`;
}
function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? 1})`;
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1, rgb2 = color2;
  if (rgb1.r === void 0) {
    rgb1 = hslToRgb(color1);
  }
  if (rgb2.r === void 0) {
    rgb2 = hslToRgb(color2);
  }
  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function getLinkColor(p1, p2, linkColor) {
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(), destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor ?? destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(optColor, blink, consent) {
  const color = isString(optColor) ? optColor : optColor.value;
  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToRgb({
        value: color
      });
    }
    if (blink) {
      return randomColorValue;
    }
    return midColorValue;
  } else if (color === midColorValue) {
    return midColorValue;
  } else {
    return rangeColorToRgb({
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== void 0 ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : void 0;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };
  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }
  return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;
  if (colorValue.enable) {
    colorValue.velocity = getRangeValue(colorAnimation.speed) / 100 * reduceFactor;
    colorValue.decay = 1 - getRangeValue(colorAnimation.decay);
    colorValue.status = "increasing";
    colorValue.loops = 0;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    colorValue.time = 0;
    colorValue.delayTime = getRangeValue(colorAnimation.delay) * 1e3;
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
  } else {
    colorValue.velocity = 0;
  }
}
function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, 0, 0, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawParticle(data) {
  const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform } = data;
  const pos = particle.getPosition(), angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0), rotateData = {
    sin: Math.sin(angle),
    cos: Math.cos(angle)
  }, transformData = {
    a: rotateData.cos * (transform.a ?? 1),
    b: rotateData.sin * (transform.b ?? 1),
    c: -rotateData.sin * (transform.c ?? 1),
    d: rotateData.cos * (transform.d ?? 1)
  };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  const shadowColor = particle.shadowColor;
  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }
  if (colorStyles.fill) {
    context.fillStyle = colorStyles.fill;
  }
  const strokeWidth = particle.strokeWidth ?? 0;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  const drawData = { container, context, particle, radius, opacity, delta, transformData };
  context.beginPath();
  drawShape(drawData);
  if (particle.shapeClose) {
    context.closePath();
  }
  if (strokeWidth > 0) {
    context.stroke();
  }
  if (particle.shapeFill) {
    context.fill();
  }
  drawShapeAfterDraw(drawData);
  drawEffect(drawData);
  context.globalCompositeOperation = "source-over";
  context.setTransform(1, 0, 0, 1, 0, 0);
}
function drawEffect(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.effect) {
    return;
  }
  const drawer = container.effectDrawers.get(particle.effect);
  if (!drawer) {
    return;
  }
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawShape(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawShapeAfterDraw(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer || !drawer.afterDraw) {
    return;
  }
  drawer.afterDraw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }
  plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }
  plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === "darken" ? -1 : 1) * value
  };
}
function setTransformValue(factor, newFactor, key) {
  const newValue = newFactor[key];
  if (newValue !== void 0) {
    factor[key] = (factor[key] ?? 1) * newValue;
  }
}
class Canvas {
  constructor(container) {
    this.container = container;
    this._applyPostDrawUpdaters = (particle) => {
      for (const updater of this._postDrawUpdaters) {
        updater.afterDraw && updater.afterDraw(particle);
      }
    };
    this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
      for (const updater of this._preDrawUpdaters) {
        if (updater.getColorStyles) {
          const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
          if (fill) {
            colorStyles.fill = fill;
          }
          if (stroke) {
            colorStyles.stroke = stroke;
          }
        }
        if (updater.getTransformValues) {
          const updaterTransform = updater.getTransformValues(particle);
          for (const key in updaterTransform) {
            setTransformValue(transform, updaterTransform, key);
          }
        }
        updater.beforeDraw && updater.beforeDraw(particle);
      }
    };
    this._applyResizePlugins = () => {
      for (const plugin of this._resizePlugins) {
        plugin.resize && plugin.resize();
      }
    };
    this._getPluginParticleColors = (particle) => {
      let fColor, sColor;
      for (const plugin of this._colorPlugins) {
        if (!fColor && plugin.particleFillColor) {
          fColor = rangeColorToHsl(plugin.particleFillColor(particle));
        }
        if (!sColor && plugin.particleStrokeColor) {
          sColor = rangeColorToHsl(plugin.particleStrokeColor(particle));
        }
        if (fColor && sColor) {
          break;
        }
      }
      return [fColor, sColor];
    };
    this._initCover = () => {
      const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = rangeColorToRgb(color);
      if (coverRgb) {
        const coverColor = {
          ...coverRgb,
          a: cover.opacity
        };
        this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
      }
    };
    this._initStyle = () => {
      const element = this.element, options = this.container.actualOptions;
      if (!element) {
        return;
      }
      if (this._fullScreen) {
        this._originalStyle = deepExtend({}, element.style);
        this._setFullScreenStyle();
      } else {
        this._resetOriginalStyle();
      }
      for (const key in options.style) {
        if (!key || !options.style) {
          continue;
        }
        const value = options.style[key];
        if (!value) {
          continue;
        }
        element.style.setProperty(key, value, "important");
      }
    };
    this._initTrail = async () => {
      const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = trail.fill;
      if (!trail.enable) {
        return;
      }
      if (trailFill.color) {
        const fillColor = rangeColorToRgb(trailFill.color);
        if (!fillColor) {
          return;
        }
        const trail2 = options.particles.move.trail;
        this._trailFill = {
          color: {
            ...fillColor
          },
          opacity: 1 / trail2.length
        };
      } else {
        await new Promise((resolve, reject) => {
          if (!trailFill.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._trailFill = {
              image: img,
              opacity: 1 / trail.length
            };
            resolve();
          });
          img.addEventListener("error", (evt) => {
            reject(evt.error);
          });
          img.src = trailFill.image;
        });
      }
    };
    this._paintBase = (baseColor) => {
      this.draw((ctx) => paintBase(ctx, this.size, baseColor));
    };
    this._paintImage = (image, opacity) => {
      this.draw((ctx) => paintImage(ctx, this.size, image, opacity));
    };
    this._repairStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      this._safeMutationObserver((observer) => observer.disconnect());
      this._initStyle();
      this.initBackground();
      this._safeMutationObserver((observer) => observer.observe(element, { attributes: true }));
    };
    this._resetOriginalStyle = () => {
      const element = this.element, originalStyle = this._originalStyle;
      if (!(element && originalStyle)) {
        return;
      }
      const style = element.style;
      style.position = originalStyle.position;
      style.zIndex = originalStyle.zIndex;
      style.top = originalStyle.top;
      style.left = originalStyle.left;
      style.width = originalStyle.width;
      style.height = originalStyle.height;
    };
    this._safeMutationObserver = (callback) => {
      if (!this._mutationObserver) {
        return;
      }
      callback(this._mutationObserver);
    };
    this._setFullScreenStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      const priority = "important", style = element.style;
      style.setProperty("position", "fixed", priority);
      style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
      style.setProperty("top", "0", priority);
      style.setProperty("left", "0", priority);
      style.setProperty("width", "100%", priority);
      style.setProperty("height", "100%", priority);
    };
    this.size = {
      height: 0,
      width: 0
    };
    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = this._trailFill;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else if (options.clear) {
      this.draw((ctx) => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    this.stop();
    if (this._generated) {
      const element = this.element;
      element && element.remove();
    } else {
      this._resetOriginalStyle();
    }
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    const ctx = this._context;
    if (!ctx) {
      return;
    }
    return cb(ctx);
  }
  drawParticle(particle, delta) {
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const radius = particle.getRadius();
    if (radius <= 0) {
      return;
    }
    const pfColor = particle.getFillColor(), psColor = particle.getStrokeColor() ?? pfColor;
    let [fColor, sColor] = this._getPluginParticleColors(particle);
    if (!fColor) {
      fColor = pfColor;
    }
    if (!sColor) {
      sColor = psColor;
    }
    if (!fColor && !sColor) {
      return;
    }
    this.draw((ctx) => {
      const container = this.container, options = container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1, strokeOpacity = particle.strokeOpacity ?? opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
        fill: fColor ? getStyleFromHsl(fColor, zOpacity) : void 0
      };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw((ctx) => drawParticlePlugin(ctx, plugin, particle, delta));
  }
  drawPlugin(plugin, delta) {
    this.draw((ctx) => drawPlugin(ctx, plugin, delta));
  }
  async init() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = safeMutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });
    this.resize();
    this._initStyle();
    this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
    this.initBackground();
    this._safeMutationObserver((obs) => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  initBackground() {
    const options = this.container.actualOptions, background = options.background, element = this.element;
    if (!element) {
      return;
    }
    const elementStyle = element.style;
    if (!elementStyle) {
      return;
    }
    if (background.color) {
      const color = rangeColorToRgb(background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }
    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }
  initPlugins() {
    this._resizePlugins = [];
    for (const [, plugin] of this.container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
      if (plugin.particleFillColor || plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }
    }
  }
  initUpdaters() {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }
      if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    if (this._generated && this.element) {
      this.element.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this._context = this.element.getContext("2d");
    this._safeMutationObserver((obs) => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
    this.container.retina.init();
    this.initBackground();
  }
  paint() {
    const options = this.container.actualOptions;
    this.draw((ctx) => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        this._paintBase(this._coverColorStyle);
      } else {
        this._paintBase();
      }
    });
  }
  resize() {
    if (!this.element) {
      return false;
    }
    const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
      width: this.element.offsetWidth * pxRatio,
      height: this.element.offsetHeight * pxRatio
    };
    if (newSize.height === size.height && newSize.width === size.width && newSize.height === this.element.height && newSize.width === this.element.width) {
      return false;
    }
    const oldSize = { ...size };
    this.element.width = size.width = this.element.offsetWidth * pxRatio;
    this.element.height = size.height = this.element.offsetHeight * pxRatio;
    if (this.container.started) {
      container.particles.setResizeFactor({
        width: size.width / oldSize.width,
        height: size.height / oldSize.height
      });
    }
    return true;
  }
  stop() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = void 0;
    this.draw((ctx) => clear(ctx, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize()) {
      return;
    }
    const container = this.container, needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
}
function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = { passive: true };
    if (isBoolean(options)) {
      addOptions.capture = options;
    } else if (options !== void 0) {
      addOptions = options;
    }
    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}
class EventListeners {
  constructor(container) {
    this.container = container;
    this._doMouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions;
      if (this._canPush) {
        const mouseInteractivity = container2.interactivity.mouse, mousePos = mouseInteractivity.position;
        if (!mousePos) {
          return;
        }
        mouseInteractivity.clickPosition = { ...mousePos };
        mouseInteractivity.clickTime = (/* @__PURE__ */ new Date()).getTime();
        const onClick = options.interactivity.events.onClick;
        executeOnSingleOrMultiple(onClick.mode, (mode) => this.container.handleClickMode(mode));
      }
      if (e.type === "touchend") {
        setTimeout(() => this._mouseTouchFinish(), 500);
      }
    };
    this._handleThemeChange = (e) => {
      const mediaEvent = e, container2 = this.container, options = container2.options, defaultThemes = options.defaultThemes, themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light, theme = options.themes.find((theme2) => theme2.name === themeName);
      if (theme && theme.default.auto) {
        container2.loadTheme(themeName);
      }
    };
    this._handleVisibilityChange = () => {
      const container2 = this.container, options = container2.actualOptions;
      this._mouseTouchFinish();
      if (!options.pauseOnBlur) {
        return;
      }
      if (document && document.hidden) {
        container2.pageHidden = true;
        container2.pause();
      } else {
        container2.pageHidden = false;
        if (container2.getAnimationStatus()) {
          container2.play(true);
        } else {
          container2.draw(true);
        }
      }
    };
    this._handleWindowResize = async () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      this._resizeTimeout = setTimeout(async () => {
        const canvas = this.container.canvas;
        canvas && await canvas.windowResize();
      }, this.container.actualOptions.interactivity.events.resize.delay * 1e3);
    };
    this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions;
      const interactivityEl = container2.interactivity.element;
      if (!interactivityEl) {
        return;
      }
      const html = interactivityEl, canvasEl = container2.canvas.element;
      if (canvasEl) {
        canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
      }
      if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
        return;
      }
      manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
      manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
      manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      }
      manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
      manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };
    this._manageListeners = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions, detectType = options.interactivity.detectsOn, canvasEl = container2.canvas.element;
      let mouseLeaveTmpEvent = mouseLeaveEvent;
      if (detectType === "window") {
        container2.interactivity.element = window;
        mouseLeaveTmpEvent = mouseOutEvent;
      } else if (detectType === "parent" && canvasEl) {
        container2.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
      } else {
        container2.interactivity.element = canvasEl;
      }
      this._manageMediaMatch(add);
      this._manageResize(add);
      this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
      if (document) {
        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
      }
    };
    this._manageMediaMatch = (add) => {
      const handlers = this._handlers, mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
      if (!mediaMatch) {
        return;
      }
      if (mediaMatch.addEventListener !== void 0) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
        return;
      }
      if (mediaMatch.addListener === void 0) {
        return;
      }
      if (add) {
        mediaMatch.addListener(handlers.oldThemeChange);
      } else {
        mediaMatch.removeListener(handlers.oldThemeChange);
      }
    };
    this._manageResize = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.events.resize) {
        return;
      }
      if (typeof ResizeObserver === "undefined") {
        manageListener(window, resizeEvent, handlers.resize, add);
        return;
      }
      const canvasEl = container2.canvas.element;
      if (this._resizeObserver && !add) {
        if (canvasEl) {
          this._resizeObserver.unobserve(canvasEl);
        }
        this._resizeObserver.disconnect();
        delete this._resizeObserver;
      } else if (!this._resizeObserver && add && canvasEl) {
        this._resizeObserver = new ResizeObserver(async (entries) => {
          const entry = entries.find((e) => e.target === canvasEl);
          if (!entry) {
            return;
          }
          await this._handleWindowResize();
        });
        this._resizeObserver.observe(canvasEl);
      }
    };
    this._mouseDown = () => {
      const { interactivity } = this.container;
      if (!interactivity) {
        return;
      }
      const { mouse } = interactivity;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    };
    this._mouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions, { mouse } = container2.interactivity;
      mouse.inside = true;
      let handled = false;
      const mousePosition = mouse.position;
      if (!mousePosition || !options.interactivity.events.onClick.enable) {
        return;
      }
      for (const [, plugin] of container2.plugins) {
        if (!plugin.clickPositionValid) {
          continue;
        }
        handled = plugin.clickPositionValid(mousePosition);
        if (handled) {
          break;
        }
      }
      if (!handled) {
        this._doMouseTouchClick(e);
      }
      mouse.clicking = false;
    };
    this._mouseTouchFinish = () => {
      const interactivity = this.container.interactivity;
      if (!interactivity) {
        return;
      }
      const mouse = interactivity.mouse;
      delete mouse.position;
      delete mouse.clickPosition;
      delete mouse.downPosition;
      interactivity.status = mouseLeaveEvent;
      mouse.inside = false;
      mouse.clicking = false;
    };
    this._mouseTouchMove = (e) => {
      const container2 = this.container, options = container2.actualOptions, interactivity = container2.interactivity, canvasEl = container2.canvas.element;
      if (!interactivity || !interactivity.element) {
        return;
      }
      interactivity.mouse.inside = true;
      let pos;
      if (e.type.startsWith("pointer")) {
        this._canPush = true;
        const mouseEvent = e;
        if (interactivity.element === window) {
          if (canvasEl) {
            const clientRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.clientX - clientRect.left,
              y: mouseEvent.clientY - clientRect.top
            };
          }
        } else if (options.interactivity.detectsOn === "parent") {
          const source = mouseEvent.target, target = mouseEvent.currentTarget;
          if (source && target && canvasEl) {
            const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
              y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
            };
          } else {
            pos = {
              x: mouseEvent.offsetX ?? mouseEvent.clientX,
              y: mouseEvent.offsetY ?? mouseEvent.clientY
            };
          }
        } else if (mouseEvent.target === canvasEl) {
          pos = {
            x: mouseEvent.offsetX ?? mouseEvent.clientX,
            y: mouseEvent.offsetY ?? mouseEvent.clientY
          };
        }
      } else {
        this._canPush = e.type !== "touchmove";
        if (canvasEl) {
          const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - 1], canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: lastTouch.clientX - (canvasRect.left ?? 0),
            y: lastTouch.clientY - (canvasRect.top ?? 0)
          };
        }
      }
      const pxRatio = container2.retina.pixelRatio;
      if (pos) {
        pos.x *= pxRatio;
        pos.y *= pxRatio;
      }
      interactivity.mouse.position = pos;
      interactivity.status = mouseMoveEvent;
    };
    this._touchEnd = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchFinish();
    };
    this._touchEndClick = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchClick(e);
    };
    this._touchStart = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.set(touch.identifier, performance.now());
      }
      this._mouseTouchMove(e);
    };
    this._canPush = true;
    this._touches = /* @__PURE__ */ new Map();
    this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: (e) => this._mouseTouchMove(e),
      mouseUp: (e) => this._mouseTouchClick(e),
      touchStart: (e) => this._touchStart(e),
      touchMove: (e) => this._mouseTouchMove(e),
      touchEnd: (e) => this._touchEnd(e),
      touchCancel: (e) => this._touchEnd(e),
      touchEndClick: (e) => this._touchEndClick(e),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: (e) => this._handleThemeChange(e),
      oldThemeChange: (e) => this._handleThemeChange(e),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(true);
  }
  removeListeners() {
    this._manageListeners(false);
  }
}
class OptionsColor {
  constructor() {
    this.value = "";
  }
  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);
    if (data !== void 0) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    if (data?.value === void 0) {
      return;
    }
    this.value = data.value;
  }
}
let Background$1 = class Background {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.position !== void 0) {
      this.position = data.position;
    }
    if (data.repeat !== void 0) {
      this.repeat = data.repeat;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
class BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.composite !== void 0) {
      this.composite = data.composite;
    }
    if (data.cover !== void 0) {
      const cover = data.cover, color = isString(data.cover) ? { color: data.cover } : data.cover;
      this.cover.load(cover.color !== void 0 ? cover : { color });
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
}
class FullScreen {
  constructor() {
    this.enable = true;
    this.zIndex = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.zIndex !== void 0) {
      this.zIndex = data.zIndex;
    }
  }
}
class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
  }
}
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.force !== void 0) {
      this.force = data.force;
    }
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
  }
}
class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.parallax.load(data.parallax);
  }
}
class ResizeEvent {
  constructor() {
    this.delay = 0.5;
    this.enable = true;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
}
class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.onClick.load(data.onClick);
    const onDiv = data.onDiv;
    if (onDiv !== void 0) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load(data.onHover);
    this.resize.load(data.resize);
  }
}
class Modes {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (!this._container) {
      return;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (!interactors) {
      return;
    }
    for (const interactor of interactors) {
      if (!interactor.loadModeOptions) {
        continue;
      }
      interactor.loadModeOptions(this, data);
    }
  }
}
class Interactivity {
  constructor(engine, container) {
    this.detectsOn = "window";
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  load(data) {
    if (!data) {
      return;
    }
    const detectsOn = data.detectsOn;
    if (detectsOn !== void 0) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
  }
}
class ManualParticle {
  load(data) {
    if (!data) {
      return;
    }
    if (data.position) {
      this.position = {
        x: data.position.x ?? 50,
        y: data.position.y ?? 50,
        mode: data.position.mode ?? "percent"
      };
    }
    if (data.options) {
      this.options = deepExtend({}, data.options);
    }
  }
}
class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = "canvas";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.maxWidth !== void 0) {
      this.maxWidth = data.maxWidth;
    }
    if (data.mode !== void 0) {
      if (data.mode === "screen") {
        this.mode = "screen";
      } else {
        this.mode = "canvas";
      }
    }
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
}
class ThemeDefault {
  constructor() {
    this.auto = false;
    this.mode = "any";
    this.value = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.auto !== void 0) {
      this.auto = data.auto;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    this.default.load(data.default);
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
}
class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
}
class RangedAnimationOptions extends AnimationOptions {
  constructor() {
    super();
    this.mode = "auto";
    this.startValue = "random";
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
  }
}
class ColorAnimation extends AnimationOptions {
  constructor() {
    super();
    this.offset = 0;
    this.sync = true;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
  }
}
class HslAnimation {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
}
class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);
    if (data !== void 0) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const colorAnimation = data.animation;
    if (colorAnimation !== void 0) {
      if (colorAnimation.enable !== void 0) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }
}
class CollisionsAbsorb {
  constructor() {
    this.speed = 2;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
}
class CollisionsOverlap {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.retries !== void 0) {
      this.retries = data.retries;
    }
  }
}
class ValueWithRandom {
  constructor() {
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
}
class AnimationValueWithRandom extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
}
class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new RangedAnimationOptions();
  }
  load(data) {
    super.load(data);
  }
}
class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 1;
  }
}
class ParticlesBounce {
  constructor() {
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
}
class Collisions {
  constructor() {
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.maxSpeed = 50;
    this.mode = "bounce";
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.absorb.load(data.absorb);
    this.bounce.load(data.bounce);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
}
class Effect {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const effect in options) {
        const item = options[effect];
        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class MoveAngle {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
}
class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3e3,
      y: 3e3
    };
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.rotate) {
      const rotateX = data.rotate.x;
      if (rotateX !== void 0) {
        this.rotate.x = rotateX;
      }
      const rotateY = data.rotate.y;
      if (rotateY !== void 0) {
        this.rotate.y = rotateY;
      }
    }
  }
}
class MoveCenter {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.mode = "percent";
    this.radius = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.x !== void 0) {
      this.x = data.x;
    }
    if (data.y !== void 0) {
      this.y = data.y;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
}
class MoveGravity {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.inverse !== void 0) {
      this.inverse = data.inverse;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
  }
}
class MovePath {
  constructor() {
    this.clamp = true;
    this.delay = new ValueWithRandom();
    this.enable = false;
    this.options = {};
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.clamp !== void 0) {
      this.clamp = data.clamp;
    }
    this.delay.load(data.delay);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.generator = data.generator;
    if (data.options) {
      this.options = deepExtend(this.options, data.options);
    }
  }
}
class MoveTrailFill {
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
  }
}
class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.fill !== void 0) {
      this.fill.load(data.fill);
    }
    if (data.length !== void 0) {
      this.length = data.length;
    }
  }
}
class OutModes {
  constructor() {
    this.default = "out";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
}
class Spin {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.position) {
      this.position = deepExtend({}, data.position);
    }
  }
}
class Move {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new MoveAttract();
    this.center = new MoveCenter();
    this.decay = 0;
    this.distance = {};
    this.direction = "none";
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity();
    this.path = new MovePath();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new MoveTrail();
    this.vibrate = false;
    this.warp = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);
    this.attract.load(data.attract);
    this.center.load(data.center);
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.distance !== void 0) {
      this.distance = isNumber(data.distance) ? {
        horizontal: data.distance,
        vertical: data.distance
      } : { ...data.distance };
    }
    if (data.drift !== void 0) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = data.outModes;
    if (outModes !== void 0) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
      }
    }
    this.path.load(data.path);
    if (data.random !== void 0) {
      this.random = data.random;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    this.spin.load(data.spin);
    if (data.straight !== void 0) {
      this.straight = data.straight;
    }
    this.trail.load(data.trail);
    if (data.vibrate !== void 0) {
      this.vibrate = data.vibrate;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
}
class OpacityAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 2;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
}
class Opacity extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.value = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
}
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    const width = data.width;
    if (width !== void 0) {
      this.width = width;
    }
    const height = data.height;
    if (height !== void 0) {
      this.height = height;
    }
  }
}
class ParticlesNumberLimit {
  constructor() {
    this.mode = "delete";
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.density.load(data.density);
    this.limit.load(data.limit);
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.offset === void 0) {
      return;
    }
    if (data.offset.x !== void 0) {
      this.offset.x = data.offset.x;
    }
    if (data.offset.y !== void 0) {
      this.offset.y = data.offset.y;
    }
  }
}
class Shape {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = "circle";
  }
  load(data) {
    if (!data) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class SizeAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 5;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
}
class Size extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.value = 3;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
}
class Stroke {
  constructor() {
    this.width = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = AnimatableColor.create(this.color, data.color);
    }
    if (data.width !== void 0) {
      this.width = setRangeValue(data.width);
    }
    if (data.opacity !== void 0) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
class ZIndex extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.opacityRate !== void 0) {
      this.opacityRate = data.opacityRate;
    }
    if (data.sizeRate !== void 0) {
      this.sizeRate = data.sizeRate;
    }
    if (data.velocityRate !== void 0) {
      this.velocityRate = data.velocityRate;
    }
  }
}
class ParticlesOptions {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.effect = new Effect();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.zIndex = new ZIndex();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.groups !== void 0) {
      for (const group of Object.keys(data.groups)) {
        if (!Object.hasOwn(data.groups, group)) {
          continue;
        }
        const item = data.groups[group];
        if (item !== void 0) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
        }
      }
    }
    if (data.reduceDuplicates !== void 0) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.effect.load(data.effect);
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    this.collisions.load(data.collisions);
    if (data.interactivity !== void 0) {
      this.interactivity = deepExtend({}, data.interactivity);
    }
    const strokeToLoad = data.stroke;
    if (strokeToLoad) {
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, (t) => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.interactors.get(this._container);
      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadParticlesOptions) {
            interactor.loadParticlesOptions(this, data);
          }
        }
      }
    }
  }
}
function loadOptions(options, ...sourceOptionsArr) {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
  const options = new ParticlesOptions(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
class Options {
  constructor(engine, container) {
    this._findDefaultTheme = (mode) => {
      return this.themes.find((theme) => theme.default.value && theme.default.mode === mode) ?? this.themes.find((theme) => theme.default.value && theme.default.mode === "any");
    };
    this._importPreset = (preset) => {
      this.load(this._engine.getPreset(preset));
    };
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background$1();
    this.backgroundMask = new BackgroundMask();
    this.clear = true;
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.particles = loadParticlesOptions(this._engine, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.smooth = false;
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.preset !== void 0) {
      executeOnSingleOrMultiple(data.preset, (preset) => this._importPreset(preset));
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    if (data.clear !== void 0) {
      this.clear = data.clear;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = data.detectRetina;
    if (detectRetina !== void 0) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== void 0) {
      this.duration = setRangeValue(data.duration);
    }
    const fpsLimit = data.fpsLimit;
    if (fpsLimit !== void 0) {
      this.fpsLimit = fpsLimit;
    }
    if (data.pauseOnBlur !== void 0) {
      this.pauseOnBlur = data.pauseOnBlur;
    }
    if (data.pauseOnOutsideViewport !== void 0) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }
    if (data.zLayers !== void 0) {
      this.zLayers = data.zLayers;
    }
    this.background.load(data.background);
    const fullScreen = data.fullScreen;
    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles) {
      this.manualParticles = data.manualParticles.map((t) => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.loadOptions(this, data);
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (interactors) {
      for (const interactor of interactors) {
        if (interactor.loadOptions) {
          interactor.loadOptions(this, data);
        }
      }
    }
    if (data.responsive !== void 0) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }
    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
    if (data.themes !== void 0) {
      for (const theme of data.themes) {
        const existingTheme = this.themes.find((t) => t.name === theme.name);
        if (!existingTheme) {
          const optTheme = new Theme();
          optTheme.load(theme);
          this.themes.push(optTheme);
        } else {
          existingTheme.load(theme);
        }
      }
    }
    this.defaultThemes.dark = this._findDefaultTheme("dark")?.name;
    this.defaultThemes.light = this._findDefaultTheme("light")?.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find((t) => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions?.options);
    return responsiveOptions?.maxWidth;
  }
  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find((theme) => theme.name === name);
      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? "dark" : "light");
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
}
class InteractionManager {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = engine.getInteractors(this.container, true);
    this._externalInteractors = [];
    this._particleInteractors = [];
  }
  async externalInteract(delta) {
    for (const interactor of this._externalInteractors) {
      interactor.isEnabled() && await interactor.interact(delta);
    }
  }
  handleClickMode(mode) {
    for (const interactor of this._externalInteractors) {
      interactor.handleClickMode && interactor.handleClickMode(mode);
    }
  }
  init() {
    this._externalInteractors = [];
    this._particleInteractors = [];
    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case "external":
          this._externalInteractors.push(interactor);
          break;
        case "particles":
          this._particleInteractors.push(interactor);
          break;
      }
      interactor.init();
    }
  }
  async particlesInteract(particle, delta) {
    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }
    for (const interactor of this._particleInteractors) {
      interactor.isEnabled(particle) && await interactor.interact(particle, delta);
    }
  }
  async reset(particle) {
    for (const interactor of this._externalInteractors) {
      interactor.isEnabled() && interactor.reset(particle);
    }
    for (const interactor of this._particleInteractors) {
      interactor.isEnabled(particle) && interactor.reset(particle);
    }
  }
}
function loadEffectData(effect, effectOptions, id, reduceDuplicates) {
  const effectData = effectOptions.options[effect];
  if (!effectData) {
    return;
  }
  return deepExtend({
    close: effectOptions.close,
    fill: effectOptions.fill
  }, itemFromSingleOrMultiple(effectData, id, reduceDuplicates));
}
function loadShapeData(shape, shapeOptions, id, reduceDuplicates) {
  const shapeData = shapeOptions.options[shape];
  if (!shapeData) {
    return;
  }
  return deepExtend({
    close: shapeOptions.close,
    fill: shapeOptions.fill
  }, itemFromSingleOrMultiple(shapeData, id, reduceDuplicates));
}
function fixOutMode(data) {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }
  const diameter = data.radius * 2;
  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
}
class Particle {
  constructor(engine, id, container, position, overrideOptions, group) {
    this.container = container;
    this._calcPosition = (container2, position2, zIndex, tryCount = 0) => {
      for (const [, plugin] of container2.plugins) {
        const pluginPos = plugin.particlePosition !== void 0 ? plugin.particlePosition(position2, this) : void 0;
        if (pluginPos) {
          return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
        }
      }
      const canvasSize = container2.canvas.size, exactPosition = calcExactPositionOrRandomFromSize({
        size: canvasSize,
        position: position2
      }), pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: ["bounce", "bounce-horizontal"],
          coord: pos.x,
          maxCoord: container2.canvas.size.width,
          setCb: (value) => pos.x += value,
          radius
        });
      }, fixVertical = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: ["bounce", "bounce-vertical"],
          coord: pos.y,
          maxCoord: container2.canvas.size.height,
          setCb: (value) => pos.y += value,
          radius
        });
      };
      fixHorizontal(outModes.left ?? outModes.default);
      fixHorizontal(outModes.right ?? outModes.default);
      fixVertical(outModes.top ?? outModes.default);
      fixVertical(outModes.bottom ?? outModes.default);
      if (this._checkOverlap(pos, tryCount)) {
        return this._calcPosition(container2, void 0, zIndex, tryCount + 1);
      }
      return pos;
    };
    this._calculateVelocity = () => {
      const baseVelocity = getParticleBaseVelocity(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
      if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
        return res;
      }
      const rad = Math.PI / 180 * getRangeValue(moveOptions.angle.value), radOffset = Math.PI / 180 * getRangeValue(moveOptions.angle.offset), range = {
        left: radOffset - rad * 0.5,
        right: radOffset + rad * 0.5
      };
      if (!moveOptions.straight) {
        res.angle += randomInRange(setRangeValue(range.left, range.right));
      }
      if (moveOptions.random && typeof moveOptions.speed === "number") {
        res.length *= getRandom();
      }
      return res;
    };
    this._checkOverlap = (pos, tryCount = 0) => {
      const collisionsOptions = this.options.collisions, radius = this.getRadius();
      if (!collisionsOptions.enable) {
        return false;
      }
      const overlapOptions = collisionsOptions.overlap;
      if (overlapOptions.enable) {
        return false;
      }
      const retries = overlapOptions.retries;
      if (retries >= 0 && tryCount > retries) {
        throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
      }
      return !!this.container.particles.find((particle) => getDistance(pos, particle.position) < radius + particle.getRadius());
    };
    this._getRollColor = (color) => {
      if (!color || !this.roll || !this.backColor && !this.roll.alter) {
        return color;
      }
      const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1, backSum = this.roll.horizontal ? Math.PI * 0.5 : 0, rolled = Math.floor(((this.roll.angle ?? 0) + backSum) / (Math.PI / backFactor)) % 2;
      if (!rolled) {
        return color;
      }
      if (this.backColor) {
        return this.backColor;
      }
      if (this.roll.alter) {
        return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
      }
      return color;
    };
    this._initPosition = (position2) => {
      const container2 = this.container, zIndexValue = getRangeValue(this.options.zIndex.value);
      this.position = this._calcPosition(container2, position2, clamp(zIndexValue, 0, container2.zLayers));
      this.initialPosition = this.position.copy();
      const canvasSize = container2.canvas.size;
      this.moveCenter = {
        ...getPosition(this.options.move.center, canvasSize),
        radius: this.options.move.center.radius ?? 0,
        mode: this.options.move.center.mode ?? "percent"
      };
      this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
      switch (this.options.move.direction) {
        case "inside":
          this.outType = "inside";
          break;
        case "outside":
          this.outType = "outside";
          break;
      }
      this.offset = Vector.origin;
    };
    this._engine = engine;
    this.init(id, position, overrideOptions, group);
  }
  destroy(override) {
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    const container = this.container, pathGenerator = this.pathGenerator, shapeDrawer = container.shapeDrawers.get(this.shape);
    shapeDrawer && shapeDrawer.particleDestroy && shapeDrawer.particleDestroy(this);
    for (const [, plugin] of container.plugins) {
      plugin.particleDestroyed && plugin.particleDestroyed(this, override);
    }
    for (const updater of container.particles.updaters) {
      updater.particleDestroyed && updater.particleDestroyed(this, override);
    }
    pathGenerator && pathGenerator.reset(this);
    this._engine.dispatchEvent("particleDestroyed", {
      container: this.container,
      data: {
        particle: this
      }
    });
  }
  draw(delta) {
    const container = this.container, canvas = container.canvas;
    for (const [, plugin] of container.plugins) {
      canvas.drawParticlePlugin(plugin, this, delta);
    }
    canvas.drawParticle(this, delta);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
  }
  getMass() {
    return this.getRadius() ** 2 * Math.PI * 0.5;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    const container = this.container, engine = this._engine;
    this.id = id;
    this.group = group;
    this.effectClose = true;
    this.effectFill = true;
    this.shapeClose = true;
    this.shapeFill = true;
    this.pathRotation = false;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = "normal";
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles), effectType = particlesOptions.effect.type, shapeType = particlesOptions.shape.type, { reduceDuplicates } = particlesOptions;
    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const effectOptions = particlesOptions.effect, shapeOptions = particlesOptions.shape;
    if (overrideOptions) {
      if (overrideOptions.effect && overrideOptions.effect.type) {
        const overrideEffectType = overrideOptions.effect.type, effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);
        if (effect) {
          this.effect = effect;
          effectOptions.load(overrideOptions.effect);
        }
      }
      if (overrideOptions.shape && overrideOptions.shape.type) {
        const overrideShapeType = overrideOptions.shape.type, shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
        if (shape) {
          this.shape = shape;
          shapeOptions.load(overrideOptions.shape);
        }
      }
    }
    this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
    this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);
    particlesOptions.load(overrideOptions);
    const effectData = this.effectData;
    if (effectData) {
      particlesOptions.load(effectData.particles);
    }
    const shapeData = this.shapeData;
    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }
    const interactivity = new Interactivity(engine, container);
    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(particlesOptions.interactivity);
    this.interactivity = interactivity;
    this.effectFill = effectData?.fill ?? particlesOptions.effect.fill;
    this.effectClose = effectData?.close ?? particlesOptions.effect.close;
    this.shapeFill = shapeData?.fill ?? particlesOptions.shape.fill;
    this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getRangeValue(pathOptions.delay.value) * 1e3;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    container.retina.initParticle(this);
    this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this._initPosition(position);
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = 1 - getRangeValue(this.options.move.decay);
    const particles = container.particles;
    particles.setLastZIndex(this.position.z);
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let effectDrawer = container.effectDrawers.get(this.effect);
    if (!effectDrawer) {
      effectDrawer = this._engine.getEffectDrawer(this.effect);
      if (effectDrawer) {
        container.effectDrawers.set(this.effect, effectDrawer);
      }
    }
    if (effectDrawer && effectDrawer.loadEffect) {
      effectDrawer.loadEffect(this);
    }
    let shapeDrawer = container.shapeDrawers.get(this.shape);
    if (!shapeDrawer) {
      shapeDrawer = this._engine.getShapeDrawer(this.shape);
      if (shapeDrawer) {
        container.shapeDrawers.set(this.shape, shapeDrawer);
      }
    }
    if (shapeDrawer && shapeDrawer.loadShape) {
      shapeDrawer.loadShape(this);
    }
    const sideCountFunc = shapeDrawer?.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.spawning = false;
    this.shadowColor = rangeColorToRgb(this.options.shadow.color);
    for (const updater of particles.updaters) {
      updater.init(this);
    }
    for (const mover of particles.movers) {
      mover.init && mover.init(this);
    }
    if (effectDrawer && effectDrawer.particleInit) {
      effectDrawer.particleInit(container, this);
    }
    if (shapeDrawer && shapeDrawer.particleInit) {
      shapeDrawer.particleInit(container, this);
    }
    for (const [, plugin] of container.plugins) {
      plugin.particleCreated && plugin.particleCreated(this);
    }
  }
  isInsideCanvas() {
    const radius = this.getRadius(), canvasSize = this.container.canvas.size, position = this.position;
    return position.x >= -radius && position.y >= -radius && position.y <= canvasSize.height + radius && position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    for (const updater of this.container.particles.updaters) {
      updater.reset && updater.reset(this);
    }
  }
}
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
}
class Range {
  constructor(x, y) {
    this.position = {
      x,
      y
    };
  }
}
class Rectangle extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height,
      width
    };
  }
  contains(point) {
    const w = this.size.width, h = this.size.height, pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  intersects(range) {
    if (range instanceof Circle) {
      range.intersects(this);
    }
    const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }
}
class Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
    if (range instanceof Circle) {
      const rSum = r + range.radius, dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);
      return rSum > dist;
    } else if (range instanceof Rectangle) {
      const { width, height } = range.size, edges = Math.pow(distPos.x - width, 2) + Math.pow(distPos.y - height, 2);
      return edges <= r ** 2 || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;
    }
    return false;
  }
}
class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._subdivide = () => {
      const { x, y } = this.rectangle.position, { width, height } = this.rectangle.size, { capacity: capacity2 } = this;
      for (let i = 0; i < 4; i++) {
        this._subs.push(new QuadTree(new Rectangle(x + width * 0.5 * (i % 2), y + height * 0.5 * (Math.round(i * 0.5) - i % 2), width * 0.5, height * 0.5), capacity2));
      }
      this._divided = true;
    };
    this._points = [];
    this._divided = false;
    this._subs = [];
  }
  insert(point) {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this._subdivide();
    }
    return this._subs.some((sub) => sub.insert(point));
  }
  query(range, check, found) {
    const res = found || [];
    if (!range.intersects(this.rectangle)) {
      return [];
    }
    for (const p of this._points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
        continue;
      }
      res.push(p.particle);
    }
    if (this._divided) {
      for (const sub of this._subs) {
        sub.query(range, check, res);
      }
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
}
const qTreeCapacity = 4;
const qTreeRectangle = (canvasSize) => {
  const { height, width } = canvasSize, posOffset = -0.25, sizeFactor = 1.5;
  return new Rectangle(posOffset * width, posOffset * height, sizeFactor * width, sizeFactor * height);
};
let Particles$1 = class Particles {
  constructor(engine, container) {
    this._addToPool = (...particles) => {
      for (const particle of particles) {
        this._pool.push(particle);
      }
    };
    this._applyDensity = (options, manualCount, group) => {
      const numberOptions = options.number;
      if (!options.number.density?.enable) {
        if (group === void 0) {
          this._limit = numberOptions.limit.value;
        } else if (numberOptions.limit) {
          this._groupLimits.set(group, numberOptions.limit.value);
        }
        return;
      }
      const densityFactor = this._initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit.value > 0 ? numberOptions.limit.value : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.filter((t) => t.group === group).length);
      if (group === void 0) {
        this._limit = numberOptions.limit.value * densityFactor;
      } else {
        this._groupLimits.set(group, numberOptions.limit.value * densityFactor);
      }
      if (particlesCount < particlesNumber) {
        this.push(Math.abs(particlesNumber - particlesCount), void 0, options, group);
      } else if (particlesCount > particlesNumber) {
        this.removeQuantity(particlesCount - particlesNumber, group);
      }
    };
    this._initDensityFactor = (densityOptions) => {
      const container2 = this._container;
      if (!container2.canvas.element || !densityOptions.enable) {
        return 1;
      }
      const canvas = container2.canvas.element, pxRatio = container2.retina.pixelRatio;
      return canvas.width * canvas.height / (densityOptions.height * densityOptions.width * pxRatio ** 2);
    };
    this._pushParticle = (position, overrideOptions, group, initializer) => {
      try {
        let particle = this._pool.pop();
        if (particle) {
          particle.init(this._nextId, position, overrideOptions, group);
        } else {
          particle = new Particle(this._engine, this._nextId, this._container, position, overrideOptions, group);
        }
        let canAdd = true;
        if (initializer) {
          canAdd = initializer(particle);
        }
        if (!canAdd) {
          return;
        }
        this._array.push(particle);
        this._zArray.push(particle);
        this._nextId++;
        this._engine.dispatchEvent("particleAdded", {
          container: this._container,
          data: {
            particle
          }
        });
        return particle;
      } catch (e) {
        getLogger().warning(`${errorPrefix} adding particle: ${e}`);
        return;
      }
    };
    this._removeParticle = (index, group, override) => {
      const particle = this._array[index];
      if (!particle || particle.group !== group) {
        return false;
      }
      const zIdx = this._zArray.indexOf(particle);
      this._array.splice(index, 1);
      this._zArray.splice(zIdx, 1);
      particle.destroy(override);
      this._engine.dispatchEvent("particleRemoved", {
        container: this._container,
        data: {
          particle
        }
      });
      this._addToPool(particle);
      return true;
    };
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = /* @__PURE__ */ new Map();
    this._needsSort = false;
    this._lastZIndex = 0;
    this._interactionManager = new InteractionManager(engine, container);
    const canvasSize = container.canvas.size;
    this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
    this.movers = this._engine.getMovers(container, true);
    this.updaters = this._engine.getUpdaters(container, true);
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const container = this._container, options = container.actualOptions;
    for (const particle of options.manualParticles) {
      this.addParticle(particle.position ? getPosition(particle.position, container.canvas.size) : void 0, particle.options);
    }
  }
  addParticle(position, overrideOptions, group, initializer) {
    const limitOptions = this._container.actualOptions.particles.number.limit, limit = group === void 0 ? this._limit : this._groupLimits.get(group) ?? this._limit, currentCount = this.count;
    if (limit > 0) {
      if (limitOptions.mode === "delete") {
        const countToRemove = currentCount + 1 - limit;
        if (countToRemove > 0) {
          this.removeQuantity(countToRemove);
        }
      } else if (limitOptions.mode === "wait") {
        if (currentCount >= limit) {
          return;
        }
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
  }
  clear() {
    this._array = [];
    this._zArray = [];
  }
  destroy() {
    this._array = [];
    this._zArray = [];
    this.movers = [];
    this.updaters = [];
  }
  async draw(delta) {
    const container = this._container, canvas = container.canvas;
    canvas.clear();
    await this.update(delta);
    for (const [, plugin] of container.plugins) {
      canvas.drawPlugin(plugin, delta);
    }
    for (const p of this._zArray) {
      p.draw(delta);
    }
  }
  filter(condition) {
    return this._array.filter(condition);
  }
  find(condition) {
    return this._array.find(condition);
  }
  get(index) {
    return this._array[index];
  }
  handleClickMode(mode) {
    this._interactionManager.handleClickMode(mode);
  }
  init() {
    const container = this._container, options = container.actualOptions;
    this._lastZIndex = 0;
    this._needsSort = false;
    let handled = false;
    this.updaters = this._engine.getUpdaters(container, true);
    this._interactionManager.init();
    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== void 0) {
        handled = plugin.particlesInitialization();
      }
      if (handled) {
        break;
      }
    }
    this._interactionManager.init();
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.init(container);
    }
    this.addManualParticles();
    if (!handled) {
      const particlesOptions = options.particles, groups = particlesOptions.groups;
      for (const group in groups) {
        const groupOptions = groups[group];
        for (let i = this.count, j = 0; j < groupOptions.number?.value && i < particlesOptions.number.value; i++, j++) {
          this.addParticle(void 0, groupOptions, group);
        }
      }
      for (let i = this.count; i < particlesOptions.number.value; i++) {
        this.addParticle();
      }
    }
  }
  push(nb, mouse, overrideOptions, group) {
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse?.position, overrideOptions, group);
    }
  }
  async redraw() {
    this.clear();
    this.init();
    await this.draw({ value: 0, factor: 0 });
  }
  remove(particle, group, override) {
    this.removeAt(this._array.indexOf(particle), void 0, group, override);
  }
  removeAt(index, quantity = 1, group, override) {
    if (index < 0 || index > this.count) {
      return;
    }
    let deleted = 0;
    for (let i = index; deleted < quantity && i < this.count; i++) {
      this._removeParticle(i--, group, override) && deleted++;
    }
  }
  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }
  setDensity() {
    const options = this._container.actualOptions, groups = options.particles.groups;
    for (const group in groups) {
      this._applyDensity(groups[group], 0, group);
    }
    this._applyDensity(options.particles, options.manualParticles.length);
  }
  setLastZIndex(zIndex) {
    this._lastZIndex = zIndex;
    this._needsSort = this._needsSort || this._lastZIndex < zIndex;
  }
  setResizeFactor(factor) {
    this._resizeFactor = factor;
  }
  async update(delta) {
    const container = this._container, particlesToDelete = /* @__PURE__ */ new Set();
    this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.update();
    }
    for (const [, plugin] of container.plugins) {
      plugin.update && await plugin.update(delta);
    }
    const resizeFactor = this._resizeFactor;
    for (const particle of this._array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }
      particle.ignoresResizeRatio = false;
      await this._interactionManager.reset(particle);
      for (const [, plugin] of this._container.plugins) {
        if (particle.destroyed) {
          break;
        }
        plugin.particleUpdate && plugin.particleUpdate(particle, delta);
      }
      for (const mover of this.movers) {
        mover.isEnabled(particle) && mover.move(particle, delta);
      }
      if (particle.destroyed) {
        particlesToDelete.add(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    if (particlesToDelete.size) {
      const checkDelete = (p) => !particlesToDelete.has(p);
      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);
      for (const particle of particlesToDelete) {
        this._engine.dispatchEvent("particleRemoved", {
          container: this._container,
          data: {
            particle
          }
        });
      }
      this._addToPool(...particlesToDelete);
    }
    await this._interactionManager.externalInteract(delta);
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        await this._interactionManager.particlesInteract(particle, delta);
      }
    }
    delete this._resizeFactor;
    if (this._needsSort) {
      const zArray = this._zArray;
      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this._lastZIndex = zArray[zArray.length - 1].position.z;
      this._needsSort = false;
    }
  }
};
class Retina {
  constructor(container) {
    this.container = container;
    this.pixelRatio = 1;
    this.reduceFactor = 1;
  }
  init() {
    const container = this.container, options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
    this.reduceFactor = 1;
    const ratio = this.pixelRatio, canvas = container.canvas;
    if (canvas.element) {
      const element = canvas.element;
      canvas.size.width = element.offsetWidth * ratio;
      canvas.size.height = element.offsetHeight * ratio;
    }
    const particles = options.particles, moveOptions = particles.move;
    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== void 0 ? moveDistance.horizontal * ratio : void 0;
    maxDistance.vertical = moveDistance.vertical !== void 0 ? moveDistance.vertical * ratio : void 0;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
  }
}
function guardCheck(container) {
  return container && !container.destroyed;
}
function initDelta(value, fpsLimit = 60, smooth = false) {
  return {
    value,
    factor: smooth ? 60 / fpsLimit : 60 * value / 1e3
  };
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
class Container {
  constructor(engine, id, sourceOptions) {
    this._intersectionManager = (entries) => {
      if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
        return;
      }
      for (const entry of entries) {
        if (entry.target !== this.interactivity.element) {
          continue;
        }
        (entry.isIntersecting ? this.play : this.pause)();
      }
    };
    this._nextFrame = async (timestamp) => {
      try {
        if (!this._smooth && this._lastFrameTime !== void 0 && timestamp < this._lastFrameTime + 1e3 / this.fpsLimit) {
          this.draw(false);
          return;
        }
        this._lastFrameTime ??= timestamp;
        const delta = initDelta(timestamp - this._lastFrameTime, this.fpsLimit, this._smooth);
        this.addLifeTime(delta.value);
        this._lastFrameTime = timestamp;
        if (delta.value > 1e3) {
          this.draw(false);
          return;
        }
        await this.particles.draw(delta);
        if (!this.alive()) {
          this.destroy();
          return;
        }
        if (this.getAnimationStatus()) {
          this.draw(false);
        }
      } catch (e) {
        getLogger().error(`${errorPrefix} in animation loop`, e);
      }
    };
    this._engine = engine;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this._smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this._lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles$1(this._engine, this);
    this.pathGenerators = /* @__PURE__ */ new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    this._intersectionObserver = safeIntersectionObserver((entries) => this._intersectionManager(entries));
    this._engine.dispatchEvent("containerBuilt", { container: this });
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  addClickHandler(callback) {
    if (!guardCheck(this)) {
      return;
    }
    const el = this.interactivity.element;
    if (!el) {
      return;
    }
    const clickOrTouchHandler = (e, pos, radius) => {
      if (!guardCheck(this)) {
        return;
      }
      const pxRatio = this.retina.pixelRatio, posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    };
    const clickHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      const mouseEvent = e, pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, 1);
    };
    const touchStartHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = true;
      touchMoved = false;
    };
    const touchMoveHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touchMoved = true;
    };
    const touchEndHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
          if (!lastTouch) {
            return;
          }
        }
        const element = this.canvas.element, canvasRect = element ? element.getBoundingClientRect() : void 0, pos = {
          x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
          y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }
      touched = false;
      touchMoved = false;
    };
    const touchCancelHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = false;
      touchMoved = false;
    };
    let touched = false, touchMoved = false;
    el.addEventListener("click", clickHandler);
    el.addEventListener("touchstart", touchStartHandler);
    el.addEventListener("touchmove", touchMoveHandler);
    el.addEventListener("touchend", touchEndHandler);
    el.addEventListener("touchcancel", touchCancelHandler);
  }
  addLifeTime(value) {
    this._lifeTime += value;
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator);
    return true;
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  destroy() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    this.particles.destroy();
    this.canvas.destroy();
    for (const [, effectDrawer] of this.effectDrawers) {
      effectDrawer.destroy && effectDrawer.destroy(this);
    }
    for (const [, shapeDrawer] of this.shapeDrawers) {
      shapeDrawer.destroy && shapeDrawer.destroy(this);
    }
    for (const key of this.effectDrawers.keys()) {
      this.effectDrawers.delete(key);
    }
    for (const key of this.shapeDrawers.keys()) {
      this.shapeDrawers.delete(key);
    }
    this._engine.clearPlugins(this);
    this.destroyed = true;
    const mainArr = this._engine.dom(), idx = mainArr.findIndex((t) => t === this);
    if (idx >= 0) {
      mainArr.splice(idx, 1);
    }
    this._engine.dispatchEvent("containerDestroyed", { container: this });
  }
  draw(force) {
    if (!guardCheck(this)) {
      return;
    }
    let refreshTime = force;
    this._drawAnimationFrame = requestAnimationFrame(async (timestamp) => {
      if (refreshTime) {
        this._lastFrameTime = void 0;
        refreshTime = false;
      }
      await this._nextFrame(timestamp);
    });
  }
  async export(type, options = {}) {
    for (const [, plugin] of this.plugins) {
      if (!plugin.export) {
        continue;
      }
      const res = await plugin.export(type, options);
      if (!res.supported) {
        continue;
      }
      return res.blob;
    }
    getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
  }
  getAnimationStatus() {
    return !this._paused && !this.pageHidden && guardCheck(this);
  }
  handleClickMode(mode) {
    if (!guardCheck(this)) {
      return;
    }
    this.particles.handleClickMode(mode);
    for (const [, plugin] of this.plugins) {
      plugin.handleClickMode && plugin.handleClickMode(mode);
    }
  }
  async init() {
    if (!guardCheck(this)) {
      return;
    }
    const effects = this._engine.getSupportedEffects();
    for (const type of effects) {
      const drawer = this._engine.getEffectDrawer(type);
      if (drawer) {
        this.effectDrawers.set(type, drawer);
      }
    }
    const shapes = this._engine.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.getShapeDrawer(type);
      if (drawer) {
        this.shapeDrawers.set(type, drawer);
      }
    }
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = this._engine.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this._duration = getRangeValue(this.actualOptions.duration) * 1e3;
    this._delay = getRangeValue(this.actualOptions.delay) * 1e3;
    this._lifeTime = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
    this._smooth = this.actualOptions.smooth;
    for (const [, drawer] of this.effectDrawers) {
      drawer.init && await drawer.init(this);
    }
    for (const [, drawer] of this.shapeDrawers) {
      drawer.init && await drawer.init(this);
    }
    for (const [, plugin] of this.plugins) {
      plugin.init && await plugin.init();
    }
    this._engine.dispatchEvent("containerInit", { container: this });
    this.particles.init();
    this.particles.setDensity();
    for (const [, plugin] of this.plugins) {
      plugin.particlesSetup && plugin.particlesSetup();
    }
    this._engine.dispatchEvent("particlesSetup", { container: this });
  }
  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }
    this._currentTheme = name;
    await this.refresh();
  }
  pause() {
    if (!guardCheck(this)) {
      return;
    }
    if (this._drawAnimationFrame !== void 0) {
      cancelAnimationFrame(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const [, plugin] of this.plugins) {
      plugin.pause && plugin.pause();
    }
    if (!this.pageHidden) {
      this._paused = true;
    }
    this._engine.dispatchEvent("containerPaused", { container: this });
  }
  play(force) {
    if (!guardCheck(this)) {
      return;
    }
    const needsUpdate = this._paused || force;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;
      return;
    }
    if (this._paused) {
      this._paused = false;
    }
    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this._engine.dispatchEvent("containerPlay", { container: this });
    this.draw(needsUpdate || false);
  }
  async refresh() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    return this.start();
  }
  async reset() {
    if (!guardCheck(this)) {
      return;
    }
    this._initialSourceOptions = void 0;
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    return this.refresh();
  }
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise((resolve) => {
      this._delayTimeout = setTimeout(async () => {
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          plugin.start && await plugin.start();
        }
        this._engine.dispatchEvent("containerStarted", { container: this });
        this.play();
        resolve();
      }, this._delay);
    });
  }
  stop() {
    if (!guardCheck(this) || !this.started) {
      return;
    }
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      delete this._delayTimeout;
    }
    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();
    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(this.interactivity.element);
    }
    for (const [, plugin] of this.plugins) {
      plugin.stop && plugin.stop();
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this._sourceOptions = this._options;
    this._engine.dispatchEvent("containerStopped", { container: this });
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this._currentTheme);
    if (this._responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this._responsiveMaxWidth = newMaxWidth;
    return true;
  }
}
class EventDispatcher {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  addEventListener(type, listener) {
    this.removeEventListener(type, listener);
    let arr = this._listeners.get(type);
    if (!arr) {
      arr = [];
      this._listeners.set(type, arr);
    }
    arr.push(listener);
  }
  dispatchEvent(type, args) {
    const listeners = this._listeners.get(type);
    listeners && listeners.forEach((handler) => handler(args));
  }
  hasEventListener(type) {
    return !!this._listeners.get(type);
  }
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = /* @__PURE__ */ new Map();
    } else {
      this._listeners.delete(type);
    }
  }
  removeEventListener(type, listener) {
    const arr = this._listeners.get(type);
    if (!arr) {
      return;
    }
    const length = arr.length, idx = arr.indexOf(listener);
    if (idx < 0) {
      return;
    }
    if (length === 1) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, 1);
    }
  }
}
function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = [...initializers.values()].map((t) => t(container));
    map.set(container, res);
  }
  return res;
}
async function getDataFromUrl(data) {
  const url = itemFromSingleOrMultiple(data.url, data.index);
  if (!url) {
    return data.fallback;
  }
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
  return data.fallback;
}
class Engine {
  constructor() {
    this._configs = /* @__PURE__ */ new Map();
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
    this.plugins = [];
    this._initializers = {
      interactors: /* @__PURE__ */ new Map(),
      movers: /* @__PURE__ */ new Map(),
      updaters: /* @__PURE__ */ new Map()
    };
    this.interactors = /* @__PURE__ */ new Map();
    this.movers = /* @__PURE__ */ new Map();
    this.updaters = /* @__PURE__ */ new Map();
    this.presets = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this.pathGenerators = /* @__PURE__ */ new Map();
  }
  get configs() {
    const res = {};
    for (const [name, config] of this._configs) {
      res[name] = config;
    }
    return res;
  }
  get version() {
    return "3.0.3";
  }
  addConfig(config) {
    const name = config.name ?? "default";
    this._configs.set(name, config);
    this._eventDispatcher.dispatchEvent("configAdded", { data: { name, config } });
  }
  async addEffect(effect, drawer, refresh = true) {
    executeOnSingleOrMultiple(effect, (type) => {
      !this.getEffectDrawer(type) && this.effectDrawers.set(type, drawer);
    });
    await this.refresh(refresh);
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
  }
  async addInteractor(name, interactorInitializer, refresh = true) {
    this._initializers.interactors.set(name, interactorInitializer);
    await this.refresh(refresh);
  }
  async addMover(name, moverInitializer, refresh = true) {
    this._initializers.movers.set(name, moverInitializer);
    await this.refresh(refresh);
  }
  async addParticleUpdater(name, updaterInitializer, refresh = true) {
    this._initializers.updaters.set(name, updaterInitializer);
    await this.refresh(refresh);
  }
  async addPathGenerator(name, generator, refresh = true) {
    !this.getPathGenerator(name) && this.pathGenerators.set(name, generator);
    await this.refresh(refresh);
  }
  async addPlugin(plugin, refresh = true) {
    !this.getPlugin(plugin.id) && this.plugins.push(plugin);
    await this.refresh(refresh);
  }
  async addPreset(preset, options, override = false, refresh = true) {
    (override || !this.getPreset(preset)) && this.presets.set(preset, options);
    await this.refresh(refresh);
  }
  async addShape(shape, drawer, refresh = true) {
    executeOnSingleOrMultiple(shape, (type) => {
      !this.getShapeDrawer(type) && this.shapeDrawers.set(type, drawer);
    });
    await this.refresh(refresh);
  }
  clearPlugins(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
  }
  dispatchEvent(type, args) {
    this._eventDispatcher.dispatchEvent(type, args);
  }
  dom() {
    return this._domArray;
  }
  domItem(index) {
    const dom = this.dom(), item = dom[index];
    if (!item || item.destroyed) {
      dom.splice(index, 1);
      return;
    }
    return item;
  }
  getAvailablePlugins(container) {
    const res = /* @__PURE__ */ new Map();
    for (const plugin of this.plugins) {
      plugin.needsPlugin(container.actualOptions) && res.set(plugin.id, plugin.getPlugin(container));
    }
    return res;
  }
  getEffectDrawer(type) {
    return this.effectDrawers.get(type);
  }
  getInteractors(container, force = false) {
    return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
  }
  getMovers(container, force = false) {
    return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
  }
  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  getPlugin(plugin) {
    return this.plugins.find((t) => t.id === plugin);
  }
  getPreset(preset) {
    return this.presets.get(preset);
  }
  getShapeDrawer(type) {
    return this.shapeDrawers.get(type);
  }
  getSupportedEffects() {
    return this.effectDrawers.keys();
  }
  getSupportedShapes() {
    return this.shapeDrawers.keys();
  }
  getUpdaters(container, force = false) {
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
  }
  init() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
  }
  async load(params) {
    const id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * 1e4)}`, { index, url } = params, options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options;
    let domContainer = params.element ?? document.getElementById(id);
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = id;
      document.body.append(domContainer);
    }
    const currentOptions = itemFromSingleOrMultiple(options, index), dom = this.dom(), oldIndex = dom.findIndex((v) => v.id.description === id);
    if (oldIndex >= 0) {
      const old = this.domItem(oldIndex);
      if (old && !old.destroyed) {
        old.destroy();
        dom.splice(oldIndex, 1);
      }
    }
    let canvasEl;
    if (domContainer.tagName.toLowerCase() === "canvas") {
      canvasEl = domContainer;
      canvasEl.dataset[generatedAttribute] = "false";
    } else {
      const existingCanvases = domContainer.getElementsByTagName("canvas");
      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];
        canvasEl.dataset[generatedAttribute] = "false";
      } else {
        canvasEl = document.createElement("canvas");
        canvasEl.dataset[generatedAttribute] = "true";
        domContainer.appendChild(canvasEl);
      }
    }
    if (!canvasEl.style.width) {
      canvasEl.style.width = "100%";
    }
    if (!canvasEl.style.height) {
      canvasEl.style.height = "100%";
    }
    const newItem = new Container(this, id, currentOptions);
    if (oldIndex >= 0) {
      dom.splice(oldIndex, 0, newItem);
    } else {
      dom.push(newItem);
    }
    newItem.canvas.loadCanvas(canvasEl);
    await newItem.start();
    return newItem;
  }
  loadOptions(options, sourceOptions) {
    for (const plugin of this.plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }
  loadParticlesOptions(container, options, ...sourceOptions) {
    const updaters = this.updaters.get(container);
    if (!updaters) {
      return;
    }
    for (const updater of updaters) {
      updater.loadOptions && updater.loadOptions(options, ...sourceOptions);
    }
  }
  async refresh(refresh = true) {
    if (!refresh) {
      return;
    }
    this.dom().forEach((t) => t.refresh());
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  setOnClickHandler(callback) {
    const dom = this.dom();
    if (!dom.length) {
      throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
    }
    for (const domItem of dom) {
      domItem.addClickHandler(callback);
    }
  }
}
class HslColorManager {
  constructor() {
    this.key = "hsl";
    this.stringPrefix = "hsl";
  }
  handleColor(color) {
    const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== void 0 && hslColor.s !== void 0 && hslColor.l !== void 0) {
      return hslToRgb(hslColor);
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== void 0 && hslColor.l !== void 0) {
      return hslToRgb({
        h: getRangeValue(hslColor.h),
        l: getRangeValue(hslColor.l),
        s: getRangeValue(hslColor.s)
      });
    }
  }
  parseString(input) {
    if (!input.startsWith("hsl")) {
      return;
    }
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : void 0;
  }
}
class RgbColorManager {
  constructor() {
    this.key = "rgb";
    this.stringPrefix = "rgb";
  }
  handleColor(color) {
    const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== void 0) {
      return rgbColor;
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== void 0) {
      return {
        r: getRangeValue(rgbColor.r),
        g: getRangeValue(rgbColor.g),
        b: getRangeValue(rgbColor.b)
      };
    }
  }
  parseString(input) {
    if (!input.startsWith(this.stringPrefix)) {
      return;
    }
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : void 0;
  }
}
function init() {
  const rgbColorManager = new RgbColorManager(), hslColorManager = new HslColorManager();
  addColorManager(rgbColorManager);
  addColorManager(hslColorManager);
  const engine = new Engine();
  engine.init();
  return engine;
}
class ExternalInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "external";
  }
}
class ParticlesInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "particles";
  }
}
const tsParticles = init();
if (!isSsr()) {
  window.tsParticles = tsParticles;
}
function applyDistance(particle) {
  const initialPosition = particle.initialPosition, { dx, dy } = getDistances(initialPosition, particle.position), dxFixed = Math.abs(dx), dyFixed = Math.abs(dy), { maxDistance } = particle.retina, hDistance = maxDistance.horizontal, vDistance = maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y * 0.5 - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x * 0.5 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position, vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -getRandom();
    }
  }
}
function move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta) {
  applyPath(particle, delta);
  const gravityOptions = particle.gravity, gravityFactor = gravityOptions?.enable && gravityOptions.inverse ? -1 : 1;
  if (moveDrift && moveSpeed) {
    particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
  }
  if (gravityOptions?.enable && moveSpeed) {
    particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
  }
  const decay = particle.moveDecay;
  particle.velocity.multTo(decay);
  const velocity = particle.velocity.mult(moveSpeed);
  if (gravityOptions?.enable && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
    velocity.y = gravityFactor * maxSpeed;
    if (moveSpeed) {
      particle.velocity.y = velocity.y / moveSpeed;
    }
  }
  const zIndexOptions = particle.options.zIndex, zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
  velocity.multTo(zVelocityFactor);
  const { position } = particle;
  position.addTo(velocity);
  if (moveOptions.vibrate) {
    position.x += Math.sin(position.x * Math.cos(position.y));
    position.y += Math.cos(position.y * Math.sin(position.x));
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;
  if (!particle.spin) {
    return;
  }
  const updateFunc = {
    x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
    y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height), halfMaxSize = maxCanvasSize * 0.5;
  if (particle.spin.radius > halfMaxSize) {
    particle.spin.radius = halfMaxSize;
    particle.spin.acceleration *= -1;
  } else if (particle.spin.radius < 0) {
    particle.spin.radius = 0;
    particle.spin.acceleration *= -1;
  }
  particle.spin.angle += moveSpeed * 0.01 * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  const particlesOptions = particle.options, pathOptions = particlesOptions.move.path, pathEnabled = pathOptions.enable;
  if (!pathEnabled) {
    return;
  }
  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }
  const path = particle.pathGenerator?.generate(particle, delta);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -1, 1);
    particle.velocity.y = clamp(particle.velocity.y, -1, 1);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : 1;
}
const diffFactor = 2;
class BaseMover {
  constructor() {
    this._initSpin = (particle) => {
      const container = particle.container, options = particle.options, spinOptions = options.move.spin;
      if (!spinOptions.enable) {
        return;
      }
      const spinPos = spinOptions.position ?? { x: 50, y: 50 }, spinCenter = {
        x: spinPos.x * 0.01 * container.canvas.size.width,
        y: spinPos.y * 0.01 * container.canvas.size.height
      }, pos = particle.getPosition(), distance = getDistance(pos, spinCenter), spinAcceleration = getRangeValue(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    };
  }
  init(particle) {
    const options = particle.options, gravityOptions = options.move.gravity;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    this._initSpin(particle);
  }
  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }
  move(particle, delta) {
    const particleOptions = particle.options, moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = particle.container, pxRatio = container.retina.pixelRatio, slowFactor = getProximitySpeedFactor(particle), baseSpeed = (particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio) * container.retina.reduceFactor, moveDrift = particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio, maxSize = getRangeMax(particleOptions.size.value) * pxRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1, moveSpeed = baseSpeed * sizeFactor * slowFactor * (delta.factor || 1) / diffFactor, maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
    }
    applyDistance(particle);
  }
}
async function loadBaseMover(engine, refresh = true) {
  await engine.addMover("base", () => new BaseMover(), refresh);
}
class CircleDrawer {
  draw(data) {
    const { context, particle, radius } = data;
    if (!particle.circleRange) {
      particle.circleRange = { min: 0, max: Math.PI * 2 };
    }
    const circleRange = particle.circleRange;
    context.arc(0, 0, radius, circleRange.min, circleRange.max, false);
  }
  getSidesCount() {
    return 12;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData, angle = shapeData?.angle ?? {
      max: 360,
      min: 0
    };
    particle.circleRange = !isObject(angle) ? {
      min: 0,
      max: angle * Math.PI / 180
    } : { min: angle.min * Math.PI / 180, max: angle.max * Math.PI / 180 };
  }
}
async function loadCircleShape(engine, refresh = true) {
  await engine.addShape("circle", new CircleDrawer(), refresh);
}
function updateColorValue$1(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset), velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6, decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
  if (!color) {
    return;
  }
  const { h, s, l } = color;
  if (h) {
    updateColorValue$1(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue$1(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue$1(delta, l, lAnimation, 100, true);
  }
}
class ColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
    return !particle.destroyed && !particle.spawning && (color?.h.value !== void 0 && hAnimation.enable || color?.s.value !== void 0 && sAnimation.enable || color?.l.value !== void 0 && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle, delta);
  }
}
async function loadColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("color", (container) => new ColorUpdater(container), refresh);
}
function checkDestroy$1(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateOpacity(particle, delta) {
  const data = particle.opacity;
  if (particle.destroyed || !data?.enable || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const minValue = data.min, maxValue = data.max, decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += (data.velocity ?? 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= (data.velocity ?? 0) * delta.factor;
      }
      break;
  }
  if (data.velocity && data.decay !== 1) {
    data.velocity *= decay;
  }
  checkDestroy$1(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity;
    particle.opacity = initParticleNumericAnimationValue(opacityOptions, 1);
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? 0) <= 0 || (particle.opacity.maxLoops ?? 0) > 0 && (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.time = 0;
      particle.opacity.loops = 0;
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateOpacity(particle, delta);
  }
}
async function loadOpacityUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container), refresh);
}
function bounceHorizontal(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-horizontal" && data.outMode !== "bounceHorizontal" && data.outMode !== "split" || data.direction !== "left" && data.direction !== "right") {
    return;
  }
  if (data.bounds.right < 0 && data.direction === "left") {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left" && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0 && data.direction === "left") {
    data.particle.position.x = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-vertical" && data.outMode !== "bounceVertical" && data.outMode !== "split" || data.direction !== "bottom" && data.direction !== "top") {
    return;
  }
  if (data.bounds.bottom < 0 && data.direction === "top") {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
  const velocity = data.particle.velocity.y;
  let bounced = false;
  if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top" && data.bounds.top <= 0 && velocity < 0) {
    const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.y + data.size;
  if (data.bounds.bottom >= data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= 0 && data.direction === "top") {
    data.particle.position.y = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
class BounceOutMode {
  constructor(container) {
    this.container = container;
    this.modes = [
      "bounce",
      "bounce-vertical",
      "bounce-horizontal",
      "bounceVertical",
      "bounceHorizontal",
      "split"
    ];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    let handled = false;
    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== void 0) {
        handled = plugin.particleBounce(particle, delta, direction);
      }
      if (handled) {
        break;
      }
    }
    if (handled) {
      return;
    }
    const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
    bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
    bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
  }
}
class DestroyOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"];
  }
  update(particle, direction, _delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "normal":
      case "outside":
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        break;
      case "inside": {
        const { dx, dy } = getDistances(particle.position, particle.moveCenter);
        const { x: vx, y: vy } = particle.velocity;
        if (vx < 0 && dx > particle.moveCenter.radius || vy < 0 && dy > particle.moveCenter.radius || vx >= 0 && dx < -particle.moveCenter.radius || vy >= 0 && dy < -particle.moveCenter.radius) {
          return;
        }
        break;
      }
    }
    container.particles.remove(particle, void 0, true);
  }
}
class NoneOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["none"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    if (particle.options.move.distance.horizontal && (direction === "left" || direction === "right") || particle.options.move.distance.vertical && (direction === "top" || direction === "bottom")) {
      return;
    }
    const gravityOptions = particle.options.move.gravity, container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }
      if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;
      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === "bottom" || gravityOptions.inverse && position.y < -pRadius && direction === "top") {
        container.particles.remove(particle);
      }
    }
  }
}
class OutOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["out"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "inside": {
        const { x: vx, y: vy } = particle.velocity;
        const circVec = Vector.origin;
        circVec.length = particle.moveCenter.radius;
        circVec.angle = particle.velocity.angle + Math.PI;
        circVec.addTo(Vector.create(particle.moveCenter));
        const { dx, dy } = getDistances(particle.position, circVec);
        if (vx <= 0 && dx >= 0 || vy <= 0 && dy >= 0 || vx >= 0 && dx <= 0 || vy >= 0 && dy <= 0) {
          return;
        }
        particle.position.x = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.width
        }));
        particle.position.y = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.height
        }));
        const { dx: newDx, dy: newDy } = getDistances(particle.position, particle.moveCenter);
        particle.direction = Math.atan2(-newDy, -newDx);
        particle.velocity.angle = particle.direction;
        break;
      }
      default: {
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        switch (particle.outType) {
          case "outside": {
            particle.position.x = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.x;
            particle.position.y = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.y;
            const { dx, dy } = getDistances(particle.position, particle.moveCenter);
            if (particle.moveCenter.radius) {
              particle.direction = Math.atan2(dy, dx);
              particle.velocity.angle = particle.direction;
            }
            break;
          }
          case "normal": {
            const warp = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
              bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
              left: -particle.getRadius() - particle.offset.x,
              right: canvasSize.width + particle.getRadius() + particle.offset.x,
              top: -particle.getRadius() - particle.offset.y
            }, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
            if (direction === "right" && nextBounds.left > canvasSize.width + particle.offset.x) {
              particle.position.x = newPos.left;
              particle.initialPosition.x = particle.position.x;
              if (!warp) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
              particle.position.x = newPos.right;
              particle.initialPosition.x = particle.position.x;
              if (!warp) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            }
            if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
              if (!warp) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.top;
              particle.initialPosition.y = particle.position.y;
            } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
              if (!warp) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.bottom;
              particle.initialPosition.y = particle.position.y;
            }
            break;
          }
        }
        break;
      }
    }
  }
}
class OutOfCanvasUpdater {
  constructor(container) {
    this.container = container;
    this._updateOutMode = (particle, delta, outMode, direction) => {
      for (const updater of this.updaters) {
        updater.update(particle, direction, delta, outMode);
      }
    };
    this.updaters = [
      new BounceOutMode(container),
      new DestroyOutMode(container),
      new OutOutMode(container),
      new NoneOutMode(container)
    ];
  }
  init() {
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    const outModes = particle.options.move.outModes;
    this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, "bottom");
    this._updateOutMode(particle, delta, outModes.left ?? outModes.default, "left");
    this._updateOutMode(particle, delta, outModes.right ?? outModes.default, "right");
    this._updateOutMode(particle, delta, outModes.top ?? outModes.default, "top");
  }
}
async function loadOutModesUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container), refresh);
}
function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.size.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateSize(particle, delta) {
  const data = particle.size;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const sizeVelocity = (data.velocity ?? 0) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += sizeVelocity;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= sizeVelocity;
      }
  }
  if (data.velocity && decay !== 1) {
    data.velocity *= decay;
  }
  checkDestroy(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
class SizeUpdater {
  init(particle) {
    const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = (particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? 0) <= 0 || (particle.size.maxLoops ?? 0) > 0 && (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0));
  }
  reset(particle) {
    particle.size.loops = 0;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateSize(particle, delta);
  }
}
async function loadSizeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}
async function loadBasic(engine, refresh = true) {
  await loadBaseMover(engine, false);
  await loadCircleShape(engine, false);
  await loadColorUpdater(engine, false);
  await loadOpacityUpdater(engine, false);
  await loadOutModesUpdater(engine, false);
  await loadSizeUpdater(engine, false);
  await engine.refresh(refresh);
}
async function loadEasingQuadPlugin() {
  addEasing("ease-in-quad", (value) => value ** 2);
  addEasing("ease-out-quad", (value) => 1 - (1 - value) ** 2);
  addEasing("ease-in-out-quad", (value) => value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2);
}
const validTypes = ["emoji"];
const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';
class EmojiDrawer {
  constructor() {
    this._emojiShapeDict = /* @__PURE__ */ new Map();
  }
  destroy() {
    for (const [key, emojiData] of this._emojiShapeDict) {
      emojiData instanceof ImageBitmap && emojiData?.close();
      this._emojiShapeDict.delete(key);
    }
  }
  draw(data) {
    const { context, particle, radius, opacity } = data, emojiData = particle.emojiData;
    if (!emojiData) {
      return;
    }
    context.globalAlpha = opacity;
    context.drawImage(emojiData, -radius, -radius, radius * 2, radius * 2);
    context.globalAlpha = 1;
  }
  async init(container) {
    const options = container.actualOptions;
    if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
      const promises = [loadFont(defaultFont)], shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t);
      if (shapeOptions) {
        executeOnSingleOrMultiple(shapeOptions, (shape) => {
          shape.font && promises.push(loadFont(shape.font));
        });
      }
      await Promise.all(promises);
    }
  }
  particleDestroy(particle) {
    delete particle.emojiData;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    if (!shapeData?.value) {
      return;
    }
    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData), font = shapeData.font ?? defaultFont;
    if (!emoji) {
      return;
    }
    const key = `${emoji}_${font}`, existingData = this._emojiShapeDict.get(key);
    if (existingData) {
      particle.emojiData = existingData;
      return;
    }
    const canvasSize = getRangeMax(particle.size.value) * 2;
    let emojiData;
    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(canvasSize, canvasSize), context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${getRangeMax(particle.size.value) * 2}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(emoji, getRangeMax(particle.size.value), getRangeMax(particle.size.value));
      emojiData = canvas.transferToImageBitmap();
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${getRangeMax(particle.size.value) * 2}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(emoji, getRangeMax(particle.size.value), getRangeMax(particle.size.value));
      emojiData = canvas;
    }
    this._emojiShapeDict.set(key, emojiData);
    particle.emojiData = emojiData;
  }
}
async function loadEmojiShape(engine, refresh = true) {
  await engine.addShape(validTypes, new EmojiDrawer(), refresh);
}
class Attract {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = "ease-out-quad";
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
}
const attractMode = "attract";
let Attractor$1 = class Attractor extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickAttract = () => {
      const container2 = this.container;
      if (!container2.attract) {
        container2.attract = { particles: [] };
      }
      const { attract } = container2;
      if (!attract.finish) {
        if (!attract.count) {
          attract.count = 0;
        }
        attract.count++;
        if (attract.count === container2.particles.count) {
          attract.finish = true;
        }
      }
      if (attract.clicking) {
        const mousePos = container2.interactivity.mouse.clickPosition, attractRadius = container2.retina.attractModeDistance;
        if (!attractRadius || attractRadius < 0 || !mousePos) {
          return;
        }
        this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
      } else if (attract.clicking === false) {
        attract.particles = [];
      }
      return;
    };
    this._hoverAttract = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, attractRadius = container2.retina.attractModeDistance;
      if (!attractRadius || attractRadius < 0 || !mousePos) {
        return;
      }
      this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    };
    this._processAttract = (position, attractRadius, area) => {
      const container2 = this.container, attractOptions = container2.actualOptions.interactivity.modes.attract;
      if (!attractOptions) {
        return;
      }
      const query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p));
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position);
        const velocity = attractOptions.speed * attractOptions.factor;
        const attractFactor = clamp(getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity, 0, attractOptions.maxSpeed);
        const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
        particle.position.subFrom(normVec);
      }
    };
    this._engine = engine;
    if (!container.attract) {
      container.attract = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, attract = options.interactivity.modes.attract;
      if (!attract || mode !== attractMode) {
        return;
      }
      if (!container.attract) {
        container.attract = { particles: [] };
      }
      container.attract.clicking = true;
      container.attract.count = 0;
      for (const particle of container.attract.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.attract.particles = [];
      container.attract.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        if (!container.attract) {
          container.attract = { particles: [] };
        }
        container.attract.clicking = false;
      }, attract.duration * 1e3);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, attract = container.actualOptions.interactivity.modes.attract;
    if (!attract) {
      return;
    }
    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
    if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
      this._hoverAttract();
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      this._clickAttract();
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
    return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source?.attract);
    }
  }
  reset() {
  }
};
async function loadExternalAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("externalAttract", (container) => new Attractor$1(engine, container), refresh);
}
class Bounce {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
  }
}
const bounceMode = "bounce";
class Bouncer extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._processBounce = (position, radius, area) => {
      const query = this.container.particles.quadTree.query(area, (p) => this.isEnabled(p));
      for (const particle of query) {
        if (area instanceof Circle) {
          circleBounce(circleBounceDataFromParticle(particle), {
            position,
            radius,
            mass: radius ** 2 * Math.PI / 2,
            velocity: Vector.origin,
            factor: Vector.origin
          });
        } else if (area instanceof Rectangle) {
          rectBounce(particle, calculateBounds(position, radius));
        }
      }
    };
    this._processMouseBounce = () => {
      const container2 = this.container, pxRatio = container2.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container2.interactivity.mouse.position, radius = container2.retina.bounceModeDistance;
      if (!radius || radius < 0 || !mousePos) {
        return;
      }
      this._processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    };
    this._singleSelectorBounce = (selector, div) => {
      const container2 = this.container, query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, radius = elem.offsetWidth / 2 * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
        this._processBounce(pos, radius, area);
      });
    };
  }
  clear() {
  }
  init() {
    const container = this.container, bounce2 = container.actualOptions.interactivity.modes.bounce;
    if (!bounce2) {
      return;
    }
    container.retina.bounceModeDistance = bounce2.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
      this._processMouseBounce();
    } else {
      divModeExecute(bounceMode, divs, (selector, div) => this._singleSelectorBounce(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode) || isDivModeEnabled(bounceMode, divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source?.bounce);
    }
  }
  reset() {
  }
}
async function loadExternalBounceInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBounce", (container) => new Bouncer(container), refresh);
}
class BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.mix !== void 0) {
      this.mix = data.mix;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.color !== void 0) {
      const sourceColor = isArray(this.color) ? void 0 : this.color;
      this.color = executeOnSingleOrMultiple(data.color, (color) => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
  }
}
class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
}
class Bubble extends BubbleBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new BubbleDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}
const bubbleMode = "bubble";
class Bubbler extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._clickBubble = () => {
      const container2 = this.container, options = container2.actualOptions, mouseClickPos = container2.interactivity.mouse.clickPosition, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || !mouseClickPos) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      const distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < 0) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mouseClickPos, distance, (p) => this.isEnabled(p)), { bubble } = container2;
      for (const particle of query) {
        if (!bubble.clicking) {
          continue;
        }
        particle.bubble.inRange = !bubble.durationEnd;
        const pos = particle.getPosition(), distMouse = getDistance(pos, mouseClickPos), timeSpent = ((/* @__PURE__ */ new Date()).getTime() - (container2.interactivity.mouse.clickTime || 0)) / 1e3;
        if (timeSpent > bubbleOptions.duration) {
          bubble.durationEnd = true;
        }
        if (timeSpent > bubbleOptions.duration * 2) {
          bubble.clicking = false;
          bubble.durationEnd = false;
        }
        const sizeData = {
          bubbleObj: {
            optValue: container2.retina.bubbleModeSize,
            value: particle.bubble.radius
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.size.value) * container2.retina.pixelRatio,
            value: particle.size.value
          },
          type: "size"
        };
        this._process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: bubbleOptions.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.opacity.value),
            value: particle.opacity?.value ?? 1
          },
          type: "opacity"
        };
        this._process(particle, distMouse, timeSpent, opacityData);
        if (!bubble.durationEnd && distMouse <= distance) {
          this._hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      }
    };
    this._hoverBubble = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < 0 || mousePos === void 0) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      for (const particle of query) {
        particle.bubble.inRange = true;
        const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos), ratio = 1 - pointDistance / distance;
        if (pointDistance <= distance) {
          if (ratio >= 0 && container2.interactivity.status === mouseMoveEvent) {
            this._hoverBubbleSize(particle, ratio);
            this._hoverBubbleOpacity(particle, ratio);
            this._hoverBubbleColor(particle, ratio);
          }
        } else {
          this.reset(particle);
        }
        if (container2.interactivity.status === mouseLeaveEvent) {
          this.reset(particle);
        }
      }
    };
    this._hoverBubbleColor = (particle, ratio, divBubble) => {
      const options = this.container.actualOptions, bubbleOptions = divBubble ?? options.interactivity.modes.bubble;
      if (!bubbleOptions) {
        return;
      }
      if (!particle.bubble.finalColor) {
        const modeColor = bubbleOptions.color;
        if (!modeColor) {
          return;
        }
        const bubbleColor = itemFromSingleOrMultiple(modeColor);
        particle.bubble.finalColor = rangeColorToHsl(bubbleColor);
      }
      if (!particle.bubble.finalColor) {
        return;
      }
      if (bubbleOptions.mix) {
        particle.bubble.color = void 0;
        const pColor = particle.getFillColor();
        particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
      } else {
        particle.bubble.color = particle.bubble.finalColor;
      }
    };
    this._hoverBubbleOpacity = (particle, ratio, divBubble) => {
      const container2 = this.container, options = container2.actualOptions, modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble?.opacity;
      if (!modeOpacity) {
        return;
      }
      const optOpacity = particle.options.opacity.value, pOpacity = particle.opacity?.value ?? 1, opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
      if (opacity !== void 0) {
        particle.bubble.opacity = opacity;
      }
    };
    this._hoverBubbleSize = (particle, ratio, divBubble) => {
      const container2 = this.container, modeSize = divBubble?.size ? divBubble.size * container2.retina.pixelRatio : container2.retina.bubbleModeSize;
      if (modeSize === void 0) {
        return;
      }
      const optSize = getRangeMax(particle.options.size.value) * container2.retina.pixelRatio, pSize = particle.size.value, size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
      if (size !== void 0) {
        particle.bubble.radius = size;
      }
    };
    this._process = (particle, distMouse, timeSpent, data) => {
      const container2 = this.container, bubbleParam = data.bubbleObj.optValue, options = container2.actualOptions, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || bubbleParam === void 0) {
        return;
      }
      const bubbleDuration = bubbleOptions.duration, bubbleDistance = container2.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
      if (!bubbleDistance || bubbleDistance < 0 || bubbleParam === particlesParam) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      if (container2.bubble.durationEnd) {
        if (pObjBubble) {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      } else {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble ?? pObj;
          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
            if (type === "size") {
              particle.bubble.radius = value;
            }
            if (type === "opacity") {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      }
    };
    this._singleSelectorHover = (delta, selector, div) => {
      const container2 = this.container, selectors = document.querySelectorAll(selector), bubble = container2.actualOptions.interactivity.modes.bubble;
      if (!bubble || !selectors.length) {
        return;
      }
      selectors.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p));
        for (const particle of query) {
          if (!area.contains(particle.getPosition())) {
            continue;
          }
          particle.bubble.inRange = true;
          const divs = bubble.divs, divBubble = divMode(divs, elem);
          if (!particle.bubble.div || particle.bubble.div !== elem) {
            this.clear(particle, delta, true);
            particle.bubble.div = elem;
          }
          this._hoverBubbleSize(particle, 1, divBubble);
          this._hoverBubbleOpacity(particle, 1, divBubble);
          this._hoverBubbleColor(particle, 1, divBubble);
        }
      });
    };
    if (!container.bubble) {
      container.bubble = {};
    }
    this.handleClickMode = (mode) => {
      if (mode !== bubbleMode) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      container.bubble.clicking = true;
    };
  }
  clear(particle, delta, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  init() {
    const container = this.container, bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble) {
      return;
    }
    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
    if (bubble.size !== void 0) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }
  async interact(delta) {
    const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
    if (hoverEnabled && isInArray(bubbleMode, hoverMode)) {
      this._hoverBubble();
    } else if (clickEnabled && isInArray(bubbleMode, clickMode)) {
      this._clickBubble();
    } else {
      divModeExecute(bubbleMode, divs, (selector, div) => this._singleSelectorHover(delta, selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, { onClick, onDiv, onHover } = events, divBubble = isDivModeEnabled(bubbleMode, onDiv);
    if (!(divBubble || onHover.enable && mouse.position || onClick.enable && mouse.clickPosition)) {
      return false;
    }
    return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source?.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
}
async function loadExternalBubbleInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBubble", (container) => new Bubbler(container), refresh);
}
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
}
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
  if (!color1 || !color2) {
    return;
  }
  const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawConnectLine(context, width, lineStyle2, begin, end) {
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle2;
  context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
  const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
  if (!connectOptions) {
    return;
  }
  return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
  container.canvas.draw((ctx) => {
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(), pos2 = p2.getPosition();
    drawConnectLine(ctx, p1.retina.linksWidth ?? 0, ls, pos1, pos2);
  });
}
const connectMode = "connect";
class Connector extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, connect = container.actualOptions.interactivity.modes.connect;
    if (!connect) {
      return;
    }
    container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
    container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions;
    if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
      const mousePos = container.interactivity.mouse.position;
      if (!container.retina.connectModeDistance || container.retina.connectModeDistance < 0 || !container.retina.connectModeRadius || container.retina.connectModeRadius < 0 || !mousePos) {
        return;
      }
      const distance = Math.abs(container.retina.connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      let i = 0;
      for (const p1 of query) {
        const pos1 = p1.getPosition();
        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(), distMax = Math.abs(container.retina.connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
        ++i;
      }
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray(connectMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source?.connect);
    }
  }
  reset() {
  }
}
async function loadExternalConnectInteraction(engine, refresh = true) {
  await engine.addInteractor("externalConnect", (container) => new Connector(container), refresh);
}
class GrabLinks {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
  }
}
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw((ctx) => {
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, particle.retina.linksWidth ?? 0, beginPos, mousePos, lineColor, opacity);
  });
}
const grabMode = "grab";
class Grabber extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, grab = container.actualOptions.interactivity.modes.grab;
    if (!grab) {
      return;
    }
    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const distance = container.retina.grabModeDistance;
    if (!distance || distance < 0) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
    for (const particle of query) {
      const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos);
      if (pointDistance > distance) {
        continue;
      }
      const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
      if (opacityLine <= 0) {
        continue;
      }
      const optColor = grabLineOptions.color ?? particle.options.links?.color;
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, void 0, container.particles.grabLineColor);
      if (!colorLine) {
        continue;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(grabMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source?.grab);
    }
  }
  reset() {
  }
}
async function loadExternalGrabInteraction(engine, refresh = true) {
  await engine.addInteractor("externalGrab", (container) => new Grabber(container), refresh);
}
const pauseMode = "pause";
class Pauser extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== pauseMode) {
        return;
      }
      const container2 = this.container;
      if (container2.getAnimationStatus()) {
        container2.pause();
      } else {
        container2.play();
      }
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  reset() {
  }
}
async function loadExternalPauseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPause", (container) => new Pauser(container), refresh);
}
class Push {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    if (data.groups !== void 0) {
      this.groups = data.groups.map((t) => t);
    }
    if (!this.groups.length) {
      this.default = true;
    }
    const quantity = data.quantity;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
const pushMode = "push";
class Pusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== pushMode) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const quantity = getRangeValue(pushOptions.quantity);
      if (quantity <= 0) {
        return;
      }
      const group = itemFromArray([void 0, ...pushOptions.groups]), groupOptions = group !== void 0 ? container2.actualOptions.particles.groups[group] : void 0;
      container2.particles.push(quantity, container2.interactivity.mouse, groupOptions, group);
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.push) {
      options.push = new Push();
    }
    for (const source of sources) {
      options.push.load(source?.push);
    }
  }
  reset() {
  }
}
async function loadExternalPushInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPush", (container) => new Pusher(container), refresh);
}
class Remove {
  constructor() {
    this.quantity = 2;
  }
  load(data) {
    if (!data) {
      return;
    }
    const quantity = data.quantity;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
const removeMode = "remove";
class Remover extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      const container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.modes.remove || mode !== removeMode) {
        return;
      }
      const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
      container2.particles.removeQuantity(removeNb);
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.remove) {
      options.remove = new Remove();
    }
    for (const source of sources) {
      options.remove.load(source?.remove);
    }
  }
  reset() {
  }
}
async function loadExternalRemoveInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRemove", (container) => new Remover(container), refresh);
}
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = "ease-out-quad";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
  }
}
class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
}
class Repulse extends RepulseBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
const repulseMode = "repulse";
class Repulser extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickRepulse = () => {
      const container2 = this.container, repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const repulse = container2.repulse || { particles: [] };
      if (!repulse.finish) {
        if (!repulse.count) {
          repulse.count = 0;
        }
        repulse.count++;
        if (repulse.count === container2.particles.count) {
          repulse.finish = true;
        }
      }
      if (repulse.clicking) {
        const repulseDistance = container2.retina.repulseModeDistance;
        if (!repulseDistance || repulseDistance < 0) {
          return;
        }
        const repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container2.interactivity.mouse.clickPosition;
        if (mouseClickPos === void 0) {
          return;
        }
        const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container2.particles.quadTree.query(range, (p) => this.isEnabled(p));
        for (const particle of query) {
          const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d = distance ** 2, velocity = repulseOptions.speed, force = -repulseRadius * velocity / d;
          if (d <= repulseRadius) {
            repulse.particles.push(particle);
            const vect = Vector.create(dx, dy);
            vect.length = force;
            particle.velocity.setTo(vect);
          }
        }
      } else if (repulse.clicking === false) {
        for (const particle of repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        repulse.particles = [];
      }
    };
    this._hoverRepulse = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, repulseRadius = container2.retina.repulseModeDistance;
      if (!repulseRadius || repulseRadius < 0 || !mousePos) {
        return;
      }
      this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };
    this._processRepulse = (position, repulseRadius, area, divRepulse) => {
      const container2 = this.container, query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p)), repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const { easing, speed, factor, maxSpeed } = repulseOptions, easingFunc = getEasing(easing), velocity = (divRepulse?.speed ?? speed) * factor;
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position), repulseFactor = clamp(easingFunc(1 - distance / repulseRadius) * velocity, 0, maxSpeed), normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
        particle.position.addTo(normVec);
      }
    };
    this._singleSelectorRepulse = (selector, div) => {
      const container2 = this.container, repulse = container2.actualOptions.interactivity.modes.repulse;
      if (!repulse) {
        return;
      }
      const query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = divMode(divs, elem);
        this._processRepulse(pos, repulseRadius, area, divRepulse);
      });
    };
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, repulseOpts = options.interactivity.modes.repulse;
      if (!repulseOpts || mode !== repulseMode) {
        return;
      }
      if (!container.repulse) {
        container.repulse = { particles: [] };
      }
      const repulse = container.repulse;
      repulse.clicking = true;
      repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      repulse.particles = [];
      repulse.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        repulse.clicking = false;
      }, repulseOpts.duration * 1e3);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, hover = events.onHover, hoverEnabled = hover.enable, hoverMode = hover.mode, click = events.onClick, clickEnabled = click.enable, clickMode = click.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
      this._hoverRepulse();
    } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
      this._clickRepulse();
    } else {
      divModeExecute(repulseMode, divs, (selector, div) => this._singleSelectorRepulse(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, divs = events.onDiv, hover = events.onHover, click = events.onClick, divRepulse = isDivModeEnabled(repulseMode, divs);
    if (!(divRepulse || hover.enable && mouse.position || click.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = hover.mode, clickMode = click.mode;
    return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source?.repulse);
    }
  }
  reset() {
  }
}
async function loadExternalRepulseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRepulse", (container) => new Repulser(engine, container), refresh);
}
class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
}
const slowMode = "slow";
class Slower extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear(particle, delta, force) {
    if (particle.slow.inRange && !force) {
      return;
    }
    particle.slow.factor = 1;
  }
  init() {
    const container = this.container, slow = container.actualOptions.interactivity.modes.slow;
    if (!slow) {
      return;
    }
    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }
  async interact() {
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(slowMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source?.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container, options = container.actualOptions, mousePos = container.interactivity.mouse.position, radius = container.retina.slowModeRadius, slowOptions = options.interactivity.modes.slow;
    if (!slowOptions || !radius || radius < 0 || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(), dist = getDistance(mousePos, particlePos), proximityFactor = dist / radius, slowFactor = slowOptions.factor, { slow } = particle;
    if (dist > radius) {
      return;
    }
    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
}
async function loadExternalSlowInteraction(engine, refresh = true) {
  await engine.addInteractor("externalSlow", (container) => new Slower(container), refresh);
}
const InterlaceOffsets = [0, 4, 2, 1];
const InterlaceSteps = [8, 8, 4, 2];
class ByteStream {
  constructor(bytes) {
    this.pos = 0;
    this.data = new Uint8ClampedArray(bytes);
  }
  getString(count) {
    const slice = this.data.slice(this.pos, this.pos + count);
    this.pos += slice.length;
    return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    this.pos += 2;
    return this.data[this.pos - 2] + (this.data[this.pos - 1] << 8);
  }
  readSubBlocks() {
    let blockString = "", size = 0;
    do {
      size = this.data[this.pos++];
      for (let count = size; --count >= 0; blockString += String.fromCharCode(this.data[this.pos++])) {
      }
    } while (size !== 0);
    return blockString;
  }
  readSubBlocksBin() {
    let size = 0, len = 0;
    for (let offset = 0; (size = this.data[this.pos + offset]) !== 0; offset += size + 1) {
      len += size;
    }
    const blockData = new Uint8Array(len);
    for (let i = 0; (size = this.data[this.pos++]) !== 0; ) {
      for (let count = size; --count >= 0; blockData[i++] = this.data[this.pos++]) {
      }
    }
    return blockData;
  }
  skipSubBlocks() {
    for (; this.data[this.pos] !== 0; this.pos += this.data[this.pos] + 1) {
    }
    this.pos++;
  }
}
function parseColorTable(byteStream, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push({
      r: byteStream.data[byteStream.pos],
      g: byteStream.data[byteStream.pos + 1],
      b: byteStream.data[byteStream.pos + 2]
    });
    byteStream.pos += 3;
  }
  return colors;
}
async function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
  switch (byteStream.nextByte()) {
    case 249: {
      const frame = gif.frames[getFrameIndex(false)];
      byteStream.pos++;
      const packedByte = byteStream.nextByte();
      frame.GCreserved = (packedByte & 224) >>> 5;
      frame.disposalMethod = (packedByte & 28) >>> 2;
      frame.userInputDelayFlag = (packedByte & 2) === 2;
      const transparencyFlag = (packedByte & 1) === 1;
      frame.delayTime = byteStream.nextTwoBytes() * 10;
      const transparencyIndex = byteStream.nextByte();
      if (transparencyFlag) {
        getTransparencyIndex(transparencyIndex);
      }
      byteStream.pos++;
      break;
    }
    case 255: {
      byteStream.pos++;
      const applicationExtension = {
        identifier: byteStream.getString(8),
        authenticationCode: byteStream.getString(3),
        data: byteStream.readSubBlocksBin()
      };
      gif.applicationExtensions.push(applicationExtension);
      break;
    }
    case 254: {
      gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
      break;
    }
    case 1: {
      if (gif.globalColorTable.length === 0) {
        throw new EvalError("plain text extension without global color table");
      }
      byteStream.pos++;
      gif.frames[getFrameIndex(false)].plainTextData = {
        left: byteStream.nextTwoBytes(),
        top: byteStream.nextTwoBytes(),
        width: byteStream.nextTwoBytes(),
        height: byteStream.nextTwoBytes(),
        charSize: {
          width: byteStream.nextTwoBytes(),
          height: byteStream.nextTwoBytes()
        },
        foregroundColor: byteStream.nextByte(),
        backgroundColor: byteStream.nextByte(),
        text: byteStream.readSubBlocks()
      };
      break;
    }
    default:
      byteStream.skipSubBlocks();
      break;
  }
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  const frame = gif.frames[getFrameIndex(true)];
  frame.left = byteStream.nextTwoBytes();
  frame.top = byteStream.nextTwoBytes();
  frame.width = byteStream.nextTwoBytes();
  frame.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), localColorTableFlag = (packedByte & 128) === 128, interlacedFlag = (packedByte & 64) === 64;
  frame.sortFlag = (packedByte & 32) === 32;
  frame.reserved = (packedByte & 24) >>> 3;
  const localColorCount = 1 << (packedByte & 7) + 1;
  if (localColorTableFlag) {
    frame.localColorTable = parseColorTable(byteStream, localColorCount);
  }
  const getColor = (index) => {
    const { r, g, b } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
    return { r, g, b, a: index === getTransparencyIndex(null) ? avgAlpha ? ~~((r + g + b) / 3) : 0 : 255 };
  };
  const image = (() => {
    try {
      return new ImageData(frame.width, frame.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (image == null) {
    throw new EvalError("GIF frame size is to large");
  }
  const minCodeSize = byteStream.nextByte(), imageData = byteStream.readSubBlocksBin(), clearCode = 1 << minCodeSize;
  const readBits = (pos, len) => {
    const bytePos = pos >>> 3, bitPos = pos & 7;
    return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
  };
  if (interlacedFlag) {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
      if (InterlaceOffsets[pass] < frame.height) {
        for (let pixelPos = 0, lineIndex = 0; ; ) {
          const last = code;
          code = readBits(pos, size);
          pos += size + 1;
          if (code === clearCode) {
            size = minCodeSize + 1;
            dic.length = clearCode + 2;
            for (let i = 0; i < dic.length; i++) {
              dic[i] = i < clearCode ? [i] : [];
            }
          } else {
            if (code >= dic.length) {
              dic.push(dic[last].concat(dic[last][0]));
            } else if (last !== clearCode) {
              dic.push(dic[last].concat(dic[code][0]));
            }
            for (let i = 0; i < dic[code].length; i++) {
              const { r, g, b, a } = getColor(dic[code][i]);
              image.data.set([r, g, b, a], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
              pixelPos += 4;
            }
            if (dic.length === 1 << size && size < 12) {
              size++;
            }
          }
          if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
            lineIndex++;
            if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
              break;
            }
          }
        }
      }
      progressCallback?.(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
  } else {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pixelPos = -4; ; ) {
      const last = code;
      code = readBits(pos, size);
      pos += size;
      if (code === clearCode) {
        size = minCodeSize + 1;
        dic.length = clearCode + 2;
        for (let i = 0; i < dic.length; i++) {
          dic[i] = i < clearCode ? [i] : [];
        }
      } else {
        if (code === clearCode + 1) {
          break;
        }
        if (code >= dic.length) {
          dic.push(dic[last].concat(dic[last][0]));
        } else if (last !== clearCode) {
          dic.push(dic[last].concat(dic[code][0]));
        }
        for (let i = 0; i < dic[code].length; i++) {
          const { r, g, b, a } = getColor(dic[code][i]);
          image.data.set([r, g, b, a], pixelPos += 4);
        }
        if (dic.length >= 1 << size && size < 12) {
          size++;
        }
      }
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
    progressCallback?.((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
  }
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  switch (byteStream.nextByte()) {
    case 59:
      return true;
    case 44:
      await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
      break;
    case 33:
      await parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return false;
}
function getGIFLoopAmount(gif) {
  for (const extension of gif.applicationExtensions) {
    if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
      continue;
    }
    return extension.data[1] + (extension.data[2] << 8);
  }
  return NaN;
}
async function decodeGIF(gifURL, progressCallback, avgAlpha) {
  if (!avgAlpha)
    avgAlpha = false;
  const res = await fetch(gifURL);
  if (!res.ok && res.status === 404) {
    throw new EvalError("file not found");
  }
  const buffer = await res.arrayBuffer();
  const gif = {
    width: 0,
    height: 0,
    totalTime: 0,
    colorRes: 0,
    pixelAspectRatio: 0,
    frames: [],
    sortFlag: false,
    globalColorTable: [],
    backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
    comments: [],
    applicationExtensions: []
  }, byteStream = new ByteStream(new Uint8ClampedArray(buffer));
  if (byteStream.getString(6) !== "GIF89a") {
    throw new Error("not a supported GIF file");
  }
  gif.width = byteStream.nextTwoBytes();
  gif.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), globalColorTableFlag = (packedByte & 128) === 128;
  gif.colorRes = (packedByte & 112) >>> 4;
  gif.sortFlag = (packedByte & 8) === 8;
  const globalColorCount = 1 << (packedByte & 7) + 1, backgroundColorIndex = byteStream.nextByte();
  gif.pixelAspectRatio = byteStream.nextByte();
  if (gif.pixelAspectRatio !== 0) {
    gif.pixelAspectRatio = (gif.pixelAspectRatio + 15) / 64;
  }
  if (globalColorTableFlag) {
    gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
  }
  const backgroundImage = (() => {
    try {
      return new ImageData(gif.width, gif.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (backgroundImage == null) {
    throw new Error("GIF frame size is to large");
  }
  const { r, g, b } = gif.globalColorTable[backgroundColorIndex];
  backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
  for (let i = 4; i < backgroundImage.data.length; i *= 2) {
    backgroundImage.data.copyWithin(i, 0, i);
  }
  gif.backgroundImage = backgroundImage;
  let frameIndex = -1, incrementFrameIndex = true, transparencyIndex = -1;
  const getframeIndex = (increment) => {
    if (increment) {
      incrementFrameIndex = true;
    }
    return frameIndex;
  };
  const getTransparencyIndex = (newValue) => {
    if (newValue != null) {
      transparencyIndex = newValue;
    }
    return transparencyIndex;
  };
  try {
    do {
      if (incrementFrameIndex) {
        gif.frames.push({
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          disposalMethod: 0,
          image: new ImageData(1, 1, { colorSpace: "srgb" }),
          plainTextData: null,
          userInputDelayFlag: false,
          delayTime: 0,
          sortFlag: false,
          localColorTable: [],
          reserved: 0,
          GCreserved: 0
        });
        frameIndex++;
        transparencyIndex = -1;
        incrementFrameIndex = false;
      }
    } while (!await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback));
    gif.frames.length--;
    for (const frame of gif.frames) {
      if (frame.userInputDelayFlag && frame.delayTime === 0) {
        gif.totalTime = Infinity;
        break;
      }
      gif.totalTime += frame.delayTime;
    }
    return gif;
  } catch (error) {
    if (error instanceof EvalError) {
      throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
    }
    throw error;
  }
}
const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
  const { svgData } = imageShape;
  if (!svgData) {
    return "";
  }
  const colorStyle = getStyleFromHsl(color, opacity);
  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }
  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
  return new Promise((resolve) => {
    image.loading = true;
    const img = new Image();
    image.element = img;
    img.addEventListener("load", () => {
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.element = void 0;
      image.error = true;
      image.loading = false;
      getLogger().error(`${errorPrefix} loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
async function loadGifImage(image) {
  if (image.type !== "gif") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  try {
    image.gifData = await decodeGIF(image.source);
    image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? 0;
    if (image.gifLoopCount === 0) {
      image.gifLoopCount = Infinity;
    }
  } catch {
    image.error = true;
  }
  image.loading = false;
}
async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  const response = await fetch(image.source);
  if (!response.ok) {
    getLogger().error(`${errorPrefix} Image not found`);
    image.error = true;
  } else {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? 1), imageRes = {
    color,
    gif: imageData.gif,
    data: {
      ...image,
      svgData: svgColoredData
    },
    loaded: false,
    ratio: imageData.width / imageData.height,
    replaceColor: imageData.replaceColor,
    source: imageData.src
  };
  return new Promise((resolve) => {
    const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), domUrl = URL || window.URL || window.webkitURL || window, url = domUrl.createObjectURL(svg), img = new Image();
    img.addEventListener("load", () => {
      imageRes.loaded = true;
      imageRes.element = img;
      resolve(imageRes);
      domUrl.revokeObjectURL(url);
    });
    img.addEventListener("error", async () => {
      domUrl.revokeObjectURL(url);
      const img2 = {
        ...image,
        error: false,
        loading: true
      };
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    });
    img.src = url;
  });
}
class ImageDrawer {
  constructor(engine) {
    this.loadImageShape = async (imageShape) => {
      if (!this._engine.loadImage) {
        throw new Error(`${errorPrefix} image shape not initialized`);
      }
      await this._engine.loadImage({
        gif: imageShape.gif,
        name: imageShape.name,
        replaceColor: imageShape.replaceColor ?? false,
        src: imageShape.src
      });
    };
    this._engine = engine;
  }
  addImage(image) {
    if (!this._engine.images) {
      this._engine.images = [];
    }
    this._engine.images.push(image);
  }
  draw(data) {
    const { context, radius, particle, opacity, delta } = data, image = particle.image, element = image?.element;
    if (!image) {
      return;
    }
    context.globalAlpha = opacity;
    if (image.gif && image.gifData) {
      const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height), offscreenContext = offscreenCanvas.getContext("2d");
      if (!offscreenContext) {
        throw new Error("could not create offscreen canvas context");
      }
      offscreenContext.imageSmoothingQuality = "low";
      offscreenContext.imageSmoothingEnabled = false;
      offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      if (particle.gifLoopCount === void 0) {
        particle.gifLoopCount = image.gifLoopCount ?? 0;
      }
      let frameIndex = particle.gifFrame ?? 0;
      const pos = { x: -image.gifData.width * 0.5, y: -image.gifData.height * 0.5 }, frame = image.gifData.frames[frameIndex];
      if (particle.gifTime === void 0) {
        particle.gifTime = 0;
      }
      if (!frame.bitmap) {
        return;
      }
      context.scale(radius / image.gifData.width, radius / image.gifData.height);
      switch (frame.disposalMethod) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 0:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          break;
        case 1:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          break;
        case 2:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          if (image.gifData.globalColorTable.length === 0) {
            offscreenContext.putImageData(image.gifData.frames[0].image, pos.x + frame.left, pos.y + frame.top);
          } else {
            offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
          }
          break;
        case 3:
          {
            const previousImageData = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
            context.drawImage(offscreenCanvas, pos.x, pos.y);
            offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.putImageData(previousImageData, 0, 0);
          }
          break;
      }
      particle.gifTime += delta.value;
      if (particle.gifTime > frame.delayTime) {
        particle.gifTime -= frame.delayTime;
        if (++frameIndex >= image.gifData.frames.length) {
          if (--particle.gifLoopCount <= 0) {
            return;
          }
          frameIndex = 0;
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        }
        particle.gifFrame = frameIndex;
      }
      context.scale(image.gifData.width / radius, image.gifData.height / radius);
    } else if (element) {
      const ratio = image.ratio, pos = {
        x: -radius,
        y: -radius
      }, diameter = radius * 2;
      context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
    }
    context.globalAlpha = 1;
  }
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (!options.preload || !this._engine.loadImage) {
      return;
    }
    for (const imageData of options.preload) {
      await this._engine.loadImage(imageData);
    }
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const image = this._engine.images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      this.loadImageShape(imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const images = this._engine.images, imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const color = particle.getFillColor(), image = images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      return;
    }
    const replaceColor = imageData.replaceColor ?? image.replaceColor;
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    (async () => {
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
          loaded: true,
          ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
          replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = imageData.fill ?? particle.shapeFill, close = imageData.close ?? particle.shapeClose, imageShape = {
        image: imageRes,
        fill,
        close
      };
      particle.image = imageShape.image;
      particle.shapeFill = imageShape.fill;
      particle.shapeClose = imageShape.close;
    })();
  }
}
class Preload {
  constructor() {
    this.src = "";
    this.gif = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.gif !== void 0) {
      this.gif = data.gif;
    }
    if (data.height !== void 0) {
      this.height = data.height;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.replaceColor !== void 0) {
      this.replaceColor = data.replaceColor;
    }
    if (data.src !== void 0) {
      this.src = data.src;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
  }
}
class ImagePreloaderPlugin {
  constructor(engine) {
    this.id = "imagePreloader";
    this._engine = engine;
  }
  getPlugin() {
    return {};
  }
  loadOptions(options, source) {
    if (!source || !source.preload) {
      return;
    }
    if (!options.preload) {
      options.preload = [];
    }
    const preloadOptions = options.preload;
    for (const item of source.preload) {
      const existing = preloadOptions.find((t) => t.name === item.name || t.src === item.src);
      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();
        preload.load(item);
        preloadOptions.push(preload);
      }
    }
  }
  needsPlugin() {
    return true;
  }
}
function addLoadImageToEngine(engine) {
  if (engine.loadImage) {
    return;
  }
  engine.loadImage = async (data) => {
    if (!data.name && !data.src) {
      throw new Error(`${errorPrefix} no image source provided`);
    }
    if (!engine.images) {
      engine.images = [];
    }
    if (engine.images.find((t) => t.name === data.name || t.source === data.src)) {
      return;
    }
    try {
      const image = {
        gif: data.gif ?? false,
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - 3),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : void 0
      };
      engine.images.push(image);
      const imageFunc = data.gif ? loadGifImage : data.replaceColor ? downloadSvgImage : loadImage;
      await imageFunc(image);
    } catch {
      throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
    }
  };
}
async function loadImageShape(engine, refresh = true) {
  addLoadImageToEngine(engine);
  const preloader = new ImagePreloaderPlugin(engine);
  await engine.addPlugin(preloader, refresh);
  await engine.addShape(["image", "images"], new ImageDrawer(engine), refresh);
}
class LifeDelay extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
}
class LifeDuration extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
}
class Life {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
}
class LifeUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container, particlesOptions = particle.options, lifeOptions = particlesOptions.life;
    if (!lifeOptions) {
      return;
    }
    particle.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1e3 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1e3 : 0,
      time: 0,
      count: lifeOptions.count
    };
    if (particle.life.duration <= 0) {
      particle.life.duration = -1;
    }
    if (particle.life.count <= 0) {
      particle.life.count = -1;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > 0;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.life) {
      options.life = new Life();
    }
    for (const source of sources) {
      options.life.load(source?.life);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }
    const life = particle.life;
    let justSpawned = false;
    if (particle.spawning) {
      life.delayTime += delta.value;
      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }
    if (life.duration === -1) {
      return;
    }
    if (particle.spawning) {
      return;
    }
    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }
    if (life.time < life.duration) {
      return;
    }
    life.time = 0;
    if (particle.life.count > 0) {
      particle.life.count--;
    }
    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }
    const canvasSize = this.container.canvas.size, widthRange = setRangeValue(0, canvasSize.width), heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    if (lifeOptions) {
      life.delay = getRangeValue(lifeOptions.delay.value) * 1e3;
      life.duration = getRangeValue(lifeOptions.duration.value) * 1e3;
    }
  }
}
async function loadLifeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("life", (container) => new LifeUpdater(container), refresh);
}
class LineDrawer {
  draw(data) {
    const { context, particle, radius } = data, shapeData = particle.shapeData;
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
    context.lineCap = shapeData?.cap ?? "butt";
  }
  getSidesCount() {
    return 1;
  }
}
async function loadLineShape(engine, refresh = true) {
  await engine.addShape("line", new LineDrawer(), refresh);
}
class ParallaxMover {
  init() {
  }
  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(particle) {
    const container = particle.container, options = container.actualOptions, parallaxOptions = options.interactivity.events.onHover.parallax;
    if (isSsr() || !parallaxOptions.enable) {
      return;
    }
    const parallaxForce = parallaxOptions.force, mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasSize = container.canvas.size, canvasCenter = {
      x: canvasSize.width * 0.5,
      y: canvasSize.height * 0.5
    }, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    }, { offset } = particle;
    offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
    offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
  }
}
async function loadParallaxMover(engine, refresh = true) {
  await engine.addMover("parallax", () => new ParallaxMover(), refresh);
}
class Attractor2 extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  async interact(p1) {
    const container = this.container;
    if (p1.attractDistance === void 0) {
      p1.attractDistance = getRangeValue(p1.options.move.attract.distance) * container.retina.pixelRatio;
    }
    const distance = p1.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), { dx, dy } = getDistances(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1e3), ay = dy / (rotate.y * 1e3), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {
  }
}
async function loadParticlesAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesAttract", (container) => new Attractor2(container), refresh);
}
function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / 10, 0, r2);
  p1.size.value += factor / 2;
  p2.size.value -= factor;
  if (r2 <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}
function absorb(p1, p2, delta, pixelRatio) {
  const r1 = p1.getRadius(), r2 = p2.getRadius();
  if (r1 === void 0 && r2 !== void 0) {
    p1.destroy();
  } else if (r1 !== void 0 && r2 === void 0) {
    p2.destroy();
  } else if (r1 !== void 0 && r2 !== void 0) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
    }
  }
}
const fixBounceSpeed = (p) => {
  if (p.collisionMaxSpeed === void 0) {
    p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
  }
  if (p.velocity.length > p.collisionMaxSpeed) {
    p.velocity.length = p.collisionMaxSpeed;
  }
};
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}
function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === void 0 && p2.getRadius() !== void 0) {
    p1.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() === void 0) {
    p2.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() !== void 0) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
    deleteP.destroy();
  }
}
function resolveCollision(p1, p2, delta, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb": {
      absorb(p1, p2, delta, pixelRatio);
      break;
    }
    case "bounce": {
      bounce(p1, p2);
      break;
    }
    case "destroy": {
      destroy(p1, p2);
      break;
    }
  }
}
class Collider extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  async interact(p1, delta) {
    if (p1.destroyed || p1.spawning) {
      return;
    }
    const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), radius2 = p2.getRadius();
      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }
      const dist = getDistance(pos1, pos2), distP = radius1 + radius2;
      if (dist > distP) {
        continue;
      }
      resolveCollision(p1, p2, delta, container.retina.pixelRatio);
    }
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {
  }
}
async function loadParticlesCollisionsInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesCollisions", (container) => new Collider(container), refresh);
}
class CircleWarp extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = { ...canvasSize };
  }
  contains(point) {
    const { width, height } = this.canvasSize;
    const { x, y } = point;
    return super.contains(point) || super.contains({ x: x - width, y }) || super.contains({ x: x - width, y: y - height }) || super.contains({ x, y: y - height });
  }
  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }
    const rect = range, circle = range, newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };
    if (circle.radius !== void 0) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== void 0) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }
    return false;
  }
}
class LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.color.value = "#000";
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
}
class LinksTriangle {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.id !== void 0) {
      this.id = data.id;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
}
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  const { dx, dy, distance } = getDistances(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const absDiffs = {
    x: Math.abs(dx),
    y: Math.abs(dy)
  }, warpDistances = {
    x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
    y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
  };
  return Math.sqrt(warpDistances.x ** 2 + warpDistances.y ** 2);
}
class Linker extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
    this._setColor = (p1) => {
      if (!p1.options.links) {
        return;
      }
      const container2 = this.linkContainer, linksOptions = p1.options.links;
      let linkColor = linksOptions.id === void 0 ? container2.particles.linksColor : container2.particles.linksColors.get(linksOptions.id);
      if (linkColor) {
        return;
      }
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      if (linksOptions.id === void 0) {
        container2.particles.linksColor = linkColor;
      } else {
        container2.particles.linksColors.set(linksOptions.id, linkColor);
      }
    };
    this.linkContainer = container;
  }
  clear() {
  }
  init() {
    this.linkContainer.particles.linksColor = void 0;
    this.linkContainer.particles.linksColors = /* @__PURE__ */ new Map();
  }
  async interact(p1) {
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = p1.retina.linksDistance ?? 0, warp = linkOpt1.warp, range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance), query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !linkOpt2?.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some((t) => t.destination === p2) || p2.links.some((t) => t.destination === p1)) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        continue;
      }
      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this._setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }
  isEnabled(particle) {
    return !!particle.options.links?.enable;
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load(source?.links);
    }
  }
  reset() {
  }
}
async function loadLinksInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesLinks", (container) => new Linker(container), refresh);
}
function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
function drawLinkLine(params) {
  let drawn = false;
  const { begin, end, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (links.warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);
    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = { x: 0, y: yi };
      pi2 = { x: canvasSize.width, y: yi };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);
      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = { x: xi, y: 0 };
        pi2 = { x: xi, y: canvasSize.height };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);
        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = { x: xi, y: yi };
          pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
        }
      }
    }
    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }
  if (!drawn) {
    return;
  }
  context.lineWidth = width;
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  const { shadow } = links;
  if (shadow.enable) {
    const shadowColor = rangeColorToRgb(shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(params) {
  const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function getLinkKey(ids) {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
  const key = getLinkKey(particles.map((t) => t.id));
  let res = dictionary.get(key);
  if (res === void 0) {
    res = getRandom();
    dictionary.set(key, res);
  }
  return res;
}
class LinkInstance {
  constructor(container) {
    this.container = container;
    this._drawLinkLine = (p1, link) => {
      const p1LinksOptions = p1.options.links;
      if (!p1LinksOptions?.enable) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, p2 = link.destination, pos1 = p1.getPosition(), pos2 = p2.getPosition();
      let opacity = link.opacity;
      container2.canvas.draw((ctx) => {
        let colorLine;
        const twinkle = p1.options.twinkle?.lines;
        if (twinkle?.enable) {
          const twinkleFreq = twinkle.frequency, twinkleRgb = rangeColorToRgb(twinkle.color), twinkling = getRandom() < twinkleFreq;
          if (twinkling && twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }
        if (!colorLine) {
          const linkColor = p1LinksOptions.id !== void 0 ? container2.particles.linksColors.get(p1LinksOptions.id) : container2.particles.linksColor;
          colorLine = getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
          return;
        }
        const width = p1.retina.linksWidth ?? 0, maxDistance = p1.retina.linksDistance ?? 0, { backgroundMask } = options;
        drawLinkLine({
          context: ctx,
          width,
          begin: pos1,
          end: pos2,
          maxDistance,
          canvasSize: container2.canvas.size,
          links: p1LinksOptions,
          backgroundMask,
          colorLine,
          opacity
        });
      });
    };
    this._drawLinkTriangle = (p1, link1, link2) => {
      const linksOptions = p1.options.links;
      if (!linksOptions?.enable) {
        return;
      }
      const triangleOptions = linksOptions.triangles;
      if (!triangleOptions.enable) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, p2 = link1.destination, p3 = link2.destination, opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;
      if (opacityTriangle <= 0) {
        return;
      }
      container2.canvas.draw((ctx) => {
        const pos1 = p1.getPosition(), pos2 = p2.getPosition(), pos3 = p3.getPosition(), linksDistance = p1.retina.linksDistance ?? 0;
        if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
          return;
        }
        let colorTriangle = rangeColorToRgb(triangleOptions.color);
        if (!colorTriangle) {
          const linkColor = linksOptions.id !== void 0 ? container2.particles.linksColors.get(linksOptions.id) : container2.particles.linksColor;
          colorTriangle = getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
          return;
        }
        drawLinkTriangle({
          context: ctx,
          pos1,
          pos2,
          pos3,
          backgroundMask: options.backgroundMask,
          colorTriangle,
          opacityTriangle
        });
      });
    };
    this._drawTriangles = (options, p1, link, p1Links) => {
      const p2 = link.destination;
      if (!(options.links?.triangles.enable && p2.options.links?.triangles.enable)) {
        return;
      }
      const vertices = p2.links?.filter((t) => {
        const linkFreq = this._getLinkFrequency(p2, t.destination);
        return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex((l) => l.destination === t.destination) >= 0;
      });
      if (!vertices?.length) {
        return;
      }
      for (const vertex of vertices) {
        const p3 = vertex.destination, triangleFreq = this._getTriangleFrequency(p1, p2, p3);
        if (triangleFreq > options.links.triangles.frequency) {
          continue;
        }
        this._drawLinkTriangle(p1, link, vertex);
      }
    };
    this._getLinkFrequency = (p1, p2) => {
      return setLinkFrequency([p1, p2], this._freqs.links);
    };
    this._getTriangleFrequency = (p1, p2, p3) => {
      return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
    this._freqs = {
      links: /* @__PURE__ */ new Map(),
      triangles: /* @__PURE__ */ new Map()
    };
  }
  drawParticle(context, particle) {
    const { links, options } = particle;
    if (!links || links.length <= 0) {
      return;
    }
    const p1Links = links.filter((l) => options.links && this._getLinkFrequency(particle, l.destination) <= options.links.frequency);
    for (const link of p1Links) {
      this._drawTriangles(options, particle, link, p1Links);
      if (link.opacity > 0 && (particle.retina.linksWidth ?? 0) > 0) {
        this._drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = /* @__PURE__ */ new Map();
    this._freqs.triangles = /* @__PURE__ */ new Map();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this.container.retina.pixelRatio, { retina } = particle, { distance, width } = particle.options.links;
    retina.linksDistance = distance * ratio;
    retina.linksWidth = width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
}
class LinksPlugin {
  constructor() {
    this.id = "links";
  }
  getPlugin(container) {
    return new LinkInstance(container);
  }
  loadOptions() {
  }
  needsPlugin() {
    return true;
  }
}
async function loadLinksPlugin(engine, refresh = true) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin, refresh);
}
async function loadParticlesLinksInteraction(engine, refresh = true) {
  await loadLinksInteraction(engine, refresh);
  await loadLinksPlugin(engine, refresh);
}
class PolygonDrawerBase {
  draw(data) {
    const { context, particle, radius } = data, start = this.getCenter(particle, radius), side = this.getSidesData(particle, radius), sideCount = side.count.numerator * side.count.denominator, decimalSides = side.count.numerator / side.count.denominator, interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides, interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
    if (!context) {
      return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);
    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }
  getSidesCount(particle) {
    const polygon = particle.shapeData;
    return Math.round(getRangeValue(polygon?.sides ?? 5));
  }
}
class PolygonDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }
  getSidesData(particle, radius) {
    const sides = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }
}
class TriangleDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }
  getSidesCount() {
    return 3;
  }
  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }
}
async function loadGenericPolygonShape(engine, refresh = true) {
  await engine.addShape("polygon", new PolygonDrawer(), refresh);
}
async function loadTriangleShape(engine, refresh = true) {
  await engine.addShape("triangle", new TriangleDrawer(), refresh);
}
async function loadPolygonShape(engine, refresh = true) {
  await loadGenericPolygonShape(engine, refresh);
  await loadTriangleShape(engine, refresh);
}
class RotateAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
}
class Rotate extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = "clockwise";
    this.path = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    this.animation.load(data.animation);
    if (data.path !== void 0) {
      this.path = data.path;
    }
  }
}
function updateRotate(particle, delta) {
  const rotate = particle.rotate, rotateOptions = particle.options.rotate;
  if (!rotate || !rotateOptions) {
    return;
  }
  const rotateAnimation = rotateOptions.animation, speed = (rotate.velocity ?? 0) * delta.factor, max = 2 * Math.PI, decay = rotate.decay ?? 1;
  if (!rotateAnimation.enable) {
    return;
  }
  switch (rotate.status) {
    case "increasing":
      rotate.value += speed;
      if (rotate.value > max) {
        rotate.value -= max;
      }
      break;
    case "decreasing":
    default:
      rotate.value -= speed;
      if (rotate.value < 0) {
        rotate.value += max;
      }
      break;
  }
  if (rotate.velocity && decay !== 1) {
    rotate.velocity *= decay;
  }
}
class RotateUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    if (!rotateOptions) {
      return;
    }
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === "random") {
      const index = Math.floor(getRandom() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.rotate.status = "decreasing";
        break;
      case "clockwise":
        particle.rotate.status = "increasing";
        break;
    }
    const rotateAnimation = rotateOptions.animation;
    if (rotateAnimation.enable) {
      particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }
    particle.rotation = particle.rotate.value;
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    if (!rotate) {
      return false;
    }
    return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
  }
  loadOptions(options, ...sources) {
    if (!options.rotate) {
      options.rotate = new Rotate();
    }
    for (const source of sources) {
      options.rotate.load(source?.rotate);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRotate(particle, delta);
    particle.rotation = particle.rotate?.value ?? 0;
  }
}
async function loadRotateUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container), refresh);
}
const fixFactor = Math.sqrt(2);
class SquareDrawer {
  draw(data) {
    const { context, radius } = data, fixedRadius = radius / fixFactor, fixedDiameter = fixedRadius * 2;
    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
  }
  getSidesCount() {
    return 4;
  }
}
async function loadSquareShape(engine, refresh = true) {
  await engine.addShape(["edge", "square"], new SquareDrawer(), refresh);
}
class StarDrawer {
  draw(data) {
    const { context, particle, radius } = data, sides = particle.sides, inset = particle.starInset ?? 2;
    context.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }
  getSidesCount(particle) {
    const star = particle.shapeData;
    return Math.round(getRangeValue(star?.sides ?? 5));
  }
  particleInit(container, particle) {
    const star = particle.shapeData;
    particle.starInset = getRangeValue(star?.inset ?? 2);
  }
}
async function loadStarShape(engine, refresh = true) {
  await engine.addShape("star", new StarDrawer(), refresh);
}
function updateColorValue(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset), velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6, decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateStrokeColor(particle, delta) {
  if (!particle.strokeColor || !particle.strokeAnimation) {
    return;
  }
  const { h, s, l } = particle.strokeColor, { h: hAnimation, s: sAnimation, l: lAnimation } = particle.strokeAnimation;
  if (h) {
    updateColorValue(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue(delta, l, lAnimation, 100, true);
  }
}
class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container, options = particle.options;
    const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? 1);
    particle.strokeAnimation = stroke.color?.animation;
    const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const color = particle.strokeAnimation, { strokeColor } = particle;
    return !particle.destroyed && !particle.spawning && !!color && (strokeColor?.h.value !== void 0 && strokeColor.h.enable || strokeColor?.s.value !== void 0 && strokeColor.s.enable || strokeColor?.l.value !== void 0 && strokeColor.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateStrokeColor(particle, delta);
  }
}
async function loadStrokeColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container), refresh);
}
async function loadSlim(engine, refresh = true) {
  await loadParallaxMover(engine, false);
  await loadExternalAttractInteraction(engine, false);
  await loadExternalBounceInteraction(engine, false);
  await loadExternalBubbleInteraction(engine, false);
  await loadExternalConnectInteraction(engine, false);
  await loadExternalGrabInteraction(engine, false);
  await loadExternalPauseInteraction(engine, false);
  await loadExternalPushInteraction(engine, false);
  await loadExternalRemoveInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await loadExternalSlowInteraction(engine, false);
  await loadParticlesAttractInteraction(engine, false);
  await loadParticlesCollisionsInteraction(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadEasingQuadPlugin();
  await loadEmojiShape(engine, false);
  await loadImageShape(engine, false);
  await loadLineShape(engine, false);
  await loadPolygonShape(engine, false);
  await loadSquareShape(engine, false);
  await loadStarShape(engine, false);
  await loadLifeUpdater(engine, false);
  await loadRotateUpdater(engine, false);
  await loadStrokeColorUpdater(engine, false);
  await loadBasic(engine, refresh);
}
const initialized = writable(false);
async function particlesInit(init2) {
  tsParticles.init();
  await init2(tsParticles);
  initialized.set(true);
}
const Particles2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let particlesConfig = {
    particles: {
      color: { value: "#ffff" },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "out" },
        random: true,
        speed: 0.1,
        straight: false
      },
      links: { enable: false, color: "#000" },
      number: { value: 100 },
      opacity: {
        animation: { enable: true, speed: 1, sync: false },
        value: { min: 0, max: 1 }
      },
      size: { value: { min: 1, max: 3 } }
    }
  };
  void particlesInit(async (engine) => {
    await loadSlim(engine);
  });
  return `${validate_component(missing_component, "svelte:component").$$render(
    $$result,
    {
      id: "tsparticles",
      class: "foo bar",
      style: "",
      options: particlesConfig,
      particlesInit
    },
    {},
    {}
  )}`;
});
const mainLogo = "/_app/immutable/assets/coffee-code-studio-logo.9f0585f5.png";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `
<header aria-label="Site Header" class="sticky top-0 bg-white dark:bg-gray-900"><div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 items-center justify-between"><div class="flex-1 md:flex md:items-center md:gap-12"><a class="block text-teal-600 dark:text-teal-300" href="/"><span class="sr-only">Home</span>
					<img class="pointer-events-none"${add_attribute("src", mainLogo, 0)} alt="Coffee Code Studio"${add_attribute("width", 64, 0)}${add_attribute("height", 64, 0)}></a></div>
			<div class="md:flex md:items-center md:gap-12"><nav aria-label="Site Nav" class="hidden md:block"><ul class="flex items-center gap-6 text-sm"><li><a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" href="#home">Home
							</a></li>
						<li><a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" href="#about">About
							</a></li>
						<li><a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" href="#services">Services</a></li>
						
						<li><a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" href="#contact">Contact</a></li></ul></nav>
				<div><div class="block md:hidden"><button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75" aria-label="Toggle mobile navigation"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div></div></div>
		${``}</div></header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const currentYear = /* @__PURE__ */ (/* @__PURE__ */ new Date()).getFullYear();
  return `<footer aria-label="Site Footer" class="bg-gray-50 dark:bg-gray-900"><div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8"><div class="sm:flex sm:items-center sm:justify-between"><div class="flex justify-center text-teal-600 dark:text-teal-300 sm:justify-start"><img class="pointer-events-none"${add_attribute("src", mainLogo, 0)} alt="Coffee Code Studio"${add_attribute("width", 64, 0)}${add_attribute("height", 64, 0)}>
		</div>
		<p class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 lg:mt-0 lg:text-right">Copyright © ${escape(currentYear)} Coffee Code Studio. All rights reserved.</p></div></div></footer>`;
});
const mesh = "_mesh_127wb_11";
const styles = {
  mesh,
  "bg-mesh-animation": "_bg-mesh-animation_127wb_1"
};
const Background2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_attribute("class", `${styles.mesh}`, 0)}></div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@media(prefers-color-scheme: dark){body{background-color:#111827}}@media(prefers-color-scheme: light){body{background-color:#ffffff}}body{scroll-behavior:smooth}@keyframes svelte-1ame8ch-bg-mesh-animation{0%,100%{transform:translate(-50%, -60%)}50%{transform:translate(-60%, -50%)}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log(`%cCoffee Code Studio`, `
        font-size: 50px;
        color: #111827;
        background:linear-gradient(#86efac, #3b82f6, #9333ea);
        border-radius: 15px;
        padding: 1rem;
        `);
  $$result.css.add(css);
  return `${validate_component(Background2, "Background").$$render($$result, {}, {}, {})}

${validate_component(Particles2, "Particles").$$render($$result, {}, {}, {})}

${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<div class="container justify-center items-center max-w-full">${slots.default ? slots.default({}) : ``}
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
