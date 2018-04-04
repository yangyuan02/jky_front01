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
            <p><i></i><span @click="goTo('datamanage')" style="cursor: pointer;">资料管理</span>><span>资料上传</span></p>
            <div class="review">
                <div class="review_grade">
                    <span>评价等级</span>
                    <input type="radio" id="A" value="A" name="self_point" v-model="review.self_point">
                    <span>A</span>
                    <input type="radio" id="B" value="B" name="self_point" v-model="review.self_point">
                    <span>B</span>
                    <input type="radio" id="C" value="C" name="self_point" v-model="review.self_point">
                    <span>C</span>
                </div>
                <div class="review_text">
                    <textarea name="" id="" cols="30" rows="10" placeholder="请写评价...." v-model="review.user_remark">
                                </textarea>
                    <p>
                        <span>字数限制：500</span>
                        <a href="javascript:;" @click="save()">保存</a>
                    </p>
                </div>
            </div>
            <div class="uploadt_btn" @click="toggleUpload('block')">添加 </div>
            <div class="upload">
                <div class="list">
                    <ul class="head">
                        <li>文件名</li>
                        <li>文件号</li>
                        <li>文件性质</li>
                        <li>上传时间</li>
                        <li>备注</li>
                        <li></li>
                    </ul>
                    <div class="list_body">
                        <ul v-for="(item,index) in fileList.data" :key="index">
                            <li @click="open(item.file,item.normal)">{{item.title}}</li>
                            <li>{{item.num}}</li>
                            <li>{{item.normal==true?'公开':'保密'}}</li>
                            <li>{{item.created_at}}</li>
                            <li>{{item.remark}}</li>
                            <li @click="showDel('block',item.id)">删除</li>
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
                <div class="close"></div>
                <div class="label">
                    <span>文件名</span>
                    <input type="text" v-model="filename">
                </div>
                <div class="label">
                    <span>文件号</span>
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
                <div class="label access" v-show="picked=='one'">
                    <span>附件</span>
                    <div class="accessory">
                        <i class="iconfont" v-bind:class="{ active: '1'== isFile}">&#xe615;</i>
                        <span>{{isFile==1?_filename:'请选择文件上传'}}</span>
                        <input type="file" name="" id="file"  accept=".pdf" @change="changeFile()">
                    </div>
                </div>
                <div class="btns">
                    <a href="javascript:;" @click="upload()">保存</a>
                    <a href="javascript:;" @click="toggleUpload('none')">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fayes from 'faye'
    // import asideNav from "./asidenav";
    // import Breadcrumb from '@/components/common/breadcrumb'
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
                "titleIndex":'',
                isFile:0,
                _filename:''
            }
        },
        components: {
            // Breadcrumb
        },
        methods: {
            getDetail() { //获取附件列表
                this.$ajax.get(`/api/self_point_relations/${this.$route.params.id}`, {}).then((res) => {
                    this.fileList = res.data
                    this.review.self_point = res.data.self_point
                    this.review.user_remark = res.data.user_remark
                    this.titleIndex = this.fileList.point.substring(0,this.fileList.point.indexOf('.'))
                }, (err) => {
                    console.log(err)
                })
            },
            goTo(){
                this.$router.push('/home/datamanage')
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
                    document.getElementById("file").value = ''
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
                if(this.filename==''){
                    alert("文件名为必填项")
                    return
                }
                var id = this.$route.params.id
                var fileData = new FormData()
                this.picked = this.picked == 'one'?true:false
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
            open(url,normal) {
                if(normal&&url==null){
                    alert("没有附件")
                    return
                }
                if(url==null){
                    alert("该文件为保密文件")
                    return
                }
                window.open(url)
            },
            changeFile(){
                var file = document.getElementById("file").files[0]
                console.log(file)
                if(file){
                    this.isFile = 1
                    this._filename =  file.name
                }else{
                    this.isFile = 0
                }
                // this.changFile = 0
            },
            save() {
                if(this.review.self_point == null){
                    alert("请选择评价等级")
                    return
                }
                console.log(this.review.user_remark)
                if(this.review.user_remark == null){
                    alert("请写评价详情")
                    return
                }
                if(this.review.user_remark.length>500){
                    alert("最多500字")
                    return
                }
                this.review.point_id = this.$route.params.id
                this.$ajax.post("/api/role_points/save_point", this.review)
                    .then((res) => {
                        alert("感谢您的评价")
                    }, (err) => {})
            }
        },
        computed:{
            // count(){
            //     return 500-this.review.user_remark.length
            // }
        },
        created() {
            this.getDetail()
        }
    }
