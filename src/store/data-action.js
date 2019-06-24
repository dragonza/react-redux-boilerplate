import createAction from '../utils/create-action';
import invariant from '../utils/invariant';
import { isEmpty } from '../utils/is';

const dataPayloadCreator = ({ _value }) => _value;
const dataMetaCreator = data => {
  invariant(!isEmpty(data._path), '_path is required');
  invariant(!isEmpty(data._type), '_type is required for each action creator');
  return { _path: data._path, _subPath: data._subPath };
};
const createDataAction = type => {
  return createAction(type, dataPayloadCreator, dataMetaCreator);
};

export const dataActionConst = {
  CREATE_DATA: 'CREATE_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
  GET_DATA: 'GET_DATA',
  REMOVE_DATA: 'REMOVE_DATA',
  MERGE_DATA: 'MERGE_DATA',
  TOGGLE_DATA: 'TOGGLE_DATA',
  REARRANGE_DATA: 'REARRANGE_DATA'
};

export const CREATE_DATA = createDataAction(dataActionConst.CREATE_DATA);
export const UPDATE_DATA = createDataAction(dataActionConst.UPDATE_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
export const GET_DATA = createDataAction(dataActionConst.GET_DATA);
export const MERGE_DATA = createDataAction(dataActionConst.MERGE_DATA);
export const TOGGLE_DATA = createDataAction(dataActionConst.TOGGLE_DATA);
export const REARRANGE_DATA = createDataAction(dataActionConst.REARRANGE_DATA);
