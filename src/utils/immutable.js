import { Map, List } from 'immutable';

function pathToArray(path) {
  if (Array.isArray(path)) return path;
  if (!path || !path.length) return [];
  return path
    .replace(/\\\./g, '@')
    .replace(/\./g, '*')
    .replace(/@/g, '.')
    .split('*');
}

export function create(src, path, value, subPath) {
  const pathArr = pathToArray(path);
  console.log('pathArr', pathArr);
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

export function update(src, path, newVal, subPath) {
  const pathArr = pathToArray(path);
  // const subPathArr = pathToArray(subPath);
  // if (!Map.isMap(src.getIn(pathArr))) {
  //   return src.setIn(pathArr, newVal);
  // }
  // if (List.isList(src.getIn(pathArr))) {
  //   if (subPathArr.length) {
  //     const finalPathArr = extractPathArrFromMixSource(src, pathArr, subPathArr);
  //     return src.setIn(finalPathArr, newVal);
  //   }
  // }
  console.log('newVal', newVal, pathArr);
  return src.setIn(pathArr, newVal);
}

/**
 * find the path array for mix src path
 * @param src The object to evaluate.
 * @param pathArr The root path to start searching.
 * @param subPathArr The path that needs to go deep inside src.
 *
 */

function extractPathArrFromMixSource(src, pathArr, subPathArr) {
  let currentPath = src.getIn(pathArr);
  let finalPathArr = [...pathArr];
  subPathArr.forEach(path => {
    if (List.isList(currentPath)) {
      const index = currentPath.findIndex(item => {
        return item.get('id').toString() === path
      });
      if (index > -1) {
        finalPathArr = finalPathArr.concat(index);
        currentPath = src.getIn([...pathArr, index])
      }
    } else {
      finalPathArr = finalPathArr.concat(path);
      currentPath = currentPath.getIn([path])
    }
  });

  return finalPathArr;
}

export function remove(src, path, arrayOfValue) {
  const pathArr = pathToArray(path);
  // return src.deleteIn([pathArr, String(arrayOfvalue[0])]);

  if (Map.isMap(src.getIn(pathArr))) {
    return arrayOfValue.reduce((result, next) => {
      return result.deleteIn([...pathArr, String(next)]);
    }, src);
  }

  if (List.isList(src.getIn(pathArr))) {
    const node = src.getIn(pathArr);
    const newNode = node.filter(val => !arrayOfValue.includes(val));
    return src.updateIn(pathArr, () => List(newNode));
    // return
  }

  return src;
}

// TODO: implement later
export function reaarange(src, path) {
  return src
}
