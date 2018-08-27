import editor_config from './editor';
import attr_config from './Attr'; 

/**
 * 取错名字 这里是常量 不是 配置
 */

let domain;
if (process.env.NODE_ENV == 'production') {
    domain = "";
} else {
    domain = "/admin"
}

let upload_url = domain + "/upload-file";
let slide_upload_url = domain + "/slide-upload";



const APP_CONST = {};

Object.defineProperty(APP_CONST, "DOMAIN", {
    value: domain,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});

Object.defineProperty(APP_CONST, "UPLOAD_URL", {
    value: upload_url,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});

Object.defineProperty(APP_CONST, "SLIDE_UPLOAD_URL", {
    value: slide_upload_url,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});

editor_config.uploadConfig.action = upload_url;
Object.defineProperty(APP_CONST, 'editor_option',{
    value: editor_config,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});

Object.defineProperty(APP_CONST, 'ATTR',{
    value: attr_config,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});


export const PHONE_REG = /^\d+$/;
export const QQ_REG = /^[0-9]+$/;
export const PRICE_REG = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
//本地开发问卷跳转打开
export const QUESTIONNAIRE_URL = "http://localhost:8000/questionnaire?id=";
//测试服务器问卷跳转打开
// export const QUESTIONNAIRE_URL = "http://192.168.0.10:50004/questionnaire?id=";
//正式服务器问卷跳转打开
// export const QUESTIONNAIRE_URL = "http://pulata.com.cn/questionnaire?id=";

export default APP_CONST;