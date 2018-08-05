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
export function set(src, path, value) {
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
// eslint-disable-next-line
export function remove(src, path, arrayOfvalue) {
  return src;
}
