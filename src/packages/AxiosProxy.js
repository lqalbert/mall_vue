import Axios from 'axios';
import APP_CONST from '../config';

const instance = Axios.create({
    baseURL: APP_CONST.DOMAIN,
    timeout: 3000,

});

export default instance;