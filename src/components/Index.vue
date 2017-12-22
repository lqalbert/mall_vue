
<template>

  <div>
    <div  id="top" >
        <!-- <el-row>
            <el-col :span="12">
                <div class="big-title">化妆品商城后台系统</div>
            </el-col>
            <el-col  :span="12">
                <div class="top-date">北京时间 2017年12月05日 18:18:18 星期二</div>
                <div class="top-name">欢迎您大佬大佬</div>
            </el-col>
        </el-row> -->
    </div>
    <div class='bottom' >
        <aside class="Navgation" >
            <Navgation @nav-change="navChange" />
        </aside>
        <div>
            <el-tabs
                    v-model="editableTabsValue"
                    type="card"
                    closable
                    @tab-remove="removeTab"
                    @tab-click="activeTab">
                <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.closable">
                </el-tab-pane>
            </el-tabs>
            <!-- 组件在 vm.currentview 变化时改变！ -->
            <section class="main-hook">
                <transition name="el-fade-in-linear" mode="out-in" >
                    <keep-alive>
                        <component v-bind:is="currentView" @page-loaded="pageLoad"   @search-tool-change="test"></component>
                    </keep-alive>
                </transition>
            </section>
        </div>
    </div>
  </div>




</template>

<script>

// import Navgation from './Navgation.vue';
import PageList from "./PageList";
export default {
    name: 'Index',
    components:PageList,
    loadedComponent:[],
    data () {
        return {
            currentView:"",
            editableTabsValue: '2',
            editableTabs: [],
        }
    },
    methods:{
        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);

            let index = this.$options.loadedComponent.indexOf(targetName);
            this.$options.loadedComponent.splice(index,1);
            this.currentView = activeName;
            // console.log(this.$children);
            //destroy 这个组件 暂时不做
        },

        addTab(targetName, title) {
            let newTabIndex = targetName;
            this.editableTabs.push({
                title: title,
                name: targetName,
                closable:false
            });
            this.editableTabsValue = newTabIndex;
        },

        activeTab(tab){
             //console.log('点击了'+tab);
            this.currentView = tab.name;
        },test(v){
            console.log(v);
        },

        navChange(name){
            //console.log(name);
            //let component = this.getPageComponent(name);
           // console.log(component);// 是一个函数
            // let component = this.$children[name];//window.Vue.component(name)
            if (this.$options.loadedComponent.indexOf(name) == -1 ) {
                this.addTab(name, '加载中');
                this.currentView = name;
                this.$options.loadedComponent.push(name);
            } else {
                this.currentView = name;
                this.editableTabsValue = name;
            }

            

        },

        setTabTitle(name, title){
            let tabs = this.editableTabs;
            tabs.forEach((tab, index) => {
                if (tab.name == name) {
                    tab.title = title;
                }
            });
        },

        pageLoad(param){
            this.setTabTitle(param.name, param.title);
        },
        userInfo(){

            this.navChange('UserInfo');
        },
        userSetting(){
            this.navChange('UserSetting'); 
        },
        handleSelect(key, keyPath){
         // console.log(key);
          this.navChange(key);
        }
    },
    mounted:function(){
        this.navChange('Cosmetics');
    }
}
</script>

<style scoped>

.Navgation{
    position: fixed;
    left: 0;
    top: 63px;
    bottom:0px;
    width: 200px;
    background-color: #324157;
}
.main-hook{
    padding:0 10px 0;
}
#top-css{
  min-width:105px;
  height:55px;
  position:fixed;
  right:0px;
  top:0px;
  z-index:99999;
}
.big-title{
  line-height:55px;font-size:22px;margin-left:2px
}
.top-date{
  color:#d85126;float:left;margin-left:100px;margin-top:18px;
}
.top-name{
  color:#d85126;float:left;margin-left:100px;margin-top:18px;
}

#top {
    height: 55px;
    border-bottom: 2px solid #ea4b4b;
}
.el-tabs__header {
    border-bottom: 1px solid #d1dbe5;
    padding: 0;
    position: relative;
    margin: 0 0 5px;
}
.bottom {
    padding-left: 200px
}
</style>

