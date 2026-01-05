import axios from 'axios';
const API=axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
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