<template>
    <div class="report">
        <div class="report_title">
            <span></span>
        </div>
        <div style="width:100%;background:#fff;padding:10px 20px;">
            <template>
                      <el-select v-model="value" filterable placeholder="请选择" @change="selectProvince($event)" value-key="code">
                        <el-option
                          v-for="item in province"
                          :key="item.name"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
</template>
        </div>
        <div class="report_box" v-if="list[0]">
            <div class="report_item">
                <div class="report_item_body" style="width:98%;">
                    <textarea name="" id="" cols="30" rows="10" v-model.trim="list[0].content" disabled="disabled"></textarea>
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
                province:[],
                value:{}
            }
        },
        methods: {
            getData(province) { //获取总评信息
                this.value = province
                this.$ajax.get(`/api/reports?&province=${province.code}`).then((res) => {
                    this.list = res.data
                })
            },
            getProvince(){//获取省份
                this.province = JSON.parse(window.localStorage.getItem("provinces"))
            },
            selectProvince(data){//选择省份
                this.getData(data)
            },
            goBack() { //返回
                this.$router.back(-1)
            }
        },
        mounted(){
            this.getProvince()
            this.getData(this.province[0])
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
