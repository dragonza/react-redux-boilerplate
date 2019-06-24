import {
  isArray,
  isFunction,
  isNumber,
  isObject,
  isEmpty,
  isUndefined
} from './is';
import invariant from './invariant';
import { removeItems } from './object';

/**
 * Convert path format to array
 */
function pathToArray(path) {
  if (isArray(path)) return path;
  if (isEmpty(path)) return [];
  return path
    .replace(/\\\./g, '@')
    .replace(/\./g, '*')
    .replace(/@/g, '.')
    .split('*');
}

/**
 * Handle index of array
 */
function getArrayIndex(head) {
  invariant(isNumber(head), `Array index '${head}' has to be an integer`);
  return head;
}

/**
 * Set a value. Check merge for multiple values
 * @param src The object to evaluate.
 * @param path The path to be set.
 * @param value The value to set.
 */
export function set(src, path, value) {
  invariant(!isEmpty(path), 'path is required for setting data');
  const pathArr = pathToArray(path);

  const setImmutable = (obj, pathList, val) => {
    if (!pathList.length) {
      return isFunction(value) ? val(obj, pathList[0]) : val;
    }
    const isArr = isArray(obj);
    const clone = isArr ? obj.slice() : Object.assign({}, obj);
    const curPath = isArr ? getArrayIndex(pathList[0]) : pathList[0];
    clone[curPath] = setImmutable(
      !isUndefined(obj[curPath]) ? obj[curPath] : {},
      pathList.slice(1),
      val
    );
    return clone;
  };

  return setImmutable(src, pathArr, value);
}

/**
 * Get a value by a dot path.
 * @param src The object to evaluate.
 * @param path The path to value that should be returned.
 */
export function get(src, path) {
  const pathList = pathToArray(path);
  if (pathList.length === 0) return src;
  return pathList.reduce((result, pathFragment) => {
    return result ? result[pathFragment] : src[pathFragment];
  }, null);
}

/**
 * Delete an array of items.
 * If target container is an object, the property is deleted.
 * If target container is an array, the index is deleted.
 * If target container is undefined, nothing is deleted.
 * @param src The object to evaluate.
 * @param path The path to target container.
 * @param _ids The array of property or index which will be deleted.
 */
export function remove(src, path, _ids) {
  invariant(arguments.length >= 3, 'src, path and _ids are required');
  invariant(
    isArray(_ids),
    `Expected _ids to be an array but got ${typeof _ids}`
  );
  if (isEmpty(path)) {
    if (isArray(src)) return src.filter(i => !_ids.includes(i));
    if (isObject(src)) return removeItems(src, _ids);
    return src;
  }

  if (isUndefined(get(src, path))) return src;

  return set(src, path, val => {
    if (isArray(val)) {
      // invariant(!(_ids.some((id) => !isNumber(id))), 'Array index has to be an integer');
      return val.filter(v => !_ids.includes(v));
    } else if (isObject(val)) {
      const idStrList = _ids.map(String);
      return Object.keys(val).reduce((result, k) => {
        return !idStrList.includes(k) ? { ...result, [k]: val[k] } : result;
      }, {});
    }
    return val;
  });
}

/**
 * Merges a value.  The target value must be an object, array, null, or undefined.
 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.
 * @param src The object to evaluate.
 * @param path The path to the value.
 * @param val The value to merge into the target value.
 */
export function merge(src, path, val) {
  return set(src, path, curVal => {
    if (curVal === null || isUndefined(curVal)) {
      return val;
    } else if (isArray(curVal)) {
      return curVal.concat(val);
    } else if (isObject(curVal)) {
      return Object.assign({}, curVal, val);
    }
    return src;
  });
}

/**
 * Rearrange the order of an item in a list.
 *
 * @param src
 * @param path
 * @param val
 * @returns {*}
 */

// TODO: need review
export function rearrange(src, path, val) {
  invariant(!isEmpty(path), 'path is required');
  invariant(!isEmpty(val), 'val needs to include sourceIndex and targetIndex');

  const { sourceIndex, targetIndex } = val;
  return set(src, path, curVal => {
    const copyArr = [...curVal];
    const movingItem = curVal[sourceIndex];
    copyArr.splice(sourceIndex, 1);
    copyArr.splice(targetIndex, 0, movingItem);
    return copyArr;
  });
}
