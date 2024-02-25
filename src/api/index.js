import axios from "axios";

// const loginData = JSON.parse(localStorage.getItem("token"));
// const token = loginData && loginData;

let api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, X-CSRFToken, CSRF ",
    // 'CSRF': csrfToken.content,
    // Authorization: "Bearer " + token,
  },
});

// api.interceptors.request.use((config) => ({
//   ...config,
//   // params: {
//   //   ...config.params,
//   //   clientCode: JSON.parse(localStorage?.getItem("clientDetail"))["clientCode"],
//   // },
//   data: {
//     ...config.data,
//     clientCode: JSON.parse(localStorage?.getItem("clientDetail"))["clientCode"],
//   },
//   function(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   },
// }));

export default api;
