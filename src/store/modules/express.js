//快递
import AreaAjaxProxy from '@/ajaxProxy/ExpressCompany';

const app = {
    state: {
        // area:[],
        express:[],

    },
    getters:{
        getExpressByEntrepot:(state)=>(eid)=>{
            return state.express.filter((element)=>{
                return element.entrepot_id == eid;
            })
        }
    },
    mutations:{
        addExpress(state, data){
            state.express = state.express.concat(data);
        },    
    },
    actions:{
        initExpress(context, entrepot_id){
            if (context.getters.getExpressByEntrepot(entrepot_id).length==0) {
                context.dispatch('setExpress', entrepot_id);
            }
        },
        setExpress(context, entrepot_id) {
            AreaAjaxProxy.get({entrepot_id:entrepot_id}).then((response)=>{
                context.commit("addExpress", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;