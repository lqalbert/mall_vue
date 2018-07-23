//运费模板
import FreightTemplateAjax from '@/ajaxProxy/FreightTemplate';

const app = {
    state: {
        // area:[],
        freightTemplates:[],

    },
    getters:{
        getFreightTemplatesByEntrepot:(state)=>(eid)=>{
            if (eid) {
                return state.freightTemplates.filter((element)=>{
                    return element.entrepot_id == eid;
                })
            } else {
                return state.freightTemplates;
            }
            
        }
    },
    mutations:{
        addFreightTemplat(state, data){
            state.freightTemplates = state.freightTemplates.concat(data);
        },    
    },
    actions:{
        initFreightTemplate(context, entrepot_id){
            if (context.getters.getFreightTemplatesByEntrepot(entrepot_id).length==0) {
                context.dispatch('setFreightTemplates', entrepot_id);
            }
        },
        setFreightTemplates(context, entrepot_id) {
            FreightTemplateAjax.get({entrepot_id:entrepot_id}).then((response)=>{
                context.commit("addFreightTemplat", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;