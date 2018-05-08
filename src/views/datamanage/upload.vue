<template>
    <div class="data_01 uoload_con">
        <nav>
            <div class="target" style="margin-bottom:30px;">
                <div class="target_title">测评点</div>
                <div class="target_con" v-if="assessments.content" v-text="assessments.content">
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">A</div>
                <div class="target_con" v-if="assessments.content">
                    {{assessments.stds[0].content}}
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">B</div>
                <div class="target_con" v-if="assessments.content">
                    {{assessments.stds[1].content}}
                </div>
            </div>
            <div class="target">
                <div class="target_title blue">C</div>
                <div class="target_con" v-if="assessments.content">
                    {{assessments.stds[2].content}}
                </div>
            </div>
        </nav>
        <div class="right_con">
            <div class="review_con">
                <div class="review">
                    <div class="review_grade">
                        <span class="title">自评等级</span>
                        <input type="radio" id="A" value="A" name="self_point" v-model="review.self_point">
                        <span>A</span>
                        <input type="radio" id="B" value="B" name="self_point" v-model="review.self_point">
                        <span>B</span>
                        <input type="radio" id="C" value="C" name="self_point" v-model="review.self_point">
                        <span>C</span>
                    </div>
                    <div class="review_head">
                        <i class="iconfont">&#xe609;</i>
                        <span>简述</span>
                    </div>
                    <div class="review_text">
                        <textarea name="" id="" cols="30" rows="10" placeholder="请写评价...." v-model.trim="review.content" @input="descInput" maxlength="1000">
                                                                                </textarea>
                        <p>
                            <span>字数限制：{{remnant}}/1000</span>
                        </p>
                    </div>
                    <div class="review_btn">
                        <a href="javascrip:;" @click="goBack()" style="right:80px;">返回</a>
                        <a href="javascrip:;" @click="save()">{{review.code=='404'?'保存':'更新'}}</a>
                    </div>
                </div>
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
                        <li v-for="(item,index) in fileList" :key="index">
                            <a href="JavaScript:;" @click="openPdf(item.url,index)" :class="{active:listIndex===index}">{{item.name}}</a>
                            <div>
                                <!-- <i class="iconfont" style="color:#3485ee;" v-if="item.url" >&#xe626;</i> -->
                                <i class="iconfont" style="color:red;cursor:pointer" @click="showDel('block',item.id)">&#xe612;</i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 删除对话框 -->
        <div class="del_dialog" id="del_dialog">
            <div class="title">提醒</div>
            <div class="msg">您确认要删除吗？</div>
            <div class="btns">
                <a href="javascript:;" @click="del()">确认</a>
                <a href="javascript:;" @click="showDel('none',-1)">取消</a>
            </div>
        </div>
        <!-- 上传附件弹窗 -->
        <div class="upload_dialog" id="up_dialog">
            <div class="close" @click="toggleUpload('none')">X</div>
            <div class="title_dialog">
                资料上传
            </div>
            <div class="label">
                <span>资料名称</span>
                <input type="text" v-model.trim="filename" placeholder="此项为必填">
            </div>
            <div class="label">
                <span>文件编号</span>
                <input type="text" v-model.trim="filenum">
            </div>
            <div class="label">
                <span>备注</span>
                <input type="text" v-model="remark">
            </div>
            <div class="label">
                <span>文件性质</span>
                <div>
                    <input type="radio" id="one" value="one" v-model="picked" :checked="picked=='one'">
                    <span>公开</span>
                    <input type="radio" id="two" value="two" v-model="picked">
                    <span>保密</span>
                </div>
            </div>
            <div class="label access" v-if="picked=='one'">
                <div class="accessory">
                    <i class="iconfont" v-bind:class="{ active: '1'== isFile}">&#xe615;</i>
                    <span>{{changefilename}}</span>
                    <input type="file" name="" id="file" accept=".pdf" @change="changeFile()">
                </div>
            </div>
            <!-- <div class="label access" v-if="picked=='two'">
                <div class="accessory disabled">
                    <i class="iconfont" v-bind:class="{ active: '1'== isFile}">&#xe615;</i>
                    <span>{{isFile==1?_filename:'请选择文件上传'}}</span>
                    <input type="file" name="" accept=".pdf" @change="changeFile()" disabled>
                </div>
            </div> -->
            <div class="btns">
                <a href="javascript:;" @click="upload()">上传</a>
                <a href="javascript:;" @click="toggleUpload('none')">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import fayes from 'faye'
    export default {
        data() {
            return {
                "filename": '',
                "filenum": "",
                "remark": "",
                "fileId": "",
                "picked": 'one',
                "fileList": [],
                "review": {},
                isFile: 0,
                listIndex:'',
                changefilename: "请选择上传文件",
                remnant: 1000,
                assessments: {}
            }
        },
        methods: {
            getDetail() { //获取abc评测标准
                this.$ajax.get(`/api/assessments/${this.$route.params.id}`).then((res) => {
                    this.assessments = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            getScores() { //获取评测详情
                this.$ajax.get(`/api/scores/${this.$route.params.id}`).then((res) => {
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
                    this.descInput()
                })
            },
            goBack(){
                 this.$router.back(-1)
                 if(this.review.code == '404'){
                     this.review = ''
                 }
            },
            getFils() { //获取文件列表
                this.$ajax.get(`/api/assessments/${this.$route.params.id}/assessment_files`).then((res) => {
                    if(res.data.code=='404'){
                        return
                    }
                    this.fileList = res.data
                })
            },
            toggleUpload(type) {
                var upload = document.getElementById("up_dialog")
                upload.style.display = type
                if (type == 'none') {
                    this.filename = ''
                    this.filenum = ''
                    this.remark = ''
                    this.isFile = 0,
                    this.changefilename = '请选择上传文件'
                    this.picked = 'one'
                    if(document.getElementById("file")){
                        document.getElementById("file").value = ''
                    }
                }
            },
            showDel(type, id) {
                var upload = document.getElementById("del_dialog")
                upload.style.display = type
                this.fileId = id
            },
            del() { //删除附件
                this.$ajax.delete(`/api/assessment_files/${this.fileId}`, {}).then((res) => {
                    if (res.data) {
                        this.getFils()
                        this.showDel('none', -1)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            upload(id) {
                if (this.filename == '') {
                    this.$message.error("文件名为必填项")
                    return
                }
                console.log(this.filename)
                var id = this.$route.params.id
                var fileData = new FormData()
                if (this.picked == 'one') {
                    var file = document.getElementById("file").files[0]
                    console.log(file)
                    if (file == undefined) {
                        this.$message.error("附件为必填")
                        return false
                    }
                    if(file.type!=='application/pdf'){
                        this.$message.error("上传文件为pdf格式")
                        return false
                    }
                    fileData.append("file", file)
                }
                var normal = this.picked == 'one' ? true : false
                fileData.append("name", this.filename)
                fileData.append("file_code", this.filenum)
                fileData.append("remark", this.remark)
                fileData.append("normal", normal)
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function(progressEvent) {
                        console.log(1111)
                        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        console.log(percentCompleted)
                        }
                    }
                this.$ajax.post(`/api/assessments/${id}/assessment_files`, fileData, config).then((res) => {
                    this.toggleUpload("none")
                    this.getFils()
                })
            },
            changeFile() {
                var file = document.getElementById("file").files[0]
                if (file) {
                    this.isFile = 1
                    this.changefilename = file.name
                    console.log(this.changefilename)
                } else {
                    this.isFile = 0
                }
            },
            save() {
                var assessment_std_id = ''
                console.log(this.review.content)
                if (this.review.self_point == null || this.review.self_point == undefined || this.review.self_point == '') {
                    this.$message.error("请选择评价等级")
                    return
                }
                if (this.review.content) {
                    console.log(this.review.content.length)
                    if(this.review.content.length>1000){
                        this.$message.error("最多1000字")
                        return
                    }
                }
                if (this.review.self_point == "A") {
                    assessment_std_id = this.assessments.stds[0].std_id
                }
                if (this.review.self_point == "B") {
                    assessment_std_id = this.assessments.stds[1].std_id
                }
                if (this.review.self_point == "C") {
                    assessment_std_id = this.assessments.stds[2].std_id
                }
                var param = {
                    "assessment_std_id": assessment_std_id,
                    "content": this.review.content
                }
                if (this.review.code == '404') {
                    this.$ajax.post(`/api/assessments/${this.$route.params.id}/scores`, param)
                        .then((res) => {
                            this.review.code = '200'
                            this.$message({
                                message: '感谢您的评价',
                                type: 'success'
                            });
                        }, (err) => {})
                } else {
                    this.$ajax.patch(`/api/assessments/${this.$route.params.id}/scores`, param)
                        .then((res) => {
                            this.$message({
                                message: '感谢您的评价',
                                type: 'success'
                            });
                        }, (err) => {})
                }
            },
            openPdf(url,index) { //打开pdf
                this.listIndex = index
                if (url == undefined) {
                    this.$message.error("此材料为保密，请现场查看")
                    return
                }
                window.open(url)
            },
            descInput() {
                var txtVal = this.review.content ? this.review.content.length : 0; 
                this.remnant = 1000 - txtVal; 
            }
        },
        mounted() {
            this.getDetail()
            this.getScores()
            this.getFils()
        }
    }
</script>

<style>
    .review_text {
        position: relative;
        width: 98%;
        height: 400px;
    }
    .review_text textarea {
        width: 100%;
        height: 100%;
        font-size: 14px;
    }
    input,
    button,
    select,
    textarea {
        outline: none;
    }
    textarea {
        resize: none;
    }
    .review .review_grade {
        margin-bottom: 10px;
    }
    .review .review_grade .title {
        color: #4fa4f4;
    }
    .review .review_head {
        color: #4fa4f4;
    }
    .review .review_head i {
        font-size: 20px;
    }
    .review .review_btn {
        margin-top: 20px;
        width: 92%;
        position: relative;
    }
    .review .review_btn a {
        display: inline-block;
        width: 60px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        color: #ffffff;
        background: #4fa4f4;
        position: absolute;
        right: 0px;
    }
    .review_text p {
        position: absolute;
        right: 14px;
        bottom: 0px;
        color: #ccc;
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
        width: 100%;
        padding: 0px 16px;
    }
    .right_con {
        width: 90%;
        display: flex;
    }
    .right_con .review_con {
        width: 60%;
        padding-top: 14px;
        padding-left: 14px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        margin-right: 10px;
    }
    .data_01 .right_con .upload_con {
        width: 40%;
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
    .uploadt_btn span {
        cursor: pointer;
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
        width: 88%;
    }
    .upload ul li a.active{
        color: #1f6ed4;
    }
    .upload ul li:nth-child(odd) {
        background: #dcdcdc;
    }
    .upload ul li:nth-child(even) {
        background: #f4f2f3;
    }
    .del_dialog {
        width: 288px;
        height: 174px;
        box-shadow: 1px 1px 8px #ccc;
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        background: #fff;
    }
    .del_dialog .title {
        background: #fcce3b;
        color: #fff;
        text-align: center;
        width: 100%;
        height: 38px;
        line-height: 38px;
    }
    .del_dialog .msg {
        text-align: center;
        margin: 30px 0;
    }
    .btns {
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
    }
    .btns a {
        display: inline-block;
        width: 70px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
    .btns a:nth-child(1) {
        border: 1px solid #4fa4f4;
        color: #4fa4f4;
        margin-right: 20px;
    }
    .btns a:nth-child(2) {
        border: 1px solid #fc7e7f;
        color: #fc7e7f;
    }
    .upload_dialog {
        width: 340px;
        height: auto;
        display: none;
        border: 2px solid #53a6f6;
        border-radius: 4px;
        box-shadow: 1px 1px 8px #ccc;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        background: #fff;
    }
    .upload_dialog .close {
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
    .upload_dialog .title_dialog {
        width: 100%;
        padding: 10px 0px;
        color: #1f6ed4;
        text-align: center;
    }
    .upload_dialog .label {
        display: flex;
        align-items: center;
        height: 36px;
        color: #666;
        padding: 0px 30px;
    }
    .upload_dialog .label>input {
        height: 30px;
        border: 1px solid #ccc;
        margin-left: 10px;
        width: 80%;
        padding-left: 6px;
    }
    .upload_dialog .label>span {
        width: 28%;
        text-align: right;
    }
    .upload_dialog .access {
        height: 140px;
    }
    .upload_dialog .label .accessory {
        width: 110px;
        height: 110px;
        border: 1px dashed #1f6ed4;
        border-radius: 4px;
        text-align: center;
        position: relative;
        margin: 0 auto;
    }
    .upload_dialog .label .accessory.disabled {
        border-color: #ccc;
    }
    .upload_dialog .label .accessory.disabled input[type="file"] {
        cursor: not-allowed;
    }
    .upload_dialog .label .accessory input[type="file"] {
        width: 110px;
        height: 110px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    .upload_dialog .label .accessory i {
        position: absolute;
        left: 50%;
        top: 34%;
        font-size: 34px;
        transform: translate(-50%, -50%)
    }
    .upload_dialog .label .accessory i.active {
        color: #3485ee;
    }
    .upload_dialog .label .accessory span {
        position: absolute;
        left: 50%;
        top: 60%;
        width: 100%;
        transform: translate(-50%, -50%)
    }
    .right_con p i {
        display: inline-block;
        width: 10px;
        height: 14px;
        background: url("../../assets/crumbs_bg.png") no-repeat;
        margin-right: 8px;
    }
</style>


