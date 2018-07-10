//故意取复数
import AreaAjaxProxy from '@/ajaxProxy/Group';

const app = {
    state: {
        // area:[],
        groups:[],

    },
    getters:{
        getGroups:(state)=>{
            return state.groups;
        },
        getGroupsByDepartment:(state)=>(department_id)=>{
            return state.groups.filter((element)=>{
                return element.department_id == department_id;
            });
        }
    },
    mutations:{
        addGroups(state, data){
            state.groups = state.groups.concat(data);
        },    
    },
    actions:{
        initGroups(context, playload){
            if (context.getters.getGroupsByDepartment(playload.department_id).length == 0 ) {
                context.dispatch('setGroups',{department_id:playload.department_id});
            }
        },
        setGroups(context, playload) {
            AreaAjaxProxy.get({department_id:playload.department_id,with:[]}).then((response)=>{
                context.commit("addGroups", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;