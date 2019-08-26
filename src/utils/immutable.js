import { Map, List } from 'immutable';
import invariant from './invariant';
// import {isNumber} from "./is";

function pathToArray(path) {
  if (Array.isArray(path)) return path;
  if (!path || !path.length) return [];
  return path
    .replace(/\\\./g, '@')
    .replace(/\./g, '*')
    .replace(/@/g, '.')
    .split('*');
}

export function create(src, path, value) {
  const pathArr = pathToArray(path);
  // if the path end is undefined means that the value is not existed in the Map
  if (!src.getIn(pathArr)) {
    return src.mergeIn(pathArr, Map(value));
  }

  // is immutable List
  if (List.isList(src.getIn(pathArr))) {
    return src.updateIn(pathArr, arr => arr.concat([value]));
  }

  return src;
}

export function update(src, path, newVal) {
  const pathArr = pathToArray(path);
  // const subPathArr = pathToArray(subPath);
  if (!Map.isMap(src.getIn(pathArr))) {
    return src.setIn(pathArr, newVal);
  }

  return src.mergeDeepIn(pathArr, newVal);
}

/**
 * find the path array for mix src path
 * @param src The object to evaluate.
 * @param pathArr The root path to start searching.
 * @param subPathArr The path that needs to go deep inside src.
 *
 */

// function extractPathArrFromMixSource(src, pathArr, subPathArr) {
//   let currentPath = src.getIn(pathArr);
//   let finalPathArr = [...pathArr];
//   subPathArr.forEach(path => {
//     if (List.isList(currentPath)) {
//       const index = currentPath.findIndex(item => {
//         return item.get('id').toString() === path
//       });
//       if (index > -1) {
//         finalPathArr = finalPathArr.concat(index);
//         currentPath = src.getIn([...pathArr, index])
//       }
//     } else {
//       finalPathArr = finalPathArr.concat(path);
//       currentPath = currentPath.getIn([path])
//     }
//   });
//
//   return finalPathArr;
// }

export function remove(src, path, arrayOfValue, identifier = 'id') {
  // invariant(arrayOfValue.length, `Array cannot be empty`);
  const pathArr = pathToArray(path);
  // return src.deleteIn([pathArr, String(arrayOfvalue[0])]);
  if (Map.isMap(src.getIn(pathArr))) {
    return arrayOfValue.reduce((result, next) => {
      return result.deleteIn([...pathArr, String(next)]);
    }, src);
  }

  if (List.isList(src.getIn(pathArr))) {
    const node = src.getIn(pathArr);
    const newNode = node.filter(val => {
      if (Map.isMap(val)) {
        return !arrayOfValue.includes(val.get(identifier));
      }
      return !arrayOfValue.includes(val);
    });
    return src.updateIn(pathArr, () => List(newNode));
  }

  return src;
}

// TODO: implement later
export function reaarange(src) {
  return src;
}
