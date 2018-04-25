<template>
    <div class="bg">
        <div class="login_box">
            <h2>用户登录</h2>
            <div class="user common" style="margin-bottom:20px;">
                <input type="text" placeholder="请输入用户名" v-model="unsename">
            </div>
            <div class="common" style="margin-bottom:20px;">
                <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="common" style="margin-bottom:20px;">
                <input type="password" placeholder="请输入密码" v-model="code.value" style="width:47%;">
                <span style="display: inline-block;width:50%;" @click="creatCode()">
                    <img :src="code.image" alt="" style="width:100%;">
                </span>
            </div>
            <div class="login_btn" @click="login">登录</div>
        </div>
    </div>
</template>

<script>
    import jsrsasign from 'jsrsasign'
    // console.log(jsrsasign.KJUR.jws.JWS.parse())
    export default {
        data() {
            return {
                unsename: "",
                password: "",
                code:{}
            }
        },
        methods: {
            creatCode(){
                this.$ajax.get("/api/jky_rucaptcha",{}).then((res)=>{
                    this.code = res.data
                },(err)=>{

                })
            },
            login() {
                this.$ajax.post("/api/user_token", {
                    "account": this.unsename,
                    "password": this.password,
                    "uuid":this.code.uuid,
                    "rucaptcha":this.code.value
                }).then((res) => {
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
            // this.getProvinces()
        }
    }
</script>

<style scoped>
    .bg {
        width: 100%;
        height: 100%;
        background: url("../assets/login_bg.png") no-repeat center center;
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
