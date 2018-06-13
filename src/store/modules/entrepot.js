//配送中收
import AreaAjaxProxy from '@/ajaxProxy/DistributionCenter';

const app = {
    state: {
        // area:[],
        entrepots:[],

    },
    getters:{
        getEntrepots:(state)=>{
            return state.entrepots;
        }
    },
    mutations:{
        addEntrepots(state, data){
            state.entrepots = state.entrepots.concat(data);
        },    
    },
    actions:{
        initEntrepots(context){
            if (context.state.entrepots.length ==0 ) {
                context.dispatch('setEntrepots');
            }
        },
        setEntrepots(context) {
            AreaAjaxProxy.get().then((response)=>{
                context.commit("addEntrepots", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};


export default app;