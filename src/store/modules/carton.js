//纸箱管理
import AreaAjaxProxy from '@/ajaxProxy/CartonManagement';

const app = {
    state: {
        // area:[],
        cartons:[],

    },
    getters:{
        getCartonsByEntrepot:(state)=>(eid)=>{
            return state.cartons.filter((element)=>{
                return element.entrepot_id == eid;
            })
        }
    },
    mutations:{
        
        addCartons(state, data){
            state.cartons = state.cartons.concat(data);
        },
        
        
    },
    actions:{
        initCartons(context, entrepot_id){
            if (context.getters.getCartonsByEntrepot(entrepot_id).length==0) {
                context.dispatch('setCartons', entrepot_id);
            }
        },
        setCartons(context, entrepot_id) {
            AreaAjaxProxy.get({entrepot_id:entrepot_id}).then((response)=>{
                context.commit("addCartons", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;