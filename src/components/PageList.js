import Navgation from './Navgation.vue';


const PageList = {
    'Navgation':Navgation,

    'GoodsDetails': (resolve) => { require(['./GoodsDetails/Index.vue'], resolve)},
    'GoodsSpecs': (resolve) => { require(['./GoodsSpecs/Index.vue'], resolve)},
    'GoodsType': (resolve) => { require(['./GoodsType/Index.vue'], resolve)},
    'Department':(resolve)=>{ require(['./Department/Index.vue'], resolve)},
    'Group':(resolve)=>{ require(['./Group/Index.vue'], resolve)},
    'Employee':(resolve)=>{ require(['./Employee/Index.vue'], resolve)},
    'Customer':(resolve)=>{ require(['./CustomerInformation/Index.vue'], resolve)},

    'BuyOrders': (resolve) => { require(['./BuyOrders/Index.vue'], resolve)},
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

};

export default PageList;
