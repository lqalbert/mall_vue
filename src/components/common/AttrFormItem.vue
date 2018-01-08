<template>
    <div>
        <!-- 文本 -->
        <span v-if="type=='文本'">
            <el-input v-model="formObject.value"></el-input>
        </span>
        <!-- 图片 -->
        <span v-else >
            <el-input v-model="formObject.value"></el-input>
            <el-input type="hidden" v-model="formObject.addon_value"></el-input>
            <el-button>上传</el-button>
        </span>
    </div>
  </template>
  
<script>
  export default {
    name: 'AttrItem',
    props:{
        type:{
            type: String,
            // default:'文本'
        },
        formObject:{
            required: true,
            type: Object
        }
    },
    data () {
      return {
        
      }
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  