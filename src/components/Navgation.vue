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
            {text:'商品列表', index:"Cosmetics"},
             {text:'商品分类', index:"Category"},
            // {text:'保健品', index:'HealthProducts'},
          ]
        },

        {
          text:'员工管理',
          icon:null,
          subNav:[
            {text:'组织单位', index:'Department'},
            {text:'团队小组', index:'Group'},
            {text:'员工信息', index:'Employee'},

          ]
        },
        {
          text:'客户管理',
          icon:null,
          subNav:[
            { text:'客户资料', index:'CustomerInformation' },
            { text:'购买订单', index:'BuyOrders' },
          ]
        },
        {
          text:'订单管理',
          icon:null,
          subNav:[
              { text:'订单列表', index:'OrderList' },
          ]
        },
        {
          text:'库存管理',
          icon:null,
          subNav:[
              { text:'库存列表', index:'InventoryList' },
              { text:'商品入库', index:'GoodsInto' },
              { text:'商品出库', index:'GoodsOut' },
          ]
        },
        {
          text:'配送管理',
          icon:null,
          subNav:[
              { text:'物流信息', index:'ExpressInfo' },

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
