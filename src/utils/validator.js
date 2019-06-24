// any email validation rule here
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// check single email
export const isValidEmail = email => {
  return re.test(email);
};
