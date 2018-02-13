const mix = {
    methods:{
        displayAttr(attr){
            return attr.map((item)=>{
                return item.name+":"+item.value
            }).join("、");
        },
        copy(source, target){
            source.forEach(function(item){
                this.push(Object.assign({}, item));
            }, target);
            return target;
        },
    }
};

export default mix;