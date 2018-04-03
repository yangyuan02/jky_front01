<template>
    <div>
        <div class="data">
            <div class="data_header">
                <div class="crumbs">
                    <p>
                        <i></i>
                        <span>材料管理</span>
                    </p>
                </div>
                <div class="data_satus">
                    <a href="javascrip:;">已完成60</a>
                    <a href="javascrip:;">未完成32</a>
                </div>
            </div>
            <div class="table_header">
                <ul>
                    <li style="width:20%;">评价内容</li>
                    <li style="width:20%;">具体评价内容</li>
                    <li style="width:20%;">指标</li>
                    <li style="width:20%;">自评等级</li>
                    <li style="width:20%;">材料操作</li>
                </ul>
            </div>
            <table border="1" cellspacing="0">
                <tr v-for="(item,index) in table" :key="index">
                    <td :rowspan="item.one_row" v-bind:class="{ show: item.show_one=='false'}">{{item.one}}</td>
                    <td :rowspan="item.two_row" v-bind:class="{ show: item.show_two=='false'}">{{item.two}}</td>
                    <td>{{item.three}}</td>
                    <td>状态</td>
                    <td>{{item.self_point}}</td>
                    <td @click="goDatail(item.id)">上传</td>
                    <td @click="goDatail(item.id)">补传</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                table: []
            }
        },
        methods: {
            getData() {
                this.$ajax.get('/api/role_points', {}).then((res) => {
                    this.table = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            goDatail(id) { //跳转详情
                this.$router.push({
                    name: 'upload',
                    params: {
                        id: id
                    }
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style>
    .show{
        display:none;
    }
    .data {
       background:#fff;
       margin: 0px 15px;
       box-shadow: 1px 1px 8px #ccc;
    }
    .table_header ul {
        display: flex;
        height: 52px;
        background: #2dc9b9;
        align-items: center;
        color: #fff;
    }
    .table_header ul li {
        text-align: center;
    }
    .table_body {
        width: 100%;
    }
    .table_body .row {
        border: 1px solid red;
    }
    .table_body .row .cell span {
        display: inline-block;
    }
    .table_body .row .cell span:nth-child(1) {
        width: 20%;
    }
    .table_body .row .cell span:nth-child(2) {
        width: 20%;
    }
    .table_body .row .cell span:nth-child(3) {
        width: 20%;
    }
    table {
        width: 1053px;
        border: 1px solid red;
        margin-top: 10px;
    }
    .data_header{
        display: flex;
        height:38px;
        align-items: center;
        justify-content: space-between;
        padding-left:20px;
    }
    .data_header .data_satus a{
        display: inline-block;
        text-align: center;
        line-height:38px;
        width: 108px;
        height: 38px;
        color: #fff;
    }
    .data_header .data_satus a:nth-child(1){
        background: #1f6ed4
    }
    .data_header .data_satus a:nth-child(2){
        background: #65d3e3
    }
    .data_header .crumbs i{
        display: inline-block;
        width:10px;
        height:14px;
        background: url("../../assets/crumbs_bg.png") no-repeat;
    }
</style>

