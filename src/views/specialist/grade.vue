<template>
    <div class="uoload_con">
        <nav>
            <div class="target" style="margin-bottom:30px;">
                <div class="target_title">测评点</div>
                <div class="target_con" v-text="fileList.point">
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">A</div>
                <div class="target_con" v-text="fileList.a">
                    1.全面贯彻党的教育方针的具体部署安排和措施落实情况
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">B</div>
                <div class="target_con" v-text="fileList.b">
                    1.全面贯彻党的教育方针的具体部署安排和措施落实情况
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">C</div>
                <div class="target_con" v-text="fileList.c">
                    1.全面贯彻党的教育方针的具体部署安排和措施落实情况
                </div>
            </div>
        </nav>
        <div class="right_con">
            <div class="review_con">
                <div class="expert_pdf_header">
                    <div class="province_box">
                        <select name="" id="">
                            <option value="请选择">请选择</option>
                            <option value="北京市">北京市</option>
                            <option value="上海市">上海市</option>
                            <option value="重庆市">重庆市</option>
                        </select>
                    </div>
                    <div class="expert_write">
                        <i class="iconfont">&#xe609;</i>
                        <span>评价</span>
                    </div>
                </div>
                <embed src="http://www.gov.cn/zhengce/pdfFile/2018_PDF.pdf" type="application/pdf" width="100%" height="100%">
            </div>
            <div class="upload_con">
                <div class="uploadt_btn" @click="toggleUpload('block')">
                    <div>
                        材料列表
                    </div>
                    <div>
                        <i class="iconfont">&#xe616;</i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="upload">
                    <ul>
                        <li v-for="(item,index) in fileList.data" :key="index">
                            <a href="">{{item.title}}</a>
                            <i class="iconfont" style="color:red;" @click="showDel('block',item.id)">&#xe612;</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                "fileList": {},
                "review": {},
                remnant:500
            }
        },
        methods: {
            getDetail() { //获取附件列表
                this.$ajax.get(`/api/self_point_relations/${this.$route.params.id}`, {}).then((res) => {
                    this.fileList = res.data
                    this.review.self_point = res.data.self_point
                    this.review.user_remark = res.data.user_remark
                    this.descInput()
                }, (err) => {
                    console.log(err)
                })
            },
            descInput() { 
                var txtVal = this.review.user_remark?this.review.user_remark.length:0; 
                this.remnant = 500 - txtVal; 
            }
        },
        mounted() {
            this.getDetail()
        }
    }
</script>

<style>
    input,
    button,
    select,
    textarea {
        outline: none;
    }
    .expert_pdf_header{
        display: flex;
        justify-content: space-between;
    }
    .expert_pdf_header .expert_write{
        color: #4fa4f4;
        font-size: 20px;
    }
    textarea {
        resize: none;
    }
    nav {
        height: auto;
        min-height: 670px;
        width: 244px;
        background: #fff;
        margin: 0px 16px;
        padding: 0px 15px;
        box-shadow: 1px 1px 8px #ccc;
        box-sizing: border-box;
        padding-top: 14px;
    }
    nav .target {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 1px 1px 8px #ccc;
        background: #fff;
    }
    nav .target:first-child .target_con {
        color: #666;
    }
    nav .target:not(:first-child) {
        margin-top: 10px;
    }
    nav .target .target_title {
        background: #f7a31c;
        color: #fff;
        padding: 0px 10px;
        height: 20px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    nav .target .target_title.blue {
        background: #3485ee !important
    }
    nav .target .target_con {
        padding: 5px 10px;
        color: #999;
    }
    .uoload_con {
        display: flex;
    }
    .right_con {
        width: 80%;
        display: flex;
    }
    .right_con .review_con {
        width: 886px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        margin-right: 10px;
        padding:38px 30px;
        overflow: hidden;
    }
    .right_con .upload_con {
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
    }
    .uploadt_btn {
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #327bca;
        padding: 0px 16px;
        display: flex;
        justify-content: space-between;
    }
    .upload {
        width: 250px;
    }
    .upload ul li {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        padding: 0px 20px;
    }
    .upload ul li a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .upload ul li:nth-child(odd) {
        background: #dcdcdc;
    }
    .upload ul li:nth-child(even) {
        background: #f4f2f3;
    }
    .right_con p i {
        display: inline-block;
        width: 10px;
        height: 14px;
        background: url("../../assets/crumbs_bg.png") no-repeat;
        margin-right: 8px;
    }
</style>


