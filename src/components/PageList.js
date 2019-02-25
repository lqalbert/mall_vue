import Navgation from './Navgation.vue';


const PageList = {
    'Navgation':Navgation,

    'UserSetting': (resolve) => { require(['./UserSetting/Index.vue'],resolve)},
    'UserInfo': (resolve) => { require(['./UserInfo/Index.vue'],resolve)},

    'GoodsDetails': (resolve) => { require(['./GoodsDetails/Index.vue'], resolve)},
    'GoodsSpecs': (resolve) => { require(['./GoodsSpecs/Index.vue'], resolve)},
    'GoodsType': (resolve) => { require(['./GoodsType/Index.vue'], resolve)},
    'Department':(resolve)=>{ require(['./Department/Index.vue'], resolve)},
    'Group':(resolve)=>{ require(['./Group/Index.vue'], resolve)},
    'Employee':(resolve)=>{ require(['./Employee/Index.vue'], resolve)},
    'Customer':(resolve)=>{ require(['./CustomerInfo/Index.vue'], resolve)},

    // 'BuyOrders': (resolve) => { require(['./BuyOrders/Index.vue'], resolve)},
    'OrderList':(resolve)=>{ require(['./OrderList/Index.vue'], resolve)},
    'Refund':(resolve)=>{ require(['./Refund/Index.vue'], resolve)},
    'InventoryList':(resolve)=>{ require(['./InventoryList/Index.vue'], resolve)},
    'GoodsInto':(resolve)=>{ require(['./GoodsInto/Index.vue'], resolve)},
    'GoodsOut':(resolve)=>{ require(['./GoodsOut/Index.vue'], resolve)},
    'ExpressInfo':(resolve)=>{ require(['./ExpressInfo/Index.vue'], resolve)},
    'Category':(resolve)=>{ require(['./Category/Index.vue'], resolve)},

    'Deposit':(resolve)=>{ require(['./Deposit/Index.vue'], resolve)},
    'Articles':(resolve)=>{ require(['./Article/Index.vue'], resolve)},
    'SkinCareInfo':(resolve)=>{ require(['./SkinCareInfo/Index.vue'], resolve)},
    'Connection': (resolve) => { require(['./Connection/Index.vue'], resolve)},
    'Workbench': (resolve) => { require(['./Workbench/Index.vue'], resolve)},
    'SysNotice': (resolve) => { require(['./SysNotice/Index.vue'], resolve)},
    'Website': (resolve) => { require(['./Website/Index.vue'], resolve)},
    'Contacts': (resolve) => { require(['./Contacts/Index.vue'], resolve)},
    
    'StockDetails': (resolve) => { require(['./StockDetails/Index.vue'], resolve)},
    'StockSum': (resolve) => { require(['./StockSum/Index.vue'], resolve)},
    'StockOutDetails': (resolve) => { require(['./StockOutDetails/Index.vue'], resolve)},
    'StockWarning': (resolve) => { require(['./StockWarning/Index.vue'], resolve)},
    // 'ShelvesPick': (resolve) => { require(['./ShelvesPick/Index.vue'], resolve)},

    'ExpressCompany': (resolve) => { require(['./ExpressCompany/Index.vue'], resolve)},
    'ExpressReceive': (resolve) => { require(['./ExpressReceive/Index.vue'], resolve)},
    'DistributionDelivery': (resolve) => { require(['./DistributionDelivery/Index.vue'], resolve)},
    'ShelvesManagement': (resolve) => { require(['./ShelvesManagement/Index.vue'], resolve)},
    'DistributionCenter': (resolve) => { require(['./DistributionCenter/Index.vue'], resolve)},
    'CartonManagement': (resolve) => { require(['./CartonManagement/Index.vue'], resolve)},

    //验货
    'GoodsInspect': (resolve) => { require(['./GoodsInspect/Index.vue'], resolve)},
//    同步发货
    'DeliverGoods': (resolve) => { require(['./DeliverGoods/Index.vue'], resolve)},
    //入库流程
    'WarehousingProcess': (resolve) => { require(['./WarehousingProcess/Index.vue'], resolve)},
    'ExpressCompensation': (resolve) => { require(['./ExpressCompensation/Index.vue'], resolve)},
    'PurchaseList': (resolve) => { require(['./PurchaseList/Index.vue'], resolve)},

    //盘点开单
    'StockCheckGoods': (resolve) => {require(['./StockCheckGoods/Index.vue'], resolve)},
    'StockCheck': (resolve) => { require(['./StockCheck/Index.vue'], resolve)},
    //统计报表 by hj
    'SalesPerformance': (resolve) => {require(['./SalesPerformance/Index.vue'], resolve)},
    'SalesQuantization': (resolve) => {require(['./SalesQuantization/Index.vue'], resolve)},
    'Mail': (resolve) => {require(['./Mail/Index.vue'], resolve)},

    //运费模板
    'FreightTemplate':(resolve) => { require(['./FreightTemplate/Index.vue'], resolve)},
    //OrderType 订单类型 
    'OrderType':(resolve) => { require(['./OrderType/Index.vue'], resolve)},
    'SlideManage':(resolve) => { require(['./SlideManage/Index.vue'], resolve)},
    //订单保证金日志
    'OrderDepositLog': (resolve) => { require(['./OrderDepositLog/Index.vue'], resolve) },
    //前台展示用的分类
    'FrontCategory' : (resolve) => { require(['./FrontCategory/Index.vue'], resolve)},
   'QuestionnaireManagement':(resolve)=>{ require(['./QuestionnaireManagement/Index.vue'], resolve)},
    //商品销售统计
    'SalesGoodsStatistics': (resolve) => {require(['./SalesGoodsStatistics/Index.vue'], resolve)},
    //样品申请
    'SampleApplication': (resolve) => {require(['./Samapp/Index.vue'], resolve)},
    'AccountSettings':(resolve)=>{ require(['./AccountSettings/Index.vue'], resolve)},
    //京东订单
    'JdOrderBasic': (resolve) => {require(['./JdOrderBasic/Index.vue'], resolve)},
    'ImportJdOrder': (resolve) => {require(['./ImportJdOrder/Index.vue'], resolve)},
    //预充值 保证金换个名
    'EarnestMoney': (resolve) => {require(['./EarnestMoney/Index.vue'], resolve)},
    //护理方案
    'Efficacy': (resolve) => {require(['./Efficacy/Index.vue'], resolve)}
};

export default PageList;
