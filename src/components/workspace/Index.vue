<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>工作台</h2>
    
  </div>
</template>

<script>
import PageMix from '../../mix/Page';
export default {
  name: 'WorkSpace',
  pageTitle:"工作台",
    mixins: [PageMix],
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
