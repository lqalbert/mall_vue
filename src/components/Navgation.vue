<template>
  <div >
      <el-menu :unique-opened="true" theme="dark" @select="handleSelect" >
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
          text:"商品管理",
          icon:null,
          subNav:[
            {text:'商品详情', index:"GoodsDetails"},
            {text:'商品分类', index:"Category"},
            {text:'商品规格', index:"GoodsSpecs"},
            {text:'商品类型', index:"GoodsType"},
          ]
        },

        {
          text:'员工管理',
          icon:null,
          subNav:[
            {text:'组织单位', index:'Department'},
            {text:'团队小组', index:'Group'},
            {text:'员工信息', index:'Employee'},
            {text:'保证金 ',  index:'Deposit'},

          ]
        },
        {
          text:'客户管理',
          icon:null,
          subNav:[
            { text:'客户资料', index:'CustomerInformation' },
          ]
        },
        {
          text:'订单管理',
          icon:null,
          subNav:[
              { text:'订单详情', index:'OrderList' },
              { text:'订单审核', index:'BuyOrders' },
          ]
        },
        {
          text:'库存管理',
          icon:null,
          subNav:[
              { text:'库存详情', index:'InventoryList' },
              /*{ text:'商品入库', index:'GoodsInto' },
              { text:'商品出库', index:'GoodsOut' },*/
          ]
        },
        {
          text:'配送管理',
          icon:null,
          subNav:[
              { text:'物流信息', index:'ExpressInfo' },

          ]
        },
        {
          text:'资讯管理',
          icon:null,
          subNav:[
              { text:'最新资讯', index:'Article' },

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
