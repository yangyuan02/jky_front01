<template>
    <div class="bg">
        <div class="system_name">
            省级政府履行教育职责评价工具
        </div>
        <div class="login_box">
          <div v-show="forget_password">
            <h2>用户登录</h2>

            <div class="user common" style="margin-bottom:20px;">
                <input type="text" placeholder="请输入用户名" v-model="unsename">
            </div>
            <div class="common" style="margin-bottom:20px;">
                <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="common" style="margin-bottom:40px;">
                <input type="password" placeholder="请输入验证码" v-model="code.value" style="width:47%;">
                <span style="display: inline-block;width:50%;" @click="creatCode()">
                    <img :src="code.image" alt="" style="width:100%;">
                </span>
                <a style="color: #368ae2;float: right;font-size:12px;cursor: pointer;display: inline-block;margin-top: 5px;" @click="forget">忘记密码</a>
            </div>
            <div class="login_btn" @click="login">登录</div>
            </div>
          <!-- 忘记密码 -->
          <div v-show="!forget_password">
          <h2>忘记密码</h2>

            <div class="user common" style="margin-bottom:20px;">
                <input type="text" placeholder="请输入姓名" v-model="forget_name">
            </div>
            <div class="common" style="margin-bottom:20px;">
                <input type="" placeholder="请输入手机号" @keyup.enter="login" v-model="forget_tel">
            </div>
            <div class="common" style="margin-bottom:40px;">
                <input type="" placeholder="请输入验证码"  style="width:47%;" v-model="forget_value">
                <span style="display: inline-block;width:50%;" @click="creatCode()">
                    <img :src="code.image" alt="" style="width:100%;">
                </span>
                 <a style="color: #368ae2;float: right;font-size:12px;cursor: pointer;display: inline-block;margin-top: 5px;" @click="forget_back">返回</a>
            </div>
            <div class="login_btn" @click="forget_login">获取帐号</div>
            </div>
          <!-- 忘记密码 -->

        </div>
    </div>
</template>

<script>
    import jsrsasign from 'jsrsasign'
    // console.log(jsrsasign.KJUR.jws.JWS.parse())
    export default {
        data() {
            return {
                forget_password:true,
                unsename: "",
                password: "",
                code:{},
                forget_name:"",
                forget_tel:"",
                forget_value:"",
            }
        },
        methods: {
            creatCode(){
                this.$ajax.get("/api/jky_rucaptcha",{}).then((res)=>{
                    this.code = res.data
                },(err)=>{

                })
            },
            getProvince(){//获取省份
                if(window.localStorage.getItem("provinces")){
                    return
                }
                this.$ajax.get("/api/provinces").then((res)=>{
                    window.localStorage.setItem("provinces",JSON.stringify(res.data))
                },(err)=>{

                })
            },
            forget:function(){
             this.forget_password=false
             this.creatCode()
            },
            forget_back:function(){
             this.forget_password=true
             this.creatCode()
            },
            forget_login:function(){
             if(this.forget_name==''){
                    alert("姓名名不能为空")
                    return
                }
                if(this.forget_tel==''){
                    alert("手机号不能为空")
                    return
                }
                if(this.forget_value==undefined){
                    alert("验证码不能为空")
                    return
                }
              this.$ajax.post("/api/admin/users/reset_user", {"name":this.forget_name,"mobile":this.forget_tel,"uuid":this.code.uuid,"rucaptcha":this.forget_value,}).then((res) => {

                }, (err) => {})
              this.forget_password=true

            },
            login() {
                if(this.unsename==''){
                    this.$message.error("用户名不能为空")
                    return
                }
                if(this.password==''){
                    this.$message.error("密码不能为空")
                    return
                }
                if(this.code.value==undefined){
                    this.$message.error("验证码不能为空")
                    return
                }
                this.$ajax.post("/api/user_token", {
                    "account": this.unsename,
                    "password": this.password,
                    "uuid":this.code.uuid,
                    "rucaptcha":this.code.value
                }).then((res) => {
                    console.log(res.data.message == '验证码错误')
                    if(res.data.message == '验证码错误'){
                        this.creatCode()
                        this.$message.error("验证码错误")
                        return
                    }
                    if(res.data.message == '账号密码错误'){
                        this.$message.error("账号密码错误")
                        return
                    }
                    if (res.data.jwt) {
                        var token = res.data.jwt
                        var user = jsrsasign.KJUR.jws.JWS.parse(token).payloadObj

                        window.localStorage.setItem("token", JSON.stringify(token))

                        window.localStorage.setItem("user",JSON.stringify(user))
                        if(user.role=='省用户'){
                            this.$router.push('./home/datamanage')
                            user.level = 0
                        }
                        if(user.role=='网评专家'){
                            this.$router.push('./home/specialist')
                            user.level = 1
                        }
                        if(user.role=='实地专家'){
                            user.level = 2
                            // this.$router.push('./home/specialist')
                        }
                        if(user.role=='督导'){
                            user.level = 3
                            this.$router.push('./home/supervisor')
                        }
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            getProvinces() {
                this.$ajax.get("/api/provinces/", {}).then((res) => {
                    console.log(res)
                })
            }
        },
        mounted() {
            this.creatCode()
            this.getProvince()
        }
    }
</script>

<style scoped>
    .bg {
        width: 100%;
        height: 100%;
        background: url("../assets/login_bg.jpg") no-repeat center center;
        background-size:cover;
        position: relative;
    }
    .login_box {
        width: 305px;
        height: 300px;
        background: #fff;
        text-align: center;
        position: absolute;
        right: 10%;
        top: 20%;
    }
    .system_name{
        font-size: 30px;
        color: #fff;
        position: relative;
        left: 5%;
        top:8%;
    }
    .login_box .common {
        width: 240px;
        height: 34px;
        margin: 0 auto;
    }
    .login_box h2 {
        color: #368ae2;
        padding-top: 10px;
        padding-bottom: 20px;
    }
    .login_box input {
        width: 100%;
        height: 34px;
        border: 1px solid #ccc;
        padding-left: 6px;
    }
    .login_box .pass {
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .login_box .login_btn {
        color: #fff;
        text-align: center;
        width: 240px;
        height: 34px;
        background: #368ae2;
        margin: 0 auto;
        line-height: 34px;
        cursor: pointer;
    }
</style>
