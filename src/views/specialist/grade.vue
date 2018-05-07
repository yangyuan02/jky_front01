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
                    <div class="expert_write">
                        <i class="iconfont">&#xe609;</i>
                        <span @click="show">评价</span>
                    </div>
                </div>
                <embed :src="pdfsrc" type="application/pdf" width="100%" height="100%">
            </div>
            <div class="upload_con">
                <div class="target" style="margin-bottom:30px;">
                    <div class="target_title" v-if="fileList.score">自评等级:{{fileList.score.flag}}</div>
                    <div class="target_con" v-if="fileList.score" v-text="fileList.score.content">
                    </div>
                </div>
                <div class="upload">
                    <ul>
                        <li v-for="(item,index) in fileList.pdfs" :key="index" @click="changePdf(item.url)">
                            <a href="javascript:;">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="score_box" id="score_box">
            <div class="score_title">
                评价
            </div>
            <div class="score_con">
                <div class="score_header">
                    <p>
                        <span class="title">自评等级</span>
                        <input type="radio" id="A" value="A" name="self_point" v-model="review.self_point">
                        <span>A</span>
                        <input type="radio" id="B" value="B" name="self_point" v-model="review.self_point">
                        <span>B</span>
                        <input type="radio" id="C" value="C" name="self_point" v-model="review.self_point">
                        <span>C</span>
                    </p>
                </div>
                <div class="score_body">
                    <textarea name="" id="" cols="30" rows="10" v-model="review.content"></textarea>
                </div>
                <div class="score_btn">
                    <a href="javascript:;" @click="save()">{{review.code=='404'?'保存':'更新'}}</a>
                </div>
            </div>
            <div class="socre_cloes" id="socre_cloes" @click="close">
                x
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
                fileList: {},
                review :{},
                remnant: 500,
                pdfsrc: '',
                assessments: {},
                province: [],
                value:{}
            }
        },
        methods: {
            getDetail() { //获取测评标准
                this.$ajax.get(`/api/assessments/${this.$route.params.id}`, {}).then((res) => {
                    this.assessments = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            getProvince(){//获取省份
                this.province = JSON.parse(window.localStorage.getItem("provinces"))
            },
            getNetworkDetail(province) { //获取文件列表/省用户评价详情
                this.value = province
                this.$ajax.get(`/api/assessments/info?id=${this.$route.params.id}&province=${province.code}`).then((res) => {
                    if(res.data.code=='404'){
                        this.fileList = {}
                        return
                    }
                    if (res.data.score.flag == 'fully') {
                        res.data.score.flag = 'A'
                    }
                    if (res.data.score.flag == 'basic') {
                        res.data.score.flag = 'B'
                    }
                    if (res.data.score.flag == 'less') {
                        res.data.flag = 'C'
                    }
                    this.changePdf(res.data.pdfs[0].url)

                    this.fileList = res.data
                })
            },
            getScores(province) { //获取评测详情
                this.$ajax.get(`/api/scores/${this.$route.params.id}?province=${province.code}`).then((res) => {
                    this.review = res.data
                    if (this.review.level == 'fully') {
                        this.review.self_point = 'A'
                    }
                    if (this.review.level == 'basic') {
                        this.review.self_point = 'B'
                    }
                    if (this.review.level == 'less') {
                        this.review.self_point = 'C'
                    }
                })
            },
            selectProvince(data){//选择省份
                this.getNetworkDetail(data)
                this.getScores(data)
            },
            changePdf(src) {
                this.pdfsrc = src
            },
            save() {//保存
                var assessment_std_id = ''
                if (this.review.self_point == null) {
                    this.$message.error("请选择评价等级")
                    return
                }
                if (this.review.content == null) {
                    this.$message.error("请写评价详情")
                    return
                }
                if (this.review.content.length > 500) {
                    this.$message.error("最多500字")
                    return
                }
                if(this.review.self_point == "A"){
                    assessment_std_id = this.assessments.stds[0].std_id
                }
                if(this.review.self_point == "B"){
                    assessment_std_id = this.assessments.stds[1].std_id
                }
                if(this.review.self_point == "C"){
                    assessment_std_id = this.assessments.stds[2].std_id
                }

                var param = {
                    "assessment_std_id":assessment_std_id,
                    "content":this.review.content
                }
                if(this.review.code=='404'){
                    this.$ajax.post(`/api/assessments/${this.$route.params.id}/scores?province=${this.value.code}`, param)
                    .then((res) => {
                        this.review.code = '200'
                        this.close()
                        this.$message({
                                message: '感谢您的评价',
                                type: 'success'
                            });
                    }, (err) => {})
                }else{
                    this.$ajax.patch(`/api/assessments/${this.$route.params.id}/scores?province=${this.value.code}`, param)
                    .then((res) => {
                        this.close()
                        this.$message({
                                message: '感谢您的评价',
                                type: 'success'
                            });
                    }, (err) => {})
                }

            },
            show() {
                document.getElementById("score_box").style.display = "block"
                document.getElementById("model").style.display = "block"
                document.getElementById("model").style.width = document.documentElement.clientWidth + "px"
                document.getElementById("model").style.height = document.documentElement.clientHeight + "px"
            },
            close() {
                document.getElementById("model").style.display = "none"
                document.getElementById("score_box").style.display = "none"
            }
        },
        mounted() {
            this.getProvince()
            this.getDetail()
            this.getScores(this.province[0])
            this.getNetworkDetail(this.province[0])
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
        margin-right: 16px;
        padding: 0px 15px;
        box-shadow: 1px 1px 8px #ccc;
        box-sizing: border-box;
        padding-top: 14px;
    }
    .target {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 1px 1px 8px #ccc;
        background: #fff;
    }
    .target:first-child .target_con {
        color: #666;
    }
    .target:not(:first-child) {
        margin-top: 10px;
    }
    .target .target_title {
        background: #f7a31c;
        color: #fff;
        padding: 0px 10px;
        height: 20px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .target .target_title.blue {
        background: #3485ee !important
    }
    .target .target_con {
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
        width: 100%;
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
    .score_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        background: #fff;
        padding: 20px;
        display: none;
        z-index: 11;
    }
    .score_box .score_title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 100%;
        background: #3a91ec;
        color: #fff;
    }
    .score_box .score_header {
        margin: 10px 0;
    }
    .score_box .score_body {
        width: 100%;
    }
    .score_box .score_body textarea {
        width: 99%;
    }
    .score_box .score_btn {
        width: 100%;
        text-align: right;
        margin-top: 20px;
    }
    .score_box .score_btn a {
        padding: 5px 24px;
        border: 1px solid #3a91ec;
        color: #3a91ec;
    }
    #model {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        z-index: 10;
    }
    .score_box .socre_cloes {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 26px;
        position: absolute;
        right: -13px;
        top: -13px;
        background: #53a6f6;
        cursor: pointer;
    }
</style>


