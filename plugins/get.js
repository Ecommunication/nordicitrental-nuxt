const baseURL = process.env.apiUrl;
const get = async path => {
  return await fetch(baseURL + path).then(r => r.json());
};

export default ({ app }, inject) => {
  inject("get", get);
};
