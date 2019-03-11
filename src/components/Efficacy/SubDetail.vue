<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table :data="cusTableData" border>
                    <el-table-column align="center" prop="sku_sn" label="商品编号" width="120" header-align="center"></el-table-column>
                    <el-table-column align="center" prop="realname" label="商品名称" width="140" header-align="center">
                        <!--<template scope="scope">
                            {{ getName(scope.row.name, comboForm.goodsList) }}
                        </template>-->
                    </el-table-column>
                    <el-table-column align="center" prop="number" label="数量" width="120" header-align="center"></el-table-column>
                    <el-table-column align="center" prop="efficacy" label="功效" header-align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
    import EfficacyAjax from  '../../ajaxProxy/Efficacy';
    export default {
        name: 'SubDetail',
        props:{
            row :{
                type: Object,
                default:null
            }
        },
        data () {
            return {
              cusTableData:[]
            }
        },

        watch:{
          row: {
            handler(newName, oldName) {
              EfficacyAjax.depositDetail(newName.plan_id).then((response)=>{
                console.log(response.data);
                this.cusTableData = response.data;
              }).catch((response)=>{

              })
            },
            deep: true,
          }
        },
        created(){

        }
    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  