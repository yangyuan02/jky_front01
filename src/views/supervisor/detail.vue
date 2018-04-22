<template>
    <div class="department">
        <SideNav></SideNav>
        <div class="sup_right">
            <div class="back">
                <i class="iconfont">&#xe617;</i>
                <a href="javascript:;" @click="goBack">返回</a>
            </div>
            <div class="depart_head">
                西藏
            </div>
            <div class="depart_con">
                <table>
                    <thead>
                        <tr>
                            <td>专家列表</td>
                            <td>评估等级</td>
                            <td>评语</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>张三</td>
                            <td>A</td>
                            <td>执行到位</td>
                        </tr>
                        <tr>
                            <td>张三</td>
                            <td>A</td>
                            <td>执行到位</td>
                        </tr>
                        <tr>
                            <td>张三</td>
                            <td>A</td>
                            <td>执行到位</td>
                        </tr>
                        <tr>
                            <td>张三</td>
                            <td>A</td>
                            <td>执行到位</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import SideNav from "@/components/supervisor/SideNav";
    export default {
        components: {
            SideNav
        },
        methods:{
            goBack(){
                 this.$router.back()
            }
        }
    }
</script>

<style>
    .department {
        display: flex;
    }
    .sup_right {
        width: calc(100% - 352px - 20px - 40px);
        height: 600px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        padding: 20px;
    }
    .sup_right .depar_head {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #a4c9e9;
        color: #fff;
    }
    .sup_right .back {
        color: #419bf6
    }
    .sup_right .back a {
        color: #419bf6
    }
    .sup_right .depart_head {
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #38bac0;
        color: #fff;
    }
    .sup_right .depart_con table {
        width: 100%;
    }
    .sup_right .depart_con table thead tr {
        background: #c5e4fe;
    }
    .sup_right .depart_con table tbody tr:nth-child(odd) {
        background: #ece9e9;
    }
    .sup_right .depart_con table tbody tr:nth-child(even) {
        background: #fff;
    }
    .sup_right .depart_con tr td {
        text-align: center;
    }
    .sup_right .depart_con tr td:nth-child(1) {
        width: 20%;
    }
    .sup_right .depart_con tr td:nth-child(2) {
        width: 20%;
    }
    .sup_right .depart_con tr td:nth-child(3) {
        width: 60%;
    }
</style>

