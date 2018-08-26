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

export function add(src, path, value) {
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

export function set(src, path, newVal) {
  const pathArr = pathToArray(path);
  return src.setIn(pathArr, newVal);
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
