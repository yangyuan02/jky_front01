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
                    <a href="javascrip:;" @click="getData('/api/role_points/finish_point')">已完成{{point_count.finish}}</a>
                    <a href="javascrip:;" @click="getData('/api/role_points/no_finish_point')">未完成{{point_count.no_finish}}</a>
                </div>
            </div>
            <div class="table_header">
                <ul>
                    <li style="width:17.02%;">A一级指标</li>
                    <li style="width:19.312%;">B二级指标</li>
                    <li style="width:20.949%;">C三级指标</li>
                    <li style="width:12.2749%;">状态</li>
                    <li style="width:12.2749%;">自评等级</li>
                    <li style="width:18.739%;">材料操作</li>
                </ul>
            </div>
            <table border="1" cellspacing="0">
                <tr v-for="(item,index) in table" :key="index">
                    <td :rowspan="item.one_row" v-bind:class="{ show: item.show_one=='false'}" style="width:17.02%;">{{item.one}}</td>
                    <td :rowspan="item.two_row" v-bind:class="{ show: item.show_two=='false'}" style="width:19.312%;">{{item.two}}</td>
                    <td style="width:20.949%;">{{item.three}}</td>
                    <td style="width:12.2749%;text-align:center;">
                        <i class="iconfont">{{item.status==1?'&#xe610;':'&#xe60f;'}}</i>
                    </td>
                    <td style="width:12.2749%;text-align: center;">{{item.self_point}}</td>
                    <td style="width:18.739%;">
                        <a href="javascript:;" @click="goDatail(item.id)">上传</a>
                        <a href="javascript:;" @click="goDatail(item.id)">补传</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                table: [],
                point_count:{}
            }
        },
        methods: {
            getData(url) {//获取数据
                this.$ajax.get(url, {}).then((res) => {
                    this.table = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            getPoint_count(){
                this.$ajax.get('/api/role_points/point_count',{}).then((res)=>{
                   this.point_count = res.data
                },(err)=>{
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
            this.getData('/api/role_points')
            this.getPoint_count()
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
    .table_header{
        width: 1222px;
        margin:0 auto;
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
        width: 1222px;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    table tr td:nth-child(6){
        text-align: center;
    }
    table tr td:nth-child(6) a{
        color:#fff;
        background: #7acedf;
        width:70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        display: inline-block;
        border-radius: 4px;
    }
    .data_header{
        display: flex;
        height:68px;
        align-items: center;
        justify-content: space-between;
        padding-left:20px;
        padding-right: 92px;
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