</script>

<style>
    .review_text {
        position: relative;
        width: 652px;
    }
    .review_text textarea {
        width: 100%;
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
    .review{
        margin-top: 20px;
    }
    .review .review_grade{
        margin-bottom: 10px;
    }
    .review_text p {
        position: absolute;
        right: 0;
        bottom: 10px;
    }
    .review_text p a {
        color: #4fa4f4;
        text-decoration: underline;
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
        padding-top:14px;
    }
    nav .target {
        width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 1px 1px 8px #ccc;
        background: #fff;
    }
    nav .target:first-child .target_con{
        color: #666;
    }
    nav .target:not(:first-child){
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
    nav .target .target_title.blue{

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
        padding-top: 14px;
        padding-left: 40px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
    }
    .uploadt_btn {
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        background: #78b9f3;
    }
    .upload {
        width: 1053px;
        margin-top: 20px;
    }
    .upload .list ul.head {
        display: flex;
        height: 30px;
        align-items: center;
        /* justify-content: space-around; */
    }
    .upload .list ul.head {
        background: #f4f2f3
    }
    .upload .list ul.head li {
        width: 20%;
        color: #3b83cd;
        text-align: center;
    }
    .upload .list .list_body ul {
        display: flex;
        height: 28px;
        align-items: center;
        /* justify-content: space-around; */
    }
    .upload .list .list_body ul:nth-child(even) {
        background: #f4f2f3;
    }
    .upload .list .list_body ul:nth-child(odd) {
        background: #dcdcdc;
    }
    .upload .list .list_body ul li:nth-child(1){
        cursor: pointer;
    }
    .upload .list .list_body ul li:nth-child(1):hover{
        color: #4fa4f4;
    }
    .upload .list .list_body ul li {
        width: 16.6%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .upload .list .list_body ul li:last-child {
        cursor: pointer;
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
        transform: translate(-50%,-50%);
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
        transform: translate(-50%,-50%);
        background: #fff;
    }
    .upload_dialog .label {
        display: flex;
        align-items: center;
        height: 44px;
        color: #666;
        padding: 0px 30px;
    }
    .upload_dialog .label>input {
        height: 30px;
        border: 1px solid #ccc;
        margin-left: 10px;
        width: 80%;
    }
    .upload_dialog .label>span {
        width: 28%;
        text-align: right;
    }
    .upload_dialog .access {
        height: 170px;
    }
    .upload_dialog .label .accessory {
        width: 150px;
        height: 150px;
        border: 1px dashed #cccccc;
        border-radius: 4px;
        text-align: center;
        position: relative;
    }
    .upload_dialog .label .accessory input[type="file"] {
        width: 150px;
        height: 150px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer
    }
    .upload_dialog .label .accessory i{
        position: absolute;
        left:50%;
        top: 34%;
        font-size:34px;
        transform: translate(-50%,-50%)
    }
    .upload_dialog .label .accessory i.active{
        color: #3485ee;
    }
    .upload_dialog .label .accessory span{
        position: absolute;
        left:50%;
        top: 60%;
        width: 100%;
        transform: translate(-50%,-50%)
    }
    .right_con p i{
        display: inline-block;
        width:10px;
        height:14px;
        background: url("../../assets/crumbs_bg.png") no-repeat;
        margin-right: 8px;
    }

</style>


