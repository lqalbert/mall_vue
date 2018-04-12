<template>
	<el-row>
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane label="发货明细" name="First">
				<el-table :data="deliveryDetailsData" border style="width: 100%">
					<el-table-column prop="goods_name" label="商品" align="center"></el-table-column>
					<el-table-column prop="cate_kind" label="小类型" align="center"></el-table-column>
					<el-table-column prop="goods_num" label="数量" align="center"></el-table-column>
					<el-table-column prop="goods_price" label="价格" align="center"></el-table-column>
					<el-table-column prop="weight" label="重量" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="订单明细" name="Second">
				<el-table :data="tableData2" border style="width: 100%">
					<el-table-column prop="order_num" label="订单编号" align="center"></el-table-column>
					<el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
					<el-table-column prop="buy_goods" label="购买商品" align="center"></el-table-column>
					<el-table-column prop="buy_num" label="数量" align="center"></el-table-column>
					<el-table-column prop="trade" label="成交时间" align="center"></el-table-column>
					<el-table-column prop="sale_name" label="销售人员" align="center"></el-table-column>
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
					<el-table-column prop="deliver_name" label="收件人姓名" align="center"></el-table-column>
					<el-table-column prop="deliver_phone" label="收件人手机号" align="center"></el-table-column>
					<el-table-column prop="deliver_address" label="收货详细地址" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="沟通联系" name="Fifth">
				<el-table :data="communicationData" border style="width: 100%">
					<el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
					<el-table-column prop="contact_content_time" label="沟通时间" align="center"></el-table-column>
					<el-table-column prop="user_name" label="沟通人" align="center"></el-table-column>
					<el-table-column prop="contact_content" label="沟通内容" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="操作记录" name="Sixth">
				<el-table :data="operationData" border style="width: 100%">
					<el-table-column prop="time" label="操作时间" align="center"></el-table-column>
					<el-table-column prop="user_name" label="操作人" align="center"></el-table-column>
					<el-table-column prop="type_name" label="变更内容明细" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import DistributionDeliveryTabPaneProxy from '@/packages/DistributionDeliveryTabPaneProxy';
export default {
	name: 'SubDetail',
	props:{
		row:{
			type: Object,
			default:null
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
			tabFirst:false,
			tabSecond:false,
			tabThird:false,
			tabFourth:false,
			tabFifth:false,
			tabSixth:false,
		}
	},
	methods:{
		handleFirst(row){
			// this.customerTrackLogProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabFirst = true;
		},
		handleSecond(row){
			// this.customerComplainProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabSecond = true;
		},
		handleThird(row){
			// this.customerComplainProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabThird = true;
		},
		handleFourth(row){
			// this.customerComplainProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabFourth = true;
		},
		handleFifth(row){
			// this.customerComplainProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabFifth = true;
		},
		handleSixth(row){
			// this.customerComplainProxy.setParam({
			// 	cus_id:row.id,
			// 	business:'theCus'
			// }).load();
			this.tabSixth = true;
		},
		getTrackLog(data){
			// this.TrackLogData = data;
		},
		getComplainLog(data){
			// this.ComplainData = data;
		},
	},
	watch:{
		row(val, oldVal){
			this['handle'+ this.activeName].call(this, this.row);
			tabFirst = false;
			tabSecond = false;
			tabThird = false;
			tabFourth = false;
			tabFifth = false;
			tabSixth = false;
		},
		activeName(val,oldVal){
			if (!this['tab'+ val] && this.row !== null) {
				this['handle'+ val].call(this, this.row);
			}
		},

	},
	created(){
		// this.customerTrackLogProxy = new CustomerTrackLogProxy(null,this.getTrackLog,this);
		// this.customerComplainProxy = new CustomerComplainProxy(null,this.getComplainLog,this);
		
	}
}
</script>

