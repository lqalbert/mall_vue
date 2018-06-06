import Axios from 'axios';
// import APP_CONST from '../config';

// import store from '../store'; 这要报错

const instance = Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 3000,
    withCredentials: true ,//process.env.NODE_ENV == 'development' ? false :true

});
// console.log(process.env);


instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    if (error.response.status == 401) {
        alert('登录失效，需要重新登录');
    }
    return Promise.reject(error);
  });
export default instance;