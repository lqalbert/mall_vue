<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
        {{orgId}}
    </p>
     <el-pagination
            class="pull-right"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total,prev,pager, next,jumper"
            :total="1000">
            </el-pagination>
  </div>
</template>

<script>
import PageMix from '../../mix/Page';
export default {
  name: 'AllCustomer',
  pageTitle:"消息盒子",
  props:['orgId'],
  data () {
    return {
      msg: '查看客户'+ this.orgid,
      currentPage:1

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
