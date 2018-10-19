//计算运费
import FreightExtraAjax from '@/ajaxProxy/FreightExtra';


let o = {
    "scope":null,
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

        //获取特殊区域
        FreightExtraAjax.get({ province_id: this.address.area_province_id }).then((response)=>{
            this.extra_dis = response.data.items;
            this.scope.$emit('cacul-freight');
            this.scope.$emit('freight-change');
        }).catch(()=>{
            alert('获取特殊地区失败');
        })
    },
    "setTemplate":function(param){ //运费模板 
        this.freightTemplate = param;
        // console.log(param);
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
            if( this.freightTemplate.is_include == 1 &&  parseInt(this.freightTemplate.stand_fee *100) <= parseInt(this.price*100) ){
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
        return this.freightTemplate.stand_extra
        // if (this.freightTemplate.express == this.express_deliver) {
        //     return this.freightTemplate.stand_extra
        // } else {
        //     return 0.00
        // }
    },
    "notIncludeFreight":function(){
        let basic = this.freightTemplate.basic_fee;
        //检查是否在特殊地区
        let item = this.isExtraEare();
        if(item) {
            return item.fee
        } else {
            return basic;
        }
    },

    "isExtraEare":function(){
        return this.extra_dis.find((element)=>{
            if(element.fr_id == this.freightTemplate.id) {
                return true;
            }
        });
    },
    "setScope":function(obj){
        this.scope = obj;
    },
    //
    /**
     *  包邮邮费
     * @todo  写死了的 重改下
     * 指定顺丰，收12
     *   指定ems，收18
     *  不指定，偏远五省  18，一般10块
     */
    "bookFreight":function(){
        switch(this.freightTemplate.name) {
            case '默认':
                if(this.isExtraEare()) {
                    return 18;
                } else {
                    return 10;
                }
                // console.log(10,18);
                break;
            case '顺风':
                return 12;
                break;
            case 'EMS':
            case 'ems':
            case 'Ems':
            case 'eMs':
            case 'emS':
            case 'EMs':
            case 'eMS':
            case 'EmS':
                return 18;
                break;
            default:
                // console.log("i没有找到.0")
                return 0;
        }   
    }
};

export default o;