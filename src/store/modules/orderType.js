//订单类型
import OrderTypeAjax from '@/ajaxProxy/OrderType';

const app = {
    state: {
        // area:[],
        orderTypes:[],

    },
    getters:{
        getOrderTypes:(state)=>{
            return state.orderTypes;
        }
    },
    mutations:{
        addOrderTypes(state, data){
            state.orderTypes = state.orderTypes.concat(data);
        },    
    },
    actions:{
        initOrderTypes(context){
            if (context.state.orderTypes.length == 0 ) {
                context.dispatch('setOrderTypes');
            }
        },
        setOrderTypes(context) {
            OrderTypeAjax.get().then((response)=>{
                context.commit("addOrderTypes", response.data.items)
            }).catch((response)=>{
                console.log(response);
            })
        }
    }
};

export default app;