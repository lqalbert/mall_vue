import RoleAjaxProxy from '../../ajaxProxy/Role';

const app = {
    state: {
        roles:[],
    },

    getters:{
        roles(state){
            return state.roles;
        },
    },

    mutations:{
        setRoles(state, roles){
            state.roles = roles;
        },
        
    },

    actions:{
        getRoles(context){
            RoleAjaxProxy.get().then((response)=>{
                context.commit('setRoles', response.data.items);
            }).catch(data => {
                console.log(data);
            })
            
        }
    }
};


export default app;