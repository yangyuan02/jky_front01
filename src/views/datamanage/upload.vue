<template>
    <div class="uoload_con">
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
                        <textarea name="" id="" cols="30" rows="10" placeholder="请写评价...." v-model="review.content" @input="descInput" maxlength="500">
                                                                            </textarea>
                        <p>
                            <span>字数限制：{{remnant}}/500</span>
                        </p>
                    </div>
                    <div class="review_btn">
                        <a href="javascrip:;" @click="save()">保存</a>
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
                        <li v-for="(item,index) in fileList.data" :key="index">
                            <a href="">{{item.title}}</a>
                            <i class="iconfont" style="color:red;" @click="showDel('block',item.id)">&#xe612;</i>
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
                <input type="text" v-model="filename" placeholder="此项为必填">
            </div>
            <div class="label">
                <span>文件编号</span>
                <input type="text" v-model="filenum">
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
                    <span>{{isFile==1?_filename:'请选择文件上传'}}</span>
                    <input type="file" name="" id="file" accept=".pdf" @change="changeFile()">
                </div>
            </div>
            <div class="label access" v-if="picked=='two'">
                <div class="accessory disabled">
                    <i class="iconfont" v-bind:class="{ active: '1'== isFile}">&#xe615;</i>
                    <span>{{isFile==1?_filename:'请选择文件上传'}}</span>
                    <input type="file" name="" accept=".pdf" @change="changeFile()" disabled>
                </div>
            </div>
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
                "fileList": {},
                "review": {},
                isFile: 0,
                _filename: '',
                remnant:500,
                assessments:{}
            }
        },
        methods: {
            getDetail() { //获取abc评测标准
                this.$ajax.get(`/api/assessments/${this.$route.params.id}`).then((res) => {
                    this.assessments = res.data
                    this.descInput()
                }, (err) => {
                    console.log(err)
                })
            },
            getScores(){//获取评测详情
                this.$ajax.get(`/api/province/scores/${this.$route.params.id}`).then((res)=>{
                    this.review = res.data
                    if(this.review.level=='less'){
                        this.review.self_point = 'A'
                    }
                    if(this.review.level=='basic'){
                        this.review.self_point = 'B'
                    }
                    if(this.review.level=='fully'){
                        this.review.self_point = 'C'
                    }
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
                    this._filename = ''
                    this.picked = 'one'
                    // document.getElementById("file").value = ''
                }
            },
            showDel(type, id) {
                var upload = document.getElementById("del_dialog")
                upload.style.display = type
                this.fileId = id
            },
            del() { //删除附件
                this.$ajax.delete(`/api/self_point_relations/${this.fileId}`, {}).then((res) => {
                    if (res.data) {
                        this.getDetail()
                        this.showDel('none', -1)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            upload(id) {
                if (this.filename == '') {
                    alert("文件名为必填项")
                    return
                }
                var id = this.$route.params.id
                var fileData = new FormData()
                this.picked = this.picked == 'one' ? true : false
                var file = document.getElementById("file").files[0]
                fileData.append("self_point_relation[file]", file)
                fileData.append("self_point_relation[title]", this.filename)
                fileData.append("self_point_relation[num]", this.filenum)
                fileData.append("self_point_relation[remark]", this.remark)
                fileData.append("self_point_relation[normal]", this.picked)
                this.$ajax.post(`/api/self_point_relations?self_point_relation[self_point_id]=${id}`).then((res) => {
                    var faye = new fayes.Client(`http://120.55.116.161:9292/api/events`);
                    faye.subscribe(`/api/self_point_relations/${res.data.id}`, (status) => {
                        console.log(status)
                        if (status.message == "done") {
                            this.getDetail()
                            this.toggleUpload("none")
                        }
                    });
                    return res.data.id
                }, (err) => {
                    console.log(err)
                }).then((data) => {
                    console.log(data)
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    this.$ajax.put(`/api/self_point_relations/${data}`, fileData, config).then((res) => {
                        console.log(1111)
                    }, (err) => {
                        console.log(err)
                    })
                })
            },
            changeFile() {
                var file = document.getElementById("file").files[0]
                console.log(file)
                if (file) {
                    this.isFile = 1
                    this._filename = file.name
                } else {
                    this.isFile = 0
                }
                // this.changFile = 0
            },
            save() {
                if (this.review.self_point == null) {
                    alert("请选择评价等级")
                    return
                }
                if (this.review.content == null) {
                    alert("请写评价详情")
                    return
                }
                if (this.review.content.length > 500) {
                    alert("最多500字")
                    return
                }
                this.review.assessment_std_id = this.$route.params.id
                this.$ajax.post("/api/assessments/score", this.review)
                    .then((res) => {
                        alert("感谢您的评价")
                    }, (err) => {})
            },
            descInput() { 
                var txtVal = this.review.content?this.review.content.length:0; 
                this.remnant = 500 - txtVal; 
            }
        },
        mounted() {
            this.getDetail()
            this.getScores()
        }
    }
</script>

<style>
    .review_text {
        position: relative;
        width: 660px;
        height: 500px;
    }
    .review_text textarea {
        width: 660px;
        height: 500px;
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
        width: 736px;
        padding-top: 14px;
        padding-left: 40px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        margin-right: 10px;
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
        width: 400px;
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


