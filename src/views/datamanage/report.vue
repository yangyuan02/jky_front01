<template>
    <div class="report">
        <div class="report_title">
            <span></span>
        </div>
        <div class="report_box" v-if="list[0]">
            <div class="report_item">
                <div class="report_item_title">
                    <p>一、自查情况</p>
                </div>
                <div class="report_item_body">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制1000" v-model="list[0].content"></textarea>
                    <a href="javascript:;" @click="save(list[0].id,list[0].content)">保存</a>
                </div>
            </div>
            <div class="report_item">
                <div class="report_item_title">
                    <p>二、工作成效</p>
                </div>
                <div class="report_item_body">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制1000" v-model="list[1].content"></textarea>
                    <a href="javascript:;" @click="save(list[1].id,list[1].content)">保存</a>
                </div>
            </div>
            <div class="report_item">
                <div class="report_item_title">
                    <p>三、经验做法</p>
                </div>
                <div class="report_item_body">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制1000" v-model="list[2].content"></textarea>
                    <a href="javascript:;" @click="save(list[2].id,list[2].content)">保存</a>
                </div>
            </div>
            <div class="report_item">
                <div class="report_item_title">
                    <p>四、存在问题</p>
                </div>
                <div class="report_item_body">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制1000" v-model="list[3].content"></textarea>
                    <a href="javascript:;" @click="save(list[3].id,list[3].content)">保存</a>
                </div>
            </div>
            <div class="report_item">
                <div class="report_item_title">
                    <p>五、改进措施</p>
                </div>
                <div class="report_item_body">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制1000" v-model="list[4].content"></textarea>
                    <a href="javascript:;" @click="save(list[4].id,list[4].content)">保存</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            getData() { //获取总评信息
                this.$ajax.get("/api/reports").then((res) => {
                    this.list = res.data
                })
            },
            save(id,content) {
                this.$ajax.patch(`/api/reports/${id}`,{"content":content}).then((res) => {
                    console.log(res)
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style>
    .report {
        padding: 0px 20px;
    }
    .report_item_title{
        margin-bottom: 10px;
        font-size: 16px;
    }
    .report .report_title span {
        display: inline-block;
        width: 172px;
        height: 84px;
        background: url(../../assets/report.png) no-repeat;
    }
    .report .report_title {
        background: #fff;
        text-align: center;
        padding: 20px 0px;
    }
    .report .report_box .report_item {
        width: 100%;
        background: #fff;
        margin-top: 20px;
        padding: 20px 20px;
        border-radius: 10px;
        position: relative;
    }
    .report .report_box .report_item:first-child {
        margin-top: 0px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        padding-top: 0px;
    }
    .report .report_box .report_item textarea {
        width: 100%;
        height: 400px;
        border: 1px solid #327bca;
        border-radius: 4px;
        font-size: 20px;
    }
    .report .report_box .report_item a {
        position: absolute;
        right: 2%;
        bottom: 8%;
        color: #327bca;
    }
</style>
