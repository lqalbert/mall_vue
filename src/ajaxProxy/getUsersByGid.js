import DataProxy from '../packages/DataProxy';
const getUsersByGid = {

    methods:{
        getUsersAjax(v){
            let dataProxy = new DataProxy('http://localhost:8000/admin/getUsersByGid/'+v,this.pageSize,this.getUsers, this,);
            dataProxy.load();
        },
        getUsers(data){
            this.users=data.items;
        }
    }
};

export default getUsersByGid;
