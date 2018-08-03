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
      import LogisticsInformationAjaxProxy from "@/packages/LogisticsInformationAjaxProxy";

      export default {
    name: 'Subdetail',
      props:{
          row:{
              type: Object,
              default:{}
          },
      },
    data () {
      return {
        activeName: 'Eight',
        deliveryDetailsData:[],
        LogisticsInformationData:[],
        goodsLoading:false,
        tabEight:false
      }
    },
      methods:{
          getLogisticsInformation(data){
              this.LogisticsInformationData = data.data[0].data;
          },
          handleEight(row){
              //console.log(row);
              this.goodsLoading = true;
              this.LogisticsInformationProxy.setParam({
                  express_id:row.express_id,
                  express_sn:row.express_sn,
              }).load();
              this.tabEight = true;
          },
      },
          watch:{
              row:function(val, oldVal){
                  this.LogisticsInformationData = [];
                  this['handle'+ this.activeName].call(this, this.row);
                  this.tabEight = false;
              },
              activeName:function(val, oldVal){
                  if (!this['tab'+ val] && this.row !== null) {
                      this['handle'+ val].call(this, this.row);
                  }
              },

          },
      created(){
          this.LogisticsInformationProxy = new LogisticsInformationAjaxProxy({fields:["*"]}, this.getLogisticsInformation,this);

      }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  