<template>
	<el-row>
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane label="发货明细" name="First">
				<el-table :data="deliveryDetailsData" v-loading="goodsLoading" border style="width: 100%">
                    <el-table-column prop="goods_id" label="商品ID" align="center"></el-table-column>
					<el-table-column prop="goods_name" label="商品名" align="center" width="300">
						<template slot-scope="scope">
                            {{scope.row.sku_sn }}{{scope.row.goods_name}}
                        </template>
					</el-table-column>
					<el-table-column prop="price" label="商品价格" align="center">
					</el-table-column>
					<el-table-column prop="goods_number" label="数量" align="center"></el-table-column>
					<!--<el-table-column prop="assign_fee" label="配送费" align="center">-->
						<!--<template slot-scope="scope">-->
							<!--<div v-if="scope.row.assign_fee == null">还未发货</div>-->
							<!--<div v-else>{{ scope.row.assign_fee }}</div>-->
						<!--</template>-->
					<!--</el-table-column>-->
					
					<el-table-column prop="weight" label="重量" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.weight == null">还未发货</div>
							<div v-else>{{ scope.row.weight }}</div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="订单信息" name="Second">
				<el-table :data="tableData2" border style="width: 100%">
					<el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
					<el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
					<el-table-column prop="created_at" label="下单时间" align="center"></el-table-column>
					<el-table-column prop="deal_name" label="销售人员" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="历史快递" name="Third">
				<el-table :data="tableData3" border style="width: 100%">
					<el-table-column prop="express_num" label="快递单号" align="center"></el-table-column>
					<el-table-column prop="express_company" label="快递公司" align="center"></el-table-column>
					<el-table-column prop="express_fee" label="快递费用" align="center"></el-table-column>
					<el-table-column prop="recevie_name" label="签收人" align="center"></el-table-column>
					<el-table-column prop="receive_time" label="客户签收时间" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="收货地址" name="Fourth">
				<el-table :data="deliveryAddressesData" border style="width: 100%">
					<el-table-column prop="name" label="收件人姓名" align="center"></el-table-column>
					<el-table-column prop="phone" label="收件人手机号" align="center"></el-table-column>
					<el-table-column prop="area_province_name" label="省份"></el-table-column>
                    <el-table-column prop="area_city_name" label="城市"></el-table-column>
                    <el-table-column prop="area_district_name" label="区县"></el-table-column>
					<el-table-column prop="address" label="收货详细地址" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<!-- <el-tab-pane label="沟通联系" name="Fifth">
				<el-table :data="communicationData" border style="width: 100%">
					<el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
					<el-table-column prop="communicate_time" label="沟通时间" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.communicate_time == null">还未沟通</div>
							<div v-else>{{ scope.row.communicate_time }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="沟通人" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.user_name == null">还未沟通</div>
							<div v-else>{{ scope.row.user_name }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="contact_content" label="沟通内容" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.contact_content == null">还未沟通</div>
							<div v-else>{{ scope.row.contact_content }}</div>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane> -->
			<el-tab-pane label="操作记录" name="Sixth">
				<el-table :data="operationData" border style="width: 100%">
					<el-table-column prop="action_text" label="操作动作" align="center">
					</el-table-column>
					<el-table-column prop="operator" label="操作员" align="center">
					</el-table-column>
					<el-table-column prop="remark" label="操作备注" align="center">
						<template slot-scope="scope">
							发货单号{{scope.row.remark}}
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="操作时间" align="center">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="其他联系信息" name="Seventh">
				<el-table :data="otherContactData" border style="width: 100%">
					<el-table-column prop="account" label="员工账号"></el-table-column>
					<el-table-column prop="department_name" label="单位">
						<template slot-scope="scope">
							{{scope.row.department.name}}
						</template>
					</el-table-column>
					<el-table-column prop="mobilephone" label="手机"></el-table-column>
					<el-table-column prop="qq" label="QQ号码"></el-table-column>
					<el-table-column prop="m_account" label="员工账号(管理员)"></el-table-column>
					<el-table-column prop="department_name" label="单位(管理员)">
						<template slot-scope="scope">
							{{scope.row.department.name}}
						</template>
					</el-table-column>
					<el-table-column prop="m_mobilephone" label="手机(管理员)"></el-table-column>
					<el-table-column prop="m_qq" label="QQ号码(管理员)"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="物流信息" name="Eight">
				<el-table :data="LogisticsInformationData" border style="width: 100%">
					<el-table-column prop="time" label="时间" align="center"></el-table-column>
					<el-table-column prop="context" label="详情" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import AssignOperationProxy from "@/packages/AssignOperationAjaxProxy";
import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
import EmployeeSelectProxy from "../../packages/EmployeeSelectProxy";
import LogisticsInformationAjaxProxy from "@/packages/LogisticsInformationAjaxProxy";

import CommunicateProxy from '@/packages/CommunicateProxy';
export default {
	name: 'SubDetail',
	props:{
		row:{
			type: Object,
			default:{}
		},
	},
	data(){
		return {
			activeName:'First',
			deliveryDetailsData:[],
			tableData2:[],
			tableData3:[],
			deliveryAddressesData:[],
			communicationData:[],
			operationData:[],
			LogisticsInformationData:[]
			
			tabFirst:false,
			tabSecond:false,
			tabThird:false,
			tabFourth:false,
			tabFifth:false,
			tabSixth:false,
			tabSeventh:false,
                        tabEight:false

			goodsLoading:false,
		}
	},
	methods:{
		handleFirst(row){
			this.goodsLoading = true;
			this.OrderGoodsProxy.setParam({
				assign_id:row.id,
				appends:['category']
			}).load();
			this.tabFirst = true;
		},
		handleSecond(row){
			this.tableData2 = [row.order];
			this.tabSecond = true;
		},
		handleThird(row){

			this.tabThird = true;
		},
		handleFourth(row){
			// let deliveryAddressProxy = new DistributionDeliveryProxy(null, this.getDeliveryAddress, this);
			// deliveryAddressProxy.setParam({
			// 	id:row.id,
			// 	fields:['id','deliver_name','deliver_phone','deliver_address'],
			// 	business:'deliveryAddress'
			// }).load()
			this.deliveryAddressesData = [row.address];
			this.tabFourth = true;
		},
		handleFifth(row){
			let CommunicateDataProxy = new CommunicateProxy(null, this.getCommunication, this);
            CommunicateDataProxy.setParam({
                assign_id:row.id,
			}).load();
			this.tabFifth = true;
		},
		handleSixth(row){
			let AssignOperationAjax = new AssignOperationProxy({fields:['*']}, this.getAssignOperation, this);
			AssignOperationAjax.setParam({
				assign_id:row.id
			}).load();
			this.tabSixth = true;
		},
		handleSeventh(row){
			console.log(row);
			let user_id = row.order.user_id;
			this.EmployeeProxy.setParam({
				fields:['id','account','qq','mobilephone','department_id'],
				business:'user-department',
				id:user_id
			}).load();
			this.tabSeventh = true;
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
		getDeliveryDetail(data){
			this.goodsLoading = false;
			this.deliveryDetailsData = data.items;
		},
		getDeliveryAddress(data){
			this.deliveryAddressesData = data;
		},
		getCommunication(data){
			this.communicationData = data.items;
		},
        	getLogisticsInformation(data){
			this.LogisticsInformationData = data.data[0].data;
		},
		getAssignOperation(data){
			this.operationData = data.items;
		},
		
		displayCategory(category){
            let cate = [];
            for (let index = 0; index < category.length; index++) {
                cate.push(category[index].label);
            }
            return cate.join(" / ");
		},
		getOtherContac(data){
			console.log(data);
			this.otherContactData = data;
		}
	},
	watch:{
		row:function(val, oldVal){
			this['handle'+ this.activeName].call(this, this.row);
			this.tabFirst = false;
			this.tabSecond = false;
			this.tabThird = false;
			this.tabFourth = false;
			this.tabFifth = false;
			this.tabSixth = false;
			this.tabSeventh = false;
			this.tabEight = false;
		},
		activeName:function(val, oldVal){
			if (!this['tab'+ val] && this.row !== null) {
				this['handle'+ val].call(this, this.row);
			}
		},

	},
	created(){
		this.OrderGoodsProxy = new OrderGoodsAjaxProxy({fields:["*"]},this.getDeliveryDetail,this);
		this.EmployeeProxy = new EmployeeSelectProxy({},this.getOtherContac,this);
		this.LogisticsInformationProxy = new LogisticsInformationAjaxProxy({fields:["*"]},    this.getLogisticsInformation,this);
	}
}
</script>

