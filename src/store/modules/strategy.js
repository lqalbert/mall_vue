//显示 隐藏 禁用 策略
import Strategy from '../../strategy';

const strategy = {
    state: {
        // 'Group':{
        //     'department-manager':{

        //     }
        // },
    },

    getters:{
        getStrategy : (state, getters, rootState)=>(name)=> {
            console.log(rootState);
            return Strategy[name] ? Strategy[name] : null;
        },
    }
};

export default strategy;