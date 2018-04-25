<template>
    <div>
        <div class="data manage specialist">
            <div class="table_header">
                <ul>
                    <li>评价内容</li>
                    <li>具体测评内容</li>
                    <li>测评点</li>
                    <li>评估进度</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="table_scroll" style="height:540px;width:100%;margin:0 auto;overflow:scroll;">
                <table border="1" cellspacing="0">
                    <tr v-for="(item,index) in table" :key="index">
                        <td :rowspan="item.one_row_span" v-bind:class="{ show: item.one_display.toString()=='false'}">{{item.one_content.replace(/\s/g,"")}}</td>
                        <td :rowspan="item.two_row_span" v-bind:class="{ show: item.two_display.toString()=='false'}">{{item.two_content.replace(/\s/g,"")}}</td>
                        <td>{{item.three_content.replace(/\s/g,"")}}</td>
                        <td>
                            <Progress :progress="item.processing"></Progress>
                        </td>
                        <td>
                            <a href="javascript:;" @click="goDatail(item.three_id)">评估</a>
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
            }
        },
        components:{
            Progress
        },
        methods: {
            getData(url) { //获取数据
                this.$ajax.get(url, {}).then((res) => {
                    var data = res.data
                    this.$ajax.get("/api/assessments/processing").then((res)=>{
                        var scores = res.data
                        data.forEach(item => {
                            scores.forEach(itemScore =>{
                                if(item.three_id==itemScore.assessment_id){
                                    item.processing = itemScore.numerator
                                }
                            })
                        });
                        this.table = data
                        console.log(res)
                    })
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
                    name: 'expert',
                    params: {
                        id: id
                    }
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
    .manage .table_header {
        width: 100%;
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
         width: 20%;
    }
    .manage .table_body {
        width: 100%;
    }
    .manage table {
        width: 100%;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    .manage table tr td:nth-child(5) {
        text-align: center;
    }
    .manage table tr td {
        padding: 4px 10px;
        box-sizing: border-box;
         width: 20%;
    }
    .manage table tr td:nth-child(5) a {
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
    .specialist{
        padding: 10px 15px;
    }
</style>

