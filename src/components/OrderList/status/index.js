let mix = {
    data(){
        return {
            order_statuslist:[
                // {id:0,status:'待审核'},
                // {id:1,status:'审核通过'},
                // // {id:2,status:'待充值'},
                // // {id:3,status:'配货中'},
                // {id:4,status:'订单完成'},
                // {id:5,status:'订单取消'},
                // {id:6,status:'审核未通过'},

               {id:0, status:"待审核"},
                {id:1, status:"审核通过"},
                {id:2, status:"发货中"},// 审核通过
                {id:3, status:"已发货"}, // 称重发货
                {id:4, status:"已揽件"}, // 已揽件
                {id:5, status:"运输中"},
                {id:6, status:"订单完成"}, //签收
                {id:7, status:"订单取消"},
                {id:8, status:"审核未通过"}
            ],
            shipping_statuslist:[
                {id:0,status:'未处理'},
                {id:1,status:'配货中'},
                {id:2,status:'已发货'},
                {id:3,status:'已签收'},
            ]
        }
    }
}


export default mix;