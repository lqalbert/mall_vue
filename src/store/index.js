import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import strategy from './modules/strategy';
import role from './modules/role';
import goodsCates from './modules/goodsCates';
import area from './modules/area';
import carton from './modules/carton';
import express from './modules/express';
import entrepots from './modules/entrepot';
import departments from './modules/department';
import groups from './modules/groups';
import freightTemplate from './modules/freightTemplate';
import orderType from './modules/orderType';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //数据
    },
    mutations: {
        //方法 
    },
    actions: {
        //方法 异步
    }, 
    modules: {
        app,
        user,
        strategy,
        role,
        goodsCates,
        area,
        carton,
        express,
        entrepots,
        departments,
        groups,
        freightTemplate,
        orderType
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;