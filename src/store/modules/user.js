/* // 保存数据到sessionStorage
sessionStorage.setItem('key', 'value');

// 从sessionStorage获取数据
var data = sessionStorage.getItem('key');

// 从sessionStorage删除保存的数据
sessionStorage.removeItem('key');

// 从sessionStorage删除所有保存的数据
sessionStorage.clear(); */

import loginAjaxProxy from '../../ajaxProxy/Login';
import RoleAjaxProxy from '../../ajaxProxy/Role';


const user = {
    state: {
        login: sessionStorage.getItem('login') ? true : false,
        user: sessionStorage.getItem('login') ? JSON.parse(sessionStorage.getItem('user')) : null,
        roles:[],
    },
    //同步操作
    mutations: {
        logout (state) {
            state.login = false;
            sessionStorage.clear();
            console.log('before logout');  
        },
        login(state, userLogin){
            
            state.login = true;
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('user', JSON.stringify(userLogin));
            state.user = userLogin;
        },
        setRoles(state, roles){
            state.roles = roles;
        }
    },

    getters:{
        isLogin(state){
            return state.login;
        },
        roles(state){
            return state.roles;
        },
        getUser(state){
            return state.user;
        },
        realname(state){
            return state.user.realname;
        },
        departName(state){
            console.log(state.user);
            return state.user.department_name;
        },
        user_id(state){
            return state.user.id;
        }
    },
    //异步操作
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
                context.commit('login', data.data);
                console.log(response);
            }).catch(function(data){
                alert(data);
            })
        },
        getRoles(context){
            RoleAjaxProxy.get().then((response)=>{
                context.commit('setRoles', response.data.items);
            }).catch(data => {
                console.log(data);
            })
            
        }
    }


};

export default user;