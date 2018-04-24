<template>
    <div class="uoload_con">
        <nav>
            <div class="target" style="margin-bottom:30px;">
                <div class="target_title">测评点</div>
                <div class="target_con" v-text="assessments.content">
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">A</div>
                <div class="target_con" v-if="assessments.content" v-text="assessments.stds[0].content">
                    1.全面贯彻党的教育方针的具体部署安排和措施落实情况
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">B</div>
                <div class="target_con" v-if="assessments.content" v-text="assessments.stds[1].content">
                    1.全面贯彻党的教育方针的具体部署安排和措施落实情况
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">C</div>
                <div class="target_con" v-if="assessments.content" v-text="assessments.stds[2].content">
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
                        <span @click="show">评价</span>
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
                        <li v-for="(item,index) in fileList.data" :key="index" @click="changePdf(item.file)">
                            <a href="javascript:;">{{item.title}}</a>
                            <i class="iconfont" style="color:red;" @click="showDel('block',item.id)">&#xe612;</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="score_box" id="score_box">
            <div class="score_title" >
                评价
            </div>
            <div class="score_con">
                <div class="score_header">
                    <p>
                        <span class="title">自评等级</span>
                        <input type="radio" id="A" value="A" name="self_point">
                        <span>A</span>
                        <input type="radio" id="B" value="B" name="self_point">
                        <span>B</span>
                        <input type="radio" id="C" value="C" name="self_point">
                        <span>C</span>
                    </p>
                </div>
                <div class="score_body">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="score_btn">
                    <a href="javascript:;">保存</a>
                </div>
            </div>
        </div>
        <div id="model">

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                "fileList": {},
                "review": {},
                remnant: 500,
                pdfsrc: '',
                assessments: {}
            }
        },
        methods: {
            getDetail() { //获取附件列表
                this.$ajax.get(`/api/assessments/${this.$route.params.id}`, {}).then((res) => {
                    this.assessments = res.data
                    // this.fileList = res.data
                    // this.review.self_point = res.data.self_point
                    // this.review.user_remark = res.data.user_remark
                    // this.pdfsrc = this.fileList.data[0].file
                    // this.descInput()
                }, (err) => {
                    console.log(err)
                })
            },
            changePdf(src) {
                this.pdfsrc = src
            },
            descInput() { 
                var txtVal = this.review.user_remark ? this.review.user_remark.length : 0; 
                this.remnant = 500 - txtVal; 
            },
            show(){
                document.getElementById("score_box").style.display = "block"
                document.getElementById("model").style.display = "block"
                document.getElementById("model").style.width = document.documentElement.clientWidth + "px"
                document.getElementById("model").style.height = document.documentElement.clientHeight + "px"
            }
        },
        mounted() {
            this.getDetail()
        }
    }
</script>

<style>
    .expert_pdf_header {
        display: flex;
        justify-content: space-between;
    }
    .expert_pdf_header .expert_write {
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
        margin-right:16px;
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
        padding: 0 16px;
    }
    .right_con {
        width: 90%;
        display: flex;
    }
    .right_con .review_con {
        width: 75%;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        margin-right: 10px;
        padding: 38px 30px;
        overflow: hidden;
    }
    .right_con .upload_con {
        background: #fff;
        width: 25%;
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
    .score_box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 480px;
        background: #fff;
        padding: 20px;
        display: none;
        z-index: 11;
    }
    .score_box .score_title{
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 100%;
        background: #3a91ec;
        color: #fff;
    }
    .score_box .score_header{
        margin: 10px 0;
    }
    .score_box .score_body{
        width: 100%;
    }
    .score_box .score_body textarea{
        width: 99%;
    }
    .score_box .score_btn{
        width: 100%;
        text-align: right;
        margin-top: 20px;
    }
    .score_box .score_btn a{
        padding:5px 24px;
        border: 1px solid #3a91ec;
        color: #3a91ec;
    }
    #model{
        width: 100%;
        height: 100%;
        background:rgba(0, 0, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        z-index: 10;
    }
</style>


