<template>
    <div>
        <!-- 文本 -->
        <!-- <span v-if="type=='文本'">
            <el-input v-model="formObject.value"></el-input>
        </span> -->
        <!-- 图片 -->
        <!-- <span v-else >
            <el-input v-model="formObject.value"></el-input>
            <el-input type="hidden" v-model="formObject.addon_value"></el-input>
            <el-button>上传</el-button>
        </span> -->

        <el-form-item
            v-for="(item, index) in formObject"
            :label="item.name"
            :key="item.id"
            :prop="'formObject.' + index + '.value'">   
            <span v-if="item.type!='自选'">
                <el-input v-model="item.value"></el-input>
                <span v-if="item.type='图片'">
                    <el-input type="hidden" v-model="item.addon_value"></el-input>
                    <el-button>上传</el-button>
                </span>
            </span>
            <span v-else>
                <el-select v-model="item.value" >
                    <el-option v-for="attr in item.add_value" :label="attr.value" :key="attr.value" :value="attr.value"></el-option>
                </el-select>
            </span>
        </el-form-item>
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
            type: Array
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
  