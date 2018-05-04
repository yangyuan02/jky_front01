<template>
    <div class="report">
        <div class="report_title">
            <span></span>
        </div>
        <div class="report_box">
            <div class="report_item">
                <div class="report_item_body" style="width:98%;">
                    <textarea name="" id="" cols="30" rows="10" placeholder="字数限制8000" maxlength="8000"></textarea>
                </div>
                <div class="report_btn">
                    <a href="javascript:;" @click="goBack()">返回</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                remnant: 8000,
            }
        },
        methods: {
            goBack() { //返回
                this.$router.back(-1)
            }
        }
    }
</script>

<style>
    .report {
        padding: 0px 20px;
    }
    .report_item_title {
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
        padding: 10px;
    }
    .report .report_box .report_item .report_btn {
        text-align: right;
        margin-top: 10px;
    }
    .report .report_box .report_item .report_btn a {
        padding: 6px 20px;
        color: #fff;
        background: #327bca;
    }
</style>
