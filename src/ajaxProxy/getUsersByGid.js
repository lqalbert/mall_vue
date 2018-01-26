import DataProxy from '../packages/DataProxy';
import APP_CONST from '../config';

const getUsersByGid = {

    methods:{
        getUsersAjax(v){
            let dataProxy = new DataProxy(APP_CONST.DOMAIN + '/getUsersByGid/'+v,this.pageSize,this.getUsers, this,);
            dataProxy.load();
        },
        getUsers(data){
            this.users=data.items;
        }
    }
};

export default getUsersByGid;
