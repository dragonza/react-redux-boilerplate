export const apiRequest = (type) => {
  return {
    type,
  }
};

export const apiRequestSuccess = (type, payload = {}) => {
  return {
    type: `${type}_SUCCESS`,
    payload
  }
};

export const apiRequestFailed = (type) => {
  return {
    type: `${type}_FAILED`,
    error: true
  }
};
