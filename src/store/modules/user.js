/* // 保存数据到sessionStorage
sessionStorage.setItem('key', 'value');

// 从sessionStorage获取数据
var data = sessionStorage.getItem('key');

// 从sessionStorage删除保存的数据
sessionStorage.removeItem('key');

// 从sessionStorage删除所有保存的数据
sessionStorage.clear(); */

import loginAjaxProxy from '../../ajaxProxy/Login';


const user = {
    state: {
        login: sessionStorage.getItem('login') ? true : false,
    },
    mutations: {
        logout (state) {
            // Cookies.remove('user');
            // Cookies.remove('password');
            // Cookies.remove('access');
            // 恢复默认样式
            // let themeLink = document.querySelector('link[name="theme"]');
            // themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            // let theme = '';
            // if (localStorage.theme) {
            //     theme = localStorage.theme;
            // }
            // localStorage.clear();
            // if (theme) {
            //     localStorage.theme = theme;
            // }

            state.login = false;
            sessionStorage.clear();
            console.log('before logout');  
        },
        login(state, userLogin){
            // console.log(userLogin);
            // if (userLogin.account == 'abc' && userLogin.password == '123456') {
            //     state.login = true;
            //     sessionStorage.setItem('login', true);
            // }
            state.login = true;
            sessionStorage.setItem('login', true);
        }
    },

    getters:{
        isLogin(state){
            return state.login;
        }
    },

    actions:{
        logout(context){
            console.log('before logout'); 
            loginAjaxProxy.out().then(function(response){
                context.commit('logout');
            }).catch(function(){ 
                alert('出错了');
            })
            
        },
        login(context, userLogin){
            loginAjaxProxy.login(userLogin).then(function(response){
                let data = response.data;
                // if (data.status==0) {
                //     // alert(data.msg);
                //     throw new Error(data.msg);
                // }
                context.commit('login');
                console.log(response);
            }).catch(function(data){
                alert(data);
            })
        }
    }


};

export default user;