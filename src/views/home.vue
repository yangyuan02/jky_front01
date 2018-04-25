<template>
    <div>
        <Header></Header>
        <div class="conten">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/common/Header";
    export default {
        components: {
            Header
        },
        methods:{
             getProvince(){//获取省份
                if(window.localStorage.getItem("provinces")){
                    return
                }
                this.$ajax.get("/api/provinces").then((res)=>{
                    window.localStorage.setItem("provinces",JSON.stringify(res.data))
                },(err)=>{

                })
            }
        },
        mounted(){
            this.getProvince()
        }
    };
</script>

<style>
    .conten {
        height: 100%;
        background: #edecec;
        display: flex;
        padding: 16px 0px;
    }
</style>



