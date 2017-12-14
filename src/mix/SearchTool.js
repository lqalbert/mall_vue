const SearchTool = {

    methods:{
        searchToolChange(name){
            let form = this[name];
            this.$emit('search-tool-change', form);
        },
        searchToolReset(name){
            this.$refs[name].resetFields();
            this.$emit('search-tool-change', null);
        }
    }
};


export default SearchTool;