<script>
    //通过 extends 扩展 StateButton 从而实现继承
    import StateButton from './StateButton';
    export default {
        name: 'SubmitButton',
        props:{
            observer:{
                required: true,
                type: Object
            }
        },
        extends:StateButton,
        created(){
            this.observer.$on('valid-error', this.setLoaded);
            this.observer.$on('submit-final', this.setLoaded);
            this.$on('submit-ing', this.setLoading);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  