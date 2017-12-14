import Navgation from './Navgation.vue';


const PageList = {
    'Navgation':Navgation,

    'MsgBox':(resolve)=>{ require(['./msgbox/Index.vue'], resolve)},
    'SysNotice':(resolve)=>{ require(['./sysnotice/Index.vue'], resolve)},
    'DepartmentNotice':(resolve)=>{ require(['./DepartmentNotice/Index.vue'], resolve)},
    'GatherAdvice':(resolve)=>{ require(['./GatherAdvice/Index.vue'], resolve)},
    'WorkSummary':(resolve)=>{ require(['./WorkSummary/Index.vue'], resolve)},
    'RegisterInfo':(resolve)=>{ require(['./RegisterInfo/Index.vue'], resolve)},
    'Department':(resolve)=>{ require(['./Department/Index.vue'], resolve)},
    'DepartmentDivision':(resolve)=>{ require(['./DepartmentDivision/Index.vue'], resolve)},
    'Group':(resolve)=>{ require(['./Group/Index.vue'], resolve)},
    'Employee':(resolve)=>{ require(['./Employee/Index.vue'], resolve)},
    'Role':(resolve)=>{ require(['./Role/Index.vue'], resolve)},
    'Node':(resolve)=>{ require(['./Node/Index.vue'], resolve)},
    'Menus':(resolve)=>{ require(['./Menu/Index.vue'], resolve)},
    'AchievementRank':(resolve)=>{ require(['./AchievementRank/Index.vue'], resolve)},
    'Performance':(resolve)=>{ require(['./Performance/Index.vue'], resolve)},
    'PerformanceForSpread':(resolve)=>{ require(['./PerformanceForSpread/Index.vue'], resolve)},
    'QuantizationCount':(resolve)=>{ require(['./QuantizationCount/Index.vue'], resolve)},
    'SpreadQuantizationCount':(resolve)=>{ require(['./SpreadQuantizationCount/Index.vue'], resolve)},
    'TradeCustomers':(resolve)=>{ require(['./TradeCustomers/Index.vue'], resolve)},
    'RiskCheck':(resolve)=>{ require(['./RiskCheck/Index.vue'], resolve)},
    'BuyCheck':(resolve)=>{ require(['./BuyCheck/Index.vue'], resolve)},
    'RiskManager':(resolve)=>{ require(['./RiskManager/Index.vue'], resolve)},
    'Customer':(resolve)=>{ require(['./customer/Index.vue'], resolve)},
    'CounselArticle': (resolve) => { require(['./counselArticle/Index.vue'], resolve)},
    'DistributeCustomerB': (resolve) => { require(['./distributeCustomerB/Index.vue'], resolve)},
    'EmployeeSelect': (resolve) => { require(['./employeeSelect/Index.vue'], resolve)},
    'MakeOrder': (resolve) => { require(['./makeOrder/Index.vue'], resolve)},
    'PreCheck': (resolve) => { require(['./preCheck/Index.vue'], resolve)},
    'DepartmentCustomer': (resolve) => { require(['./departmentCustomer/Index.vue'], resolve)},
    'Products': (resolve) => { require(['./products/Index.vue'], resolve)},
    'SpreadDepartmentCustomer': (resolve) => { require(['./spreadDepartmentCustomer/Index.vue'], resolve)},
    'UserInfo': (resolve) => { require(['./UserInfo/Index.vue'], resolve)},
    'UserSetting': (resolve) => { require(['./UserSetting/Index.vue'], resolve)},
    'Logout': (resolve) => { require(['./Logout/Index.vue'], resolve)},


};

export default PageList;
