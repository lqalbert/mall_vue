import AreaAjaxProxy from '@/ajaxProxy/Area';

const app = {
    state: {
        // area:[],
        provinces:[],
        cities:[],
        dis:[]
    },
    getters:{
        province(state){
            return state.provinces;
        },

        city:(state)=>(pid)=>{
            return state.cities.filter((element)=>{
                return element.p_id == pid;
            });
        },

        dises:(state)=>(pid)=>{
            return state.dis.filter((element)=>{
                return element.p_id == pid;
            });
        },

        getByPid:(state, getters)=>(pid)=>{
            let c = getters.city(pid);
            let d = getters.dises(pid);
            return c.concat(d);
        }
    },
    mutations:{
        
        addProvinces(state, data){
            state.provinces = state.provinces.concat(data);
        },
        addCities(state, data){
            state.cities = state.cities.concat(data);
        },
        addDis(state, data){
            state.dis = state.dis.concat(data);
        }
        
    },
    actions:{
        initProvince(context){
            if (context.state.provinces.length==0) {
                context.dispatch('setArea', {c:"addProvinces", pid:1});
            }
        },
        setSubArea(context, param) {
            if(context.getters.getByPid(param.pid).length==0) {
                context.dispatch('setArea', param);
            }
        },
        setArea(context, param){

            AreaAjaxProxy.get({pid:param.pid}).then((response)=>{
                context.commit(param.c, response.data);
            }).catch((response)=>{
                console.log(response);
            })
            
        }
    }
};


export default app;