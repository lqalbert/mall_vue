const config = {
    props:{
        name:{
            required:true,
            type:String    
        },
        width:{
            type:[String, Number],
            default:'50%'
        },
        height:{
            type:[String, Number],
            default:'auto'
        }
    },
   
    methods:{
        handleClose(){
            // this.$modal.hide(name);
            this.$modal.hide(this.name);
        }
    },

    created(){
        this.$on('submit-success', this.handleClose);
    }
    
};

export default config;