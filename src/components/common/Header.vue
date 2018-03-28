<template>
    <header>
        <div class="systemname">
            省级监督考评系统
        </div>
        <div class="nav">
            <ul>
                <li class="active" @click="goTo('/home/datamanage')">资料管理</li>
                <li @click="goTo('/home/grade')">评分标准</li>
                <li @click="goTo('/home/progress')">查看进度</li>
            </ul>
        </div>
        <div class="person_info">
            <div class="message">
                <i></i>
                <a href="">通知</a>
            </div>
            <div class="message">
                <i></i>
                <a href="" @click="logout()">退出</a>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        methods: {
            goTo(url) {
                console.log(url)
                this.$router.push(url)
            },
            logout() {
                window.localStorage.removeItem("token")
                this.$router.replace({
                    "path": "/"
                })
            }
        }
    }
</script>

<style>
    header {
        width: 100%;
        height: 72px;
        background: #327bca;
        display: flex;
        align-items: center;
    }
    header .systemname {
        font-size: 26px;
        color: #fff;
        margin-left: 30px;
    }
    header .nav {
        margin-left: 150px;
    }
    header .nav ul {
        display: flex;
    }
    header .nav ul li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 118px;
        color: #fff;
        height: 72px;
        cursor: pointer;
    }
    header .nav ul li.active {
        background: #65d3e3
    }
    header .person_info {
        width: 100px;
        height: 72px;
        margin-left: 450px;
        display: flex;
        align-items: center;
    }
    header .person_info .message a {
        color: #fff;
    }
</style>



