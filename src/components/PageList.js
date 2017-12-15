import Navgation from './Navgation.vue';


const PageList = {
    'Navgation':Navgation,

    'Cosmetics':(resolve)=>{ require(['./Cosmetics/Index.vue'], resolve)},
    'HealthProducts':(resolve)=>{ require(['./HealthProducts/Index.vue'], resolve)},
    'Department':(resolve)=>{ require(['./Department/Index.vue'], resolve)},
    'Group':(resolve)=>{ require(['./Group/Index.vue'], resolve)},
    'Employee':(resolve)=>{ require(['./Employee/Index.vue'], resolve)},
    'CustomerInformation':(resolve)=>{ require(['./CustomerInformation/Index.vue'], resolve)},

    'BuyOrders': (resolve) => { require(['./BuyOrders/Index.vue'], resolve)},
    'OrderList':(resolve)=>{ require(['./OrderList/Index.vue'], resolve)},
    'InventoryList':(resolve)=>{ require(['./InventoryList/Index.vue'], resolve)},
    'GoodsInto':(resolve)=>{ require(['./GoodsInto/Index.vue'], resolve)},
    'GoodsOut':(resolve)=>{ require(['./GoodsOut/Index.vue'], resolve)},
    'ExpressInfo':(resolve)=>{ require(['./ExpressInfo/Index.vue'], resolve)},
    'Category':(resolve)=>{ require(['./Category/Index.vue'], resolve)},




};

export default PageList;
