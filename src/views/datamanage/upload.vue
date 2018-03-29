<template>
    <div>
        <div class="upload">
            <div class="list">
                <ul class="head">
                    <li>文件名</li>
                    <li>文件号</li>
                    <li>备注</li>
                    <li>备注</li>
                    <li>操作</li>
                </ul>
                <div class="list_body">
                    <ul>
                        <li>材料1.pdf</li>
                        <li>政府令138号</li>
                        <li>附件共计3份</li>
                        <li>正常</li>
                        <li>删除</li>
                    </ul>
                    <ul>
                        <li>材料1.pdf</li>
                        <li>政府令138号</li>
                        <li>附件共计3份</li>
                        <li>正常</li>
                        <li>删除</li>
                    </ul>
                    <ul>
                        <li>材料1.pdf</li>
                        <li>政府令138号</li>
                        <li>附件共计3份</li>
                        <li>正常</li>
                        <li>删除</li>
                    </ul>
                    <ul>
                        <li>材料1.pdf</li>
                        <li>政府令138号</li>
                        <li>附件共计3份</li>
                        <li>正常</li>
                        <li>删除</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 删除对话框 -->
        <div class="del_dialog">
            <div class="title">提醒</div>
            <div class="msg">您确认要删除吗？</div>
            <div class="btns">
                <a href="">确认</a>
                <a href="">取消</a>
            </div>
        </div>
        <!-- 上传附件弹窗 -->
        <div class="upload_dialog">
            <div class="label">
                <span>文件名</span>
                <input type="text">
            </div>
            <div class="label">
                <span>文件号</span>
                <input type="text">
            </div>
            <div class="label">
                <span>备注</span>
                <input type="text">
            </div>
            <div class="label">
                <span>文件性质</span>
                <input type="text">
            </div>
            <div class="label access">
                <span>附件</span>
                <div class="accessory">
                    <span>请选择文件上传</span>
                    <input type="file" name="" id="file">
                </div>
            </div>
            <div class="btns">
                <a href="javascript:;" @click="upload()">确定</a>
                <a href="">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb'
    export default {
        methods: {
            getDetail() { //获取附件列表
                this.$ajax.get(`/api/self_point_relations/${this.$route.params.id}`, {}).then((res) => {
                    console.log(res.data)
                }, (err) => {
                    console.log(err)
                })
            },
            del(id) { //删除附件
                this.$ajax.DELETE(`/api/self_point_relations/${id}`, {}).then((res) => {
                    console.log(res.data)
                }, (err) => {
                    console.log(err)
                })
            },
            upload(){
                var file = document.getElementById("file").files[0]
                console.log(file)
            }
        },
        created() {
            this.getDetail()
        }
    }
</script>

<style>
    .upload {
        width: 915px;
    }
    .upload .list ul.head {
        display: flex;
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
        /* justify-content: space-around; */
    }
    .upload .list .list_body ul:nth-child(even) {
        background: #f4f2f3;
    }
    .upload .list .list_body ul:nth-child(odd) {
        background: #dcdcdc;
    }
    .upload .list .list_body ul li {
        width: 20%;
        text-align: center;
    }
    .del_dialog {
        width: 288px;
        height: 174px;
        box-shadow: 1px 1px 8px #ccc
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
        border: 1px solid #53a6f6;
        box-shadow: 1px 1px 8px #ccc;
    }
    .upload_dialog .label {
        display: flex;
        align-items: center;
        height: 44px;
        color: #666;
        padding: 0px 30px;
    }
    .upload_dialog .label input {
        height: 30px;
        border: 1px solid #ccc;
        margin-left: 10px;
        width: 80%;
    }
    .upload_dialog .label span {
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


