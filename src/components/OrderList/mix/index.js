import SearchTool from '../../../mix/SearchTool';
import DataTable from '../../../mix/DataTable';
import SubDetail from '../SubDetail';

import rowInfo from "../rowInfo";
import ReturnGoods from '../ReturnGoods';
import ExchangeGoods from '../ExchangeGoods';
import CheckOrder from '../checkOrder';
import RefundCheck from '../Rcheck';

const ORDER_ASSIGN = 3;

const mix = {
    mixins: [SearchTool,DataTable,],
    components: {
        SubDetail,
        rowInfo,
        ReturnGoods,
        ExchangeGoods,
        CheckOrder,
        RefundCheck
    },
    data(){
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
                disabledDate(time) {
                    return time.getTime() > Date.now();//- 8.64e7
                }
            }
        }
    },
    methods:{

        //发起换货弹窗
        showExchange(row){
            this.$modal.show('exchangeGoods',row);
        },
        /** 发起退款弹窗  */
        open2(row) {
            this.$modal.show('returnGoods', row);
        },
        
        // hyf 添加
        singlbutton(status, product_status, after_sale_status){
            this.searchForm.status = status,
            this.searchForm.product_status = product_status;
            this.searchForm.after_sale_status = after_sale_status;

            this.searchToolChange('searchForm');
        },
        //取消订单
        cancelOrder(row){
            // console.log(row.status);
            if (row.status >= ORDER_ASSIGN) {
                this.$alert('不能取消', '警告', {
                    confirmButtonText: '关闭',
                  });
            } else {
                this.$confirm('确定取消, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.getAjaxProxy().cancel(row.id).then(()=>{
                        this.$message.info('取消成功');
                        this.handleReload();
                    })

                  });
            }   
        },
        //订单审核
        checkOrder(row){
            this.$modal.show('checkOrder', { row:row});
        },

        RefundCheck(row) {
            this.$modal.show('refundcheck', {row:row});
        },
        resetHiddenFields(){
            this.searchForm.status = '',
            this.searchForm.product_status = '';
            this.searchForm.after_sale_status = '';
            
        }
    },
    mounted(){
        this.$refs['searchForm'].$on('reset', this.resetHiddenFields);
    }
};

export default mix;