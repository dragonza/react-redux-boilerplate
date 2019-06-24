import axios from 'axios';

export default {
  user: {
    signUpApi: user =>
      axios.post(`/signup`, { ...user }).then(res => res.data.token),
  },
};
