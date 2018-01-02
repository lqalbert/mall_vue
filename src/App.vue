<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld'
    import Index from './components/Index'

    export default {
        name: 'app',
        components: {
            Index
        }
    }
</script>

<style>

  html,body{
    padding: 0px;
    margin: 0px;
  }

  .search-bar .el-form-item {
    width: 120px;
  }

  .pull-right{
    float: right;
  }
  .v--modal-overlay{
    background-color: rgba(0, 0, 0, 0.5);
  }


  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.4s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  /* .slide-fade-enter-active, .slide-fade-leave-active {
      transition: all 0.4s;
  }

  .slide-fade-enter, .slide-fade-leave-active {
      opacity: 0;
      transform: translateY(-20px);
  } */
</style>

