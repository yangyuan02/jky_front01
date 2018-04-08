<template>
    <div class="bg">
        <div class="login_box">
            <h2>用户登录</h2>
            <div class="user common">
                <input type="text" placeholder="请输入用户名" v-model="unsename">
            </div>
            <div class="pass common">
                <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="login_btn" @click="login">登录</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            unsename:"",
            password:""
        }
    },
    methods:{
        login(){
            this.$ajax.post("/api/login/login_password",{"username":this.unsename,"password":this.password}).then((res)=>{
                if(res.data.result.token){
                    window.localStorage.setItem("user",JSON.stringify(res.data))
                    this.$router.push('./home/datamanage')
                }
            },(err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.bg{
    width:1440px;
    height:100%;
    background: url("../assets/login_bg.png") no-repeat center center;
    position: relative
}
.login_box{
    width:305px;
    height: 300px;
    background:#fff;
    text-align: center;
    position: absolute;
    right:10%;
    top: 20%;
}
.login_box .common{
    width:240px;
    height: 34px;
    margin: 0 auto;
}
.login_box h2{
    color: #368ae2;
    padding-top:10px;
    padding-bottom:20px;
}
.login_box input{
    width:100%;
    height:34px;
    border:1px solid #ccc;
    padding-left:6px;
}
.login_box .pass{
    margin-top:20px;
    margin-bottom:50px;
}
.login_box .login_btn{
    color:#fff;
    text-align: center;
    width: 240px;
    height:34px;
    background:#368ae2;
    margin: 0 auto;
    line-height: 34px;
    cursor: pointer;
}
</style>
