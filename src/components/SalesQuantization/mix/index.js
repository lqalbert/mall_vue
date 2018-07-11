import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import SalQuantionAjax from '@/ajaxProxy/SaleQuation';
const mix = {
    mixins: [PageMix, SearchTool,DataTable],
    data(){
        return {
            mainparam:"",
            mainurl:SalQuantionAjax,

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
        }
    }
};


export default mix;