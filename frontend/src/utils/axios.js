import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;
const API=axios.create({
    baseURL: mybaseUrl,
});
API.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      const refresh = localStorage.getItem("refresh");
      alert("Session expired. Please log in again.");
      if (refresh) {
        const res = await axios.post("refresh/", { refresh });
        localStorage.setItem("access", res.data.access);

        error.config.headers.Authorization =
          `Bearer ${res.data.access}`;

        return axios(error.config);
      }

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;