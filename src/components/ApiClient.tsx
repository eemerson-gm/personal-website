import axios from 'axios';

export default axios.create({
  baseURL: document.location.origin,
  headers: {
    'Content-type': 'application/json',
  },
});
