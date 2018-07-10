//部门
import AreaAjaxProxy from '@/ajaxProxy/Department';

const app = {
    state: {
        // area:[],
        departments:[],

    },
    getters:{
        getDepartments:(state)=>{
            return state.departments;
        }
    },
    mutations:{
        addDepartments(state, data){
            state.departments = state.departments.concat(data);
        },    
    },
    actions:{
        initDepartments(context){
            if (context.state.departments.length == 0 ) {
                context.dispatch('setDepartmentss');
            }
        },
        setDepartmentss(context) {
            AreaAjaxProxy.get().then((response)=>{
                context.commit("addDepartments", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;