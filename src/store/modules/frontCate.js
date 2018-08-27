import CategoryFrontAjaxProxy from '@/ajaxProxy/CategoryFront';


function restuctCates(arr, resus){
    arr.forEach((element)=>{
        resus.push(element);
        if(arr.children){
            restuctCates(arr.children, resus);
        }
    })
}

function getGrandFrontCates(arr, pid, re){
    let item =  arr.find((element)=>{
        return pid == element.id;
    });
    if(item){
        re.push(item);
        if(item.pid != 0) {
            getGrandFrontCates(arr, item.pid, re);
        } else {
            return re;
        }
    } else {
        return [];
    }
}

const app = {
    state: {
        frontCates:[],
        listFrontCates:[]
    },
    getters:{
        getFrontCates(state){
            return state.frontCates
        },
        getFrontCatesByPid: (state) => (pid) => {
            return state.frontCates.filter((element)=>{
                return element.pid == pid;
            })
        },
        getGrandFrontCates:(state) => (pid) =>{
            let re = [];
           
            getGrandFrontCates(state.listFrontCates, pid, re);

            return re;
        }
    },
    mutations:{
        setFrontCates(state, cates){
            state.frontCates = cates;

            restuctCates(state.frontCates, state.listFrontCates);
        }
    },

    actions:{
        getAllFrontCates(context){
            CategoryFrontAjaxProxy.get().then((response)=>{
                context.commit('setFrontCates', response.data.items);
            }).catch(data => {
                console.log(data);
            })   
        },
        initAllFrontCates({dispatch,state}){
            //if (state.frontCates.length == 0) {
                dispatch('getAllFrontCates');
            //}
        }
    }
};

export default app;