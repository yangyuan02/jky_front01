<template>
    <nav>
        <ul>
            <li @click="goTo('/home/datamanage')">1资料上传</li>
            <li @click="goTo('/home/replenish')">2补充资料上传</li>
        </ul>
    </nav>
</template>

<script>
    export default {
        methods: {
            goTo(url) {
                console.log(url)
                this.$router.push(url)
            }
        }
    }
</script>

<style>
    nav {
        height: 670px;
        width: 244px;
        border: 1px solid red;
        background: #fff;
        margin: 0px 16px;
    }
</style>


