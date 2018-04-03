<template>
    <div>
        <div class="data">
            <div class="table_header">
                <ul>
                    <li style="width:20%;">评价内容</li>
                    <li style="width:20%;">具体评价内容</li>
                    <li style="width:20%;">指标</li>
                    <li style="width:20%;">自评等级</li>
                    <li style="width:20%;">材料操作</li>
                </ul>
            </div>
            <!-- <table border="1" cellspacing="0" width="50%" height="150">
                <tr>
                    <td rowspan="2">601班</td>
                    <td>Jack</td>
                    <td>24</td>
                    <td>1351234567</td>
                </tr>
                <tr>
                    <td>Tom</td>
                    <td>22</td>
                    <td>1351234567</td>
                </tr>
                <tr>
                    <td rowspan="3">602班</td>
                    <td>Rose</td>
                    <td>22</td>
                    <td>1351234567</td>
                </tr>
                <tr>
                    <td>张三</td>
                    <td>25</td>
                    <td>1351234567</td>
                </tr>
                <tr>
                    <td>李四</td>
                    <td>25</td>
                    <td>1351234567</td>
                </tr>
            </table> -->
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
                    // this.combineCell(res.data)
                    this.table = res.data
                    // console.log(JSON.stringify(this.table))
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
            },
            combineCell(list){
                for(var field in list){
                    console.log(list[field])
                    var k = 0;
                    if(list[field]){}
                }
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
        width: 1053px;
        margin-top: 36px;
        margin-left: 40px;
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
</style>

