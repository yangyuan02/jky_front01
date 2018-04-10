<template>
    <div>
        <div class="data manage">
            <div class="data_header">
                <div class="crumbs">
                    <p>
                        <i></i>
                        <span>材料管理</span>
                    </p>
                </div>
                <div class="data_header_right">
                    <div class="progress_box">
                        <span>{{point_count.finish}}</span>
                        <Progress :progress="progress"></Progress>
                        <span>{{point_count.finish+point_count.no_finish}}</span>
                    </div>
                    <div class="data_satus">
                        <a href="javascrip:;" @click="getData('/api/role_points/finish_point')">已完成{{point_count.finish}}</a>
                        <a href="javascrip:;" @click="getData('/api/role_points/no_finish_point')">未完成{{point_count.no_finish}}</a>
                    </div>
                </div>
            </div>
            <div class="table_header">
                <ul>
                    <li style="width:22%;">评价内容</li>
                    <li style="width:25%;">具体测评内容</li>
                    <li style="width:20.949%;">测评点</li>
                    <li style="width:7%;">状态</li>
                    <li style="width:7%">自评等级</li>
                    <li style="width:18.739%;">材料操作</li>
                </ul>
            </div>
            <div class="table_scroll" style="height:540px;width:1222px;margin:0 auto;overflow:scroll;">
                <table border="1" cellspacing="0">
                    <tr v-for="(item,index) in table" :key="index">
                        <td :rowspan="item.one_row" v-bind:class="{ show: item.show_one=='false'}" style="width:22%;">{{item.one.replace(/\s/g,"")}}</td>
                        <td :rowspan="item.two_row" v-bind:class="{ show: item.show_two=='false'}" style="width:25%;">{{item.two.replace(/\s/g,"")}}</td>
                        <td style="width:20.949%;">{{item.three.replace(/\s/g,"")}}</td>
                        <td style="width:7%;text-align:center;">
                            <i :class="item.status==1?'status1':'status2'"></i>
                        </td>
                        <td style="width:7%;text-align: center;">{{item.self_point}}</td>
                        <td style="width:18.739%;">
                            <a href="javascript:;" @click="goDatail(item.id)">上传</a>
                            <a href="javascript:;" @click="goDatail(item.id)">补传</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import Progress from "@/components/common/Progress";

    export default {
        data() {
            return {
                table: [],
                point_count: {},
                progress: ''
            }
        },
        components:{
            Progress
        },
        methods: {
            getData(url) { //获取数据
                this.$ajax.get(url, {}).then((res) => {
                    this.table = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            getPoint_count() {
                this.$ajax.get('/api/role_points/point_count', {}).then((res) => {
                    this.progress = (res.data.finish / (res.data.finish + res.data.no_finish)) * 100 + '%'
                    this.point_count = res.data
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
            this.getData('/api/role_points')
            this.getPoint_count()
        }
    }
</script>

<style>
    .show {
        display: none;
    }
    .data {
        background: #fff;
        margin: 0px 15px;
        box-shadow: 1px 1px 8px #ccc;
    }
    .manage .table_header {
        width: 1222px;
        margin: 0 auto;
    }
    .manage .table_header ul {
        display: flex;
        height: 52px;
        background: #2dc9b9;
        align-items: center;
        color: #fff;
    }
    .manage .table_header ul li {
        text-align: center;
    }
    .manage .table_body {
        width: 100%;
    }
    .manage table {
        width: 1222px;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    .manage table tr td:nth-child(6) {
        text-align: center;
    }
    .manage table tr td:nth-child(4) i.status1 {
        display: inline-block;
        width: 33px;
        height: 32px;
        background: url("../../assets/status1.png")
    }
    .manage table tr td:nth-child(4) i.status2 {
        display: inline-block;
        width: 33px;
        height: 32px;
        background: url("../../assets/status2.png")
    }
    .manage table tr td {
        padding: 4px 10px;
    }
    .manage table tr td:nth-child(6) a {
        color: #fff;
        background: #7acedf;
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        display: inline-block;
        border-radius: 4px;
    }
    .manage table tr td:nth-child(6) a:last-child {
        background: #ccc;
    }
    .data_header {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 92px;
    }
    .data_header .progress_box {
        display: flex;
        color: #61aef8;
        margin-right: 28px;
    }
    .data_header .progress {
        width: 200px;
        height: 18px;
        margin: 0px 8px;
        background: #e2e0e0;
        border-radius: 12px;
    }
    .data_header .progress .progress_bar {
        height: 18px;
        background: #61aef8;
        border-radius: 12px;
    }
    .data_header .data_satus a {
        display: inline-block;
        text-align: center;
        line-height: 38px;
        width: 108px;
        height: 38px;
        color: #fff;
    }
    .data_header .data_satus a:nth-child(1) {
        background: #1f6ed4
    }
    .data_header .data_satus a:nth-child(2) {
        background: #65d3e3
    }
    .data_header .data_header_right{
        display: flex;
        align-items: center;
    }
    .data_header .crumbs i {
        display: inline-block;
        width: 10px;
        height: 14px;
        background: url("../../assets/crumbs_bg.png") no-repeat;
    }
</style>

