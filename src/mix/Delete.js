const config = {
    
    methods:{
        handleDelete(id){
            this.$confirm('确定删除?', '警告',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let vmthis = this;
                this.ajaxProxy.delete(id).then(function(response){
                    vmthis.$message.success("操作成功");
                    // vmthis.handleReload();
                    vmthis.$emit('delete-success');
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