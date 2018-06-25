const SearchTool = {

    methods:{
        searchToolChange(name){
            this.$emit('search-tool-change', this[name]);
        },
        searchToolReset(name){
            this.$refs[name].resetFields();
            this.$refs[name].$emit('reset');
            let pa = Object.assign({}, this[name]);
            pa.timestamp = Date.now().valueOf();
            this.$emit('search-tool-change', pa);
        }
    }
};


export default SearchTool;