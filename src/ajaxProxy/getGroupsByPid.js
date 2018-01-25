import DataProxy from '../packages/DataProxy';
const getGroupsByPid = {

    methods:{
        getGroupsByPidAjax(v){
            let dataProxy = new DataProxy('http://localhost:8000/admin/getGroupsByPid/'+v,this.pageSize,this.getGroups, this,);
            dataProxy.load();
        },
        getGroups(data){
            this.groups=data.items;
        }
    }
};

export default getGroupsByPid;