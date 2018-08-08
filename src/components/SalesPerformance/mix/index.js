import PageMix from '@/mix/Page';
import DataTable from '@/mix/DataTable';
import SearchTool from '@/mix/SearchTool';
import SalesPerformanceOrderInfo from '@/packages/SalesPerformanceOrderInfoProxy';
import SalesPerformanceOrderInfoAjaxProxy from '@/ajaxProxy/SalesPerformanceOrderInfo';

import SubDetail from '../SubDetail';

let mix = {
    mixins: [PageMix,SearchTool,DataTable],
    components:{
        SubDetail
    },
    data(){
        return {
            SalesPerformanceOrderInfoAjaxProxy:SalesPerformanceOrderInfoAjaxProxy,
            SalesPerformanceOrderInfoData:[],
            SalesPerformanceOrderInfoTotal:0,
            salesPerformanceOrderInfo:SalesPerformanceOrderInfo,
            page_size:15,
            pickerOptions: {
                shortcuts: [{
                        text: '上一周',
                        onClick:function(picker) {
                            var start = Caculate.showLastWeekFirstDay();
                            var end = Caculate.showLastWeekLastDay();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '上个月',
                        onClick:function(picker) {
                            var start = Caculate.showLastMonthFirstDay();
                            var end = Caculate.showLastMonthLastDay();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '本周',
                        onClick:function(picker) {
                            var start = Caculate.showWeekFirstDay();
                            var end = Caculate.showWeekLastDay();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '本月',
                        onClick:function(picker) {
                            var start = Caculate.showMonthFirstDay();
                            var end = Caculate.showMonthLastDay();
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ],
                disabledDate:function(time) {
                    return time.getTime() > Date.now();// - 8.64e7
                }
            }
        }
    },
    methods:{
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        dbclick(row){
            this.model = row;
            this.param = Object.assign(this.param,this.searchForm);
            switch (this.param.type) {
                case 'department_id':
                    this.param.department_id = row.department_id;
                    delete this.param.group_id;
                    delete this.param.user_id;
                    break;
                case 'group_id':
                    this.param.department_id = row.department_id;
                    this.param.group_id = row.group_id;
                    delete this.param.user_id;
                    break
                case 'user_id':
                    this.param.department_id = row.department_id;
                    this.param.group_id = row.group_id;
                    this.param.user_id = row.user_id
                    break
                default:
                    break;
            }
        },
    },
    created(){
        

    }
};

export default mix;