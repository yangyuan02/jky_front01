<template>
    <header>
        <div class="systemname">
            省级监督考评系统
        </div>
        <div class="nav">
            <ul>
                <li @click="goTo('/home/datamanage')" v-bind:class="{ active: 'datamanage'== path||'replenish'== path||'upload'== path}">资料管理</li>
                <li @click="goTo('/home/grade')" v-bind:class="{ active: 'grade'== path}">评分标准</li>
                <li @click="goTo('/home/progress')" v-bind:class="{ active: 'progress'== path}">查看进度</li>
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
        data() {
            return {
                path: ''
            }
        },
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
            },
            getPath() {
                if (this.$route.path.indexOf('upload')!=-1) {
                    this.path = this.$route.path.slice(6, 12)
                } else {
                    this.path = this.$route.path.slice(6)
                }
            }
        },
        created() {
            this.getPath()
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                this.getPath()
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



