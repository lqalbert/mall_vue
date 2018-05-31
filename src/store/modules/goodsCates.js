import CategoryAjaxProxy from '@/ajaxProxy/Category';

const app = {
    state: {
        cates:[],
    },
    getters:{
        getCates(state){
            return state.cates
        }
    },
    mutations:{
        setCates(state, cates){
            state.cates = cates;
        }
    },

    actions:{
        getAllCates(context){
            CategoryAjaxProxy.getAll().then((response)=>{
                context.commit('setCates', response.data.items);
                // console.log(context.state);
            }).catch(data => {
                console.log(data);
            })   
        },
        initAllCates({dispatch,state}){
            if (state.cates.length == 0) {
                dispatch('getAllCates');
            }
        }
    }
};

export default app;