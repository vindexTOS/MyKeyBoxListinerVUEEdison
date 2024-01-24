import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:14141',
    // baseURL: 'http://192.168.0.150:14141',
});

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default {
    install(Vue) {
        Vue.prototype.$axios = axiosInstance;
    },
};

export {axiosInstance};

