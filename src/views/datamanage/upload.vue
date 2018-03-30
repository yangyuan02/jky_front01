<template>
    <div style="margin-top:36px;margin-left:40px;">
        <div class="uploadt_btn" @click="toggleUpload('block')">添加 </div>
        <div class="upload">
            <div class="list">
                <ul class="head">
                    <li>文件名</li>
                    <li>文件号</li>
                    <li>备注</li>
                    <li>上传时间</li>
                    <li>状态</li>
                    <li></li>
                </ul>
                <div class="list_body">
                    <ul v-for="(item,index) in fileList" :key="index">
                        <li>{{item.title}}</li>
                        <li>{{item.num}}</li>
                        <li>{{item.remark}}</li>
                        <li>{{item.created_at}}</li>
                        <li>{{item.normal==true?'公开':'保密'}}</li>
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
                    <input type="radio" id="one" value="true" v-model="picked" :checked="picked==true">
                    <span>公开</span>
                    <input type="radio" id="two" value="false" v-model="picked">
                    <span>保密</span>
                </div>
            </div>
            <div class="label access">
                <span>附件</span>
                <div class="accessory">
                    <span>请选择文件上传</span>
                    <input type="file" name="" id="file">
                </div>
            </div>
            <div class="btns">
                <a href="javascript:;" @click="upload()">保存</a>
                <a href="javascript:;" @click="toggleUpload('none')">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import fayes from 'faye'
    import Breadcrumb from '@/components/common/breadcrumb'
    export default {
        data() {
            return {

                "filename":'',
                "filenum":"",
                "remark":"",
                "fileId":"",
                "picked":true,
                "fileList": []
            }
        },
        methods: {
            getDetail() { //获取附件列表
                this.$ajax.get(`/api/self_point_relations/${this.$route.params.id}`, {}).then((res) => {
                    this.fileList = res.data
                }, (err) => {
                    console.log(err)
                })
            },
            toggleUpload(type) {
                var upload = document.getElementById("up_dialog")
                upload.style.display = type
            },
            showDel(type,id) {
                var upload = document.getElementById("del_dialog")
                upload.style.display = type
                this.fileId = id
                if(type=='block'){
                    this.filename=''
                    this.filenum=''
                    this.remark=''
                }
            },
            del() { //删除附件
                this.$ajax.delete(`/api/self_point_relations/${this.fileId}`, {}).then((res) => {
                  if(res.data){
                      this.getDetail()
                      this.showDel('none',-1)
                  }
                }, (err) => {
                    console.log(err)
                })
            },
            upload(id) {
                var id = this.$route.params.id
                var fileData = new FormData()
                console.log(this.picked)
                var file = document.getElementById("file").files[0]
                fileData.append("self_point_relation[file]", file)
                fileData.append("self_point_relation[title]", this.filename)
                fileData.append("self_point_relation[num]", this.filenum)
                fileData.append("self_point_relation[remark]", this.remark)
                fileData.append("self_point_relation[normal]", this.picked)
                console.log(fileData)
                this.$ajax.post(`/api/self_point_relations?self_point_relation[self_point_id]=${id}`).then((res) => {
                    var faye = new fayes.Client(`http://120.55.116.161:9292/api/events`);
                    faye.subscribe(`/api/self_point_relations/${res.data.id}`, (status)=> {
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
            }
        },
        created() {
            this.getDetail()
        }
    }
</script>

<style>
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
    .upload .list .list_body ul li {
        width: 16.6%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .upload .list .list_body ul li:last-child{
        cursor: pointer;
    }
    .del_dialog {
        width: 288px;
        height: 174px;
        box-shadow: 1px 1px 8px #ccc;
        display: none;
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
        height: 406px;
        display: none;
        border: 2px solid #53a6f6;
        border-radius: 4px;
        box-shadow: 1px 1px 8px #ccc;
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
</style>


