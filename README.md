This boilerplate was ejected from [Create React App](https://github.com/facebookincubator/create-react-app).
This boilerplate is built to be ready for react + redux projects.
The main packages includes:
- React
- React-Router
- Redux
- Redux-Saga

Below you will find some information on how to perform common tasks.<br>


## Getting Started

1. `npm i` - Install dependencies. This might take a while.
2. `npm start` - Run development build.

## Advanced Commands

* `npm run deploy` - Deploys the contents of the `build/` directory below the **gh-pages** branch.
* `npm run build` - Generate a production version under '/build'.

## How it works

The boilerplate comes with some immutability helper functions that help to update Redux store without writing so much redundant code for reducers.
 
* `Set`: set a value (new or existing) to a particular path provided.
```javascript
import { UPDATE_DATE } from './action/note-action';
const path = 'noteList';
export const updateNote = (id, text) => {
  return SET_DATA({
    _path: `${path}.${id}.task`,
    _value: text,
  });
};
```
* `Get`: get data from a path.

```javascript
import { GET_DATA } from './action/note-action';
const path = 'noteList';
export const getNote = (id, text) => {
  return GET_DATA({
    _path: `${path}.${id}.task`,
    _value: text,
  });
};
```
* `Remove`: Delete an array of items. Note: ids need to be an array.
```javascript
import { REMOVE_DATA } from './action/note-action';
const path = 'noteList';
export const deleteNote = (ids) => {
  return REMOVE_DATA({
    _path: path,
    _value: ids,
  });
};
```
* `Merge`: merge a value into a given source.
```javascript
import { MERGE_DATA } from './action/note-action';
const path = 'noteList';
export const addNote = (text) => {
  const id = Math.ceil(new Date());
  return MERGE_DATA({
    _path: `${path}.${id}`,
    _value: {
      id,
      task: text,
    },
  });
};
```

* `Rearrange`: rearrange an item to another position in a same list
```javascript
import { REARRANGE_DATA } from './action/lane-action';
const path = 'laneList';
export const arrangeNote = ({ sourceNoteIndex, targetNoteIndex, laneId }) => {
  return REARRANGE_DATA({
    _path: `${path}.${laneId}.notes`,
    _value: {
      sourceIndex: sourceNoteIndex,
      targetIndex: targetNoteIndex,
    },
  });
};
```

## Create new actions and reducers
You can add your own actions and reducers when needed. The flow is the same as working in a typical redux project.
Add your reducers in the `root-reducers.js`

```javascript
// Put new reducers here
const reducers = {
  router: routerReducer,
  newReducers,
};
```

You can also create your own data-action in `data-action.js`.
First, create your actions

```javascript
export const dataActionConst = {
  SET_DATA: 'SET_DATA',
  GET_DATA: 'GET_DATA',
  REMOVE_DATA: 'REMOVE_DATA',
  MERGE_DATA: 'MERGE_DATA',
  TOGGLE_DATA: 'TOGGLE_DATA',
  REARRANGE_DATA: 'REARRANGE_DATA',
  // new action here
  NEW_ACTION_DATA: 'NEW_ACTION_DATA',
};
export const SET_DATA = createDataAction(dataActionConst.SET_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
// create new data action
export const NEW_ACTION_DATA = createDataAction(dataActionConst.NEW_ACTION_DATA);
```

Then create your helper function in `immutable.js`.

```javascript
export function new_action(src, path, val) {
  //your code here
}
```
*Note*: The name of the new action has to match the helper function name. Otherwise, it will not work as expected.

## Notes:
This boilerplate is inspired by https://github.com/mvtnghia/web-boilerplate

