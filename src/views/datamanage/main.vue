<template>
    <Breadcrumb>
    </Breadcrumb>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        methods:{
            getData(){
                this.$ajax.get('/api/role_points',{}).then((res)=>{
                    console.log(res)
                },(err)=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style>

</style>

