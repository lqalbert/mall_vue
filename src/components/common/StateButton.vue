<template>
        <span>
            <el-button v-if="!loading" @click="triggerClick" type="primary">
                <slot>
                    确 定
                </slot>
            </el-button>
            <el-button v-else type="primary" :loading="true"><slot name="ing">提交中</slot></el-button>
        </span>
    </template>
      
    <script>
        export default {
            name: 'StateButton',
            props:{
                is_load:{
                    type:Boolean,
                    default:true,
                },

            },

            data () {
                return {
                    loading: false
                }
            },
            methods:{
                triggerClick(){
                    this.loading = this.is_load;
                    this.$emit('click');
                },
                setLoaded(){
                    this.loading = false;
                },
                setLoading(){
                    this.loading = true;
                }
            },
            watch:{
                state:function(val, OldVal){
                    this.loading = val;
                }
            },
            created(){
                this.$on('reset', this.setLoaded);
                this.$on('ing',   this.setLoading);
            }
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    
    </style>
      