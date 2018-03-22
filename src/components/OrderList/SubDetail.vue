<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-tabs type="border-card" @tab-click="handleClick">
                    <!--  订单客户信息 -->
                    <el-tab-pane label="订单客户信息">
                        <el-table :data="usertableData"    border    empty-text="请双击订单显示信息">
                            <el-table-column prop="name" label="客户姓名" align="center">
                            </el-table-column>
        
                            <el-table-column prop="sex_text" label="客户性别" align="center">
                            </el-table-column>
        
                            <el-table-column prop="contact.phone" label="客户电话" align="center">
                            </el-table-column>
        
                            <el-table-column prop="contact.qq" label="客户qq" align="center">
                            </el-table-column>
        
                            <el-table-column prop="contact.qq_nickname" label="qq昵称" width="180" align="center">
                            </el-table-column>
        
                            <el-table-column prop="contact.weixin" label="客户微信" align="center">
                            </el-table-column>
        
                            <el-table-column prop="contact.weixin_nickname" label="微信昵称" align="center">
                            </el-table-column>
        
                        </el-table>
                    </el-tab-pane>
                    <!-- /订单客户信息 -->
                    <!--  订单商品信息 -->
                    <el-tab-pane label="订单商品信息">
                        <el-table :data="goodstableData"    border   empty-text="请点击客户显示跟踪信息">
        
                            <el-table-column prop="goods_name" label="商品名称" align="center">
                            </el-table-column>
                            <el-table-column prop="price" label="商品价格" align="center">
                            </el-table-column>
        
                            <el-table-column prop="goods_number" label="商品数量" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" width="180" align="center">
                            </el-table-column>
        
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单商品信息 -->
                    <!--  订单收货地址 -->
                    <el-tab-pane label="订单收货地址">
                        <el-table :data="addresstableData"   highlight-current-row border  empty-text="请点击客户显示订单收货地址">
                            <el-table-column prop="address" label="收货地址" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="收货人姓名" align="center">
                            </el-table-column>
                            <el-table-column prop="phone" label="收货人电话" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单收货地址 -->
                    <!-- 订单操作记录  -->
                    <el-tab-pane label="订单操作记录">
                        <el-table :data="manageData" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="order_id" label="订单id" align="center">
                            </el-table-column>
                            <el-table-column prop="order_action" label="操作动作" align="center">
                            </el-table-column>
                            <el-table-column prop="manager" label="操作员" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="操作备注" align="center">
                            </el-table-column>
                            <el-table-column prop="time" label="操作时间" align="center">
                            </el-table-column>
        
                        </el-table>
                    </el-tab-pane>
                    <!-- /订单操作记录 -->
                    <!-- 订单发货信息 -->
                    <el-tab-pane label="订单发货信息">
                        <el-table :data="assignData" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" align="center">
                            </el-table-column>
        
                            
        
                            <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                            </el-table-column>
        
                            <el-table-column prop="type_text" label="投诉类型" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- /订单发货信息 -->
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
    import CustomerSelectAjaxProxy from '@/packages/CustomerSelectProxy';

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
                usertableData: [],
                goodstableData:[],
                addresstableData:[],
                manageData:[],
                assignData:[]
            }
        },
        methods:{
            loadCustomer(data){
                data.items[0].contact = data.items[0].contacts[0];
                this.usertableData = data.items;
            }
        },
        watch:{
            row:function(val, oldVal) {
                console.log(val);
                this.customerProxy.setParam({
                    fields:['*'],
                    id:val.cus_id,
                    with:['contacts']
                }).load();
            }
        },

        created(){
            this.customerProxy = new CustomerSelectAjaxProxy({fields:["*"]}, this.loadCustomer, this);
        }
    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  