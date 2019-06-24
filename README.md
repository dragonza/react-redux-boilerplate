This boilerplate was ejected from [Create React App](https://github.com/facebookincubator/create-react-app).
This boilerplate is built to be ready for react + redux projects.
The main packages includes:

- React
- React-Router
- Redux
- Redux-Saga

Below you will find some information on how to perform common tasks.<br>

## Getting Started

1.  `npm i` - Install dependencies. This might take a while.
2.  `npm start` - Run development build.

## Advanced Commands

- `npm run deploy` - Deploys the contents of the `build/` directory below the **gh-pages** branch.
- `npm run build` - Generate a production version under '/build'.

## How it works

The boilerplate comes with some helper functions that uses 
immutable library functions to reducer the redundancy of writing reducers

- `update`: set a value (new or existing) to a particular path provided.

```javascript
import { UPDATE_DATA } from "./action/note-action";
const path = "noteList";
export const updateNote = (id, text) => {
  return UPDATE_DATA({
    _path: `${path}.${id}.task`,
    _value: text
  });
};
```

- `create`: create new node data from a path.

```javascript
import { CREATE_DATA } from "./action/note-action";
const path = "noteList";
export const getNote = (id, text) => {
  return GET_DATA({
    _path: `${path}.${id}.task`,
    _value: text
  });
};
```

- `Remove`: Delete an array of items. Note: ids need to be an array.

```javascript
import { REMOVE_DATA } from "./action/note-action";
const path = "noteList";
export const deleteNote = ids => {
  return REMOVE_DATA({
    _path: path,
    _value: ids
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
  newReducers
};
```

You can also create your own data-action in `data-action.js`.
First, create your actions

```javascript
export const dataActionConst = {
  UPDATE_DATA: "SET_DATA",
  CREATE_DATA: "GET_DATA",
  REMOVE_DATA: "REMOVE_DATA",
  // new action here
  NEW_ACTION_DATA: "NEW_ACTION_DATA"
};
export const SET_DATA = createDataAction(dataActionConst.UPDATE_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
// create new data action
export const NEW_ACTION_DATA = createDataAction(
  dataActionConst.NEW_ACTION_DATA
);
```

Then create your helper function in `immutable.js`.

```javascript
export function new_action(src, path, val) {
  //your code here
}
```

_Note_: The name of the new action has to match the helper function name. Otherwise, it will not work as expected.

## Reference
- [Redux-actions](https://redux-actions.js.org/api/createaction)
- [Connected-React-Router](https://github.com/supasate/connected-react-router)
- [ImmutableJS](https://github.com/immutable-js/immutable-js)
