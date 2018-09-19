const config = {
    
    methods:{
        //需要实现一个
        getAjaxProxy(){
            // return this.ajaxProxy
            this.$alert('你需要定义一个 getAjaxProxy 方法，详见mix/Delete.js', '错误', {
                confirmButtonText: '确定',
            });
            return false;
        },


        handleDelete(id){
            let vmthis = this;
            let ajaxProxy = this.getAjaxProxy();
            if(!ajaxProxy){
                return ;
            }


            this.$confirm('确定删除?', '警告',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ajaxProxy.delete(id).then(function(response){
                    let data = response.data;
                    if (data.status == 1) {
                        vmthis.$message.success("操作成功");
                        vmthis.$emit('delete-success');
                    }else {
                        vmthis.$message.error(data.msg);
                        vmthis.$emit('delete-error');
                    }
                    // vmthis.handleReload();
                    
                }).catch(function(error){
                    vmthis.$message.error("出错了")
                });
            });
        }
    },
    created(){
        if (typeof this.handleReload == "function") {
            this.$on('delete-success', this.handleReload);
        }
    }
    
};

export default config;