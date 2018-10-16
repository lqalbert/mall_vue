import PageMix from '@/mix/Page';
import DataTable from '@/mix/DataTable';
import SearchTool from '@/mix/SearchTool';
import SalesPerformanceOrderInfo from '@/packages/SalesPerformanceOrderInfoProxy';
import SalesPerformanceOrderInfoAjaxProxy from '@/ajaxProxy/SalesPerformanceOrderInfo';

import SubDetail from '../SubDetail';
import Caculate from '@/config/caculate';

let mix = {
    mixins: [PageMix,SearchTool,DataTable],
    components:{
        SubDetail
    },
    data(){
        return {
            param:{},
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
            },
            view_start:"",
            view_end:"",
        }
    },
    methods:{
        onSearchChange(param){
            param.timestamp = Date.now();
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
        setField(v){
            switch (v) {
                case 'week':
                    this.searchForm.start = Caculate.showWeekFirstDay();
                    this.searchForm.end   = Caculate.showWeekLastDay();
                    break;
                case 'month':
                    this.searchForm.start = Caculate.showMonthFirstDay();
                    this.searchForm.end   = Caculate.showMonthLastDay();
                    break;
                case 'lastMonth':
                    this.searchForm.start = Caculate.showLastMonthFirstDay();
                    this.searchForm.end   = Caculate.showLastMonthLastDay(); 
                    break;
                case 'lastWeek':
                    this.searchForm.start = Caculate.showLastWeekFirstDay();
                    this.searchForm.end   = Caculate.showLastWeekLastDay(); 
                    break;
                default:
                    break;
            }
            this.onSearchChange(this.searchForm);
        },
    },
    created(){
        let vmthis = this;
        this.$watch('searchForm.start', function(val, oldVal){
            this.view_start = val;
        });
        this.$watch('searchForm.end', function(val, oldVal){
            this.view_end = val;
        });

        this.searchForm.start = Caculate.showLastWeekFirstDay();
        this.searchForm.end = Caculate.showLastWeekLastDay();
        // this.onSearchChange(this.searchForm);

    }
};

export default mix;