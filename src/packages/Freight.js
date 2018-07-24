//计算运费
import FreightExtraAjax from '@/ajaxProxy/FreightExtra';


let o = {
    "orderType":null,
    "price":0.00,
    "address":null,
    "freightTemplate":null,
    "express_deliver":"",
    "extra_dis":[],

    "setOrderType":function(param){ //设置订单类型 
        this.orderType = param;
    },
    "setPrice":function(param){ //设置商品介格
        this.price = param;
    },
    "setAddress":function(param){ //设置地址
        this.address = param;
    },
    "setTemplate":function(param){ //运费模板 
        this.freightTemplate = param;
        //获取特殊区域
        FreightExtraAjax.get({fr_id:this.freightTemplate.id}).then((response)=>{
            this.extra_dis = response.data.items;
        }).catch(()=>{
            alert('获取特殊地区失败');
        })
    },
    "setExpress":function(param){ //可能选择的快递公司 不在提供的模板之类
        this.express_deliver = param;
    },
    "getFreight":function(){
        if(!this.address) {
            return 0.00
        }

        if(!this.freightTemplate) {
            return 0.00
        }

        if(!this.orderType) {
            return 0.00
        }

        //是否统一运费
        if (this.freightTemplate.is_unify ==1) {
            return this.freightTemplate.unify_fee;
        }

        if (this.orderType.is_include == 1) { //订单类型是否支持包邮
            //是否满足包邮的条件
            if( this.freightTemplate.is_include == 1 &&  this.freightTemplate.stand_fee *100 <= this.price*100 ){
                //满足
                return this.includeFreight();
            } else {
                //不满足
                return this.notIncludeFreight(); 
            }   
        } else { //不包邮
            return this.notIncludeFreight();   
        }
    },
    "includeFreight":function(){
        if (this.freightTemplate.express == this.express_deliver) {
            return this.freightTemplate.stand_extra
        } else {
            return 0.00
        }
    },
    "notIncludeFreight":function(){
        let basic = this.freightTemplate.basic_fee;
        //检查是否在特殊地区
        let item = this.extra_dis.find((element)=>{
            if(element.province_id == this.address.area_province_id) {
                return true;
            }
        });
        if(item) {
            return item.fee
        } else {
            return basic;
        }
    }
};

export default o;