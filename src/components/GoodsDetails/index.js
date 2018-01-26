import Add from './Add';
import Edit from './Edit';
//import DataProxy from '../../packages/DataProxy';
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';
import SelectProxy from  '../../packages/SelectProxy';
import GoodsDetailsAjaxProxy from '../../ajaxProxy/GoodsDetails';
import { quillRedefine } from 'vue-quill-editor-upload';
import URL_CONST from '../../config';

export default {
    name: 'GoodsDetails',
    pageTitle: "商品详情",
    mixins: [PageMix, SearchTool,DataTable,GoodsDetailsAjaxProxy],
    components:{
        Add,
        Edit,
        quillRedefine,
    },
    data() {
        return {
            ajaxProxy:GoodsDetailsAjaxProxy,
            mainparam:"",
            mainurl:GoodsDetailsAjaxProxy.getUrl(),
            cateOptions:[],
            UnitTypes:{},
            getCateCascaderUrl:"/tree",
            uploadUrl: URL_CONST.UPLOAD_URL,
            urlDomain: URL_CONST.DOMAIN,
            searchForm: {
                goods_name:'',
                goods_number:'',
                start:'',
                end:'',
                cate_id:[],
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();//- 8.64e7
                }
            },

        }
    },
    methods: {
        /* mainTableLoad(data) {
            this.toggleTableLoad();
            let res_data = data.items;
            for(var x in res_data){
                // console.log(res_data[x]);
                res_data[x].new_goods = res_data[x].new_goods ==1 ? true : false;
                res_data[x].hot_goods = res_data[x].hot_goods ==1 ? true : false;
                res_data[x].recommend_goods = res_data[x].recommend_goods ==1 ? true : false;
                res_data[x].status = res_data[x].status ==1 ? true : false;

            }
                console.log(res_data);
            this.tableData = res_data;
            this.total = data.total;
        }, */
        getAjaxProxy(){
            return this.ajaxProxy;
        },
        initCateOptions(data){
            this.cateOptions = data.items;
            //console.log(this.cateOptions);
        },
        initUnitTypes(data){
            this.UnitTypes = data;
        },
        getCateCascader(){
            let selectProxy = new SelectProxy(this.getCateCascaderUrl,this.initCateOptions,this);
            selectProxy.load();
        },
        getUnitTypes(){
            let selectProxy = new SelectProxy("/goodsdetails",this.initUnitTypes,this);
            selectProxy.setExtraParam({business:'UnitTypes'}).load();
        },
        setUnitTypes(v){
            return this.UnitTypes[v];
        },
        onSearchChange(param) {
            console.log(param);
            if (this.searchForm.start > this.searchForm.end) {
                this.$message.error("请选择正确的时间段");
                return ;
            }
            this.mainparam = JSON.stringify(param);
        },
        showAdd(){
            this.$modal.show('add-goods-details',{model:this.UnitTypes});
        },
        showEdit(row){
            //console.log(row);die;
            this.$modal.show('edit-goods-details', { model: row, extra: this.UnitTypes, urlDomain: this.urlDomain});
        },
        handleCateChange(v){
            //console.log(v);
            this.searchForm.cate_id = v;
        },
        getStartTime(v){
            this.searchForm.start = v;
        },
        getEndTime(v){
            this.searchForm.end = v;
        },

        displayCategory(category){
            let cate = [];
            for (let index = 0; index < category.length; index++) {
                cate.push(category[index].label);
            }
            return cate.join(" / ");
        }

    },

    created() {
        this.$on('search-tool-change', this.onSearchChange);
        this.getCateCascader();
        this.getUnitTypes();
        
    },

}