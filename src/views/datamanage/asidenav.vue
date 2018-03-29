<template>
    <nav>
        <ul>
            <li @click="goTo('/home/datamanage')" v-bind:class="{ active: 'datamanage'== path}">1资料上传</li>
            <li @click="goTo('/home/replenish')" v-bind:class="{ active: 'replenish'== path}">2补充资料上传</li>
        </ul>
    </nav>
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
            }
        },
        created() {
            this.path = this.$route.path.slice(6)
            console.log(this.path)
        }
    }
</script>

<style>
    nav {
        height: 670px;
        width: 244px;
        background: #fff;
        margin: 0px 16px;
        display: flex;
        justify-content: center;
    }
    nav li:nth-child(1) {
        margin-top: 42px;
    }
    nav li {
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 200px;
        margin-bottom: 20px;
    }
    nav li.active {
        background: url("../../assets/navBar.png") no-repeat;
    }
</style>


