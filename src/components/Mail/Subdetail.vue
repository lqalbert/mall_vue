<template>
    <div class="hello">
        <el-row>
            <el-tabs v-model="activeName" type="border-card">

                <el-tab-pane label="物流信息" name="Eight">
                    <el-table :data="LogisticsInformationData" border style="width: 100%">
                        <el-table-column prop="time" label="时间" align="center"></el-table-column>
                        <el-table-column prop="context" label="详情" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Subdetail',
    data () {
      return {
        activeName: 'Eight',
        deliveryDetailsData:[],
        LogisticsInformationData:[],
        goodsLoading:false
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  