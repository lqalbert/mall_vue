import DataProxy from '../packages/DataProxy';
import APP_CONST from '../config';

const getGroupsByPid = {

    methods:{
        getGroupsAjax(v){
            let dataProxy = new DataProxy(APP_CONST.DOMAIN +'/getGroupsByPid/'+v,this.pageSize,this.getGroups, this,);
            dataProxy.load();
        },
        getGroups(data){
            this.groups=data.items;
        }
    }
};

export default getGroupsByPid;
