import Axios from 'axios';
// import APP_CONST from '../config';

const instance = Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 3000,
    withCredentials: true ,//process.env.NODE_ENV == 'development' ? false :true

});
// console.log(process.env);
export default instance;