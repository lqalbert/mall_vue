<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="value7" >
                    <el-date-picker
                            size="small"
                            v-model="searchForm.value7"
                            type="daterange"
                            placeholder="选择日期"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                            @change="startDateChange">
                    </el-date-picker>
                </el-form-item>

                <!-- <el-form-item prop="goods_name">
                    <el-input size="small" v-model="searchForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item> -->

                <!-- <el-form-item prop="deal_name">
                    <el-input size="small" v-model="searchForm.deal_name" placeholder="请输入员工名称"></el-input>
                </el-form-item> -->

                <el-form-item prop="consignee">
                    <el-input size="small" v-model="searchForm.consignee" placeholder="请输入客户名称"></el-input>
                </el-form-item>

                <el-form-item prop="sn">
                    <el-input size="small" v-model="searchForm.sn" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                

                <el-form-item label-width="5px">
                    <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-tooltip content="清空搜索条件" placement="bottom-start" style="margin-left:10px;">
                        <el-button  size="small" @click="searchToolReset('searchForm')"  type="warning">重置</el-button>
                    </el-tooltip>
                </el-form-item>

                <br>
                <el-form-item prop="type">
                    <!-- 改成新的 -->
                    <el-badge :value="0"  class="badge-dot" >
                        <el-button size="small" @click="searchToolReset('searchForm')"  type="info" >全部</el-button>
                    </el-badge>
                    <el-badge :value="0" class="badge-dot" :is-dot="false">
                        <el-button size="small" @click="singlbutton('0', '', '')"  type="info" >待审核</el-button>
                    </el-badge>

                    <el-badge :value="0" :max="9" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('2', '', '')"  type="info" >待充值</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('', '1', '')"  type="info" >配货中</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('', '2', '')"  type="info" >已发送</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('', '3', '')"  type="info" >已签收</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('3', '', '')"  type="info" >完成</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('4', '', '')"  type="info" >已取消</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="singlbutton('', '', '1')"  type="info" >退换货</el-button>
                    </el-badge>
                   
                   
                </el-form-item>

            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"  @dbclick="showRow" :page-size="20" >
                    <el-table-column prop="order_sn" label="订单号" align="center" width="180">
                    </el-table-column>

                    <el-table-column prop="order_all_money" label="总金额" align="center">
                    </el-table-column>

                    <el-table-column prop="order_pay_money" label="应付金额" align="center">
                    </el-table-column>

                    <el-table-column prop="cus_name" label="购买顾客" align="center">
                    </el-table-column>

                    <el-table-column prop="deal_name" label="成交员工" align="center">
                    </el-table-column>

                    <el-table-column prop="status_text" label="订单状态" align="center">
                    </el-table-column>

                    <el-table-column prop="product_status_text" label="货物状态" align="center">
                    </el-table-column>

                    <el-table-column prop="after_sale_status_text" label="售后状态" align="center">
                    </el-table-column>

                    <el-table-column prop="created_at" label="下单时间" align="center" width="180">
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" align="center" width="210">
                        <template slot-scope="scope">
                            <el-dropdown trigger="click" type="primary" size="small" split-button @click="showRowData(scope.row)" menu-align="start">
                                编辑
                                <el-dropdown-menu slot="dropdown" split-button>
                                    <el-dropdown-item>
                                        <el-button type="text"  @click="open2(scope.row)">发起退货</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button type="text"  @click="showExchange(scope.row)">发起换货</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button type="text"  @click="cancelOrder(scope.row)">取消</el-button>
                                    </el-dropdown-item>
                                    <!-- 总经办这里就没有发起退款 -->
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="danger" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <!-- 暂时注释添加 等改完后再加回去 -->
                        <!-- <el-tooltip content="点击添加订单" placement="right">
                            <el-button size="small" icon="plus" type="info" @click="showAdd" >添加</el-button>
                        </el-tooltip> -->
                    </div>

                </TableProxy>
            </el-col>
        </el-row>

        <br>
        <SubDetail :row="dbRow"/>

        <rowInfo name="rowInfo"
                 :ajax-proxy="ajaxProxy"
                 @submit-success="handleReload"/>
        <ReturnGoods name="returnGoods" :ajax-proxy="ajaxProxy"  @submit-success="handleReload">
        </ReturnGoods>
        <ExchangeGoods name="exchangeGoods" :ajax-proxy="ajaxProxy"  @submit-success="handleReload">
        </ExchangeGoods>
    </div>
</template>
<script src="./index.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .menu
    {
        width: 100%;
        border: none;
        background-color: #20A0FF;
        color:#fbfdff;
    }
    .menu:hover
    {
        width: 100%;
        border: none;
        background-color: #20A0FF;
        color: black;
    }
    
</style>
