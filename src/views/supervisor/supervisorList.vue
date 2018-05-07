<template>
    <div>
        <div class="data manage">
            <div class="data_header">
                <div class="crumbs">
                    <p>
                        <i></i>
                        <span>{{provinces}}</span>
                    </p>
                </div>
                <div class="data_header_right">
                    <div class="progress_box">
                        <span>{{finish}}</span>
                        <Progress :progress="progress"></Progress>
                        <span>{{92}}</span>
                    </div>
                    <!-- <div class="data_satus">
                        <a href="javascrip:;" @click="getData('/api/assessments?status=1')">已完成</a>
                        <a href="javascrip:;" @click="getData('/api/assessments?status=0')">未完成</a>
                    </div> -->
                </div>
            </div>
            <div class="table_header">
                <ul>
                    <li style="width:22%;">评价内容</li>
                    <li style="width:25%;">具体测评内容</li>
                    <li style="width:20.949%;">测评点</li>
                    <li style="width:7%;">材料数量</li>
                    <li style="width:7%">自评等级</li>
                    <li style="width:18.739%;">材料操作</li>
                </ul>
            </div>
            <div class="table_scroll" style="height:540px;width:100%;margin:0 auto;overflow:scroll;">
                <table border="1" cellspacing="0">
                    <tr>
                        <td style="width:22%;">自评报告</td>
                        <td style="width:25%;"></td>
                        <td style="width:20.949%;"></td>
                        <td style="width:7%;text-align:center;">-</td>
                        <td style="width:7%;text-align: center;">-</td>
                        <td style="width:18.739%;">
                            <a href="javascript:;" @click="goReport">查看</a>
                        </td>
                    </tr>
                    <tr v-for="(item,index) in table" :key="index">
                        <td :rowspan="item.one_row_span" v-bind:class="{ show: item.one_display.toString()=='false'}" style="width:22%;">{{item.one_content.replace(/\s/g,"")}}</td>
                        <td :rowspan="item.two_row_span" v-bind:class="{ show: item.two_display.toString()=='false'}" style="width:25%;">{{item.two_content.replace(/\s/g,"")}}</td>
                        <td style="width:20.949%;">{{item.three_content.replace(/\s/g,"")}}</td>
                        <td style="width:7%;text-align:center;">
                            {{item.attach}}
                        </td>
                        <td style="width:7%;text-align: center;">{{grade[item.level]}}</td>
                        <td style="width:18.739%;">
                            <a href="javascript:;" @click="goDatail(item.three_id)">查看</a>
                            <!-- <a href="javascript:;" @click="goDatail(item.three_id)">补传</a> -->
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import Progress from "@/components/common/Progress";

    import {mapActions,mapGetters} from 'vuex'

    export default {
        data() {
            return {
                table: [],
                point_count: {},
                provinces:'',
                progress: '0%',
                finish:'',
                grade:{
                    fully:"A",
                    basic:"B",
                    less:"C"
                }
            }
        },
        components:{
            Progress
        },
        methods: {
            ...mapActions([
                'updataIsData'
            ]),
            setPprovinces(){
                var provinces = JSON.parse(window.localStorage.getItem("provinces"))
                for(var i = 0;i<provinces.length;i++){
                    if(this.$route.params.code==provinces[i].code){
                        this.provinces = provinces[i].name
                    }
                }
            },
            getData(url) { //获取数据
                this.$ajax.get(url, {}).then((res) => {
                    var data = res.data
                    this.$ajax.get(`/api/ddj_provinces/scores?province=${this.$route.params.code}`).then((res)=>{
                        var scores = res.data
                        this.progress = res.data.length/92 * 100 + '%'
                        this.finish = res.data.length
                        data.forEach(item => {
                            scores.forEach(itemScore =>{
                                if(item.three_id==itemScore.assessment){
                                    item.attach = itemScore.attach
                                    item.level = itemScore.level
                                }
                            })
                        });
                        this.table = data
                    })
                    this.updataIsData(url)
                }, (err) => {
                    console.log(err)
                })
            },
            goDatail(id) { //跳转详情
                this.$router.push({
                    name: 'supervisorListUpload',
                    params: {
                        id: id,
                        code:this.$route.params.code
                    }
                })
            },
            goReport(){
                this.$router.push({
                    name:'supervisorReport',
                    params:{
                        code:this.$route.params.code
                    }
                })
            }
        },
        computed :{
             ...mapGetters({
                'isUpdata' : 'getIsUpdata'
            })
        },
        watch:{
            isUpdata(OloData,NewData){
                if(OloData=='/api/assessments'){
                    this.getData('/api/assessments')
                }
            }
        },
        mounted() {
            this.setPprovinces()
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
        padding: 0px 15px;
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
    }
    .manage .table_body {
        width: 100%;
    }
    .manage table {
        width: 100%;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    .manage table tr:nth-child(1) td{
        height: 40px;
    }
    .manage table tr:nth-child(1) td:last-child a{
        background: #7acedf !important;
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
    .data.manage table tr td:nth-child(6) a {
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
        /* background: #ccc; */
    }
    .data_header {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
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

