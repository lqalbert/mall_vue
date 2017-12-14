const PageMix = {

    activated:function(){
        console.log(this.$options.name);
        this.$emit('page-loaded', {'name':this.$options.name || '未定义name', 'title':this.$options.pageTitle ||  '未定义pageTitle'});
    },
    deactivated:function(){
        console.log('自动创建组件结束');
    }
};

export default PageMix;