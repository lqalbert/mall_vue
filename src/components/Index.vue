<template>

    <div>
        <div id="top">
            <el-row>
                <!-- <el-col :span="12">
                    <div class="big-title">CRM客户关系管理系统</div>
                </el-col>
                <el-col  :span="12">
                    <div class="top-date">北京时间 2017年12月05日 18:18:18 星期二</div>
                    <div class="top-name">欢迎您大佬大佬</div>
                <el-menu class="el-menu-demo" id="top-css" mode="horizontal" @select="handleSelect">
                <el-submenu index="999">
                    <template slot="title">大佬大佬</template>
                    <el-menu-item index="UserInfo"><i class="el-icon-setting"></i>个人信息</el-menu-item>
                    <el-menu-item index="UserSetting"><i class="el-icon-setting"></i>设置密码</el-menu-item>
                    <el-menu-item index="Logout"><i class="el-icon-circle-close"></i>退出登录</el-menu-item>
                </el-submenu>
                </el-menu>
                </el-col> -->
                <button @click="logout">退出</button>
            </el-row>
        </div>
        <aside id="navgation">
            <Navgation @nav-change="navChange" />
        </aside>
        <section id="body">
            <el-tabs
                    id="main-tab"
                    v-model="editableTabsValue"
                    type="card"
                    closable
                    :class="{shadow: isshadow}"
                    @tab-remove="removeTab"
                    @tab-click="activeTab">
                <el-tab-pane
                        v-for="(item, index) in editableTabs"
                        :key="index"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.closable">
                </el-tab-pane>
            </el-tabs>
            <!-- 组件在 vm.currentview 变化时改变！ -->
            <section class="main-hook"   @scroll="handleScroll">
                <transition name="el-fade-in-linear" mode="out-in" >
                    <!-- :exclude="exclude" -->
                    <keep-alive >
                        <component v-bind:is="currentView" @page-loaded="pageLoad"   @before-destory="beforeDestroy" @deactivated="handleDeActive"></component>
                    </keep-alive>
                </transition>
            </section>
        </section>

    </div>
</template>

<script>

    // import Navgation from './Navgation.vue';
    import { mapActions } from 'vuex';
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

                exclude:[],

                isshadow:false
            }
        },
        methods:{
            ...mapActions([
                'logout'
            ]),

            removeTab(targetName) {

                this.exclude.push(targetName);
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

                // let i = this.exclude.indexOf(targetName);
                // if (i!=-1) {
                //     this.exclude.splice(i,1);
                // }

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
            },
            handleDeActive(component){
                //效果不好

                let i = this.exclude.indexOf(component.$options.name);
                if (i!=-1) {
                    console.log('reset component', component.$options.name);
                    component.$emit('page-reset');
                    this.exclude.splice(i,1);
                }
            },
            beforeDestroy(name){
                console.log('set destroy');
                // this.$nextTick(function () {

                // })
                l
                console.log(this.exclude);
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
            },
            handleScroll(e){
                let target = e.target;
                // console.log(target.offsetTop);
                if (target.scrollTop == 0) {
                    this.isshadow = false;
                } else {
                    this.isshadow = true;
                }

            }
        },
        mounted:function(){
            this.navChange('OrderList');
        }
    }
</script>

<style scoped>

    #navgation{
        position: fixed;
        left: 0;
        top: 57px;
        bottom: 0px;
        width: 200px;
        background-color: #324157;
        overflow-y: auto;
        overflow-x: hidden;
    }
    #body{
        position: absolute;
        left: 200px;
        top: 57px;
        right: 0px;
        bottom: 0px;
    }
    #main-tab{
        position: absolute;
        right: 0px;
        left: 0px;
        z-index: 4;

        background-color: #fff;
    }
    .main-hook{
        padding:10px 10px 0;
        position: absolute;
        top: 55px;
        right: 0px;
        left: 0px;
        bottom: 0px;
        overflow-y: auto;
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
        font-size:22px;margin-top:14px;margin-left:2px
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

    .shadow {
        box-shadow: 0px 3px 3px 1px rgba(27, 33, 58, .4);
    }
</style>
