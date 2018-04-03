<template>
    <p>资料管理>资料上传</p>
</template>

<script>
export default { //面包屑导航
    methods:{
        getPath(){
            console.log(this.$route)
        }
    },
    created(){
        this.getPath()
    }
}
</script>

<style>

</style>


