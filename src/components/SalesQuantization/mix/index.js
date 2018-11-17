import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import SalQuantionAjax from '@/ajaxProxy/SaleQuation';
import Caculate from '@/config/caculate';
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
            },
            view_start:"",
            view_end:""

        }
    },
    methods:{
        onSearchChange(param){
            param.timestamp = Date.now();
            this.mainparam = JSON.stringify(param);
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

        // this.$on('search-tool-change', this.onSearchChange);
        // this.onSearchChange(this.searchForm);
        
    }
};


export default mix;