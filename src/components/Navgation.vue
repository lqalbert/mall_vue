<template>
  <div >
      <el-menu    theme="dark" @select="handleSelect" >
       <el-submenu v-for="(ni,index) in nav" :key="index" :index="index+''" >
        <template slot="title">
          <i v-if="ni.icon" :class="ni.icon"></i>
          {{ ni.text }}
        </template>
        <el-menu-item  v-for="sub in ni.subNav"  :key="sub.index" :index="sub.index+''"> {{ sub.text }} </el-menu-item>
      </el-submenu>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Navgation',
  data () {
    return {
      nav:[
        {
          text:"百宝箱",
          icon:"el-icon-message",
          subNav:[
            {text:'消息盒子', index:"MsgBox"},
            {text:'系统公告', index:'SysNotice'},
            {text:'部门公告', index:'DepartmentNotice'},
            {text:'集思信箱', index:'GatherAdvice'},
            {text:'工作总结', index:'WorkSummary'}
          ]
        },
          {
              text:'推广素材',
              icon:null,
              subNav:[
                  {text:'注册信息', index:'RegisterInfo'}
                  ]
          },
        {
          text:'组织员工',
          icon:null,
          subNav:[
            {text:'组织单位', index:'Department'},
            // {text:'组织区', index:'DepartmentDivision'},
            {text:'团队小组', index:'Group'},
            {text:'员工管理', index:'Employee'},
            {text:'角色管理', index:'Role'},
            {text:'权限管理', index:'Node'},
            {text:'菜单管理', index:'Menus'}
          ]
        },
        {
          text:'日常工作',
          icon:null,
          subNav:[
            { text:'客户管理', index:'Customer' },
            { text:'行情资讯', index:'CounselArticle' },
            { text:'推广客户', index:'DistributeCustomerB' },
            { text:'员工查询', index:'EmployeeSelect' },
            { text:'待开单客户', index:'MakeOrder' }, //材料员工
            { text:'客户预查', index:'PreCheck' },
            { text:'部门客户', index:'DepartmentCustomer' },
            { text:'产品管理', index:'Products' },
            { text:'推广部客户', index:'SpreadDepartmentCustomer' },
          ]
        },
        {
          text:'统计报表',
          icon:null,
          subNav:[
              { text:'业绩排名', index:'AchievementRank' },
              { text:'销售业绩报表', index:'Performance' },
              { text:'推广业绩报表', index:'PerformanceForSpread' },
              { text:'销售量化统计', index:'QuantizationCount' },
              { text:'推广量化统计', index:'SpreadQuantizationCount' },
              { text:'成交客户', index:'TradeCustomers' },
          ]
        },
        {
          text:'客服服务',
          icon:null,
          subNav:[
              { text:'审核审查', index:'RiskCheck' },
              { text:'购买审核', index:'BuyCheck' },
              { text:'购买流程', index:'RiskManager' },
          ]
        }
      ]   
    }
  },
  methods:{
      handleSelect(key, keyPath) {
          //console.log(key);
         // console.log(keyPath);
        this.$emit("nav-change", key);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
