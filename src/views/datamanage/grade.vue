<template>
    <div>
        <div class="data grade">
            <div class="grade_box">
                <div class="table_header">
                    <table border="1" cellspacing="0">
                        <tr>
                            <td :rowspan="3">评价内容</td>
                            <td :rowspan="3">具体测评内容</td>
                            <td :colspan="4">测评标准</td>
                        </tr>
                        <tr>
                            <td :rowspan="2">测评点</td>
                            <td :colspan="3">等级标准</td>
                        </tr>
                        <tr>
                            <td>A(完全落实)</td>
                            <td>B(基本落实)</td>
                            <td>C(明显不足或味落实)</td>
                        </tr>
                    </table>
                </div>
                <div class="table_body" style="height: 540px;margin: 0px auto; overflow: scroll;">
                    <table border="1" cellspacing="0">
                        <tr v-for="(item,index) in table" :key="index">
                            <td :rowspan="item.one_row_span" v-bind:class="{ show: item.one_display.toString()=='false'}" style="padding:10px;">{{item.one_content.replace(/\s/g,"")}}</td>
                            <td :rowspan="item.two_row_span" v-bind:class="{ show: item.two_display.toString()=='false'}" style="padding:10px;">{{item.two_content.replace(/\s/g,"")}}</td>
                            <td style="padding:10px;">{{item.three_content.replace(/\s/g,"")}}</td>
                            <td style="padding:10px;">{{item.a}}</td>
                            <td style="padding:10px;">{{item.b}}</td>
                            <td style="padding:10px;">{{item.c}}</td>
                        </tr>
                    </table>
                </div>
            </div>
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
            getData(url) { //获取数据
                this.$ajax.get(url, {}).then((res) => {
                    var data = res.data
                    this.$ajax.get("/api/assessment_stds").then((res)=>{
                        var scores = res.data
                        data.forEach(item => {
                            scores.forEach(itemScore =>{
                                if(item.three_id==itemScore.assessment_id){
                                    item.a = itemScore.a
                                    item.b = itemScore.b
                                    item.c = itemScore.c
                                }
                            })
                        });
                        this.table = data
                    })
                }, (err) => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getData('/api/assessments')
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
    .grade .grade_box {
        width: 100%;
        height:auto;
        padding: 20px;
    }
    .grade .grade_box .table_header table {
        width: 100%;
        border: 1px solid #ccc;
    }
    .grade .grade_box .table_header table:nth-child(1),
    .grade .grade_box .table_header table:nth-child(2),
    .grade .grade_box .table_header table:nth-child(3){
        background: #2dc9b9;
        color: #fff;
    }
    .grade .grade_box .table_header table td {
        height: 30px;
        text-align: center;
        width:16.6%;
    }
    .grade .grade_box .table_body table td{
        width:16.6%;
    }
    .grade .grade_box .table_body table{
        border: 1px solid #ccc;
        border-top:none;
    }
</style>

